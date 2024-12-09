import * as dotenv from 'dotenv';
import { CheckoutCompleteScreen as CheckoutCompleteScreenIOS } from '../pageobjects/screens_iOS/CheckoutCompleteScreen';
import { CheckoutCompleteScreen as CheckoutCompleteScreenAndroid } from '../pageobjects/screens_Android/CheckoutCompleteScreen';

// Load environment variables from .env file
dotenv.config();

export class CheckoutCompleteSteps {
    private checkoutCompleteScreen: CheckoutCompleteScreenIOS | CheckoutCompleteScreenAndroid;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing CheckoutCompleteSteps for platform: ${platform}`);

        if (platform === 'Android') {
            this.checkoutCompleteScreen = new CheckoutCompleteScreenAndroid();
        } else {
            this.checkoutCompleteScreen = new CheckoutCompleteScreenIOS();
        }
    }

    async verifyCheckoutCompleteElements(): Promise<boolean> {
        console.log('Verifying checkout complete elements...');
        const elementsDisplayed = await this.checkoutCompleteScreen.verifyCheckoutCompleteElements();
        console.log('All checkout complete elements are displayed:', elementsDisplayed);
        return elementsDisplayed;
    }
}
