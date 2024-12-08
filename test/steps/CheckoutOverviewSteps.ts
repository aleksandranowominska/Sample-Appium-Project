import { CheckoutOverviewScreen } from '../pageobjects/screens_iOS/CheckoutOverviewScreen';

export class CheckoutOverviewSteps {
    private checkoutOverviewScreen = new CheckoutOverviewScreen();

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
