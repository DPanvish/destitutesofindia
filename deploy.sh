#!/bin/bash

# Destitutes of India - Netlify Deployment Script

echo "🚀 Starting deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if build directory exists
if [ ! -d "build" ]; then
    echo "❌ Build directory not found"
    exit 1
fi

echo "📁 Build directory created successfully"

# Optional: Test the build locally
read -p "🤔 Would you like to test the build locally? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌐 Starting local server..."
    npx serve -s build -l 3000
fi

echo "🎉 Deployment preparation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Netlify"
echo "3. Set environment variables in Netlify dashboard"
echo "4. Deploy!"
echo ""
echo "🔗 Netlify deployment methods:"
echo "- UI: Go to netlify.com and connect your GitHub repo"
echo "- CLI: Run 'netlify deploy --prod --dir=build'"
echo "- Drag & Drop: Drag the 'build' folder to netlify.com"
