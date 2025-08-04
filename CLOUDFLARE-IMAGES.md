# Cloudflare Images Integration

Complete setup guide for integrating Cloudflare Images in Next.js projects.

## Overview

- **Development**: Images are stored in `/public/media` folder and accessed via `/media/` URL path
- **Production**: Images are served from Cloudflare's global CDN
- **Smart Component**: Automatically switches between local and CDN based on environment
- **IMPORTANT**: Physical files go in `/public/media/`, but URLs use `/media/` (Next.js serves public folder contents)

## Complete Setup Guide

### 1. Get Cloudflare API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Custom token" template with these permissions:
   - **Account** → Cloudflare Images:Edit
4. Copy the token

### 2. Create Environment File

Create `.env` file in project root:

```
CLOUDFLARE_API_TOKEN=your-actual-token-here
CLOUDFLARE_ACCOUNT_ID=your-account-id
```

**Important**: Add `.env` to `.gitignore` to keep token secure

### 3. Set Up Project Structure

```
your-project/
├── public/
│   └── media/                  # Images go here
├── components/
│   └── CloudflareImage.js      # Component (copy from below)
├── scripts/
│   └── upload-images.js        # Upload script (copy from below)
├── .env                        # Your API credentials
└── .gitignore                  # Must include .env
```

### 4. Install Dependencies

```bash
npm install form-data node-fetch
```

### 5. Copy Required Files

**CloudflareImage Component** (`components/CloudflareImage.js`):
```jsx
import React from 'react';
import Image from 'next/image';

export default function CloudflareImage({ 
  src, 
  width, 
  height, 
  alt = "", 
  className = "", 
  priority = false,
  objectFit = "cover",
  ...props 
}) {
  const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
  const cloudflareAccountHash = 'YOUR-ACCOUNT-HASH'; // Get this from Cloudflare dashboard
  const variant = 'public';
  
  const imageId = src.startsWith('/') ? src.slice(1).split('/').pop().split('.')[0] : src.split('/').pop().split('.')[0];
  
  let imageSrc;
  
  if (isDevelopment) {
    imageSrc = `/media/${imageId}.png`;
  } else {
    imageSrc = `https://imagedelivery.net/${cloudflareAccountHash}/${imageId}/${variant}`;
  }
  
  if (typeof window === 'undefined' && !isDevelopment) {
    return (
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ objectFit }}
        {...props}
      />
    );
  }
  
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={{ objectFit }}
      unoptimized={!isDevelopment}
      {...props}
    />
  );
}
```

**Upload Script** (`scripts/upload-images.js`): Copy from this repo

### 6. Update package.json

Add upload script:
```json
{
  "scripts": {
    "upload-images": "node scripts/upload-images.js"
  }
}
```

## Usage

### STRICT CLOUDFLARE IMAGE RULES - MUST FOLLOW

**IMPORTANT**: Images will NOT display on production (johnny.ae) unless these rules are followed exactly!

#### Rule 1: Always Use CloudflareImage Component
For standard image display, ALWAYS use the CloudflareImage component:
```jsx
import CloudflareImage from '../components/CloudflareImage';

<CloudflareImage
  src="my-image"  // Just the filename, NO path, NO extension
  alt="Description"
  width={800}
  height={600}
/>
```

#### Rule 2: Special Cases (Three.js, Canvas, Direct URLs)
When you CANNOT use CloudflareImage component (e.g., Three.js TextureLoader, Canvas, or libraries requiring direct URLs):

```jsx
// REQUIRED: Add these at the top of your component
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
const cloudflareAccountHash = 'afekpjgU7bwy8XYMt0lA2Q';
const variant = 'public';

// Helper function to get proper image URL
function getImageUrl(imageName) {
  if (isDevelopment) {
    // Note: Files are in /public/media/ but served at /media/
    return `/media/${imageName}.png`;
  } else {
    return `https://imagedelivery.net/${cloudflareAccountHash}/${imageName}/${variant}`;
  }
}

