import { CartScreen as CartScreenIOS } from '../pageobjects/screens_iOS/CartScreen';
import { CartScreen as CartScreenAndroid } from '../pageobjects/screens_Android/CartScreen';

export class CartSteps {
    private cartScreen: CartScreenIOS | CartScreenAndroid;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing CartSteps for platform: ${platform}`);

        if (platform === 'Android') {
            this.cartScreen = new CartScreenAndroid();
        } else {
            this.cartScreen = new CartScreenIOS();
        }
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

    // Getter for CartScreen
    getCartScreen(): CartScreenIOS | CartScreenAndroid {
        return this.cartScreen;
    }
}
