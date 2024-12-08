import { BaseScreen } from '../../utils/BaseScreen';
import { iOSSelectors } from '../../utils/iOSSelectors';

export class CheckoutInformationScreen extends BaseScreen {
    private checkoutInformationTitleSelector = iOSSelectors.checkoutInformationTitleSelector;
    private firstNameFieldSelector = iOSSelectors.firstNameFieldSelector;
    private lastNameFieldSelector = iOSSelectors.lastNameFieldSelector;
    private zipCodeFieldSelector = iOSSelectors.zipCodeFieldSelector;
    private cancelButtonSelector = iOSSelectors.cancelButtonSelector;
    private continueButtonSelector = iOSSelectors.continueButtonSelector;

    async verifyCheckoutInformationElements(): Promise<boolean> {
        const elementsToCheck = [
            this.checkoutInformationTitleSelector,
            this.firstNameFieldSelector,
            this.lastNameFieldSelector,
            this.zipCodeFieldSelector,
            this.cancelButtonSelector,
            this.continueButtonSelector,
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
        await this.typeText(this.firstNameFieldSelector, firstName);
        console.log('Entered first name:', firstName);

        await this.typeText(this.lastNameFieldSelector, lastName);
        console.log('Entered last name:', lastName);

        await this.typeText(this.zipCodeFieldSelector, zipCode);
        console.log('Entered zip/postal code:', zipCode);
    }

    async tapContinue(): Promise<void> {
        console.log('Tapping on the Continue button...');
        await this.tapElement(this.continueButtonSelector);
        console.log('Tapped on the Continue button.');
    }

    async tapCancel(): Promise<void> {
        console.log('Tapping on the Cancel button...');
        await this.tapElement(this.cancelButtonSelector);
        console.log('Tapped on the Cancel button.');
    }
}
