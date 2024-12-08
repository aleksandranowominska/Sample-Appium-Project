import { iOSSelectors } from '../../utils/iOSSelectors';
import { BaseScreen } from '../../utils/BaseScreen';

export class CheckoutCompleteScreen extends BaseScreen {
    private checkoutCompleteTitleSelector = iOSSelectors.checkoutCompleteTitleSelector;
    private thankYouMessageSelector = iOSSelectors.thankYouMessageSelector;
    private orderDispatchedMessageSelector = iOSSelectors.orderDispatchedMessageSelector;
    private ponyExpressImageSelector = iOSSelectors.ponyExpressImageSelector;
    private backHomeButtonSelector = iOSSelectors.backHomeButtonSelector;

    async verifyCheckoutCompleteElements(): Promise<boolean> {
        const elementsToCheck = [
            this.checkoutCompleteTitleSelector,
            this.thankYouMessageSelector,
            this.orderDispatchedMessageSelector,
            this.ponyExpressImageSelector,
            this.backHomeButtonSelector,
        ];

        for (const selector of elementsToCheck) {
            await this.scrollTo(selector); // Scroll to ensure element is visible
            const isDisplayed = await this.isElementDisplayed(selector);
            console.log(`Element ${selector} is displayed: ${isDisplayed}`);
            if (!isDisplayed) {
                return false;
            }
        }

        return true;
    }
}
