# Mobile Automation Tests

## Overview
This repository contains automated end-to-end tests for the Sauce Labs Sample Mobile Application. Tests are designed to run on both Android and iOS platforms using Appium and WebdriverIO.

## Prerequisites
- Node.js (>= 16.x)
- Appium server installed and running (`npm install -g appium`)
- Android SDK for Android testing
- Xcode for iOS testing (required for simulators)
- Allure Commandline for report generation (`npm install -g allure-commandline`)
- Set environment variables in a `.env` file

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/aleksandranowominska/Sample-Appium-Project.git
   cd your-repository
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Place your application files in the `apps` directory:
   - Android: `Android.SauceLabs.Mobile.Sample.app.apk`
   - iOS: `iOS.Simulator.SauceLabs.Mobile.Sample.app.app`
4. Configure the `.env` file:
   - Example for iOS:
     ```env
     PLATFORM=iOS
     DEVICE_NAME=iPhone 13
     PLATFORM_VERSION=16.0
     APP_PATH=./apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.app
     ```
   - Example for Android:
     ```env
     PLATFORM=Android
     DEVICE_NAME=Android Emulator
     PLATFORM_VERSION=12
     APP_PATH=./apps/Android.SauceLabs.Mobile.Sample.app.apk
     ```

## How to Run Tests
1. Start the Appium server:
   ```bash
   appium
   ```
2. Run tests:
   - For Android:
     ```bash
     PLATFORM=Android npm test
     ```
   - For iOS:
     ```bash
     PLATFORM=iOS npm test
     ```

## Generating and Viewing Reports
1. Run tests to generate the Allure report.
   ```bash
   npm test
   ```
2. Start the Allure report server:
   ```bash
   allure serve allure-results
   ```
3. The report will open in your default browser, displaying detailed test results.

## Key Features
1. **Platform-Specific Selectors:** The framework dynamically selects Android or iOS-specific selectors.
2. **Environment Variables:** Configuration can be customized without modifying source code.
3. **Scroll Utilities:** Includes platform-specific scrolling utilities (`scrollToElementAndroid`, `scrollToElementiOS`).
4. **Flexible Test Specs:** Automatically chooses appropriate test files based on the `PLATFORM` variable.

## Directory Structure
```
.
├── apps/                     # APK/APP files
├── test/
│   ├── specs/                # Test scripts
│   ├── pageobjects/          # Page object models
│   ├── steps/                # Test step definitions
│   └── utils/                # Utility functions and constants
├── allure-results/           # Allure report files
├── wdio.conf.ts              # WebdriverIO configuration
├── package.json              # Node.js dependencies
└── README.md                 # Project documentation
```

## Troubleshooting
1. Ensure Appium server is running.
   ```bash
   appium
   ```
2. Verify device/simulator availability:
   - For Android:
     ```bash
     adb devices
     ```
   - For iOS, use Xcode to confirm simulator availability.
3. Check `.env` file for correct configuration.

## License
This project is licensed under the MIT License.
