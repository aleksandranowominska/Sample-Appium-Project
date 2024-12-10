import { scrollToElementAndroid } from '../utils/AndroidUtils';
import { scrollToElementiOS } from '../utils/iOSUtils';
// ELEMENT_TIMEOUT can be dynamically set via process.env.ELEMENT_TIMEOUT
const ELEMENT_TIMEOUT = process.env.ELEMENT_TIMEOUT ? parseInt(process.env.ELEMENT_TIMEOUT, 10) : 10000;

export class BaseScreen {
    // Wait for an element to be displayed within the defined timeout
    async waitForDisplayed(elementSelector: string) {
        const el = await $(elementSelector);
        await el.waitForDisplayed({ timeout: ELEMENT_TIMEOUT });
        return el;
    }

    // Click on an element safely, waiting for it to be displayed first
    async tapElement(elementSelector: string) {
        const el = await this.waitForDisplayed(elementSelector);
        await el.click();
    }

    // Type text into an element (e.g. input field), after waiting for it to be displayed
    async typeText(elementSelector: string, text: string) {
        const el = await this.waitForDisplayed(elementSelector);
        await el.setValue(text);
    }

    // Get text from an element, waiting for it to be displayed first
    async getElementText(elementSelector: string) {
        const el = await this.waitForDisplayed(elementSelector);
        return el.getText();
    }

    // Check if element is displayed within the timeout
    async isElementDisplayed(elementSelector: string) {
        try {
            const el = await $(elementSelector);
            return await el.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async scrollTo(elementSelector: string): Promise<void> {
        const platform = process.env.PLATFORM || 'iOS'; // Wartość domyślna to 'iOS'
        if (platform === 'Android') {
            await scrollToElementAndroid(elementSelector);
        } else {
            await scrollToElementiOS(elementSelector);
        }
    }

    async waitForElementToDisappear(elementSelector: string, timeout = 5000): Promise<boolean> {
        console.log(`Waiting for element "${elementSelector}" to disappear...`);
        try {
            const element = await $(elementSelector);
            await element.waitForDisplayed({ reverse: true, timeout });
            console.log(`Element "${elementSelector}" has disappeared.`);
            return true;
        } catch (error) {
            console.error(`Element "${elementSelector}" did not disappear within the timeout.`);
            return false;
        }
    } 
}
