# TrafficGuard+ Mobile App

A health-aware navigation app that monitors heat index and traffic conditions, specifically designed for users with hypertension concerns.

## Features

- **Real-time Heat Index Monitoring**: Critical for hypertension patients
- **Live Traffic Alerts**: Accident, construction, police checkpoints
- **Health-focused UI**: Prominent health warnings and recommendations
- **Mobile-first Design**: Optimized for mobile devices
- **Offline Capable**: PWA with service worker support

## Setup Instructions

### Prerequisites

Before starting, make sure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)

For mobile deployment:
- **Android Studio** (for Android) - [Download here](https://developer.android.com/studio)
- **Xcode** (for iOS, Mac only) - Available on Mac App Store

### 1. Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

### 2. Start Development Server

```powershell
npm start
```

This will open the app in your browser at `http://localhost:3000`

## Mobile Deployment Options

### Option 1: Progressive Web App (PWA) - Easiest
The app is already configured as a PWA and can be installed directly from the browser:

1. Open the app in Chrome/Safari on your mobile device
2. Look for "Add to Home Screen" or "Install App" option
3. The app will behave like a native app with offline capabilities

### Option 2: Native Mobile App with Capacitor

#### Setup Capacitor (First Time Only)

```powershell
# Install Capacitor CLI globally
npm install -g @capacitor/cli

# Initialize Capacitor (if not already done)
npx cap init "TrafficGuard+" "com.unleashapp.trafficguard"

# Build the React app
npm run build

# Add mobile platforms
npx cap add android
npx cap add ios
```

#### Android Deployment

1. **Install Android Studio**
2. **Build and sync:**
   ```powershell
   npm run build
   npx cap sync android
   ```

3. **Open in Android Studio:**
   ```powershell
   npx cap open android
   ```

4. **In Android Studio:**
   - Connect your Android device or start an emulator
   - Click "Run" button or press Shift+F10
   - The app will install on your device

#### iOS Deployment (Mac Only)

1. **Install Xcode**
2. **Build and sync:**
   ```powershell
   npm run build
   npx cap sync ios
   ```

3. **Open in Xcode:**
   ```powershell
   npx cap open ios
   ```

4. **In Xcode:**
   - Connect your iPhone/iPad or use simulator
   - Select your device and click "Run"
   - You may need an Apple Developer account for device installation

### Option 3: Expo/React Native (Alternative)

If you prefer React Native, you can convert the app:

1. **Install Expo CLI:**
   ```powershell
   npm install -g @expo/cli
   ```

2. **Create new Expo project:**
   ```powershell
   npx create-expo-app TrafficGuardExpo
   ```

3. **Copy the component and adapt for React Native**

## Quick Commands Reference

```powershell
# Development
npm start                    # Start development server
npm run build               # Build for production

# Mobile (Capacitor)
npm run build-mobile        # Build and sync mobile apps
npm run mobile:android      # Open Android Studio
npm run mobile:ios          # Open Xcode
npm run mobile:run-android  # Build and run on Android
npm run mobile:run-ios      # Build and run on iOS

# Testing
npm test                    # Run tests
```

## Project Structure

```
UnleashApp/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   │   └── TrafficHealthApp.js
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── capacitor.config.json  # Mobile app configuration
└── tailwind.config.js     # Tailwind CSS configuration
```

## Mobile-Specific Features

- **Touch-optimized UI**: Large tap targets, gesture support
- **Safe area support**: Handles device notches and rounded corners
- **Offline capability**: Works without internet connection
- **Push notifications**: Ready for traffic alerts (requires backend)
- **Device sensors**: Ready for GPS, accelerometer integration

## Troubleshooting

### Common Issues

1. **Node modules error**: Delete `node_modules` and run `npm install`
2. **Port already in use**: Change port with `PORT=3001 npm start`
3. **Android Studio not found**: Add Android Studio to PATH
4. **iOS simulator issues**: Reset simulator in Xcode

### Performance Tips

- The app is optimized for mobile performance
- Uses React.memo and useCallback for optimization
- Tailwind CSS is purged for smaller bundle size
- Service worker caches resources for offline use

## Next Steps for Production

1. **Backend Integration**: Add real traffic and weather APIs
2. **Authentication**: User accounts and preferences
3. **Push Notifications**: Real-time traffic alerts
4. **GPS Integration**: Actual location-based features
5. **Health Integration**: Connect with fitness/health apps
6. **App Store Deployment**: Prepare for iOS App Store and Google Play

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Capacitor documentation: https://capacitorjs.com
3. Check React documentation: https://react.dev
