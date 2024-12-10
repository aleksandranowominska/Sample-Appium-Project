import { LoginScreen } from "../pageobjects/screens/LoginScreen";

export class LoginSteps {
    private loginScreen: LoginScreen;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing LoginSteps for platform: ${platform}`);
        this.loginScreen = new LoginScreen(platform);
    }

    /**
     * Waits for the splash screen to disappear.
     * Simulates a delay to ensure the app is ready for interaction.
     * @returns {Promise<void>} - Resolves after a pause.
     */
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

    /**
     * Verifies if all elements on the login screen are displayed.
     * Throws an error if any element is missing.
     * @returns {Promise<void>} - Resolves once all elements are verified.
     */
    async verifyLoginScreenElements(): Promise<void> {
        console.log('Verifying login screen elements...');
        const elementsDisplayed = await this.loginScreen.areElementsDisplayed();
        console.log('All elements displayed:', elementsDisplayed);

        if (!elementsDisplayed) {
            throw new Error('Not all login screen elements are displayed. Check logs for details.');
        }

        expect(elementsDisplayed).toBe(true);
    }

    /**
     * Logs in using credentials provided in the `.env` file.
     * Throws an error if login fails.
     * @returns {Promise<void>} - Resolves once the login is completed successfully.
     */
    async logIn(): Promise<void> {
        console.log('Logging in...');
        await this.loginScreen.login();
        console.log('Login completed successfully.');
    }

    /**
     * Attempts to log in without providing any credentials and verifies the error message.
     * Asserts that the error message contains 'Username is required'.
     * @returns {Promise<void>} - Resolves once the error message is verified.
     */
    async verifyErrorForEmptyFields(): Promise<void> {
        console.log('Verifying error for empty fields...');
        const { errorMessage, isErrorVisible } = await this.loginScreen.attemptLoginWithoutCredentials();

        console.log('Error message received:', errorMessage);
        expect(errorMessage).toContain('Username is required');
        expect(isErrorVisible).toBe(true);
        console.log('Error for empty fields verified successfully.');
    }

    /**
     * Attempts to log in with only a username and verifies the error message.
     * Asserts that the error message contains 'Password is required'.
     * @returns {Promise<void>} - Resolves once the error message is verified.
     */
    async verifyErrorForMissingPassword(): Promise<void> {
        console.log('Verifying error for missing password...');
        const { errorMessage, isErrorVisible } = await this.loginScreen.attemptLoginWithOnlyUsername();

        console.log('Error message received:', errorMessage);
        expect(errorMessage).toContain('Password is required');
        expect(isErrorVisible).toBe(true);
        console.log('Error for missing password verified successfully.');
    }
}
