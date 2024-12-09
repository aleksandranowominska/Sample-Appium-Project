import { BaseScreen } from '../../utils/BaseScreen';
import { iOSSelectors } from '../../utils/iOSSelectors';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class CheckoutInformationScreen extends BaseScreen {
    private selectors: typeof iOSSelectors | typeof AndroidSelectors;

    constructor(platform: string) {
        super();
        // Assign selectors dynamically based on the platform
        if (platform === 'Android') {
            this.selectors = AndroidSelectors;
        } else {
            this.selectors = iOSSelectors;
        }
    }

    async verifyCheckoutInformationElements(): Promise<boolean> {
        const elementsToCheck = [
            this.selectors.checkoutInformationTitleSelector,
            this.selectors.firstNameFieldSelector,
            this.selectors.lastNameFieldSelector,
            this.selectors.zipCodeFieldSelector,
            this.selectors.cancelButtonSelector,
            this.selectors.continueButtonSelector,
        ];

        const elementsDisplayed = await Promise.all(
            elementsToCheck.map((selector) => this.isElementDisplayed(selector))
        );

        const allElementsDisplayed = elementsDisplayed.every((displayed) => displayed === true);
        console.log('All checkout information elements are displayed:', allElementsDisplayed);

        return allElementsDisplayed;
    }

    async fillOutCheckoutForm(firstName: string, lastName: string, zipCode: string): Promise<void> {
        console.log('Filling out the checkout form...');
        await this.typeText(this.selectors.firstNameFieldSelector, firstName);
        console.log('Entered first name:', firstName);

        await this.typeText(this.selectors.lastNameFieldSelector, lastName);
        console.log('Entered last name:', lastName);

        await this.typeText(this.selectors.zipCodeFieldSelector, zipCode);
        console.log('Entered zip/postal code:', zipCode);
    }

    async tapContinue(): Promise<void> {
        console.log('Tapping on the Continue button...');
        await this.tapElement(this.selectors.continueButtonSelector);
        console.log('Tapped on the Continue button.');
    }

    async tapCancel(): Promise<void> {
        console.log('Tapping on the Cancel button...');
        await this.tapElement(this.selectors.cancelButtonSelector);
        console.log('Tapped on the Cancel button.');
    }
}
