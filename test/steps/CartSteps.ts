import { CartScreen } from '../pageobjects/screens/CartScreen';

export class CartSteps {
    private cartScreen: CartScreen;

    constructor() {
        this.cartScreen = new CartScreen();
    }

    /**
     * Verifies if the cart page is visible by checking the "Checkout" button.
     * Throws an error if the "Checkout" button is not displayed.
     * @returns {Promise<void>} - Resolves once the visibility is verified.
     */
    async verifyPageIsVisible(): Promise<void> {
        console.log('Verifying if the cart page is visible...');
        const isPageVisible = await this.cartScreen.isCheckoutButtonVisible();
        console.log('Is the cart page visible ("Checkout" button displayed):', isPageVisible);

        if (!isPageVisible) {
            throw new Error('The cart page is not visible. The "Checkout" button is not displayed.');
        }

        expect(isPageVisible).toBe(true);
    }
    async verifyCartElements(): Promise<void> {
        console.log('Verifying cart elements...');
        const cartElementsDisplayed = await this.cartScreen.verifyCartElements();
        console.log('All cart elements are displayed:', cartElementsDisplayed);
        expect(cartElementsDisplayed).toBe(true);
    }

    async verifyProductQuantity(expectedQuantity: string): Promise<void> {
        console.log('Verifying product quantity in cart...');
        const quantityMatches = await this.cartScreen.verifyProductQuantity(expectedQuantity);
        console.log('Product quantity matches:', quantityMatches);
        expect(quantityMatches).toBe(true);
    }

    async tapCheckoutButton(): Promise<void> {
        console.log('Proceeding to checkout...');
        await this.cartScreen.tapCheckoutButton();
        console.log('Proceeded to checkout.');
    }

    async removeProductAndVerifyRemoval(productName: string): Promise<void> {
        console.log(`Removing product: ${productName}`);
        await this.cartScreen.tapRemoveButton();

        const productSelector = `//android.widget.TextView[@text="${productName}"]`;
        await this.cartScreen.waitForElementToDisappear(productSelector);
        console.log(`Product "${productName}" successfully removed from the cart.`);
    }  

    getCartScreen(): CartScreen {
        return this.cartScreen;
    }
}
