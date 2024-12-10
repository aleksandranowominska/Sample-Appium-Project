import { FooterScreen } from '../pageobjects/screens/FooterScreen';

export class FooterSteps {
    private footerScreen: FooterScreen;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing FooterSteps for platform: ${platform}`);
        this.footerScreen = new FooterScreen(platform);
    }

    /**
     * Verifies if all footer elements are displayed on the screen.
     * Logs the result and throws an error if any element is not displayed.
     * @returns {Promise<void>} - Resolves once all footer elements are verified.
     */
    async verifyFooter(): Promise<void> {
        console.log('Verifying footer elements...');
        const allFooterElementsDisplayed = await this.footerScreen.verifyFooterElements();
        console.log('All footer elements displayed:', allFooterElementsDisplayed);

        if (!allFooterElementsDisplayed) {
            throw new Error('Not all footer elements are displayed correctly');
        }
    }
}
