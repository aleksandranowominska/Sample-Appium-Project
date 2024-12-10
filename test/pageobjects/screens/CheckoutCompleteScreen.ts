import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';
import { iOSSelectors } from '../../utils/iOSSelectors';

export class CheckoutCompleteScreen extends BaseScreen {
    private selectors: typeof AndroidSelectors | typeof iOSSelectors;

    constructor() {
        super();
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing CheckoutCompleteScreen for platform: ${platform}`);
        this.selectors = platform === 'Android' ? AndroidSelectors : iOSSelectors;
    }

    /**
     * Verifies if all key elements on the checkout complete screen are displayed.
     * @returns {Promise<boolean>} - True if all elements are displayed, otherwise false.
     */
    async verifyCheckoutCompleteElements(): Promise<boolean> {
        const elementsToCheck = [
            this.selectors.checkoutCompleteTitleSelector,
            this.selectors.thankYouMessageSelector,
            this.selectors.orderDispatchedMessageSelector,
            this.selectors.ponyExpressImageSelector,
            this.selectors.backHomeButtonSelector,
        ];

        console.log('Verifying checkout complete elements...');
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
