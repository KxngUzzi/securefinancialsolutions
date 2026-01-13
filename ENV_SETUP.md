# Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# Email Configuration
# For Gmail, use:
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Secure Financial Solutions <info@securefinancial.co.za>"
EMAIL_TO=info@securefinancial.co.za

# For other email providers, adjust accordingly:
# EMAIL_HOST=smtp.securefinancial.co.za
# EMAIL_PORT=587
# EMAIL_SECURE=false
# EMAIL_USER=info@securefinancial.co.za
# EMAIL_PASS=your-email-password
# EMAIL_FROM="Secure Financial Solutions <info@securefinancial.co.za>"
# EMAIL_TO=info@securefinancial.co.za
```

## Gmail Setup Instructions

1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → 2-Step Verification → App passwords
3. Create an app password for "Mail"
4. Use that app password (not your regular password) in `EMAIL_PASS`

## Notes

- The `.env` file is already in `.gitignore` and won't be committed to version control
- Never share your `.env` file or commit it to a repository
- For development/testing without email, you can leave email variables empty (server will still work but won't send emails)
