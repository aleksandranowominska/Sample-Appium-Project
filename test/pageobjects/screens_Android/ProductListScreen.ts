import { BaseScreen } from '../../utils/BaseScreen';
import { AndroidSelectors } from '../../utils/AndroidSelectors';

export class ProductListScreen extends BaseScreen {
    protected productsTitleSelector = AndroidSelectors.productsTitleSelector;
    protected toggleButtonSelector = AndroidSelectors.toggleButtonSelector;
    protected modalSelectorButtonSelector = AndroidSelectors.modalSelectorButtonSelector;
    protected addToCartButtonSelector = AndroidSelectors.addToCartButtonSelector;
    protected removeButtonSelector = AndroidSelectors.removeButtonSelector;
    protected itemTitleSelector = AndroidSelectors.itemTitleSelector;
    protected priceSelector = AndroidSelectors.priceSelector;
    protected cartBadgeSelector = AndroidSelectors.cartBadgeSelector;
    protected cartButtonSelector = AndroidSelectors.cartButtonSelector;

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
    
        try {
            await $(this.cartButtonSelector).click();
            console.log('Tapped on the cart button successfully.');
        } catch (error) {
            console.error('Failed to tap on the cart button:', error);
            throw error;
        }
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
