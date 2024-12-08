import { LoginScreen } from '../pageobjects/screens_iOS/LoginScreen';

export class LoginSteps {
    private loginScreen: LoginScreen;

    constructor() {
        this.loginScreen = new LoginScreen();
    }

    // Wait for splash screen to disappear
    async waitForSplashScreen(): Promise<void> {
        console.log('Waiting for splash screen to disappear...');
        await browser.pause(2000); // Możesz to zmienić na bardziej dynamiczne rozwiązanie, np. czekanie na element
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
