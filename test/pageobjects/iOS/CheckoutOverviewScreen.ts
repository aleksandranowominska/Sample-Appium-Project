import { BaseSelectors } from './BaseSelectors';
import { BaseScreen } from '../BaseScreen';

export class CheckoutOverviewScreen extends BaseScreen {
    private overviewTitleSelector = BaseSelectors.checkoutOverviewTitleSelector;
    private overviewProductNameSelector = BaseSelectors.productNameSelector;
    private overviewProductPriceSelector = BaseSelectors.productPriceSelector;
    private itemTotalSelector = BaseSelectors.itemTotalSelector;
    private taxSelector = BaseSelectors.taxSelector;
    private totalPriceSelector = BaseSelectors.totalPriceSelector;
    private finishButtonSelector = BaseSelectors.finishButtonSelector;

    async verifyCheckoutOverviewElements(): Promise<boolean> {
        const elementsToCheck = [
            this.overviewTitleSelector,
            this.overviewProductNameSelector,
            this.overviewProductPriceSelector,
            this.itemTotalSelector,
            this.taxSelector,
            this.totalPriceSelector,
        ];
    
        for (const selector of elementsToCheck) {
            await this.scrollTo(selector);
            const isDisplayed = await this.isElementDisplayed(selector);
            console.log(`Element ${selector} is displayed: ${isDisplayed}`);
            if (!isDisplayed) {
                return false;
            }
        }
        return true;
    }

    async verifyTotalPrice(): Promise<boolean> {
        await this.scrollTo(this.itemTotalSelector);
        const itemTotal = parseFloat((await this.getElementText(this.itemTotalSelector)).replace('Item total: $', ''));

        await this.scrollTo(this.taxSelector);
        const tax = parseFloat((await this.getElementText(this.taxSelector)).replace('Tax: $', ''));

        await this.scrollTo(this.totalPriceSelector);
        const total = parseFloat((await this.getElementText(this.totalPriceSelector)).replace('Total: $', ''));

        console.log(`Item total: ${itemTotal}, Tax: ${tax}, Calculated Total: ${itemTotal + tax}, Actual Total: ${total}`);
        return total === itemTotal + tax;
    }

    async tapFinish(): Promise<void> {
        await this.scrollTo(this.finishButtonSelector);
        console.log('Tapping Finish button...');
        await this.tapElement(this.finishButtonSelector);
        console.log('Finish button tapped.');
    }

    // Getters for selectors to be used externally
    public getOverviewProductNameSelector(): string {
        return this.overviewProductNameSelector;
    }

    public getOverviewProductPriceSelector(): string {
        return this.overviewProductPriceSelector;
    }
}
