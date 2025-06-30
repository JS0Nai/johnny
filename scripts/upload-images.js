/**
 * Automatic image uploader for Cloudflare Images
 * 
 * This script can be run manually or as part of a pre-commit hook to upload
 * new or changed images to Cloudflare Images.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const MEDIA_DIR = path.resolve(__dirname, '../public/media');
const CONFIG_FILE = path.resolve(__dirname, '.cloudflare-images.json');

// Load or create configuration
let config = { 
  uploadedImages: {},
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '97af56fe1b421ea97a8f401fab7e5cc2'
};

if (fs.existsSync(CONFIG_FILE)) {
  try {
    config = { ...config, ...JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) };
  } catch (error) {
    console.warn(`Warning: Could not parse config file: ${error.message}`);
  }
}

// Get API token from environment or prompt
let apiToken = process.env.CLOUDFLARE_API_TOKEN;
if (!apiToken) {
  try {
    // Try to read from .env file if it exists
    if (fs.existsSync(path.resolve(__dirname, '../.env'))) {
      const envFile = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8');
      const match = envFile.match(/CLOUDFLARE_API_TOKEN=([^\s]+)/);
      if (match && match[1]) {
        apiToken = match[1];
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not read .env file: ${error.message}`);
  }
}

if (!apiToken) {
  console.error('Warning: No Cloudflare API token found. Please set CLOUDFLARE_API_TOKEN environment variable.');
  console.error('You can create a token at https://dash.cloudflare.com/profile/api-tokens');
  console.error('Skipping image upload for local development.');
  // Continue with build process for local development
  process.exit(0);
}

/**
 * Get list of modified image files
 */
function getModifiedImages() {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  
  // Create media directory if it doesn't exist
  if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
    console.log('Created media directory for future image uploads');
    return [];
  }
  
  // Get all image files in media directory
  const allImages = fs.readdirSync(MEDIA_DIR)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    })
    .map(file => path.join(MEDIA_DIR, file));
  
  // Filter for new or modified images
  return allImages.filter(filePath => {
    const stats = fs.statSync(filePath);
    const filename = path.basename(filePath);
    
    // Check if the file is new or modified since last upload
    const lastUploaded = config.uploadedImages[filename]?.lastUploaded || 0;
    return stats.mtimeMs > lastUploaded;
  });
}

/**
 * Upload an image to Cloudflare Images
 */
async function uploadImage(filePath) {
  const filename = path.basename(filePath);
  const imageId = path.parse(filename).name;
  const url = `https://api.cloudflare.com/client/v4/accounts/${config.accountId}/images/v1`;
  
  // Use dynamic import for form-data and node-fetch since they might not be installed
  let FormData, fetch;
  try {
    FormData = require('form-data');
    fetch = require('node-fetch');
  } catch (error) {
    console.error('Please install required dependencies: npm install form-data node-fetch');
    return false;
  }
  
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  formData.append('id', imageId);
  
  try {
    console.log(`Uploading ${filename} with ID ${imageId}...`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`
      },
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Save upload information
      config.uploadedImages[filename] = {
        id: imageId,
        lastUploaded: Date.now(),
        variants: data.result.variants
      };
      
      // Save updated config
      fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
      
      console.log(`✅ Successfully uploaded ${imageId}`);
      return true;
    } else {
      console.error(`❌ Failed to upload ${imageId}: ${JSON.stringify(data.errors)}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error uploading ${imageId}: ${error.message}`);
    return false;
  }
}

/**
 * Main function
 */
async function main() {
  const modifiedImages = getModifiedImages();
  
  if (modifiedImages.length === 0) {
    console.log('No new or modified images found in media directory.');
    return;
  }
  
  console.log(`Found ${modifiedImages.length} images to upload:\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const imagePath of modifiedImages) {
    const success = await uploadImage(imagePath);
    if (success) successCount++;
    else failCount++;
  }
  
  console.log(`\nUpload summary: ${successCount} succeeded, ${failCount} failed`);
  
  if (failCount > 0) {
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Error in main function:', error);
  process.exit(1);
});