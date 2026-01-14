# DNS Configuration Guide for Netlify + GoDaddy Email

## Understanding DNS Records

### ✅ Records You NEED:

#### 1. **A Records** (for root domain - securefinancial.co.za)
Point your root domain to Netlify's IP addresses.

#### 2. **CNAME Record** (for www subdomain)
Point www.securefinancial.co.za to your Netlify site.

#### 3. **MX Records** (for email)
Point email to GoDaddy's mail servers.

### ❌ Records You DON'T Need:

- **SRV Records**: Not needed for basic website hosting or email
- Red crosses for SRV records are **completely normal** - you can ignore them

## DNS Configuration in GoDaddy

### Step 1: Get Netlify DNS Information

1. Log in to Netlify: https://app.netlify.com
2. Select your site
3. Go to **Domain settings** (or **Site settings** → **Domain management**)
4. Click on your custom domain (securefinancial.co.za)
5. Look for **DNS configuration** or **DNS settings**
6. Netlify will show you the DNS records you need

**Typical Netlify DNS records:**
- **A Record**: Points to Netlify's IP (usually 75.2.60.5)
- **CNAME Record**: Points to your Netlify subdomain (e.g., your-site.netlify.app)

### Step 2: Configure DNS in GoDaddy

1. Log in to GoDaddy: https://www.godaddy.com
2. Go to **My Products**
3. Find your domain: **securefinancial.co.za**
4. Click on **DNS** (or **Manage DNS**)

### Step 3: Add/Update DNS Records

#### A Record (Root Domain):
1. Find or add an **A Record**
2. **Name/Host**: `@` (or leave blank, or `securefinancial.co.za`)
3. **Value/Points to**: Netlify's IP address (from Step 1, typically `75.2.60.5`)
4. **TTL**: 600 (or default)
5. Click **Save**

#### CNAME Record (WWW):
1. Find or add a **CNAME Record**
2. **Name/Host**: `www`
3. **Value/Points to**: Your Netlify site URL (e.g., `your-site.netlify.app`)
   - OR use Netlify's recommended CNAME value
4. **TTL**: 600 (or default)
5. Click **Save**

#### MX Records (Email - GoDaddy):
1. Find your **MX Records** section
2. You should see records for GoDaddy email hosting, for example:
   - **Name/Host**: `@`
   - **Value/Points to**: `smtp.secureserver.net` (or similar)
   - **Priority**: 0 (or 10)
3. **Keep these MX records as they are** - they're needed for email
4. If you don't see MX records, add:
   - **MX Record 1**:
     - Name: `@`
     - Value: `smtp.secureserver.net`
     - Priority: `0`
   - **MX Record 2**:
     - Name: `@`
     - Value: `mailstore1.secureserver.net`
     - Priority: `10`

### Step 4: Remove Unnecessary Records

- **Delete any old A records** pointing to other servers (if migrating)
- **Keep MX records** for GoDaddy email
- **SRV records**: If you have any, you can delete them (not needed)

## Typical DNS Setup Summary

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| A | @ | 75.2.60.5 | Points root domain to Netlify |
| CNAME | www | your-site.netlify.app | Points www to Netlify |
| MX | @ | smtp.secureserver.net (Priority: 0) | Email server |
| MX | @ | mailstore1.secureserver.net (Priority: 10) | Email backup |

## About SRV Records

❌ **SRV Records are NOT needed for:**
- Basic website hosting
- Email (GoDaddy email uses MX records, not SRV)
- Standard Netlify deployment

✅ **It's NORMAL to see red crosses on SRV records** - they're not required for your setup.

SRV records are only needed for:
- Advanced services (like SIP, XMPP)
- Service discovery
- Specific application requirements

**You can safely ignore SRV record errors** if you're just hosting a website and using email.

## DNS Propagation

After making DNS changes:
1. **Wait 24-48 hours** for DNS to propagate globally
2. Changes usually take effect within a few hours, but can take up to 48 hours
3. You can check DNS propagation at: https://www.whatsmydns.net
4. Enter your domain: `securefinancial.co.za`
5. Check A and CNAME records

## Verifying DNS Configuration

### Check A Record:
```bash
nslookup securefinancial.co.za
```
Should show Netlify's IP address.

### Check CNAME Record:
```bash
nslookup www.securefinancial.co.za
```
Should show your Netlify site URL.

### Check MX Records:
```bash
nslookup -type=mx securefinancial.co.za
```
Should show GoDaddy mail servers.

## Troubleshooting

### DNS Checker Shows Errors:
- ✅ **SRV errors**: Ignore them - not needed
- ❌ **A record errors**: Check that it points to Netlify's IP
- ❌ **CNAME errors**: Check that www points to Netlify
- ❌ **MX errors**: Verify GoDaddy email MX records exist

### Website Not Loading:
1. Verify A and CNAME records are correct
2. Wait for DNS propagation (can take 24-48 hours)
3. Check Netlify dashboard - ensure domain is verified
4. Clear browser cache

### Email Not Working:
1. Verify MX records are present and correct
2. Check email credentials in Netlify environment variables
3. Test email sending from Netlify function logs

## Getting Help

### From Netlify:
- Go to Netlify dashboard → Domain settings
- Netlify shows exact DNS records you need

### From GoDaddy:
- GoDaddy DNS management page
- Support can help verify MX records for email

## Quick Checklist

- [ ] A record pointing to Netlify IP
- [ ] CNAME record for www pointing to Netlify
- [ ] MX records for GoDaddy email (should already exist)
- [ ] Verified domain in Netlify dashboard
- [ ] Waited for DNS propagation (24-48 hours)
- [ ] Ignored SRV record errors (not needed)
