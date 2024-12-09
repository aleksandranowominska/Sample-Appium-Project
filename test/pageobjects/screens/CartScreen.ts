import { BaseScreen } from '../../utils/BaseScreen';
import { iOSSelectors } from '../../utils/iOSSelectors';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class CartScreen extends BaseScreen {
    private selectors: typeof iOSSelectors | typeof AndroidSelectors;

    constructor() {
        super();
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing CartScreen for platform: ${platform}`);
        this.selectors = platform === 'Android' ? AndroidSelectors : iOSSelectors;
    }

    // Method to verify if all cart elements are displayed
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

    // Getters for selectors to be used externally
    public getProductNameSelector(): string {
        return this.selectors.productNameSelector;
    }

    public getProductPriceSelector(): string {
        return this.selectors.productPriceSelector;
    }
}
