import { BaseScreen } from '../BaseScreen';

export class FooterScreen extends BaseScreen {
    private footerTextSelector = '//XCUIElementTypeStaticText[@name="© 2024 Sauce Labs. All Rights Reserved."]';
    private termsTextSelector = '//XCUIElementTypeStaticText[@name="Terms of Service | Privacy Policy"]';
    private swagBotImageSelector = '//XCUIElementTypeImage[@name="assets/src/img/footer-swagbot.png"]';

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
