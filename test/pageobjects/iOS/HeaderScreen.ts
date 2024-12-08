import { BaseScreen } from '../BaseScreen';

export class HeaderScreen extends BaseScreen {
    private menuSelector = '//XCUIElementTypeOther[@name="test-Menu"]';
    private cartSelector = '//XCUIElementTypeOther[@name="test-Cart"]';
    private swagLogoSelector = '//XCUIElementTypeImage[@name="assets/src/img/swag-labs-logo.png"]';

    async waitForDisplayedElements(): Promise<void> {
        await this.waitForDisplayed(this.menuSelector);
        await this.waitForDisplayed(this.cartSelector);
        await this.waitForDisplayed(this.swagLogoSelector);
    }
}
