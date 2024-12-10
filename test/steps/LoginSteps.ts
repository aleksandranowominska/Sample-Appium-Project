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

    /**
     * Verifies if the login page is visible by checking the presence of the login button.
     * Throws an error if the login button is not displayed.
     * @returns {Promise<void>} - Resolves once the visibility is confirmed.
     */
    async verifyPageIsVisible(): Promise<void> {
        console.log('Verifying if the page is visible...');
        const isPageVisible = await this.loginScreen.isLoginButtonVisible();
        console.log('Is the page visible (login button displayed):', isPageVisible);

        if (!isPageVisible) {
            throw new Error('The page is not visible. Login button is not displayed.');
        }

        expect(isPageVisible).toBe(true);
    }
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

    // Attempt login without credentials and verify errors
    async verifyErrorForEmptyFields(): Promise<void> {
        console.log('Verifying error for empty fields...');
        const { errorMessage, isErrorVisible } = await this.loginScreen.attemptLoginWithoutCredentials();

        console.log('Error message received:', errorMessage);
        expect(errorMessage).toContain('Username is required');
        expect(isErrorVisible).toBe(true);
        console.log('Error for empty fields verified successfully.');
    }

    // Attempt login with only username and verify errors
    async verifyErrorForMissingPassword(): Promise<void> {
        console.log('Verifying error for missing password...');
        const { errorMessage, isErrorVisible } = await this.loginScreen.attemptLoginWithOnlyUsername();

        console.log('Error message received:', errorMessage);
        expect(errorMessage).toContain('Password is required');
        expect(isErrorVisible).toBe(true);
        console.log('Error for missing password verified successfully.');
    }
}
