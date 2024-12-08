import { BaseScreen } from '../BaseScreen';
import { BaseSelectors } from './BaseSelectors';

export class ProductListScreen extends BaseScreen {
    protected productsTitleSelector = BaseSelectors.productsTitleSelector;
    protected toggleButtonSelector = BaseSelectors.toggleButtonSelector;
    protected modalSelectorButtonSelector = BaseSelectors.modalSelectorButtonSelector;
    protected addToCartButtonSelector = BaseSelectors.addToCartButtonSelector;
    protected removeButtonSelector = BaseSelectors.removeButtonSelector;
    protected itemTitleSelector = BaseSelectors.itemTitleSelector;
    protected priceSelector = BaseSelectors.priceSelector;
    protected cartBadgeSelector = BaseSelectors.cartBadgeSelector;
    protected cartButtonSelector = BaseSelectors.cartButtonSelector;

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

    async checkIfElementAddedToCart(): Promise<boolean> {
        const removeButtonDisplayed = await this.isElementDisplayed(this.removeButtonSelector);
        console.log('Remove button displayed:', removeButtonDisplayed);

        const cartBadgeDisplayed = await this.isElementDisplayed(this.cartBadgeSelector);
        console.log('Cart badge displayed:', cartBadgeDisplayed);

        return removeButtonDisplayed && cartBadgeDisplayed;
    }

    async navigateToCart(): Promise<void> {
        console.log('Navigating to the cart...');
    
        // Find cart button
        const cartElement = await $(this.cartButtonSelector);
    
        // Get element id
        const elementId = await cartElement.elementId;
    
        // Get element cooridinates and dimensions
        const rect = await browser.getElementRect(elementId);
    
        // Count coordinates of bottom right corner
        const x = Math.floor(rect.x + rect.width - 1); // right
        const y = Math.floor(rect.y + rect.height - 1); // bottom
    
        console.log(`Clicking on cart button at coordinates: (${x}, ${y})`);
    
        // perform touch action
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
    
        console.log('Tapped on the cart button in the bottom right corner.');
    }
    
    public getItemTitleSelector(): string {
        return this.itemTitleSelector;
    }

    public getPriceSelector(): string {
        return this.priceSelector;
    }

    public getAddToCartButtonSelector(): string {
        return this.addToCartButtonSelector;
    }
}
