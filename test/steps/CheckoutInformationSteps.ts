import * as dotenv from 'dotenv';
import { CheckoutInformationScreen } from '../pageobjects/screens_iOS/CheckoutInformationScreen';

// Load environment variables from .env file
dotenv.config();

export class CheckoutInformationSteps {
    private checkoutInformationScreen = new CheckoutInformationScreen();

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
