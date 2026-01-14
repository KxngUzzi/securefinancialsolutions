# Contact Form Troubleshooting Guide

## Quick Checklist

- [ ] Netlify function is deployed (`send-email` function exists)
- [ ] Environment variables are set in Netlify
- [ ] Site has been redeployed after adding environment variables
- [ ] Browser console shows no errors
- [ ] Netlify function logs show activity

## Common Issues & Solutions

### Issue 1: "Function not found" or 404 Error

**Symptoms:**
- Form shows error message
- Browser console shows 404 error
- Network tab shows request to `/.netlify/functions/send-email` failed

**Solutions:**
1. **Check function exists:**
   - Go to Netlify dashboard → Your site → Functions tab
   - You should see `send-email` listed
   - If not, the function wasn't deployed

2. **Redeploy your site:**
   - Go to Deploys tab
   - Click "Trigger deploy" → "Clear cache and deploy site"
   - Wait for deployment to complete

3. **Verify file structure:**
   - Ensure `netlify/functions/send-email.js` exists
   - Ensure `netlify.toml` is in root directory

### Issue 2: "Email error" or 500 Error

**Symptoms:**
- Form shows generic error message
- Netlify function logs show email sending errors

**Solutions:**
1. **Check environment variables:**
   - Go to Site settings → Environment variables
   - Verify all 7 variables are set:
     - EMAIL_HOST
     - EMAIL_PORT
     - EMAIL_SECURE
     - EMAIL_USER
     - EMAIL_PASS
     - EMAIL_FROM
     - EMAIL_TO
   - Make sure they're in BOTH Build AND Runtime sections

2. **Check email credentials:**
   - Verify EMAIL_PASS is correct
   - Verify EMAIL_USER matches your GoDaddy email

3. **Check GoDaddy SMTP settings:**
   - Try port 465 with EMAIL_SECURE=true if 587 doesn't work
   - Verify SMTP server is `smtpout.secureserver.net`

4. **Check function logs:**
   - Go to Functions tab → Click on `send-email`
   - Click "View logs" to see detailed error messages

### Issue 3: Form Submits But No Email Received

**Symptoms:**
- Form shows success message
- But no email arrives

**Solutions:**
1. **Check spam folder:**
   - Check spam/junk folder in your email
   - Check email filters

2. **Check function logs:**
   - Go to Netlify Functions → send-email → View logs
   - Look for email sending errors

3. **Verify email address:**
   - Check EMAIL_TO is correct
   - Check EMAIL_USER is correct

4. **Test email settings:**
   - Try sending a test email from GoDaddy email settings
   - Verify SMTP is working

### Issue 4: CORS Errors

**Symptoms:**
- Browser console shows CORS error
- "Access-Control-Allow-Origin" error

**Solutions:**
- The function now includes CORS headers
- If still seeing errors, clear browser cache
- Try in incognito/private browsing mode

### Issue 5: "All fields are required" Error

**Symptoms:**
- Form shows validation error even when filled

**Solutions:**
1. **Check form field names:**
   - Ensure form fields have correct `name` attributes:
     - `name="name"`
     - `name="email"`
     - `name="phone"`
     - `name="service"`
     - `name="message"`

2. **Check JavaScript:**
   - Open browser console (F12)
   - Look for JavaScript errors
   - Verify form data is being collected correctly

## Testing Steps

### Step 1: Test Locally (if possible)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run locally
netlify dev
```

Visit: http://localhost:8888/contact.html

### Step 2: Check Browser Console
1. Open your live site
2. Press F12 to open developer tools
3. Go to Console tab
4. Submit the form
5. Look for any error messages

### Step 3: Check Network Tab
1. Open developer tools (F12)
2. Go to Network tab
3. Submit the form
4. Look for request to `/.netlify/functions/send-email`
5. Click on it to see:
   - Request payload (form data)
   - Response status
   - Response body (error messages)

### Step 4: Check Netlify Function Logs
1. Go to Netlify dashboard
2. Your site → Functions tab
3. Click on `send-email` function
4. Click "View logs"
5. Look for:
   - Function invocations
   - Error messages
   - Email sending status

## Debug Mode

To see more detailed errors, temporarily add this to the function:

```javascript
return {
  statusCode: 500,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    success: false,
    error: error.message,
    stack: error.stack, // Only in development
  }),
};
```

## Verification Checklist

After fixing issues, verify:

1. ✅ Form submits without errors
2. ✅ Success message appears
3. ✅ Email received at admin@Securefinancial.co.za
4. ✅ Auto-reply sent to customer
5. ✅ No errors in browser console
6. ✅ No errors in Netlify function logs

## Getting Help

If issues persist:

1. **Check Netlify Status:**
   - https://www.netlifystatus.com/
   - Ensure Netlify services are operational

2. **Check Function Logs:**
   - Most errors will show in Netlify function logs
   - Copy error messages for troubleshooting

3. **Test Email Separately:**
   - Try sending email from GoDaddy email client
   - Verify SMTP credentials work

4. **Contact Support:**
   - Netlify support: https://www.netlify.com/support/
   - GoDaddy support: For email/SMTP issues
