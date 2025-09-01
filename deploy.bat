@echo off
REM Destitutes of India - Netlify Deployment Script (Windows)

echo 🚀 Starting deployment process...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Install dependencies
echo 📦 Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build the project
echo 🔨 Building the project...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build completed successfully!

REM Check if build directory exists
if not exist "build" (
    echo ❌ Build directory not found
    pause
    exit /b 1
)

echo 📁 Build directory created successfully

REM Optional: Test the build locally
set /p test="🤔 Would you like to test the build locally? (y/n): "
if /i "%test%"=="y" (
    echo 🌐 Starting local server...
    npx serve -s build -l 3000
)

echo 🎉 Deployment preparation completed!
echo.
echo 📋 Next steps:
echo 1. Push your code to GitHub
echo 2. Connect your repository to Netlify
echo 3. Set environment variables in Netlify dashboard
echo 4. Deploy!
echo.
echo 🔗 Netlify deployment methods:
echo - UI: Go to netlify.com and connect your GitHub repo
echo - CLI: Run 'netlify deploy --prod --dir=build'
echo - Drag ^& Drop: Drag the 'build' folder to netlify.com
echo.
pause
