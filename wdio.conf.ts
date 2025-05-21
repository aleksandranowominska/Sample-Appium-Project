import { Reporters } from '@wdio/types';
import path from 'path';

const TARGET_DEVICE = process.env.TARGET_DEVICE || 'emulator';

const EMULATOR_CONFIG = {
    deviceName: 'Android Emulator',
    platformVersion: '13',
    automationName: 'UiAutomator2',
    appPath: path.resolve(__dirname, 'Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'),
    specs: ['./test/specs/test.e2e.android.ts']
};

const PHYSICAL_CONFIG = {
    deviceName: 'R5CX14742XK',
    platformVersion: '14', // Sprawdź dokładną wersję przez `adb shell getprop ro.build.version.release`
    automationName: 'UiAutomator2',
    appPath: path.resolve(__dirname, 'Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'),
    specs: ['./test/specs/test.e2e.android.ts']
};

const ACTIVE = TARGET_DEVICE === 'physical' ? PHYSICAL_CONFIG : EMULATOR_CONFIG;

console.log('==== WDIO CONFIGURATION ====');
console.log('TARGET_DEVICE:', TARGET_DEVICE);
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
