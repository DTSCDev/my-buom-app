# GitHub Repository Setup Guide

## Overview
This guide will help you push your local Free Retirement Savings Calculator project to a remote GitHub repository.

## Prerequisites
- Git installed on your system
- GitHub account
- Node.js installed (see SETUP_GUIDE.md)

## Step 1: Install Git (if not already installed)

1. **Download Git for Windows:**
   - Go to https://git-scm.com/download/win
   - Download and install Git for Windows
   - During installation, choose "Git from the command line and also from 3rd-party software"

2. **Verify Git Installation:**
   ```powershell
   git --version
   ```

## Step 2: Configure Git (First Time Setup)

```powershell
# Set your Git username and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Create GitHub Repository

1. **Go to GitHub:**
   - Visit https://github.com
   - Sign in to your account

2. **Create New Repository:**
   - Click the "+" icon in the top right
   - Select "New repository"
   - Repository name: `free-retirement-calculator` (or your preferred name)
   - Description: "Free Retirement Savings Calculator - React TypeScript app for pension planning"
   - Choose "Public" or "Private"
   - **DO NOT** initialize with README, .gitignore, or license (we already have these files)
   - Click "Create repository"

## Step 4: Initialize Local Git Repository and Push to GitHub

```powershell
# Navigate to your project directory
cd C:\Users\b2b\my-buom-app

# Initialize Git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Free Retirement Calculator setup"

# Add remote GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## Step 5: Create .gitignore File

Create a `.gitignore` file to exclude unnecessary files:

```gitignore
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
dist/
build/

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# nyc test coverage
.nyc_output

# ESLint cache
.eslintcache

# Temporary folders
tmp/
temp/
```

## Step 6: Update README with GitHub Information

After pushing to GitHub, update your README.md with the correct clone URL:

```markdown
### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME
\`\`\`
```

## Alternative: Clone from GitHub to Different Location

If you want to work with the repository from GitHub in a different location:

```powershell
# Clone the repository to a new location
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME

# Install dependencies
npm install

# Start development server
npm run dev
```

## Working with the Remote Repository

### Common Git Commands:

```powershell
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your commit message"

# Push changes to GitHub
git push

# Pull latest changes from GitHub
git pull

# Create and switch to new branch
git checkout -b feature-branch-name

# Switch back to main branch
git checkout main
```

## Repository Structure on GitHub

Your GitHub repository will contain:
```
├── .gitignore
├── README.md
├── SETUP_GUIDE.md
├── GITHUB_SETUP.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── index.html
├── .env.example
└── src/
    ├── components/
    ├── pages/
    ├── hooks/
    ├── utils/
    ├── types/
    └── integrations/
```

## Next Steps

1. **Follow this guide to push to GitHub**
2. **Share the repository URL** with others
3. **Set up GitHub Pages** (optional) for live demo
4. **Configure GitHub Actions** (optional) for CI/CD

## Troubleshooting

### Authentication Issues:
- Use GitHub Personal Access Token instead of password
- Or set up SSH keys for easier authentication

### Push Rejected:
```powershell
# If someone else made changes, pull first
git pull origin main
# Then push
git push origin main
```
