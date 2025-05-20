import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class CheckoutCompleteScreen extends BaseScreen {
    private selectors: typeof AndroidSelectors;

    constructor() {
        super();
        this.selectors = AndroidSelectors;
    }

    /**
     * Asserts that all key elements on the checkout complete screen are displayed.
     * Throws an error if any element is missing.
     * @returns {Promise<void>}
     */
    async assertCheckoutCompleteElementsVisible(): Promise<void> {
        const elementsToCheck = [
            this.selectors.checkoutCompleteTitleSelector,
            this.selectors.thankYouMessageSelector,
            this.selectors.orderDispatchedMessageSelector,
            this.selectors.ponyExpressImageSelector,
            this.selectors.backHomeButtonSelector,
        ];

        console.log('Asserting checkout complete elements visibility...');
        const failedElements: string[] = [];

        for (const selector of elementsToCheck) {
            await this.scrollTo(selector);
            const isDisplayed = await this.isElementDisplayed(selector);
            console.log(`Element ${selector} is displayed: ${isDisplayed}`);
            if (!isDisplayed) {
                failedElements.push(selector);
            }
        }

        if (failedElements.length > 0) {
            throw new Error(
                `The following checkout complete screen elements were not visible: ${failedElements.join(', ')}`
            );
        }

        console.log('All checkout complete elements are visible.');
    }

}
