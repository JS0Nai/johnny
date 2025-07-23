# CreativeO Portfolio Site

A modern, AI-powered portfolio website showcasing creative technology work, built with Next.js and featuring dynamic galleries, animations, and cloud integrations.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.17.0 or higher
- **npm** (comes with Node.js)
- **Git** for version control

### One-Command Setup

```bash
# Clone, install, and run in development mode
git clone <repository-url> creativeo-site
cd creativeo-site
npm install
npm run dev
```

Your site will be available at `http://localhost:2323`

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages:
- **Next.js 13.5.6** - React framework
- **React 18.2.0** - UI library
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **React Icons** - Icon library
- **@sendgrid/mail** - Email service
- **node-fetch** - HTTP requests

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Required for email functionality
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Required for Cloudflare Images (optional for development)
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id

# Automatically set by Next.js
NODE_ENV=development
```

## 🔧 Configuration

### Email Setup (SendGrid)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key with full access
3. Add the API key to your `.env.local` file
4. Update the email addresses in:
   - `pages/api/contact.js:15-16`
   - `pages/api/newsletter.js:15`

### Image Optimization (Cloudflare Images) - Optional

1. Sign up at [Cloudflare](https://cloudflare.com/)
2. Enable Cloudflare Images in your dashboard
3. Get your Account ID and API token
4. Add them to your `.env.local` file

**Note:** The site works without Cloudflare Images - it will fallback to local images during development.

## 🛠 Development

### Available Scripts

```bash
# Start development server (port 2323)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Upload images to Cloudflare (runs automatically on build)
npm run upload-images
```

### Development Workflow

1. **Start development**: `npm run dev`
2. **Make changes** to pages, components, or styles
3. **Test locally** at `http://localhost:2323`
4. **Build and deploy** when ready

### Project Structure

```
creativeo-site/
├── components/          # Reusable React components
│   ├── Header.js       # Navigation header
│   ├── Footer.js       # Site footer
│   ├── HeroV8.js       # Landing hero section
│   └── CloudflareImage.js # Optimized image component
├── pages/              # Next.js pages (file-based routing)
│   ├── index.js        # Homepage
│   ├── about.js        # About page
│   ├── portfolio.js    # Portfolio gallery
│   ├── contact.js      # Contact form
│   └── api/            # API endpoints
├── public/             # Static assets
│   └── media/          # Image gallery
├── styles/             # Global CSS
├── hooks/              # Custom React hooks
└── scripts/            # Build scripts
```

## 🎨 Customization

### Adding New Images

1. Add images to `public/media/`
2. Reference them in your components:
   ```jsx
   <CloudflareImage src="your-image-name" alt="Description" />
   ```
3. They'll be automatically uploaded to Cloudflare on build

### Updating Content

- **Homepage**: Edit `pages/index.js`
- **About page**: Edit `pages/about.js`  
- **Navigation**: Update `menuItems` in page components
- **Styling**: Modify `styles/globals.css` or component styles

### Adding New Pages

1. Create a new file in `pages/` (e.g., `pages/services.js`)
2. Export a React component
3. Add navigation links where needed

## 🚀 Deployment

### Static Export (Recommended)

The site is configured for static export, perfect for CDNs:

```bash
npm run build
# Output will be in 'out/' directory
```

Deploy the `out/` folder to:
- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag and drop the `out/` folder
- **Cloudflare Pages**: Connect your repository
- **GitHub Pages**: Upload the `out/` folder

### Vercel (Zero Config)

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

## 🐛 Troubleshooting

### Common Issues

**Module not found errors:**
```bash
npm install  # Reinstall dependencies
```

**Images not loading:**
- Check that images exist in `public/media/`
- Verify Cloudflare configuration
- Images fallback to local in development

**Email not working:**
- Verify SendGrid API key in `.env.local`
- Check email addresses in API files
- Ensure SendGrid account is verified

**Build fails:**
```bash
npm run build --verbose  # See detailed error output
```

### Getting Help

1. Check the browser console for errors
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check file paths and imports

## 📄 License

Private project - All rights reserved.

## 🤝 Contributing

This is a personal portfolio project. For questions or suggestions, use the contact form on the website.

---

**Quick Reference:**
- Development: `npm run dev` → `localhost:2323`
- Build: `npm run build`
- Dependencies: All handled by `npm install`
- Environment: Copy `.env.local` template above