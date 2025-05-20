import { CheckoutCompleteScreen } from '../pageobjects/screens/CheckoutCompleteScreen';

export class CheckoutCompleteSteps {
    private checkoutCompleteScreen: CheckoutCompleteScreen;

    constructor() {
        this.checkoutCompleteScreen = new CheckoutCompleteScreen();
    }

    /**
     * Verifies if all key elements on the checkout complete screen are displayed.
     * Logs the status of each element and returns a boolean indicating the result.
     * @returns {Promise<boolean>} - True if all elements are displayed, otherwise false.
     */
    async verifyCheckoutCompleteElements(): Promise<void> {
        console.log('Verifying checkout complete elements...');
        const elementsDisplayed = await this.checkoutCompleteScreen.assertCheckoutCompleteElementsVisible();
        return elementsDisplayed;
    }
}
