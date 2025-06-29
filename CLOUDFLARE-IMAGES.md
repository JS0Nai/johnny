# Cloudflare Images Integration

This project now includes Cloudflare Images integration for optimized image delivery and management.

## How It Works

- **Development**: Images load from local `/media` folder for better developer experience
- **Production**: Images are served from Cloudflare's global CDN for optimal performance
- **Automatic Upload**: Images are automatically uploaded to Cloudflare during builds

## Setup

### 1. Environment Variables

Create a `.env` file in the project root:

```
CLOUDFLARE_API_TOKEN=your_token_here
CLOUDFLARE_ACCOUNT_ID=97af56fe1b421ea97a8f401fab7e5cc2
```

### 2. Install Dependencies

```bash
npm install
```

## Usage

### Adding New Images

1. Place image files in the `/media` directory:
   ```bash
   cp my-new-image.png media/
   ```

2. Use the CloudflareImage component in your React components:
   ```jsx
   import CloudflareImage from '../components/CloudflareImage';

   // Use filename without extension as src
   <CloudflareImage
     src="my-new-image"
     alt="Description"
     width={800}
     height={600}
     className="rounded-lg"
   />
   ```

### Manual Upload

```bash
# Upload all images in media folder
npm run upload-images
```

## How It Works

- Images in `/media` are excluded from Git (keeps repo lightweight)
- During development: Component uses local files from `/media`
- During production build: Images are uploaded to Cloudflare and URLs are embedded
- The build process automatically runs the upload script via prebuild hook

## File Structure

```
johnny/
├── components/
│   └── CloudflareImage.js      # Main component
├── scripts/
│   └── upload-images.js        # Upload automation
├── media/                      # Place new images here
│   └── .gitkeep               # Preserves directory in Git
└── .env                       # API credentials (not in Git)
```

## Best Practices

- Use descriptive filenames with hyphens: `hero-banner-home.png`
- Optimize images before placing in `/media`
- Always provide `width` and `height` props to prevent layout shifts
- Don't commit images to Git - they're automatically managed