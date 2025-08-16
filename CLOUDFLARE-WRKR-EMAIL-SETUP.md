# Cloudflare Worker Contact Form Setup

## One-Time Setup (via Cloudflare Dashboard)

1. **Go to Cloudflare Workers**
   - Visit: https://dash.cloudflare.com
   - Click "Workers & Pages" in the sidebar

2. **Create a Worker**
   - Click "Create" 
   - Choose "Start from scratch" or "Hello World" template
   - Name it: `contact-form` (or any name you prefer)
   - Click "Deploy"

3. **Add Your Code**
   - Click "Edit code"
   - Delete all existing code
   - Copy and paste the entire contents of `cloudflare-contact-worker.js`
   - Click "Save and Deploy"

4. **Add SendGrid API Key**
   - Go to your Worker's page
   - Click "Settings" tab
   - Click "Variables"
   - Click "Add variable"
   - Add:
     - Variable name: `SENDGRID_API_KEY`
     - Value: Your SendGrid API key
     - Click "Encrypt" (important!)
   - Click "Save and deploy"

5. **Get Your Worker URL**
   - It will be something like: `https://contact-form.your-subdomain.workers.dev`

## For Each Site Using This Worker

### 1. Update Your Site's Environment Variables

Add to your `.env` or `.env.local`:
```
NEXT_PUBLIC_CONTACT_API_URL=https://contact-form.your-subdomain.workers.dev
```

### 2. Update Your Contact Form Code

```javascript
const handleContactSubmit = async (e) => {
  e.preventDefault();
  
  const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      projectType: formData.projectType, // optional
      site: "johnny.ae" // Important: identify your site
    }),
  });
  
  const result = await response.json();
  // Handle success/error
};
```

## Adding New Sites to the Worker

1. Go to your Worker's "Edit code" page
2. Find the `SITE_CONFIGS` object
3. Add your new site:

```javascript
const SITE_CONFIGS = {
  'johnny.ae': {
    toEmail: 'johnny@johnny.ae',
    fromEmail: 'johnny@johnny.ae',
    fromName: 'Johnny Website'
  },
  'yournewsite.com': {  // Add this
    toEmail: 'contact@yournewsite.com',
    fromEmail: 'noreply@yournewsite.com',
    fromName: 'Your New Site'
  },
```

4. Add the domain to `ALLOWED_ORIGINS`:

```javascript
const ALLOWED_ORIGINS = [
  'http://localhost:2323',
  'https://johnny.ae',
  'https://yournewsite.com',  // Add this
```

5. Click "Save and Deploy"

## Important Notes

- **One Worker handles all your sites** - no need to create multiple workers
- **SendGrid sender verification**: Make sure the `fromEmail` addresses are verified in SendGrid
- **Free tier**: Cloudflare Workers free tier includes 100,000 requests/day
- **Logs**: View logs in the Cloudflare dashboard under "Logs" tab

## Testing Locally

The worker accepts requests from `localhost` by default, so you can test locally without deployment.