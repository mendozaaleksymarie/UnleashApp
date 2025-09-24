# TrafficGuard+ Mobile Deployment Script for Windows
Write-Host "TrafficGuard+ Mobile Deployment Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Function to check if command exists
function Test-Command {
    param($Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Check prerequisites
Write-Host "Checking prerequisites..." -ForegroundColor Yellow

if (!(Test-Command "npm")) {
    Write-Host "❌ npm is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Cyan
    exit 1
}

if (!(Test-Command "npx")) {
    Write-Host "❌ npx is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ Node.js and npm are installed" -ForegroundColor Green

# Build the React app
Write-Host ""
Write-Host "Building React app..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed. Please fix the errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "✅ React app built successfully" -ForegroundColor Green

# Check if Capacitor is initialized
if (!(Test-Path "capacitor.config.json")) {
    Write-Host "❌ Capacitor is not initialized. Run: npx cap init" -ForegroundColor Red
    exit 1
}

# Initialize Capacitor if platforms don't exist
Write-Host ""
Write-Host "Setting up mobile platforms..." -ForegroundColor Yellow

if (!(Test-Path "android")) {
    Write-Host "Adding Android platform..." -ForegroundColor Cyan
    npx cap add android
}

if (!(Test-Path "ios")) {
    Write-Host "Adding iOS platform..." -ForegroundColor Cyan
    npx cap add ios
}

# Sync with platforms
Write-Host ""
Write-Host "Syncing with mobile platforms..." -ForegroundColor Yellow
npx cap sync

Write-Host ""
Write-Host "✅ Mobile setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "- For Android: Run 'npx cap open android' to open in Android Studio" -ForegroundColor White
Write-Host "- For iOS: Run 'npx cap open ios' to open in Xcode (Mac only)" -ForegroundColor White
Write-Host "- Or use 'npm run mobile:android' / 'npm run mobile:ios'" -ForegroundColor White
Write-Host ""
Write-Host "Mobile App Features:" -ForegroundColor Cyan
Write-Host "- Progressive Web App (PWA) ready" -ForegroundColor White
Write-Host "- Native mobile app capabilities" -ForegroundColor White
Write-Host "- Offline functionality" -ForegroundColor White
Write-Host "- Push notification ready" -ForegroundColor White
