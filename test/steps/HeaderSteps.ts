import { HeaderScreen as HeaderScreenIOS } from '../pageobjects/screens_iOS/HeaderScreen';
import { HeaderScreen as HeaderScreenAndroid } from '../pageobjects/screens_Android/HeaderScreen';

export class HeaderSteps {
    private headerScreen: HeaderScreenIOS | HeaderScreenAndroid;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing HeaderSteps for platform: ${platform}`);

        if (platform === 'Android') {
            this.headerScreen = new HeaderScreenAndroid();
        } else {
            this.headerScreen = new HeaderScreenIOS();
        }
    }

    async waitForHeaderElements(): Promise<void> {
        console.log('Waiting for header elements to be displayed...');
        await this.headerScreen.waitForDisplayedElements();
    }
}
