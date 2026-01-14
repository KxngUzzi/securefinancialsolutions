# Netlify Deployment & Email Configuration

## Overview
Your website is hosted on Netlify and email is hosted by GoDaddy. This guide will help you configure the contact form to work with this setup.

## Setup Instructions

### Step 1: Install Netlify CLI (Optional)
If you want to test locally:
```bash
npm install -g netlify-cli
```

### Step 2: Configure Environment Variables in Netlify

**📖 For detailed step-by-step instructions, see: `NETLIFY_ENV_VARIABLES_GUIDE.md`**

Quick steps:
1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site
3. Go to **Site settings** → **Environment variables** (in left sidebar)
4. Add variables to **BOTH** "Build environment variables" AND "Runtime environment variables"

**Variables to add:**

| Key | Value |
|-----|-------|
| `EMAIL_HOST` | `smtpout.secureserver.net` |
| `EMAIL_PORT` | `587` |
| `EMAIL_SECURE` | `false` |
| `EMAIL_USER` | `admin@Securefinancial.co.za` |
| `EMAIL_PASS` | `Securefinancial2026$` |
| `EMAIL_FROM` | `Secure Financial Solutions <admin@Securefinancial.co.za>` |
| `EMAIL_TO` | `admin@Securefinancial.co.za` |

**⚠️ Important:**
- Add each variable one by one using "Add a variable" button
- Add to **both** Build AND Runtime sections
- After adding, **redeploy your site** for variables to take effect

### Step 3: Deploy to Netlify

#### Option A: Deploy via Netlify Dashboard
1. Go to your Netlify dashboard
2. Drag and drop your project folder, OR
3. Connect your GitHub repository (recommended)

#### Option B: Deploy via Git
If your code is on GitHub:
1. In Netlify dashboard, click "Add new site" → "Import an existing project"
2. Connect your GitHub repository
3. Build settings:
   - **Build command**: (leave empty - no build needed)
   - **Publish directory**: `.` (root directory)
4. Click "Deploy site"

### Step 4: Verify Function Deployment
After deployment:
1. Go to **Functions** tab in Netlify dashboard
2. You should see `send-email` function listed
3. Test the contact form on your live site

## Testing

### Test Locally (Optional)
```bash
# Install Netlify CLI if not already installed
npm install -g netlify-cli

# Start local development server
netlify dev
```

Then visit: http://localhost:8888

### Test on Live Site
1. Visit your Netlify site URL
2. Go to the contact page
3. Fill out and submit the form
4. Check your email (admin@Securefinancial.co.za) for notifications

## Troubleshooting

### Email Not Sending?
1. **Check Environment Variables**: Ensure all variables are set correctly in Netlify
2. **Check Function Logs**: Go to Netlify dashboard → Functions → View logs
3. **Verify GoDaddy SMTP Settings**: 
   - Try port 465 with EMAIL_SECURE=true if 587 doesn't work
   - Verify your email password is correct

### Function Not Found?
1. Ensure `netlify/functions/send-email.js` exists
2. Check that `netlify.toml` is in the root directory
3. Redeploy your site

### CORS Errors?
Netlify Functions handle CORS automatically, so this shouldn't be an issue.

## Alternative: Keep Backend Separate

If you prefer to keep the Node.js backend separate, you can:
1. Deploy backend to Railway, Render, or Heroku
2. Update the API URL in `script.js` to point to your backend URL
3. Configure CORS on your backend to allow requests from your Netlify domain

## Files Structure

```
├── netlify/
│   └── functions/
│       └── send-email.js    # Netlify serverless function
├── netlify.toml             # Netlify configuration
├── contact.html             # Contact form page
├── script.js                # Frontend JavaScript (updated for Netlify)
└── package.json             # Dependencies
```

## Support

For issues:
1. Check Netlify function logs in the dashboard
2. Verify environment variables are set correctly
3. Test email settings with a simple SMTP test tool
