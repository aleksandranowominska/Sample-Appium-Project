import { CartScreen } from '../pageobjects/screens_iOS/CartScreen';

export class CartSteps {
    private cartScreen = new CartScreen();

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

    // Getter for CartScreen
    getCartScreen(): CartScreen {
        return this.cartScreen;
    }
}
