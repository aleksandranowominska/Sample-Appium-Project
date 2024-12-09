import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class HeaderScreen extends BaseScreen {
    private menuSelector = AndroidSelectors.menuSelector;
    private cartSelector = AndroidSelectors.cartButtonSelector;
    private swagLogoSelector = AndroidSelectors.swagLogoSelector;

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
