import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class CheckoutInformationScreen extends BaseScreen {
    private selectors: typeof AndroidSelectors;

    constructor() {
        super();
        this.selectors = AndroidSelectors;
    }

    /**
     * Asserts that all elements on the checkout information screen are displayed.
     * Throws an error if any element is missing.
     * @returns {Promise<void>}
     */
    async assertCheckoutInformationElementsVisible(): Promise<void> {
        const elementsToCheck = [
            this.selectors.checkoutInformationTitleSelector,
            this.selectors.firstNameFieldSelector,
            this.selectors.lastNameFieldSelector,
            this.selectors.zipCodeFieldSelector,
            this.selectors.cancelButtonSelector,
            this.selectors.continueButtonSelector,
        ];

        console.log('Asserting visibility of checkout information screen elements...');
        const failedElements: string[] = [];

        for (const selector of elementsToCheck) {
            const isDisplayed = await this.isElementDisplayed(selector);
            console.log(`Element ${selector} is displayed: ${isDisplayed}`);
            if (!isDisplayed) {
                failedElements.push(selector);
            }
        }

        if (failedElements.length > 0) {
            throw new Error(`Missing checkout information elements: ${failedElements.join(', ')}`);
        }

        console.log('All checkout information elements are visible.');
    }

    /**
     * Fills out the checkout form with the provided information.
     * @param {string} firstName - The first name to enter in the form.
     * @param {string} lastName - The last name to enter in the form.
     * @param {string} zipCode - The zip/postal code to enter in the form.
     */
    async fillOutCheckoutForm(firstName: string, lastName: string, zipCode: string): Promise<void> {
        console.log('Filling out the checkout form...');
        await this.typeText(this.selectors.firstNameFieldSelector, firstName);
        console.log('Entered first name:', firstName);

        await this.typeText(this.selectors.lastNameFieldSelector, lastName);
        console.log('Entered last name:', lastName);

        await this.typeText(this.selectors.zipCodeFieldSelector, zipCode);
        console.log('Entered zip/postal code:', zipCode);
    }

    /**
     * Taps on the Continue button to proceed with the checkout process.
     */
    async tapContinue(): Promise<void> {
        console.log('Tapping on the Continue button...');
        await this.tapElement(this.selectors.continueButtonSelector);
        console.log('Tapped on the Continue button.');
    }

    /**
     * Taps on the Cancel button to cancel the checkout process.
     */
    async tapCancel(): Promise<void> {
        console.log('Tapping on the Cancel button...');
        await this.tapElement(this.selectors.cancelButtonSelector);
        console.log('Tapped on the Cancel button.');
    }
}
