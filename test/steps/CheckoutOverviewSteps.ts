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

    /**
     * Verifies if all key elements on the checkout overview screen are displayed.
     * Throws an error if any element is missing.
     * @returns {Promise<void>} - Resolves once all elements are verified.
     */
    async verifyCheckoutOverviewElements(): Promise<void> {
        console.log('Verifying checkout overview elements...');
        const elementsDisplayed = await this.checkoutOverviewScreen.verifyCheckoutOverviewElements();
        console.log('All checkout overview elements are displayed:', elementsDisplayed);
        expect(elementsDisplayed).toBe(true);
    }

    /**
     * Verifies if the total price calculation on the checkout overview screen is correct.
     * Compares the displayed total with the sum of item total and tax.
     * Throws an error if the total is incorrect.
     * @returns {Promise<void>} - Resolves once the total price is verified.
     */
    async verifyTotalPrice(): Promise<void> {
        console.log('Verifying total price calculation...');
        const totalMatches = await this.checkoutOverviewScreen.verifyTotalPrice();
        console.log('Total price calculation is correct:', totalMatches);
        expect(totalMatches).toBe(true);
    }

    /**
     * Completes the checkout process by tapping the "Finish" button.
     * @returns {Promise<void>} - Resolves once the finish button is tapped.
     */
    async tapFinish(): Promise<void> {
        console.log('Tapping Finish button...');
        await this.checkoutOverviewScreen.tapFinish();
        console.log('Checkout process completed.');
    }

    /**
     * Returns the instance of `CheckoutOverviewScreen` for external use.
     * @returns {CheckoutOverviewScreen} - The instance of `CheckoutOverviewScreen`.
     */
    getCheckoutOverviewScreen(): CheckoutOverviewScreen {
        return this.checkoutOverviewScreen;
    }
}
