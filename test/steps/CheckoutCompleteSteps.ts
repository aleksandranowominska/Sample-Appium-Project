import { CheckoutCompleteScreen } from '../pageobjects/screens/CheckoutCompleteScreen';

export class CheckoutCompleteSteps {
    private checkoutCompleteScreen: CheckoutCompleteScreen;

    constructor() {
        this.checkoutCompleteScreen = new CheckoutCompleteScreen();
    }

    async verifyCheckoutCompleteElements(): Promise<boolean> {
        console.log('Verifying checkout complete elements...');
        const elementsDisplayed = await this.checkoutCompleteScreen.verifyCheckoutCompleteElements();
        console.log('All checkout complete elements are displayed:', elementsDisplayed);
        return elementsDisplayed;
    }    
}
