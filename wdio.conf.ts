export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    specs: [
        './test/specs/**/*.ts'
    ],

    exclude: [],

    maxInstances: 10,

    // Dodaj informacje o Appium
    hostname: 'localhost',
    port: 4723,
    path: '/',

    capabilities: [
        {
            platformName: 'Android',
            'appium:deviceName': 'Pixel_8_API_35',
            'appium:platformVersion': '15',
            'appium:automationName': 'UiAutomator2',
            'appium:app': '/Users/olanowominska/Developer/appium-task/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'
        },
        {
            platformName: 'iOS',
            'appium:deviceName': 'iPhone 16',
            'appium:platformVersion': '18.1',
            'appium:automationName': 'XCUITest',
            'appium:app': '/Users/olanowominska/Developer/appium-task/iOS.Simulator.SauceLabs.Mobile.Sample.app.2.7.1.app'
        }
    ],

    logLevel: 'info',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
