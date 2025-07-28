# Setup Guide for Windows

## Step 1: Install Node.js

1. **Download Node.js:**
   - Go to https://nodejs.org/
   - Download the LTS version (recommended for most users)
   - Choose the "Windows Installer (.msi)" for x64

2. **Install Node.js:**
   - Run the downloaded .msi file
   - Follow the installation wizard
   - Make sure to check "Add to PATH" (should be checked by default)
   - Complete the installation

3. **Verify Installation:**
   - Open a new PowerShell window (important: must be new window after install)
   - Run these commands to verify:
   ```powershell
   node --version
   npm --version
   ```
   - You should see version numbers (e.g., v20.11.0 and 10.2.4)

## Step 2: Install Project Dependencies

After Node.js is installed, run these commands in your project directory:

```powershell
# Navigate to your project directory
cd C:\Users\b2b\my-buom-app

# Install all dependencies
npm install

# Start the development server
npm run dev
```

## Step 3: Set up Environment Variables

1. Create a `.env.local` file in the project root
2. Add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Troubleshooting

### If npm is still not recognized after installing Node.js:
1. Close ALL PowerShell/Command Prompt windows
2. Open a new PowerShell window as Administrator
3. Run: `npm --version`
4. If still not working, restart your computer

### If you get permission errors:
1. Run PowerShell as Administrator
2. Or use: `npm install --force`

### If you get network/proxy errors:
```powershell
npm config set registry https://registry.npmjs.org/
npm install
```

## Next Steps After Installation

Once Node.js and dependencies are installed:

1. **Test the application:** `npm run dev`
2. **Open in browser:** http://localhost:5173
3. **Set up Supabase:** Create account and configure environment variables
4. **Start developing:** All TypeScript errors should be resolved

## VS Code Extensions (Recommended)

Install these VS Code extensions for better development experience:
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Bracket Pair Colorizer
