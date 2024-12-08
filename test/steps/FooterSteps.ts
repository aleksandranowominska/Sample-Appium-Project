import { FooterScreen } from '../pageobjects/screens_iOS/FooterScreen';

export class FooterSteps {
    private footerScreen: FooterScreen;

    constructor() {
        this.footerScreen = new FooterScreen();
    }

    async verifyFooter(): Promise<void> {
        const allFooterElementsDisplayed = await this.footerScreen.verifyFooterElements();
        console.log('All footer elements displayed:', allFooterElementsDisplayed);

        if (!allFooterElementsDisplayed) {
            throw new Error('Not all footer elements are displayed correctly');
        }
    }
}
