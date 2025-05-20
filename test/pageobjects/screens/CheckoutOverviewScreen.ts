import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class CheckoutOverviewScreen extends BaseScreen {
    private selectors: typeof AndroidSelectors;

    constructor() {
        super();
        this.selectors = AndroidSelectors;
    }

    /**
     * Asserts that all key elements on the checkout overview screen are displayed.
     * Throws an error if any element is missing.
     * @returns {Promise<void>}
     */
    async assertCheckoutOverviewElementsVisible(): Promise<void> {
        const elementsToCheck = [
            this.selectors.checkoutOverviewTitleSelector,
            this.selectors.productNameSelector,
            this.selectors.productPriceSelector,
            this.selectors.itemTotalSelector,
            this.selectors.taxSelector,
            this.selectors.totalPriceSelector,
        ];

        console.log('Asserting visibility of checkout overview screen elements...');
        const failedElements: string[] = [];

        for (const selector of elementsToCheck) {
            await this.scrollTo(selector);
            const isDisplayed = await this.isElementDisplayed(selector);
            console.log(`Element ${selector} is displayed: ${isDisplayed}`);
            if (!isDisplayed) {
                failedElements.push(selector);
            }
        }

        if (failedElements.length > 0) {
            throw new Error(`Missing checkout overview elements: ${failedElements.join(', ')}`);
        }

        console.log('All checkout overview elements are visible.');
    }

    /**
     * Asserts that the total price is calculated correctly (item total + tax).
     * Throws an error if the values don't match.
     * @returns {Promise<void>}
     */
    async assertTotalPriceCorrect(): Promise<void> {
        await this.scrollTo(this.selectors.itemTotalSelector);
        const itemTotal = parseFloat((await this.getElementText(this.selectors.itemTotalSelector)).replace('Item total: $', ''));

        await this.scrollTo(this.selectors.taxSelector);
        const tax = parseFloat((await this.getElementText(this.selectors.taxSelector)).replace('Tax: $', ''));

        await this.scrollTo(this.selectors.totalPriceSelector);
        const total = parseFloat((await this.getElementText(this.selectors.totalPriceSelector)).replace('Total: $', ''));

        const expectedTotal = +(itemTotal + tax).toFixed(2);

        console.log(`Item total: ${itemTotal}, Tax: ${tax}, Expected Total: ${expectedTotal}, Displayed Total: ${total}`);

        if (total !== expectedTotal) {
            throw new Error(`Total price mismatch: expected ${expectedTotal}, got ${total}`);
        }

        console.log('Total price is correct.');
    }

    /**
     * Taps on the "Finish" button to complete the checkout process.
     */
    async tapFinish(): Promise<void> {
        await this.scrollTo(this.selectors.finishButtonSelector);
        console.log('Tapping Finish button...');
        await this.tapElement(this.selectors.finishButtonSelector);
        console.log('Finish button tapped.');
    }

    /**
     * Returns the selector for the product name element on the overview screen.
     * @returns {string} - The selector for the product name element.
     */
    public getOverviewProductNameSelector(): string {
        return this.selectors.productNameSelector;
    }

    /**
     * Returns the selector for the product price element on the overview screen.
     * @returns {string} - The selector for the product price element.
     */
    public getOverviewProductPriceSelector(): string {
        return this.selectors.productPriceSelector;
    }
}
