import { Reporters } from '@wdio/types';
import path from 'path';

const ACTIVE = {
    deviceName: 'Android Emulator',
    platformVersion: '13',
    automationName: 'UiAutomator2',
    appPath: path.resolve(__dirname, 'Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'),
    specs: ['./test/specs/test.e2e.android.ts']
};

console.log('==== WDIO CONFIGURATION ====');
console.log('DEVICE_NAME:', ACTIVE.deviceName);
console.log('APP_PATH:', ACTIVE.appPath);
console.log('AUTOMATION_NAME:', ACTIVE.automationName);

const baseCapabilities: WebdriverIO.Capabilities & { [key: string]: string | boolean } = {
    platformName: 'Android',
    'appium:deviceName': ACTIVE.deviceName,
    'appium:platformVersion': ACTIVE.platformVersion,
    'appium:automationName': ACTIVE.automationName,
    'appium:app': ACTIVE.appPath,
    'appium:aaptExecPath': process.env.AAPT_EXEC_PATH || '/path/to/aapt2',
    'appium:appWaitActivity': 'com.swaglabsmobileapp.SplashActivity,com.swaglabsmobileapp.*'
};

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',
    // Define test specs
    specs: ACTIVE.specs,
    exclude: [],
    // Appium server connection
    maxInstances: 1,
    hostname: 'localhost',
    port: 4723,
    path: '/',
    capabilities: [baseCapabilities],
    logLevel: 'info',
    // If >0, wdio will stop after given number of test failures
    bail: 0,
    // Timeouts
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    // Reporters configuration
    reporters: [
        'spec', // Spec reporter to log detailed test execution
        'spec',
        [
            'allure',
            {
                outputDir: './allure-results', // Directory for Allure results
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false
            }
        ]
    ] as Reporters.ReporterEntry[]
};
