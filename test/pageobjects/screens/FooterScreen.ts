import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class FooterScreen extends BaseScreen {
    private footerTextSelector: string;
    private termsTextSelector: string;
    private swagBotImageSelector: string;

    constructor() {
        super();
        this.footerTextSelector = AndroidSelectors.footerTextSelector;
        this.termsTextSelector = AndroidSelectors.termsTextSelector;
        this.swagBotImageSelector = AndroidSelectors.swagBotImageSelector;
    }

    /**
    * Asserts that all footer elements are displayed.
    * The elements include:
    * - Footer text
    * - Terms and conditions text
    * - Swag Bot image
    * Throws an error if any element is not visible.
    * @returns {Promise<void>}
    */
    async assertFooterElementsVisible(): Promise<void> {
        const failedElements: string[] = [];

        // Footer text
        await this.scrollTo(this.footerTextSelector);
        const footerTextDisplayed = await this.isElementDisplayed(this.footerTextSelector);
        console.log('Footer text displayed:', footerTextDisplayed);
        if (!footerTextDisplayed) failedElements.push('footerText');

        // Terms text
        await this.scrollTo(this.termsTextSelector);
        const termsTextDisplayed = await this.isElementDisplayed(this.termsTextSelector);
        console.log('Terms text displayed:', termsTextDisplayed);
        if (!termsTextDisplayed) failedElements.push('termsText');

        // Swag Bot image
        await this.scrollTo(this.swagBotImageSelector);
        const swagBotImageDisplayed = await this.isElementDisplayed(this.swagBotImageSelector);
        console.log('Swag Bot image displayed:', swagBotImageDisplayed);
        if (!swagBotImageDisplayed) failedElements.push('swagBotImage');

        if (failedElements.length > 0) {
            throw new Error(`Missing footer elements: ${failedElements.join(', ')}`);
        }

        console.log('All footer elements are visible.');
    }

}
