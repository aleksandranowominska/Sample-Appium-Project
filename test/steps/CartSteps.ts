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

    /**
     * Verifies if all cart elements are displayed on the cart page.
     * Throws an error if any element is missing.
     * @returns {Promise<void>} - Resolves once all elements are verified.
     */
    async verifyCartElements(): Promise<void> {
        console.log('Verifying cart elements...');
        const cartElementsDisplayed = await this.cartScreen.verifyCartElements();
        console.log('All cart elements are displayed:', cartElementsDisplayed);
        expect(cartElementsDisplayed).toBe(true);
    }

    /**
     * Verifies if the product quantity in the cart matches the expected quantity.
     * Throws an error if the quantities do not match.
     * @param {string} expectedQuantity - The expected quantity of the product.
     * @returns {Promise<void>} - Resolves once the quantity is verified.
     */
    async verifyProductQuantity(expectedQuantity: string): Promise<void> {
        console.log('Verifying product quantity in cart...');
        const quantityMatches = await this.cartScreen.verifyProductQuantity(expectedQuantity);
        console.log('Product quantity matches:', quantityMatches);
        expect(quantityMatches).toBe(true);
    }

    /**
     * Proceeds to the checkout page by tapping the "Checkout" button.
     * @returns {Promise<void>} - Resolves once the checkout button is tapped.
     */
    async tapCheckoutButton(): Promise<void> {
        console.log('Proceeding to checkout...');
        await this.cartScreen.tapCheckoutButton();
        console.log('Proceeded to checkout.');
    }

    /**
     * Removes a product from the cart and verifies its removal.
     * Throws an error if the product is not successfully removed.
     * @param {string} productName - The name of the product to remove.
     * @returns {Promise<void>} - Resolves once the product is removed and verified.
     */
    async removeProductAndVerifyRemoval(productName: string): Promise<void> {
        console.log(`Removing product: ${productName}`);
        await this.cartScreen.tapRemoveButton();

        const productSelector = `//android.widget.TextView[@text="${productName}"]`;
        await this.cartScreen.waitForElementToDisappear(productSelector);
        console.log(`Product "${productName}" successfully removed from the cart.`);
    }

    /**
     * Returns the instance of `CartScreen` for external use.
     * @returns {CartScreen} - The instance of `CartScreen`.
     */
    getCartScreen(): CartScreen {
        return this.cartScreen;
    }
}
