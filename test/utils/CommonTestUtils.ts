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
     * Scrolls within the product list container to locate a specific element.
     * Uses the scrollTo method from BaseScreen.
     * @param {string} elementSelector - The selector of the element to scroll to.
     * @returns {Promise<void>} - Resolves once the element is visible or the end of the list is reached.
     */
    async scrollToElement(elementSelector: string): Promise<void> {
        console.log(`Starting to scroll to the element: ${elementSelector}...`);

        while (true) {
            // Check if the target element is visible
            const isElementVisible = await this.isElementDisplayed(elementSelector);
            if (isElementVisible) {
                console.log(`Element ${elementSelector} is visible. Stopping scroll.`);
                break;
            }

            // Scroll to the target element using the BaseScreen's scrollTo method
            try {
                await this.scrollTo(elementSelector);
            } catch (error) {
                console.error(`Scrolling to element ${elementSelector} failed:`, (error as Error).message);
                break;
            }

            // Pause briefly to allow content to load
            await browser.pause(1000);
        }

        console.log(`Finished scrolling to the element: ${elementSelector}.`);
    }
}
