import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';
import { iOSSelectors } from '../../utils/iOSSelectors';

export class HeaderScreen extends BaseScreen {
    private menuSelector: string;
    private cartSelector: string;
    private swagLogoSelector: string;

    constructor(platform: string) {
        super();
        // Assign selectors dynamically based on the platform
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

    /**
     * Waits for all key header elements to be displayed on the screen.
     * The elements include:
     * - Menu button
     * - Cart button
     * - Swag logo
     * Logs a message for each element as it becomes visible.
     * @returns {Promise<void>} - Resolves once all elements are displayed.
     */
    async waitForDisplayedElements(): Promise<void> {
        console.log('Waiting for header elements to be displayed...');
        
        // Wait for the menu button to be displayed
        await this.waitForDisplayed(this.menuSelector);
        console.log('Menu selector displayed.');

        // Wait for the cart button to be displayed
        await this.waitForDisplayed(this.cartSelector);
        console.log('Cart button displayed.');

        // Wait for the swag logo to be displayed
        await this.waitForDisplayed(this.swagLogoSelector);
        console.log('Swag logo displayed.');
    }
}
