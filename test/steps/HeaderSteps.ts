import { HeaderScreen } from '../pageobjects/screens/HeaderScreen';

export class HeaderSteps {
    private headerScreen: HeaderScreen;

    constructor() {
        const platform = process.env.PLATFORM || 'iOS';
        console.log(`Initializing HeaderSteps for platform: ${platform}`);
        this.headerScreen = new HeaderScreen(platform);
    }

    async waitForHeaderElements(): Promise<void> {
        console.log('Waiting for header elements to be displayed...');
        await this.headerScreen.waitForDisplayedElements();
    }
}
