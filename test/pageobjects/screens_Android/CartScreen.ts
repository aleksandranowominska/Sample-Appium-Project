import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class CartScreen extends BaseScreen {
    private yourCartSelector = AndroidSelectors.yourCartSelector;
    private qtySelector = AndroidSelectors.qtySelector;
    private descriptionSelector = AndroidSelectors.descriptionSelector;
    private amountSelector = AndroidSelectors.amountSelector;
    private productQtySelector = AndroidSelectors.productQtySelector;
    private productNameSelector = AndroidSelectors.productNameSelector;
    private productPriceSelector = AndroidSelectors.productPriceSelector;
    private removeButtonSelector = AndroidSelectors.removeButtonSelector;
    private continueShoppingButtonSelector = AndroidSelectors.continueShoppingButtonSelector;
    private checkoutButtonSelector = AndroidSelectors.checkoutButtonSelector;

    // Method to verify if all cart elements are displayed
    async verifyCartElements(): Promise<boolean> {
        const elementsToCheck = [
            this.yourCartSelector,
            this.qtySelector,
            this.descriptionSelector,
            this.amountSelector,
            this.removeButtonSelector,
            this.continueShoppingButtonSelector,
            this.checkoutButtonSelector,
        ];

        const elementsDisplayed = await Promise.all(
            elementsToCheck.map((selector) => this.isElementDisplayed(selector))
        );

        console.log('Cart elements displayed status:', elementsDisplayed);
        return elementsDisplayed.every((displayed) => displayed === true);
    }

    // Method to verify product quantity
    async verifyProductQuantity(expectedQuantity: string): Promise<boolean> {
        const actualQuantity = await this.getElementText(this.productQtySelector);
        console.log(`Expected quantity: ${expectedQuantity}, Actual quantity: ${actualQuantity}`);
        return actualQuantity === expectedQuantity;
    }

    // Method to tap on the Checkout button
    async tapCheckoutButton(): Promise<void> {
        console.log('Tapping on the Checkout button...');
        await this.tapElement(this.checkoutButtonSelector);
        console.log('Tapped on the Checkout button.');
    }

    // Getters for selectors to be used in external utilities or steps
    public getProductNameSelector(): string {
        return this.productNameSelector;
    }

    public getProductPriceSelector(): string {
        return this.productPriceSelector;
    }
}
