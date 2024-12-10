import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';
import { iOSSelectors } from '../../utils/iOSSelectors';

export class ProductListScreen extends BaseScreen {
    protected productsTitleSelector: string;
    protected toggleButtonSelector: string;
    protected modalSelectorButtonSelector: string;
    protected addToCartButtonSelector: string;
    protected removeButtonSelector: string;
    protected itemTitleSelector: string;
    protected priceSelector: string;
    protected cartBadgeSelector: string;
    protected cartButtonSelector: string;
    private platform: string;

    constructor(platform: string) {
        super();
        this.platform = platform;
        const selectors = platform === 'Android' ? AndroidSelectors : iOSSelectors;
        this.productsTitleSelector = selectors.productsTitleSelector;
        this.toggleButtonSelector = selectors.toggleButtonSelector;
        this.modalSelectorButtonSelector = selectors.modalSelectorButtonSelector;
        this.addToCartButtonSelector = selectors.addToCartButtonSelector;
        this.removeButtonSelector = selectors.removeButtonSelector;
        this.itemTitleSelector = selectors.itemTitleSelector;
        this.priceSelector = selectors.priceSelector;
        this.cartBadgeSelector = selectors.cartBadgeSelector;
        this.cartButtonSelector = selectors.cartButtonSelector;
    }

    /**
     * Checks if at least one "Add to Cart" button is visible.
     * @returns {Promise<boolean>} - True if at least one button is visible, otherwise false.
     */
    async isAnyAddToCartButtonVisible(): Promise<boolean> {
        console.log('Checking if any "Add to Cart" button is visible...');
    
        try {
            await this.waitForDisplayed(this.addToCartButtonSelector);
            console.log('"Add to Cart" button is visible.');
            return true;
        } catch (error) {
            console.log('"Add to Cart" button is not visible within the timeout.');
            return false;
        }
    }

    /**
     * Verifies if unique elements specific to the product list screen are visible.
     * @returns {Promise<boolean>} - True if all elements are visible, otherwise false.
     */
    async verifyUniqueElements(): Promise<boolean> {
        await this.scrollTo(this.productsTitleSelector);
        const productsTitleDisplayed = await this.isElementDisplayed(this.productsTitleSelector);
        console.log('Products title displayed:', productsTitleDisplayed);

        await this.scrollTo(this.toggleButtonSelector);
        const toggleButtonDisplayed = await this.isElementDisplayed(this.toggleButtonSelector);
        console.log('Toggle button displayed:', toggleButtonDisplayed);

        await this.scrollTo(this.modalSelectorButtonSelector);
        const modalSelectorButtonDisplayed = await this.isElementDisplayed(this.modalSelectorButtonSelector);
        console.log('Modal Selector Button displayed:', modalSelectorButtonDisplayed);

        return productsTitleDisplayed && toggleButtonDisplayed && modalSelectorButtonDisplayed;
    }

    /**
     * Verifies if product titles, prices, and "Add to Cart" buttons are visible.
     * @returns {Promise<boolean>} - True if all elements are visible, otherwise false.
     */
    async verifyProductAndAddToCartButtons(): Promise<boolean> {
        await this.scrollTo(this.itemTitleSelector);
        const itemsDisplayed = await this.isElementDisplayed(this.itemTitleSelector);

        await this.scrollTo(this.priceSelector);
        const pricesDisplayed = await this.isElementDisplayed(this.priceSelector);

        await this.scrollTo(this.addToCartButtonSelector);
        const addToCartButtonsDisplayed = await this.isElementDisplayed(this.addToCartButtonSelector);

        console.log('Product titles displayed:', itemsDisplayed);
        console.log('Prices displayed:', pricesDisplayed);
        console.log('Add to Cart buttons displayed:', addToCartButtonsDisplayed);

        return itemsDisplayed && pricesDisplayed && addToCartButtonsDisplayed;
    }

    /**
     * Checks if an item is added to the cart by verifying the presence of the "Remove" button and cart badge.
     * @returns {Promise<boolean>} - True if both elements are visible, otherwise false.
     */
    async checkIfElementAddedToCart(): Promise<boolean> {
        const removeButtonDisplayed = await this.isElementDisplayed(this.removeButtonSelector);
        console.log('Remove button displayed:', removeButtonDisplayed);

        const cartBadgeDisplayed = await this.isElementDisplayed(this.cartBadgeSelector);
        console.log('Cart badge displayed:', cartBadgeDisplayed);

        return removeButtonDisplayed && cartBadgeDisplayed;
    }

    /**
     * Navigates to the cart page.
     * Uses platform-specific methods for iOS and Android.
     * @returns {Promise<void>} - Resolves once the navigation is complete.
     */
    async navigateToCart(): Promise<void> {
        console.log('Navigating to the cart...');

        if (this.platform === 'iOS') {
            console.log('iOS-specific cart navigation using coordinates...');
            const cartElement = await $(this.cartButtonSelector);
            const elementId = await cartElement.elementId;
            const rect = await browser.getElementRect(elementId);

            const x = Math.floor(rect.x + rect.width - 1);
            const y = Math.floor(rect.y + rect.height - 1);

            console.log(`Clicking on cart button at coordinates: (${x}, ${y})`);

            await driver.performActions([
                {
                    type: 'pointer',
                    id: 'finger1',
                    parameters: { pointerType: 'touch' },
                    actions: [
                        { type: 'pointerMove', duration: 0, x, y },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pointerUp', button: 0 },
                    ],
                },
            ]);

            console.log('Tapped on the cart button in the bottom right corner (iOS).');
        } else if (this.platform === 'Android') {
            console.log('Android-specific cart navigation using direct click...');
            try {
                await $(this.cartButtonSelector).click();
                console.log('Tapped on the cart button successfully (Android).');
            } catch (error) {
                console.error('Failed to tap on the cart button (Android):', error);
                throw error;
            }
        }
    }

    /**
     * Returns the selector for item titles.
     * @returns {string} - The item title selector.
     */
    public getItemTitleSelector(): string {
        return this.itemTitleSelector;
    }

    /**
     * Returns the selector for product prices.
     * @returns {string} - The price selector.
     */
    public getPriceSelector(): string {
        return this.priceSelector;
    }

    /**
     * Returns the selector for "Add to Cart" buttons.
     * @returns {string} - The "Add to Cart" button selector.
     */
    public getAddToCartButtonSelector(): string {
        return this.addToCartButtonSelector;
    }
}
