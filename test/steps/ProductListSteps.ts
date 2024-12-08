import { ProductListScreen } from '../pageobjects/iOS/ProductListScreen';

export class ProductListSteps {
    private productListScreen = new ProductListScreen();
    private selectedProductName: string | null = null;
    private selectedProductPrice: string | null = null;

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

    async addFirstProductToCart(): Promise<void> {
        console.log('Adding the first product to cart...');

        this.selectedProductName = await this.productListScreen.getElementText(this.productListScreen.getItemTitleSelector());
        console.log('Selected product name:', this.selectedProductName);

        this.selectedProductPrice = await this.productListScreen.getElementText(this.productListScreen.getPriceSelector());
        console.log('Selected product price:', this.selectedProductPrice);

        await this.productListScreen.tapElement(this.productListScreen.getAddToCartButtonSelector());
        console.log('Add to Cart button tapped for the first product.');

        const addedToCart = await this.productListScreen.checkIfElementAddedToCart();
        console.log('Product successfully added to cart:', addedToCart);
        expect(addedToCart).toBe(true);
    }

    async proceedToCart(): Promise<void> {
        console.log('Proceeding to the cart...');
        await this.productListScreen.navigateToCart();
        console.log('Navigated to the cart screen.');
    }

    logSelectedProductDetails(): void {
        if (this.selectedProductName && this.selectedProductPrice) {
            console.log(`Added product to cart: ${this.selectedProductName}, Price: ${this.selectedProductPrice}`);
        } else {
            console.warn('No product details available to log.');
        }
    }

    getProductDetails(): { name: string | null; price: string | null } {
        return {
            name: this.selectedProductName,
            price: this.selectedProductPrice,
        };
    }

    getSelectedProductName(): string | null {
        return this.selectedProductName;
    }

    getSelectedProductPrice(): string | null {
        return this.selectedProductPrice;
    }
}
