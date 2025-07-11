# Cloudflare Images Integration

Complete setup guide for integrating Cloudflare Images in Next.js projects.

## Overview

- **Development**: Images load from local `/public/media` folder
- **Production**: Images are served from Cloudflare's global CDN
- **Smart Component**: Automatically switches between local and CDN based on environment

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

### Adding New Images

1. Place images in `/public/media/`:
   ```bash
   cp my-image.png public/media/
   ```

2. Upload to Cloudflare:
   ```bash
   npm run upload-images or node scripts/upload-images.js
   ```

3. Use in your components:
   ```jsx
   import CloudflareImage from '../components/CloudflareImage';

   <CloudflareImage
     src="my-image"  // No extension needed
     alt="Description"
     width={800}
     height={600}
   />
   ```

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
│   └── media/                  # All images here
├── components/
│   └── CloudflareImage.js      # Smart component
├── scripts/
│   ├── upload-images.js        # Upload automation
│   └── .cloudflare-images.json # Tracks uploaded images (auto-generated)
└── .env                        # API credentials (not in Git)
```

## Best Practices

- Use descriptive filenames with hyphens: `hero-banner-home.png`
- Optimize images before placing in `/media`
- Always provide `width` and `height` props to prevent layout shifts
- Don't commit images to Git - they're automatically managed