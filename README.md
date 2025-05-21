# Android Mobile Automation Tests

## Overview
This repository contains automated end-to-end tests for the Sauce Labs Sample Mobile Application on **Android** using Appium and WebdriverIO. It supports two modes: emulator and physical device.

## Prerequisites
- Node.js (>= 16.x)
- Appium server installed (`npm install -g appium`)
- Android SDK installed and configured (`adb` available in terminal)
- Allure Commandline for report generation (`npm install -g allure-commandline`)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/aleksandranowominska/Sample-Appium-Project.git
   cd Sample-Appium-Project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Place your application files in the `apps` directory:
   - Android: `Android.SauceLabs.Mobile.Sample.app.apk`

## Configuration
The app and device configuration is controlled via the `TARGET_DEVICE` environment variable:

- **Emulator config**: `deviceName: Android Emulator`, `platformVersion: 13`
- **Physical device config**: `deviceName: R5CX14742XK`, `platformVersion: 14`

APK file path is resolved as:
```
./Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
```

## Running Tests
### Start Appium server
```bash
appium
```

### Run on emulator
```bash
npm run android:emulator
```

### Run on physical device
```bash
npm run android:physical
```

## Generating and Viewing Reports
1. Run the tests (as above).
2. Serve Allure report:
   ```bash
   allure serve allure-results
   ```
3. Report opens in the browser.

## Key Features
- Platform-specific configuration through env var `TARGET_DEVICE`
- Scroll utilities for Android (`scrollToElementAndroid`)
- WDIO + Appium setup with support for Allure reporting

## Directory Structure
```
.
├── Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
├── test/
│   ├── specs/                      # Test scripts
│   ├── pageobjects/                # Page object models
│   ├── steps/                      # Test step definitions
│   └── utils/                      # Utility functions (e.g. selectors, scrolls)
├── allure-results/                 # Allure output
├── wdio.conf.ts                    # WebdriverIO configuration
├── package.json                    # Scripts and dependencies
└── README.md
```

## Troubleshooting
- Ensure Appium is running on `localhost:4723`
- Check connected Android device:
  ```bash
  adb devices
  ```
- Confirm APK is accessible at defined path

## License
This project is licensed under the MIT License.
