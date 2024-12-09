import * as dotenv from 'dotenv';
import { CheckoutInformationScreen as CheckoutInformationScreenIOS } from '../pageobjects/screens_iOS/CheckoutInformationScreen';
import { CheckoutInformationScreen as CheckoutInformationScreenAndroid } from '../pageobjects/screens_Android/CheckoutInformationScreen';

// Load environment variables from .env file
dotenv.config();

export class CheckoutInformationSteps {
    private checkoutInformationScreen: CheckoutInformationScreenIOS | CheckoutInformationScreenAndroid;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing CheckoutInformationSteps for platform: ${platform}`);

        if (platform === 'Android') {
            this.checkoutInformationScreen = new CheckoutInformationScreenAndroid();
        } else {
            this.checkoutInformationScreen = new CheckoutInformationScreenIOS();
        }
    }

    async verifyCheckoutInformationElements(): Promise<void> {
        console.log('Verifying checkout information elements...');
        const elementsDisplayed = await this.checkoutInformationScreen.verifyCheckoutInformationElements();
        console.log('All checkout information elements are displayed:', elementsDisplayed);
        expect(elementsDisplayed).toBe(true);
    }

    async fillOutCheckoutFormAndContinue(): Promise<void> {
        const firstName = process.env.FIRST_NAME || '';
        const lastName = process.env.LAST_NAME || '';
        const zipCode = process.env.ZIP_CODE || '';

        if (!firstName || !lastName || !zipCode) {
            throw new Error('Missing FIRST_NAME, LAST_NAME, or ZIP_CODE in .env file');
        }

        console.log(`Filling out checkout form with: ${firstName}, ${lastName}, ${zipCode}`);
        await this.checkoutInformationScreen.fillOutCheckoutForm(firstName, lastName, zipCode);
        await this.checkoutInformationScreen.tapContinue();
    }
}
