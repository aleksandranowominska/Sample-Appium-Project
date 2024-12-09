import * as dotenv from 'dotenv';
import { CheckoutOverviewScreen as CheckoutOverviewScreenIOS } from '../pageobjects/screens_iOS/CheckoutOverviewScreen';
import { CheckoutOverviewScreen as CheckoutOverviewScreenAndroid } from '../pageobjects/screens_Android/CheckoutOverviewScreen';

// Load environment variables from .env file
dotenv.config();

export class CheckoutOverviewSteps {
    private checkoutOverviewScreen: CheckoutOverviewScreenIOS | CheckoutOverviewScreenAndroid;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing CheckoutOverviewSteps for platform: ${platform}`);

        if (platform === 'Android') {
            this.checkoutOverviewScreen = new CheckoutOverviewScreenAndroid();
        } else {
            this.checkoutOverviewScreen = new CheckoutOverviewScreenIOS();
        }
    }

    async verifyCheckoutOverviewElements(): Promise<void> {
        console.log('Verifying checkout overview elements...');
        const elementsDisplayed = await this.checkoutOverviewScreen.verifyCheckoutOverviewElements();
        console.log('All checkout overview elements are displayed:', elementsDisplayed);
        expect(elementsDisplayed).toBe(true);
    }

    async verifyTotalPrice(): Promise<void> {
        console.log('Verifying total price calculation...');
        const totalMatches = await this.checkoutOverviewScreen.verifyTotalPrice();
        console.log('Total price calculation is correct:', totalMatches);
        expect(totalMatches).toBe(true);
    }

    async tapFinish(): Promise<void> {
        console.log('Tapping Finish button...');
        await this.checkoutOverviewScreen.tapFinish();
        console.log('Checkout process completed.');
    }

    // Getter for CheckoutOverviewScreen
    getCheckoutOverviewScreen(): CheckoutOverviewScreenIOS | CheckoutOverviewScreenAndroid {
        return this.checkoutOverviewScreen;
    }
}
