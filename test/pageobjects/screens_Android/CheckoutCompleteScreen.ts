import { AndroidSelectors } from '../../utils/AndroidSelectors';
import { BaseScreen } from '../../utils/BaseScreen';

export class CheckoutCompleteScreen extends BaseScreen {
    private checkoutCompleteTitleSelector = AndroidSelectors.checkoutCompleteTitleSelector;
    private thankYouMessageSelector = AndroidSelectors.thankYouMessageSelector;
    private orderDispatchedMessageSelector = AndroidSelectors.orderDispatchedMessageSelector;
    private ponyExpressImageSelector = AndroidSelectors.ponyExpressImageSelector;
    private backHomeButtonSelector = AndroidSelectors.backHomeButtonSelector;

    async verifyCheckoutCompleteElements(): Promise<boolean> {
        const elementsToCheck = [
            this.checkoutCompleteTitleSelector,
            this.thankYouMessageSelector,
            this.orderDispatchedMessageSelector,
            this.ponyExpressImageSelector,
            this.backHomeButtonSelector,
        ];

        for (const selector of elementsToCheck) {
            await this.scrollTo(selector);
            const isDisplayed = await this.isElementDisplayed(selector);
            console.log(`Element ${selector} is displayed: ${isDisplayed}`);
            if (!isDisplayed) {
                return false;
            }
        }

        return true;
    }
}
