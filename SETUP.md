# 🚀 (CreativeO) Johnny.ae - Quick Setup Guide

## About The Site

This is CreativeO (johnny.ae) - a professional portfolio and AI showcase website for Johnny, a creative technologist
  specializing in AI, web development, and digital art.

  Site Overview

  Tech Stack:
  - Next.js 13.5.6 with React 18
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Cloudflare Images for image optimization
  - SendGrid for email functionality

  Key Features:
  1. AI Art Gallery - Extensive portfolio with 40+ AI-generated images, videos on hover
  2. Interactive Portfolio - Animated counters showing 10K+ assets, 15K+ AI images, 2M+ words written
  3. Professional Services - Applications, research, branding, articles, literature
  4. Contact System - Working contact form and newsletter signup via SendGrid
  5. Tech Stack Visualizer - Animated display of technologies used

  Navigation Structure:
  - Home (index.js) - Main landing with hero, portfolio showcase, stats
  - About (about.js) - Professional background and expertise
  - Portfolio - AI art gallery
  - Projects - Custom applications
  - Articles - Published insights
  - Resources - Tools and content
  - Contact - Contact form

  Content Highlights:
  - Creative/technical dual focus (brain imagery, AI playground)
  - Professional stats: 18K coding hours, 100 commercial licenses
  - Modern animations and scroll effects
  - Responsive design with mobile optimization
  - Static export configuration for deployment

  The site effectively showcases both technical expertise and creative AI work, positioned as a premium creative technologist
  portfolio.

## One-Command Setup

```bash
git clone <repository-url> creativeo-site && cd creativeo-site && npm install && cp .env.example .env.local && npm run dev
```

Then edit `.env.local` with your API keys and visit `http://localhost:2323`

## Step-by-Step Setup

### 1. Clone & Install
```bash
git clone <repository-url> creativeo-site
cd creativeo-site
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your SendGrid API key:
```env
SENDGRID_API_KEY=SG.your_actual_api_key_here
```

### 3. Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:2323`

## ✅ Verification Checklist

- [ ] Node.js 18.17.0+ installed
- [ ] `npm install` completed successfully
- [ ] `.env.local` file created with SendGrid API key
- [ ] Development server running on port 2323
- [ ] Site loads without errors
- [ ] Contact form works (optional - requires SendGrid)

## 🆘 Quick Fixes

**Dependencies missing?**
```bash
npm install
```

**Port 2323 in use?**
```bash
npm run dev -- -p 3000
```

**Images not loading?**
- Images work locally without Cloudflare setup
- Add Cloudflare credentials to `.env.local` for optimization

**Contact form not working?**
- Add valid SendGrid API key to `.env.local`
- Verify SendGrid account is active

## 📞 Need Help?

1. Check `README.md` for detailed documentation
2. Verify all steps above are completed
3. Check browser console for error messages
4. Ensure all files from repository are present