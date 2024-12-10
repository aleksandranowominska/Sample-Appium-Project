import { BaseScreen } from '../../utils/BaseScreen';
import { iOSSelectors } from '../../utils/iOSSelectors';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class CheckoutOverviewScreen extends BaseScreen {
    private selectors: typeof iOSSelectors | typeof AndroidSelectors;

    constructor(platform: string) {
        super();
        // Assign selectors dynamically based on the platform
        if (platform === 'Android') {
            this.selectors = AndroidSelectors;
        } else {
            this.selectors = iOSSelectors;
        }
    }

    /**
     * Verifies if all key elements on the checkout overview screen are displayed.
     * @returns {Promise<boolean>} - True if all elements are displayed, otherwise false.
     */
    async verifyCheckoutOverviewElements(): Promise<boolean> {
        const elementsToCheck = [
            this.selectors.checkoutOverviewTitleSelector,
            this.selectors.productNameSelector,
            this.selectors.productPriceSelector,
            this.selectors.itemTotalSelector,
            this.selectors.taxSelector,
            this.selectors.totalPriceSelector,
        ];

        for (const selector of elementsToCheck) {
            await this.scrollTo(selector);
            const isDisplayed = await this.isElementDisplayed(selector);
            console.log(`Element ${selector} is displayed: ${isDisplayed}`);
            if (!isDisplayed) {
                return false;
            }
        }
        return true;
    }

    /**
     * Verifies that the total price displayed on the screen is correct by summing up item total and tax.
     * @returns {Promise<boolean>} - True if the total price matches the sum, otherwise false.
     */
    async verifyTotalPrice(): Promise<boolean> {
        await this.scrollTo(this.selectors.itemTotalSelector);
        const itemTotal = parseFloat((await this.getElementText(this.selectors.itemTotalSelector)).replace('Item total: $', ''));

        await this.scrollTo(this.selectors.taxSelector);
        const tax = parseFloat((await this.getElementText(this.selectors.taxSelector)).replace('Tax: $', ''));

        await this.scrollTo(this.selectors.totalPriceSelector);
        const total = parseFloat((await this.getElementText(this.selectors.totalPriceSelector)).replace('Total: $', ''));

        console.log(`Item total: ${itemTotal}, Tax: ${tax}, Calculated Total: ${itemTotal + tax}, Actual Total: ${total}`);
        return total === itemTotal + tax;
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
