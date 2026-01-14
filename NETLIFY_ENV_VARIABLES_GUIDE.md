# Step-by-Step: Adding Environment Variables in Netlify

## Step-by-Step Instructions

### Step 1: Log in to Netlify
1. Open your web browser
2. Go to: **https://app.netlify.com**
3. Log in with your Netlify account credentials

### Step 2: Select Your Site
1. In your Netlify dashboard, you'll see a list of all your sites
2. **Click on your site name** (should be something like "securefinancialsolutions" or your domain name)
3. This will take you to your site's overview page

### Step 3: Access Site Settings
1. At the top of the page, you'll see a menu bar with tabs like:
   - **Deploys**
   - **Functions**
   - **Plugins**
   - **Domain settings**
   - **Site settings** ← **Click this one**
2. **Click on "Site settings"** in the top navigation

### Step 4: Navigate to Environment Variables
1. In the left sidebar menu, you'll see several options:
   - General
   - Domain management
   - Build & deploy
   - Environment variables ← **Click this one**
   - Functions
   - etc.
2. **Click on "Environment variables"** in the left sidebar

### Step 5: Add Environment Variables
You'll see a section with two areas:
- **Build environment variables** (for build time)
- **Runtime environment variables** (for when your site is running)

You need to add variables to **both sections** (same values for both).

#### Adding to Build Environment Variables:
1. Click on the **"Add a variable"** button in the "Build environment variables" section
2. You'll see two fields: **Key** and **Value**

Add each variable one by one:

**Variable 1:**
- **Key**: `EMAIL_HOST`
- **Value**: `smtpout.secureserver.net`
- Click **"Add variable"**

**Variable 2:**
- **Key**: `EMAIL_PORT`
- **Value**: `587`
- Click **"Add variable"**

**Variable 3:**
- **Key**: `EMAIL_SECURE`
- **Value**: `false`
- Click **"Add variable"`

**Variable 4:**
- **Key**: `EMAIL_USER`
- **Value**: `admin@securefinancial.co.za`
- Click **"Add variable"**

**Variable 5:**
- **Key**: `EMAIL_PASS`
- **Value**: `Securefinancial2026$`
- Click **"Add variable"**

**Variable 6:**
- **Key**: `EMAIL_FROM`
- **Value**: `Secure Financial Solutions <admin@securefinancial.co.za>`
- Click **"Add variable"`

**Variable 7:**
- **Key**: `EMAIL_TO`
- **Value**: `admin@securefinancial.co.za`
- Click **"Add variable"**

#### Adding to Runtime Environment Variables:
1. Scroll down to the **"Runtime environment variables"** section
2. Repeat the same process:
   - Click **"Add a variable"**
   - Add all 7 variables with the same keys and values as above

### Step 6: Verify Variables Are Added
After adding all variables, you should see a list showing:
- **EMAIL_HOST** = smtpout.secureserver.net
- **EMAIL_PORT** = 587
- **EMAIL_SECURE** = false
- **EMAIL_USER** = admin@securefinancial.co.za
- **EMAIL_PASS** = (hidden/shown as dots)
- **EMAIL_FROM** = Secure Financial Solutions <admin@securefinancial.co.za>
- **EMAIL_TO** = admin@securefinancial.co.za

### Step 7: Save and Deploy
1. The variables are saved automatically when you add them
2. **Important**: You need to **redeploy your site** for the variables to take effect
3. Go to the **"Deploys"** tab (top menu)
4. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
5. Wait for the deployment to complete

## Quick Copy-Paste Reference

Here are all the variables you need to add:

```
EMAIL_HOST = smtpout.secureserver.net
EMAIL_PORT = 587
EMAIL_SECURE = false
EMAIL_USER = admin@securefinancial.co.za
EMAIL_PASS = Securefinancial2026$
EMAIL_FROM = Secure Financial Solutions <admin@securefinancial.co.za>
EMAIL_TO = admin@securefinancial.co.za
```

## Important Notes

⚠️ **Important**: 
- Add variables to **BOTH** "Build environment variables" AND "Runtime environment variables"
- The `EMAIL_PASS` value will be hidden (shown as dots) for security - this is normal
- After adding variables, you **must redeploy** your site for them to work
- Variable names are **case-sensitive** - make sure they match exactly

## Troubleshooting

### Can't find "Environment variables" option?
- Make sure you're in **"Site settings"** (not general account settings)
- Look in the left sidebar menu
- If you still can't find it, try scrolling down in the Site settings page

### Variables not working after deployment?
1. Make sure you added them to **both** Build AND Runtime sections
2. Verify the variable names are exactly correct (case-sensitive)
3. Try clearing cache and redeploying
4. Check the Functions tab → View logs to see any errors

### Need to edit or delete a variable?
- Click the **pencil icon** (✏️) next to a variable to edit it
- Click the **trash icon** (🗑️) next to a variable to delete it
- Don't forget to redeploy after making changes
