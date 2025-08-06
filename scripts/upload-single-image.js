#!/usr/bin/env node

/**
 * Upload a single image to Cloudflare Images
 * Usage: node scripts/upload-single-image.js <image-filename>
 * Example: node scripts/upload-single-image.js brain-creative-red.png
 */

const fs = require('fs');
const path = require('path');

// Get filename from command line
const filename = process.argv[2];
if (!filename) {
  console.error('Usage: node scripts/upload-single-image.js <image-filename>');
  console.error('Example: node scripts/upload-single-image.js brain-creative-red.png');
  process.exit(1);
}

// Configuration
const MEDIA_DIR = path.resolve(__dirname, '../public/media');
const filePath = path.join(MEDIA_DIR, filename);

// Check if file exists
if (!fs.existsSync(filePath)) {
  console.error(`Error: File not found: ${filePath}`);
  process.exit(1);
}

// Get API token
let apiToken = process.env.CLOUDFLARE_API_TOKEN;
if (!apiToken) {
  try {
    if (fs.existsSync(path.resolve(__dirname, '../.env'))) {
      const envFile = fs.readFileSync(path.resolve(__dirname, '../.env'), 'utf8');
      const match = envFile.match(/CLOUDFLARE_API_TOKEN=([^\s]+)/);
      if (match && match[1]) {
        apiToken = match[1];
      }
    }
  } catch (error) {
    console.error(`Error reading .env file: ${error.message}`);
  }
}

if (!apiToken) {
  console.error('Error: No Cloudflare API token found.');
  console.error('Please set CLOUDFLARE_API_TOKEN in your .env file');
  process.exit(1);
}

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || '97af56fe1b421ea97a8f401fab7e5cc2';

// Upload the image
async function uploadImage() {
  const FormData = require('form-data');
  const fetch = require('node-fetch');
  
  const imageId = path.basename(filename, path.extname(filename));
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`;
  
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  formData.append('id', imageId);
  
  console.log(`Uploading ${filename} with ID ${imageId}...`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`
      },
      body: formData
    });
    
    const data = await response.json();
    
    if (data.success) {
      console.log(`✅ Successfully uploaded ${imageId}`);
      console.log(`URL: ${data.result.variants[0]}`);
    } else {
      console.error(`❌ Failed to upload: ${JSON.stringify(data.errors)}`);
    }
  } catch (error) {
    console.error(`❌ Error uploading: ${error.message}`);
  }
}

uploadImage();