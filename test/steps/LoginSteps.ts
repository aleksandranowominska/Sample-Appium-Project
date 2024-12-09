import { LoginScreen as LoginScreenIOS } from '../pageobjects/screens_iOS/LoginScreen';
import { LoginScreen as LoginScreenAndroid } from '../pageobjects/screens_Android/LoginScreen';

export class LoginSteps {
    private loginScreen: LoginScreenIOS | LoginScreenAndroid;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing LoginSteps for platform: ${platform}`);

        if (platform === 'Android') {
            this.loginScreen = new LoginScreenAndroid();
        } else {
            this.loginScreen = new LoginScreenIOS();
        }
    }

    // Wait for splash screen to disappear
    async waitForSplashScreen(): Promise<void> {
        console.log('Waiting for splash screen to disappear...');
        await browser.pause(2000);
    }

    // Verify all login screen elements are displayed
    async verifyLoginScreenElements(): Promise<void> {
        console.log('Verifying login screen elements...');
        const elementsDisplayed = await this.loginScreen.areElementsDisplayed();
        console.log('All elements displayed:', elementsDisplayed);
        expect(elementsDisplayed).toBe(true);
    }

    // Log in with credentials from .env
    async logIn(): Promise<void> {
        console.log('Logging in...');
        await this.loginScreen.login();
        console.log('Login completed successfully.');
    }
}
