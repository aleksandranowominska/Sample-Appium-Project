import { BaseScreen } from './BaseScreen';

export class TestUtils extends BaseScreen {
    // Verify product details: name and price
    async verifyProductDetails(
        actualNameSelector: string,
        actualPriceSelector: string,
        expectedName: string,
        expectedPrice: string
    ): Promise<void> {
        console.log('Verifying product details...');

        const actualName = await this.getElementText(actualNameSelector);
        const actualPrice = await this.getElementText(actualPriceSelector);

        console.log(`Expected product name: ${expectedName}, Actual product name: ${actualName}`);
        console.log(`Expected product price: ${expectedPrice}, Actual product price: ${actualPrice}`);

        if (actualName !== expectedName) {
            throw new Error(`Product name mismatch: expected "${expectedName}", but got "${actualName}"`);
        }

        if (actualPrice !== expectedPrice) {
            throw new Error(`Product price mismatch: expected "${expectedPrice}", but got "${actualPrice}"`);
        }
    }
}
