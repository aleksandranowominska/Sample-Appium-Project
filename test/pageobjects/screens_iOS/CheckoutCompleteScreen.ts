import { BaseSelectors } from '../../utils/iOSSelectors';
import { BaseScreen } from '../../utils/BaseScreen';

export class CheckoutCompleteScreen extends BaseScreen {
    private checkoutCompleteTitleSelector = BaseSelectors.checkoutCompleteTitleSelector;
    private thankYouMessageSelector = BaseSelectors.thankYouMessageSelector;
    private orderDispatchedMessageSelector = BaseSelectors.orderDispatchedMessageSelector;
    private ponyExpressImageSelector = BaseSelectors.ponyExpressImageSelector;
    private backHomeButtonSelector = BaseSelectors.backHomeButtonSelector;

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
