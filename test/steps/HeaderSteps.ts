import { HeaderScreen } from '../pageobjects/screens/HeaderScreen';

export class HeaderSteps {
    private headerScreen: HeaderScreen;

    constructor() {
        console.log('Initializing HeaderSteps for Android');
        this.headerScreen = new HeaderScreen();
    }

    /**
     * Waits for all header elements to be displayed on the screen.
     * Ensures that the menu button, cart button, and swag logo are visible.
     * Logs the process for debugging purposes.
     * @returns {Promise<void>} - Resolves once all header elements are displayed.
     */
    async waitForHeaderElements(): Promise<void> {
        console.log('Waiting for header elements to be displayed...');
        await this.headerScreen.assertHeaderElementsVisible();
    }
}