// Example usage in Three.js:
const textureLoader = new THREE.TextureLoader();
textureLoader.load(getImageUrl('logo-name'), (texture) => {
  // Use texture
});
```

#### Rule 3: Image Naming Convention - CRITICAL FOR PRODUCTION
- **MUST use only lowercase letters, numbers, and hyphens**
- **NO spaces, NO underscores, NO uppercase letters**
- **NO special characters or dots (except for file extension)**

Examples of CORRECT names:
- ✅ `tech-runner-blue`
- ✅ `hero-banner`
- ✅ `logo-main`
- ✅ `ab1200tr` (all lowercase)
- ✅ `ig-ad-creative`

Examples of INCORRECT names that WILL FAIL in production:
- ❌ `logo_800-200` (has underscore)
- ❌ `AB1200TR` (uppercase letters)
- ❌ `Bb_logo` (uppercase and underscore)
- ❌ `IG-Ad-Creative` (uppercase letters)
- ❌ `Oil-Painting-Portrait` (uppercase letters)

### Adding New Images

1. Place images in `/public/media/` (NOT just `/media/`):
   ```bash
   cp my-image.png public/media/
   ```
   
   **IMPORTANT**: The physical folder is `/public/media/` but in your code you'll reference them as `/media/`

2. Upload to Cloudflare:
   ```bash
   npm run upload-images or node scripts/upload-images.js
   ```

3. Use in your components following the STRICT RULES above

## Getting Your Account Hash

1. Go to Cloudflare Dashboard → Images
2. Upload any test image
3. Copy the hash from the image URL:
   ```
   https://imagedelivery.net/[THIS-IS-YOUR-HASH]/image-id/public
   ```

## File Structure

```
project/
├── public/
│   └── media/                  # All images physically stored here
├── components/
│   └── CloudflareImage.js      # Smart component
├── scripts/
│   ├── upload-images.js        # Upload automation
│   └── .cloudflare-images.json # Tracks uploaded images (auto-generated)
└── .env                        # API credentials (not in Git)
```

**Path Reference:**
- Physical location: `/public/media/your-image.png`
- URL in code: `/media/your-image.png`
- CloudflareImage src: `your-image` (no path, no extension)

## Common Mistakes to Avoid

1. **Using direct paths in production**: `/media/image.png` will NOT work on production without environment detection
2. **Including file extensions in CloudflareImage src**: Use `src="logo"` not `src="logo.png"`
3. **Forgetting environment detection for Three.js/Canvas**: Always use the helper function
4. **Using spaces or underscores in filenames**: Use hyphens instead
5. **Using uppercase letters in image names**: ALL image names must be lowercase
6. **Confusing folder paths**: Files go in `/public/media/` but are accessed via `/media/`
7. **Not testing image names before production**: Image names that work locally may fail on Cloudflare if they contain uppercase or underscores
8. **CRITICAL: CloudflareImage assumes .png extension**: The component is hardcoded to look for .png files in development

## Real-World Issues We've Encountered

1. **Three.js texture loading**: Must use getImageUrl() helper, not CloudflareImage component
2. **Portfolio grids**: When using CloudflareImage in grids, ensure proper responsive sizing
3. **Image cutoff**: Use `object-contain` instead of `object-cover` for logos to prevent cropping
4. **Broken production images**: Usually caused by uppercase letters or underscores in filenames
5. **Mixed file extensions**: CloudflareImage component assumes .png, but if you have .jpg/.jpeg files, you must use direct img tags with environment detection
6. **File name case sensitivity**: 'logo_800-200' vs 'logo-800-200', 'Bb_logo' vs 'bb-logo' - the actual filename must match exactly

## CRITICAL LIMITATION: CloudflareImage Component Only Supports PNG

The current CloudflareImage component has a hardcoded `.png` extension for development mode. If you have images with other extensions (.jpg, .jpeg, .gif, etc.), you have two options:

### Option 1: Use Direct Image Tags with Environment Detection
```jsx
const isDevelopment = process.env.NODE_ENV === 'development';
const cloudflareAccountHash = 'afekpjgU7bwy8XYMt0lA2Q';

{isDevelopment ? (
  <img src={`/media/${imageName}.jpg`} alt="..." />
) : (
  <img src={`https://imagedelivery.net/${cloudflareAccountHash}/${imageName}/public`} alt="..." />
)}
```

### Option 2: Modify CloudflareImage Component (Recommended)
Update the component to accept an optional extension prop or auto-detect the extension.

## Debugging Checklist for Non-Displaying Images

1. ✓ Check the actual filename in `/public/media/` - is it exactly what you're referencing?
2. ✓ Check the file extension - is it .png, .jpg, .jpeg, .PNG, .JPG?
3. ✓ Check for underscores vs hyphens in the filename
4. ✓ Check for uppercase vs lowercase letters
5. ✓ If using CloudflareImage with non-PNG files, switch to direct img tags
6. ✓ Verify the image is uploaded to Cloudflare for production

## Best Practices

- Use descriptive filenames with hyphens: `hero-banner-home.png`
- Optimize images before placing in `/media`
- Always provide `width` and `height` props to prevent layout shifts
- Don't commit images to Git - they're automatically managed
- Test image display in production build: `npm run build && npm start`

## Quick Reference

| Use Case | Method | Example |
|----------|---------|---------|
| Regular images | CloudflareImage component | `<CloudflareImage src="logo" width={200} height={100} />` |
| Three.js textures | getImageUrl helper | `textureLoader.load(getImageUrl('texture-name'))` |
| CSS backgrounds | getImageUrl helper | `backgroundImage: \`url(\${getImageUrl('bg-pattern')})\`` |
| Canvas/WebGL | getImageUrl helper | `image.src = getImageUrl('sprite-sheet')` |