import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class HeaderScreen extends BaseScreen {
    private menuSelector: string;
    private cartSelector: string;
    private swagLogoSelector: string;

    constructor() {
        super();
        this.menuSelector = AndroidSelectors.menuSelector;
        this.cartSelector = AndroidSelectors.cartButtonSelector;
        this.swagLogoSelector = AndroidSelectors.headerSwagLogoSelector;
    }

    /**
     * Asserts that all key header elements are displayed.
     * The elements include:
     * - Menu button
     * - Cart button
     * - Swag logo
     * Throws an error if any element is not visible.
     * @returns {Promise<void>}
     */
    async assertHeaderElementsVisible(): Promise<void> {
        console.log('Asserting visibility of header elements...');
        const failedElements: string[] = [];

        const elements = [
            { name: 'menuSelector', selector: this.menuSelector },
            { name: 'cartSelector', selector: this.cartSelector },
            { name: 'swagLogoSelector', selector: this.swagLogoSelector },
        ];

        for (const { name, selector } of elements) {
            try {
                await this.waitForDisplayed(selector);
                console.log(`${name} displayed.`);
            } catch (error) {
                console.error(`${name} NOT displayed.`);
                failedElements.push(name);
            }
        }

        if (failedElements.length > 0) {
            throw new Error(`Header elements not visible: ${failedElements.join(', ')}`);
        }

        console.log('All header elements are visible.');
    }

}
