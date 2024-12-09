import { LoginScreen } from "../pageobjects/screens/LoginScreen";

export class LoginSteps {
    private loginScreen: LoginScreen;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing LoginSteps for platform: ${platform}`);
        this.loginScreen = new LoginScreen(platform);
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

        if (!elementsDisplayed) {
            throw new Error('Not all login screen elements are displayed. Check logs for details.');
        }

        expect(elementsDisplayed).toBe(true);
    }

    // Log in with credentials from .env
    async logIn(): Promise<void> {
        console.log('Logging in...');
        await this.loginScreen.login();
        console.log('Login completed successfully.');
    }
}
