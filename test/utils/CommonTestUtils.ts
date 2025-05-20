import { BaseScreen } from './BaseScreen';

export class CommonTestUtils extends BaseScreen {
    /**
     * Verifies the product details, including name and price.
     * Compares the actual product name and price retrieved from the UI with the expected values.
     * Logs the comparison details and throws an error if there is a mismatch.
     * 
     * @param {string} actualNameSelector - The selector for the product name on the UI.
     * @param {string} actualPriceSelector - The selector for the product price on the UI.
     * @param {string} expectedName - The expected product name.
     * @param {string} expectedPrice - The expected product price.
     * @returns {Promise<void>} - Resolves if the product details match the expected values.
     * @throws {Error} - Throws an error if the product name or price does not match the expected values.
     */
    async verifyProductDetails(
        actualNameSelector: string,
        actualPriceSelector: string,
        expectedName: string,
        expectedPrice: string
    ): Promise<void> {
        console.log('Verifying product details...');

        const actualName = await this.getElementText(actualNameSelector);
        const actualPrice = await this.getElementText(actualPriceSelector);

        console.log(`Expected product name: ${expectedName}, Actual product name: ${actualName}`);
        console.log(`Expected product price: ${expectedPrice}, Actual product price: ${actualPrice}`);

        if (actualName !== expectedName) {
            throw new Error(`Product name mismatch: expected "${expectedName}", but got "${actualName}"`);
        }

        if (actualPrice !== expectedPrice) {
            throw new Error(`Product price mismatch: expected "${expectedPrice}", but got "${actualPrice}"`);
        }
    }

    /**
     * Logs in to a standard account by waiting for splash screen, verifying login screen elements, and performing login.
     * Assumes loginSteps provides waitForSplashScreen, verifyLoginScreenElements, and logIn methods.
     * 
     * @param {any} loginSteps - An object with login step methods.
     * @returns {Promise<void>} - Resolves when the login process is complete.
     */
    async loginToStandardAccount(loginSteps: any): Promise<void> {
        // Wait for splash screen to disappear
        await loginSteps.waitForSplashScreen();

        // Verify login screen elements
        await loginSteps.verifyLoginScreenElements();
        console.log('Login screen elements verified successfully.');

        // Perform login
        await loginSteps.logIn();
        console.log('Login process completed successfully.');
    }
}
