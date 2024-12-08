import { BaseScreen } from '../../utils/BaseScreen';
import { iOSSelectors } from '../../utils/iOSSelectors';

export class FooterScreen extends BaseScreen {
    private footerTextSelector = iOSSelectors.footerTextSelector;
    private termsTextSelector = iOSSelectors.termsTextSelector;
    private swagBotImageSelector = iOSSelectors.swagBotImageSelector;

    async verifyFooterElements(): Promise<boolean> {
        await this.scrollTo(this.footerTextSelector);
        const footerTextDisplayed = await this.isElementDisplayed(this.footerTextSelector);
        console.log('Footer text displayed:', footerTextDisplayed);

        await this.scrollTo(this.termsTextSelector);
        const termsTextDisplayed = await this.isElementDisplayed(this.termsTextSelector);
        console.log('Terms text displayed:', termsTextDisplayed);

        await this.scrollTo(this.swagBotImageSelector);
        const swagBotImageDisplayed = await this.isElementDisplayed(this.swagBotImageSelector);
        console.log('Swag Bot image displayed:', swagBotImageDisplayed);

        return footerTextDisplayed && termsTextDisplayed && swagBotImageDisplayed;
    }
}
