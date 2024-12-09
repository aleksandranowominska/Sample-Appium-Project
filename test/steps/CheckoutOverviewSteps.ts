import * as dotenv from 'dotenv';
import { CheckoutOverviewScreen } from '../pageobjects/screens/CheckoutOverviewScreen';

// Load environment variables from .env file
dotenv.config();

export class CheckoutOverviewSteps {
    private checkoutOverviewScreen: CheckoutOverviewScreen;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing CheckoutOverviewSteps for platform: ${platform}`);
        this.checkoutOverviewScreen = new CheckoutOverviewScreen(platform);
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
    getCheckoutOverviewScreen(): CheckoutOverviewScreen {
        return this.checkoutOverviewScreen;
    }
}
