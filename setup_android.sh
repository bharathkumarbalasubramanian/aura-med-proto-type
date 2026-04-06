#!/bin/bash
echo "Installing Capacitor..."
npm install @capacitor/core @capacitor/cli

echo "Initializing Capacitor Project..."
npx cap init AuraMed "com.bharathkumar.auramed" --web-dir dist

echo "Installing Android platform..."
npm install @capacitor/android

echo "Adding Android platform to the project..."
npx cap add android

echo "Building exactly what we have so far..."
npm run build

echo "Syncing frontend to Android..."
npx cap sync
