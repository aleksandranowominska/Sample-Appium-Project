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

    // Scroll to an element if it's not already visible
    async scrollTo(elementSelector: string) {
        const el = await $(elementSelector);
        let isVisible = await el.isDisplayed();

        // Try to scroll until the element is visible or timeout is reached
        const MAX_SCROLL_ATTEMPTS = 10;
        let scrollAttempts = 0;

        while (!isVisible && scrollAttempts < MAX_SCROLL_ATTEMPTS) {
            await browser.execute('mobile: scroll', { direction: 'down' });
            isVisible = await el.isDisplayed();
            scrollAttempts++;
        }

        if (!isVisible) {
            throw new Error(`Element with selector "${elementSelector}" is not visible after scrolling.`);
        }
    }
}
