import { BaseScreen } from '../BaseScreen';

export class ProductListScreen extends BaseScreen {
    private productsTitleSelector = '//XCUIElementTypeStaticText[@name="PRODUCTS"]';
    private toggleButtonSelector = '//XCUIElementTypeOther[@name="test-Toggle"]';
    private modalSelectorButtonSelector = '//XCUIElementTypeOther[@name="test-Modal Selector Button"]';
    private addToCartButtonSelector = '(//XCUIElementTypeOther[@name="test-ADD TO CART"])[1]';
    private itemTitleSelector = '//XCUIElementTypeStaticText[@name="test-Item title"]';
    private priceSelector = '//XCUIElementTypeStaticText[@name="test-Price"]';

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
}
