# 🚀 Automated Deployment Setup Guide

## Method 1: cPanel Git Integration (Easiest)

### Step 1: Setup in cPanel
1. **Open cPanel** → Click **"Git™ Version Control"**
2. **Click "Create"** to add a new repository
3. **Fill in details:**
   - **Clone URL**: `https://github.com/DTSCDev/my-buom-app.git`
   - **Repository Path**: `/public_html/calculator`
   - **Repository Name**: `my-buom-app`
4. **Click "Create"**

### Step 2: Build Hook (Important!)
Since this is a React app that needs building, you'll need to set up a build process:

1. **SSH into your hosting** (if available)
2. **Navigate to the repository folder**
3. **Run these commands:**
   ```bash
   cd /home/yourusername/public_html/calculator
   npm install
   npm run build
   cp -r dist/* ./
   ```

### Step 3: Auto-Pull Updates
- In cPanel Git interface, click **"Pull or Deploy"** tab
- Click **"Update from Remote"** whenever you want the latest changes

---

## Method 2: GitHub Actions Auto-Deploy (Advanced)

### Step 1: Get Your FTP Details
From your hosting provider, you need:
- **FTP Server**: (usually your domain or an IP)
- **FTP Username**: (your cPanel username)
- **FTP Password**: (your cPanel password)

### Step 2: Add Secrets to GitHub
1. **Go to your GitHub repository**
2. **Settings** → **Secrets and variables** → **Actions**
3. **Add these secrets:**
   - `FTP_SERVER`: Your FTP server address
   - `FTP_USERNAME`: Your FTP username  
   - `FTP_PASSWORD`: Your FTP password
   - `VITE_SUPABASE_URL`: `https://yacaebicwatkntvvobsn.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhY2FlYmljd2F0a250dnZvYnNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3MTI2NjMsImV4cCI6MjA2OTI4ODY2M30.opm419ZQV_6BlJA-ArexehJM-n-Rhkpbjk-z6KIcDO8`

### Step 3: How It Works
- ✅ **Push to GitHub** → **Automatic build** → **Deploy to your website**
- ✅ **Every time you commit** → **Your website updates automatically**
- ✅ **Build process included** → **No manual building required**

---

## 🎯 Recommended Approach

**Start with Method 1 (cPanel Git)** because:
- ✅ Easier to set up
- ✅ No secrets to manage
- ✅ Direct control in cPanel
- ✅ Can manually trigger updates

**Upgrade to Method 2** later if you want fully automated deployments.

---

## 📁 Your Website Structure
After setup, your calculator will be at:
- **Main site**: `https://sids.buom.app/calculator/`
- **Files location**: `/public_html/calculator/`

## 🔄 Making Updates
1. **Edit code in VS Code**
2. **Commit and push to GitHub**
3. **Pull updates in cPanel Git** (Method 1) or **Automatic deployment** (Method 2)

Your retirement calculator will always stay up-to-date! 🎉
