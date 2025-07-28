#!/bin/bash

# Free RS Calculator Setup Script

echo "🚀 Setting up Free Retirement Savings Calculator..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your Supabase credentials"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Supabase URL and API key"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:5173 to see your app"
echo ""
echo "📚 Features available:"
echo "   • Free Calculator - /calculator (no login required)"
echo "   • User Authentication - /auth"
echo "   • Dashboard - /dashboard (requires login)"
echo "   • Profile Management - /profile (requires login)"
echo "   • Asset Tracking - /net-asset-value (requires login)"
echo ""
echo "Happy coding! 🎯"
