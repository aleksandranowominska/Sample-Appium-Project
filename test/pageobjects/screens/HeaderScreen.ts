import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';
import { iOSSelectors } from '../../utils/iOSSelectors';

export class HeaderScreen extends BaseScreen {
    private menuSelector: string;
    private cartSelector: string;
    private swagLogoSelector: string;

    constructor(platform: string) {
        super();
        if (platform === 'Android') {
            this.menuSelector = AndroidSelectors.menuSelector;
            this.cartSelector = AndroidSelectors.cartButtonSelector;
            this.swagLogoSelector = AndroidSelectors.headerSwagLogoSelector;
        } else {
            this.menuSelector = iOSSelectors.menuSelector;
            this.cartSelector = iOSSelectors.cartButtonSelector;
            this.swagLogoSelector = iOSSelectors.swagLogoSelector;
        }
    }

    async waitForDisplayedElements(): Promise<void> {
        console.log('Waiting for header elements to be displayed...');
        await this.waitForDisplayed(this.menuSelector);
        console.log('Menu selector displayed.');

        await this.waitForDisplayed(this.cartSelector);
        console.log('Cart button displayed.');

        await this.waitForDisplayed(this.swagLogoSelector);
        console.log('Swag logo displayed.');
    }
}
