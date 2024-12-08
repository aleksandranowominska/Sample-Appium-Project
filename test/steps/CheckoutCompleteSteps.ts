import { CheckoutCompleteScreen } from '../pageobjects/iOS/CheckoutCompleteScreen';

export class CheckoutCompleteSteps {
    private checkoutCompleteScreen: CheckoutCompleteScreen;

    constructor() {
        this.checkoutCompleteScreen = new CheckoutCompleteScreen();
    }

    async verifyCheckoutCompleteElements(): Promise<boolean> {
        return await this.checkoutCompleteScreen.verifyCheckoutCompleteElements();
    }
}
