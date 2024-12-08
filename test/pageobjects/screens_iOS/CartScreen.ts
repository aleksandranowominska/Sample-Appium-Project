import { BaseScreen } from '../../utils/BaseScreen';
import { BaseSelectors } from '../../utils/iOSSelectors';

export class CartScreen extends BaseScreen {
    private yourCartSelector = BaseSelectors.yourCartSelector;
    private qtySelector = BaseSelectors.qtySelector;
    private descriptionSelector = BaseSelectors.descriptionSelector;
    private amountSelector = BaseSelectors.amountSelector;
    private productQtySelector = BaseSelectors.productQtySelector;
    private productNameSelector = BaseSelectors.productNameSelector;
    private productPriceSelector = BaseSelectors.productPriceSelector;
    private removeButtonSelector = BaseSelectors.removeButtonSelector;
    private continueShoppingButtonSelector = BaseSelectors.continueShoppingButtonSelector;
    private checkoutButtonSelector = BaseSelectors.checkoutButtonSelector;

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
