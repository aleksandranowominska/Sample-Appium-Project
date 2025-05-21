import { Reporters } from '@wdio/types';
import path from 'path';
import 'dotenv/config';

const TARGET_DEVICE = process.env.TARGET_DEVICE || 'emulator';
const isEmulator = TARGET_DEVICE === 'emulator';

const ACTIVE = {
    deviceName: isEmulator
        ? process.env.EMULATOR_DEVICE_NAME || 'Android Emulator'
        : process.env.PHYSICAL_DEVICE_NAME || 'R5CX14742XK',

    platformVersion: isEmulator
        ? process.env.EMULATOR_PLATFORM_VERSION || '13'
        : process.env.PHYSICAL_PLATFORM_VERSION || '14',

    automationName: isEmulator
        ? process.env.EMULATOR_AUTOMATION_NAME || 'UiAutomator2'
        : process.env.PHYSICAL_AUTOMATION_NAME || 'UiAutomator2',

    appPath: isEmulator
        ? process.env.EMULATOR_APP_PATH || path.resolve(__dirname, 'Android.SauceLabs.Mobile.Sample.app.2.7.1.apk')
        : process.env.PHYSICAL_APP_PATH || path.resolve(__dirname, 'Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'),

    specs: ['./test/specs/test.e2e.android.ts']
};

console.log('==== WDIO CONFIGURATION ====');
console.log('TARGET_DEVICE:', TARGET_DEVICE);
console.log('DEVICE_NAME:', ACTIVE.deviceName);
console.log('PLATFORM_VERSION:', ACTIVE.platformVersion);
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
    specs: ACTIVE.specs,
    exclude: [],
    maxInstances: 1,
    hostname: 'localhost',
    port: 4723,
    path: '/',
    capabilities: [baseCapabilities],
    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: './allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false
            }
        ]
    ] as Reporters.ReporterEntry[]
};
