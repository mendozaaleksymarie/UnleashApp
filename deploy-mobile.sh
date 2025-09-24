#!/bin/bash

echo "TrafficGuard+ Mobile Deployment Script"
echo "====================================="

# Function to check if command exists
command_exists () {
    type "$1" &> /dev/null ;
}

# Check prerequisites
echo "Checking prerequisites..."

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

if ! command_exists npx; then
    echo "❌ npx is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Build the React app
echo ""
echo "Building React app..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ React app built successfully"

# Check if Capacitor is initialized
if [ ! -f "capacitor.config.json" ]; then
    echo "❌ Capacitor is not initialized. Run: npx cap init"
    exit 1
fi

# Initialize Capacitor if platforms don't exist
echo ""
echo "Setting up mobile platforms..."

if [ ! -d "android" ]; then
    echo "Adding Android platform..."
    npx cap add android
fi

if [ ! -d "ios" ]; then
    echo "Adding iOS platform..."
    npx cap add ios
fi

# Sync with platforms
echo ""
echo "Syncing with mobile platforms..."
npx cap sync

echo ""
echo "✅ Mobile setup complete!"
echo ""
echo "Next steps:"
echo "- For Android: Run 'npx cap open android' to open in Android Studio"
echo "- For iOS: Run 'npx cap open ios' to open in Xcode (Mac only)"
echo "- Or use 'npm run mobile:android' / 'npm run mobile:ios'"
