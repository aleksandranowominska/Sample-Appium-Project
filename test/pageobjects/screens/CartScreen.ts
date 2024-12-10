import { BaseScreen } from '../../utils/BaseScreen';
import { iOSSelectors } from '../../utils/iOSSelectors';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class CartScreen extends BaseScreen {
    private selectors: typeof iOSSelectors | typeof AndroidSelectors;
    private removeButtonSelector: string;

    constructor() {
        super();
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing CartScreen for platform: ${platform}`);
        this.selectors = platform === 'Android' ? AndroidSelectors : iOSSelectors;
        this.removeButtonSelector = this.selectors.removeButtonSelector;
    }

    /**
     * Checks if the "Checkout" button is visible on the cart screen.
     * @returns {Promise<boolean>} - True if the "Checkout" button is displayed, otherwise false.
     */
    async isCheckoutButtonVisible(): Promise<boolean> {
        console.log('Checking if the "Checkout" button is visible...');
        const isCheckoutButtonDisplayed = await this.isElementDisplayed(this.selectors.checkoutButtonSelector);

        console.log('"Checkout" button display status:', isCheckoutButtonDisplayed);

        return isCheckoutButtonDisplayed;
    }

    /**
     * Verifies if all key elements on the cart screen are displayed.
     * @returns {Promise<boolean>} - True if all elements are displayed, otherwise false.
     */
    async verifyCartElements(): Promise<boolean> {
        const elementsToCheck = [
            this.selectors.yourCartSelector,
            this.selectors.qtySelector,
            this.selectors.descriptionSelector,
            this.selectors.amountSelector,
            this.selectors.removeButtonSelector,
            this.selectors.continueShoppingButtonSelector,
            this.selectors.checkoutButtonSelector,
        ];

        console.log('Verifying cart elements...');
        const elementsDisplayed = await Promise.all(
            elementsToCheck.map(async (selector) => {
                try {
                    const isDisplayed = await this.isElementDisplayed(selector);
                    console.log(`Element ${selector} displayed: ${isDisplayed}`);
                    return isDisplayed;
                } catch (error) {
                    console.error(`Error checking element ${selector}:`, error);
                    return false;
                }
            })
        );

        console.log('Cart elements displayed status:', elementsDisplayed);
        return elementsDisplayed.every((displayed) => displayed === true);
    }

    /**
     * Verifies if the displayed product quantity matches the expected quantity.
     * @param {string} expectedQuantity - The expected product quantity.
     * @returns {Promise<boolean>} - True if the displayed quantity matches the expected, otherwise false.
     */
    async verifyProductQuantity(expectedQuantity: string): Promise<boolean> {
        const actualQuantity = await this.getElementText(this.selectors.productQtySelector);
        console.log(`Expected quantity: ${expectedQuantity}, Actual quantity: ${actualQuantity}`);
        return actualQuantity === expectedQuantity;
    }

    /**
     * Taps on the "Checkout" button to proceed with the checkout process.
     */
    async tapCheckoutButton(): Promise<void> {
        console.log('Tapping on the Checkout button...');
        await this.tapElement(this.selectors.checkoutButtonSelector);
        console.log('Tapped on the Checkout button.');
    }

    /**
     * Taps on the "Remove" button to remove an item from the cart.
     */
    async tapRemoveButton(): Promise<void> {
        console.log('Tapping the remove button...');
        await this.tapElement(this.removeButtonSelector);
        console.log('Remove button tapped.');
    }

    /**
     * Verifies if a specific product has been removed from the cart.
     * @param {string} productName - The name of the product to check.
     * @returns {Promise<boolean>} - True if the product is removed, otherwise false.
     */
    async verifyProductRemoved(productName: string): Promise<boolean> {
        console.log(`Waiting for product "${productName}" to be removed from the cart...`);
        const isRemoved = await this.waitForElementToDisappear(
            `//*[contains(@content-desc, "test-Item title") and @text="${productName}"]`
        );
        console.log(`Product "${productName}" removed:`, isRemoved);
        return isRemoved;
    }

    /**
     * Returns the selector for the product name element.
     * @returns {string} - The selector for the product name element.
     */
    public getProductNameSelector(): string {
        return this.selectors.productNameSelector;
    }

    /**
     * Returns the selector for the product price element.
     * @returns {string} - The selector for the product price element.
     */
    public getProductPriceSelector(): string {
        return this.selectors.productPriceSelector;
    }
}
