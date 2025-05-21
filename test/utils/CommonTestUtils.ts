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
     * @param {any} headerSteps - An object with header step methods.
     * @returns {Promise<void>} - Resolves when the login process is complete.
     */
    async loginToStandardAccount(loginSteps: any, headerSteps: any): Promise<void> {
        // Wait for splash screen to disappear
        await loginSteps.waitForSplashScreen();

        // Verify login screen elements
        await loginSteps.verifyLoginScreenElements();
        console.log('Login screen elements verified successfully.');

        // Perform login
        await loginSteps.logIn();
        console.log('Login process completed successfully.');

        // Wait for header elements to appear
        console.log('Waiting for header elements to appear...');
        await headerSteps.waitForHeaderElements();
        console.log('Header elements are displayed successfully.');
    }

    /**
     * Fetches values (e.g., titles or prices) from the product list screen
     * and verifies if they are sorted in the specified order.
     *
     * @template T
     * @param fetchValuesFn - Function that fetches the array of values to be verified (e.g., product titles or prices).
     * @param verifyFn - Function that verifies if the array is sorted correctly.
     * @param label - Label used in log messages (e.g., 'product title', 'product price').
     * @param ascending - Whether the sort order should be ascending.
     */
    async fetchAndVerifySortedValues<T>(
        fetchValuesFn: () => Promise<T[]>,
        verifyFn: (items: T[], ascending: boolean) => boolean,
        label: string,
        ascending: boolean
    ): Promise<void> {
        console.log(`Fetching and verifying sorted ${label}s...`);

        const values = await fetchValuesFn();
        console.log(`Fetched ${label}s:`, values);

        const isSorted = verifyFn(values, ascending);
        const expectedOrder = [...values].sort((a, b) =>
            typeof a === 'string'
                ? ascending
                    ? (a as string).localeCompare(b as string)
                    : (b as string).localeCompare(a as string)
                : ascending
                    ? (a as number) - (b as number)
                    : (b as number) - (a as number)
        );

        console.log(`Expected sorted ${label} order:`, expectedOrder);

        if (!isSorted) {
            throw new Error(
                `${label[0].toUpperCase() + label.slice(1)}s are not sorted in ${ascending ? 'ascending' : 'descending'} order.`
            );
        }

        console.log(`${label[0].toUpperCase() + label.slice(1)}s are sorted correctly.`);
    }

}
