import { BaseScreen } from '../BaseScreen';
import { BaseSelectors } from './BaseSelectors';

export class HeaderScreen extends BaseScreen {
    private menuSelector = BaseSelectors.menuSelector;
    private cartSelector = BaseSelectors.cartButtonSelector;
    private swagLogoSelector = BaseSelectors.swagLogoSelector;

    async waitForDisplayedElements(): Promise<void> {
        await this.waitForDisplayed(this.menuSelector);
        await this.waitForDisplayed(this.cartSelector);
        await this.waitForDisplayed(this.swagLogoSelector);
    }
}
