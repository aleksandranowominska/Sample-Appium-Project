import { ProductListScreen } from '../pageobjects/iOS/ProductListScreen';

export class ProductListSteps {
    private productListScreen = new ProductListScreen();

    async verifyProductListElements(): Promise<void> {
        console.log('Verifying unique elements in the product list...');
        const uniqueElementsDisplayed = await this.productListScreen.verifyUniqueElements();
        console.log('All unique product list elements are displayed:', uniqueElementsDisplayed);
        expect(uniqueElementsDisplayed).toBe(true);

        console.log('Verifying product items and Add to Cart buttons...');
        const productAndButtonsDisplayed = await this.productListScreen.verifyProductAndAddToCartButtons();
        console.log('Products and Add to Cart buttons are displayed:', productAndButtonsDisplayed);
        expect(productAndButtonsDisplayed).toBe(true);
    }
}
