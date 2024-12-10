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

    // Method to verify product quantity
    async verifyProductQuantity(expectedQuantity: string): Promise<boolean> {
        const actualQuantity = await this.getElementText(this.selectors.productQtySelector);
        console.log(`Expected quantity: ${expectedQuantity}, Actual quantity: ${actualQuantity}`);
        return actualQuantity === expectedQuantity;
    }

    // Method to tap on the Checkout button
    async tapCheckoutButton(): Promise<void> {
        console.log('Tapping on the Checkout button...');
        await this.tapElement(this.selectors.checkoutButtonSelector);
        console.log('Tapped on the Checkout button.');
    }

    async tapRemoveButton(): Promise<void> {
        console.log('Tapping the remove button...');
        await this.tapElement(this.removeButtonSelector);
        console.log('Remove button tapped.');
    }

    async verifyProductRemoved(productName: string): Promise<boolean> {
        console.log(`Waiting for product "${productName}" to be removed from the cart...`);
        const isRemoved = await this.waitForElementToDisappear(
            `//*[contains(@content-desc, "test-Item title") and @text="${productName}"]`
        );
        console.log(`Product "${productName}" removed:`, isRemoved);
        return isRemoved;
    }

    // Getters for selectors to be used externally
    public getProductNameSelector(): string {
        return this.selectors.productNameSelector;
    }

    public getProductPriceSelector(): string {
        return this.selectors.productPriceSelector;
    }
}
