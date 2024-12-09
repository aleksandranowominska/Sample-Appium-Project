const PLATFORM = process.env.PLATFORM || 'Android';

// Set default values depending on the selected platform
const DEFAULT_DEVICE_NAME = PLATFORM === 'Android' ? 'R5CX14742XK' : 'iPhone 16';
const DEFAULT_PLATFORM_VERSION = PLATFORM === 'Android' ? '14' : '18.1';
const DEFAULT_AUTOMATION_NAME = PLATFORM === 'Android' ? 'UiAutomator2' : 'XCUITest';
const DEFAULT_APP_PATH = PLATFORM === 'Android'
    ? '/Users/olanowominska/Developer/appium-task/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'
    : '/Users/olanowominska/Developer/appium-task/iOS.Simulator.SauceLabs.Mobile.Sample.app.2.7.1.app';

// Retrieve values from process.env or use default ones
const DEVICE_NAME = process.env.DEVICE_NAME || DEFAULT_DEVICE_NAME;
const PLATFORM_VERSION = process.env.PLATFORM_VERSION || DEFAULT_PLATFORM_VERSION;
const AUTOMATION_NAME = process.env.AUTOMATION_NAME || DEFAULT_AUTOMATION_NAME;
const APP_PATH = process.env.APP_PATH || DEFAULT_APP_PATH;
const WAITFOR_TIMEOUT = process.env.WAITFOR_TIMEOUT ? parseInt(process.env.WAITFOR_TIMEOUT, 10) : 10000;

// Define test specs based on the platform
const TEST_SPECS = PLATFORM === 'Android'
    ? './test/specs/test.e2e.android.ts'
    : './test/specs/test.e2e.iOS.ts';

// Basic capabilities based on environment variables
const baseCapabilities: WebdriverIO.Capabilities & { [key: string]: string | boolean } = {
    platformName: PLATFORM,
    'appium:deviceName': DEVICE_NAME,
    'appium:platformVersion': PLATFORM_VERSION,
    'appium:automationName': AUTOMATION_NAME,
    'appium:app': APP_PATH,
    'appium:aaptExecPath': '/Users/olanowominska/Library/Android/sdk/build-tools/34.0.0/aapt2',
    'appium:appWaitActivity': 'com.swaglabsmobileapp.SplashActivity,com.swaglabsmobileapp.*'
};

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    // Define test specs
    specs: [TEST_SPECS],
    exclude: [],

    maxInstances: 10,

    // Appium server connection
    hostname: 'localhost',
    port: 4723,
    path: '/',

    capabilities: [baseCapabilities],

    logLevel: 'info',

    // If >0, wdio will stop after given number of test failures
    bail: 0,

    // Timeouts
    waitforTimeout: WAITFOR_TIMEOUT,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
