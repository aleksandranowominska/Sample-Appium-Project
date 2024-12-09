import { FooterScreen as FooterScreenIOS } from '../pageobjects/screens_iOS/FooterScreen';
import { FooterScreen as FooterScreenAndroid } from '../pageobjects/screens_Android/FooterScreen';

export class FooterSteps {
    private footerScreen: FooterScreenIOS | FooterScreenAndroid;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing FooterSteps for platform: ${platform}`);

        if (platform === 'Android') {
            this.footerScreen = new FooterScreenAndroid();
        } else {
            this.footerScreen = new FooterScreenIOS();
        }
    }

    async verifyFooter(): Promise<void> {
        console.log('Verifying footer elements...');
        const allFooterElementsDisplayed = await this.footerScreen.verifyFooterElements();
        console.log('All footer elements displayed:', allFooterElementsDisplayed);

        if (!allFooterElementsDisplayed) {
            throw new Error('Not all footer elements are displayed correctly');
        }
    }
}
