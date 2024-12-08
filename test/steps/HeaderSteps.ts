import { HeaderScreen } from '../pageobjects/screens_iOS/HeaderScreen';

export class HeaderSteps {
    private headerScreen = new HeaderScreen();

    async waitForHeaderElements(): Promise<void> {
        console.log('Waiting for header elements to be displayed...');
        await this.headerScreen.waitForDisplayedElements();
    }
}
