import { BaseScreen } from '../../utils/BaseScreen';
import { iOSSelectors } from '../../utils/iOSSelectors';

export class HeaderScreen extends BaseScreen {
    private menuSelector = iOSSelectors.menuSelector;
    private cartSelector = iOSSelectors.cartButtonSelector;
    private swagLogoSelector = iOSSelectors.swagLogoSelector;

    async waitForDisplayedElements(): Promise<void> {
        await this.waitForDisplayed(this.menuSelector);
        await this.waitForDisplayed(this.cartSelector);
        await this.waitForDisplayed(this.swagLogoSelector);
    }
}
