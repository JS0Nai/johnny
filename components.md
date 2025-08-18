# Components Documentation

## Custom Components

### RelatedArticles
Displays related articles based on matching tags or categories.

**Location:** `/components/RelatedArticles.js`

**Props:**
- `tags` (array): Tags to match against article tags
- `category` (string): Category to match
- `currentId` (number): Exclude article with this ID
- `limit` (number): Max articles to display (default: 3)

**Usage:**
```jsx
<RelatedArticles 
  tags={["Educational Technology", "Cognitive Science"]}
  category="educational-technology"
/>
```

### Header
Main navigation header with responsive menu.

**Location:** `/components/Header.js`

### Footer
Site-wide footer with contact info and links.

**Location:** `/components/Footer.js`

### CloudflareImage
Optimized image component for Cloudflare CDN.

**Location:** `/components/CloudflareImage.js`