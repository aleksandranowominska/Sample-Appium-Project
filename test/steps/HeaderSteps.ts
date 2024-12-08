import { HeaderScreen } from '../pageobjects/iOS/HeaderScreen';

export class HeaderSteps {
    private headerScreen = new HeaderScreen();

    async waitForHeaderElements(): Promise<void> {
        console.log('Waiting for header elements to be displayed...');
        await this.headerScreen.waitForDisplayedElements();
    }
}
