# Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# Email Configuration for GoDaddy
# GoDaddy Workspace Email / Microsoft 365 Email Settings
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=admin@securefinancial.co.za
EMAIL_PASS=your-email-password
EMAIL_FROM="Secure Financial Solutions <admin@securefinancial.co.za>"
EMAIL_TO=admin@securefinancial.co.za

# Alternative GoDaddy SMTP Settings (if using GoDaddy's email hosting):
# EMAIL_HOST=smtpout.secureserver.net
# EMAIL_PORT=587
# EMAIL_SECURE=false
# EMAIL_USER=admin@securefinancial.co.za
# EMAIL_PASS=your-email-password
# EMAIL_FROM="Secure Financial Solutions <admin@securefinancial.co.za>"
# EMAIL_TO=admin@securefinancial.co.za
```

## GoDaddy Email Setup Instructions

### Option 1: GoDaddy Workspace Email / Microsoft 365 (Recommended)
If your email is hosted through GoDaddy's Microsoft 365:
1. Use `smtp.office365.com` as EMAIL_HOST
2. Port: 587
3. Use your full email address (admin@securefinancial.co.za) as EMAIL_USER
4. Use your email account password as EMAIL_PASS

### Option 2: GoDaddy Email Hosting
If using GoDaddy's basic email hosting:
1. Use `smtpout.secureserver.net` as EMAIL_HOST
2. Port: 587 (or 465 for SSL)
3. Use your full email address (admin@securefinancial.co.za) as EMAIL_USER
4. Use your email account password as EMAIL_PASS
5. If using port 465, set EMAIL_SECURE=true

### Finding Your GoDaddy Email Settings
1. Log in to your GoDaddy account
2. Go to "My Products" → "Email"
3. Click on your email account
4. Look for "Email Client Settings" or "Server Settings"
5. Note the SMTP server address and port

## Notes

- The `.env` file is already in `.gitignore` and won't be committed to version control
- Never share your `.env` file or commit it to a repository
- For development/testing without email, you can leave email variables empty (server will still work but won't send emails)
