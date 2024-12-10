import * as dotenv from 'dotenv';
import { CheckoutInformationScreen } from '../pageobjects/screens/CheckoutInformationScreen';

// Load environment variables from .env file
dotenv.config();

export class CheckoutInformationSteps {
    private checkoutInformationScreen: CheckoutInformationScreen;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing CheckoutInformationSteps for platform: ${platform}`);

        // Pass platform to dynamically select selectors
        this.checkoutInformationScreen = new CheckoutInformationScreen(platform);
    }

    /**
     * Verifies if all key elements on the checkout information screen are displayed.
     * Throws an error if any element is missing.
     * @returns {Promise<void>} - Resolves once all elements are verified.
     */
    async verifyCheckoutInformationElements(): Promise<void> {
        console.log('Verifying checkout information elements...');
        const elementsDisplayed = await this.checkoutInformationScreen.verifyCheckoutInformationElements();
        console.log('All checkout information elements are displayed:', elementsDisplayed);
        expect(elementsDisplayed).toBe(true);
    }

    /**
     * Fills out the checkout form using data from the `.env` file and proceeds by tapping the "Continue" button.
     * Throws an error if any required data is missing in the `.env` file.
     * @returns {Promise<void>} - Resolves once the form is completed and the "Continue" button is tapped.
     */
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
