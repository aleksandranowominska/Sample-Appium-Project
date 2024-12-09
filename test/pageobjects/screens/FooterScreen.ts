import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';
import { iOSSelectors } from '../../utils/iOSSelectors';

export class FooterScreen extends BaseScreen {
    private footerTextSelector: string;
    private termsTextSelector: string;
    private swagBotImageSelector: string;

    constructor(platform: string) {
        super();
        if (platform === 'Android') {
            this.footerTextSelector = AndroidSelectors.footerTextSelector;
            this.termsTextSelector = AndroidSelectors.termsTextSelector;
            this.swagBotImageSelector = AndroidSelectors.swagBotImageSelector;
        } else {
            this.footerTextSelector = iOSSelectors.footerTextSelector;
            this.termsTextSelector = iOSSelectors.termsTextSelector;
            this.swagBotImageSelector = iOSSelectors.swagBotImageSelector;
        }
    }

    async verifyFooterElements(): Promise<boolean> {
        // Scroll to and verify footer text
        await this.scrollTo(this.footerTextSelector);
        const footerTextDisplayed = await this.isElementDisplayed(this.footerTextSelector);
        console.log('Footer text displayed:', footerTextDisplayed);

        // Scroll to and verify terms text
        await this.scrollTo(this.termsTextSelector);
        const termsTextDisplayed = await this.isElementDisplayed(this.termsTextSelector);
        console.log('Terms text displayed:', termsTextDisplayed);

        // Scroll to and verify swag bot image
        await this.scrollTo(this.swagBotImageSelector);
        const swagBotImageDisplayed = await this.isElementDisplayed(this.swagBotImageSelector);
        console.log('Swag Bot image displayed:', swagBotImageDisplayed);

        // Return true only if all elements are displayed
        return footerTextDisplayed && termsTextDisplayed && swagBotImageDisplayed;
    }
}
