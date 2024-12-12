export class iOSSelectors {

    // Header Selectors
    static menuSelector = '//XCUIElementTypeOther[@name="test-Menu"]';
    static cartBadgeSelector = '(//XCUIElementTypeOther[@name="1"])[4]';
    static swagLogoSelector = '//XCUIElementTypeImage[@name="assets/src/img/swag-labs-logo.png"]';
    static cartButtonSelector = '//XCUIElementTypeOther[@name="test-Cart"]';

    // Footer Selectors
    static footerTextSelector = '//XCUIElementTypeStaticText[@name="© 2024 Sauce Labs. All Rights Reserved."]';
    static termsTextSelector = '//XCUIElementTypeStaticText[@name="Terms of Service | Privacy Policy"]';
    static swagBotImageSelector = '//XCUIElementTypeImage[@name="assets/src/img/footer-swagbot.png"]';

    // Login Selectors
    static usernameSelector = '//XCUIElementTypeTextField[@name="test-Username"]';
    static passwordSelector = '//XCUIElementTypeSecureTextField[@name="test-Password"]';
    static loginButtonSelector = '//XCUIElementTypeOther[@name="test-LOGIN"]';
    static loginBotSelector = '//XCUIElementTypeImage[@name="assets/src/img/login-bot.png"]';
    static errorMessageSelector = '//XCUIElementTypeOther[@name="test-Error message"]';

    // Product list selectors
    static productsTitleSelector = '//XCUIElementTypeStaticText[@name="PRODUCTS"]';
    static toggleButtonSelector = '//XCUIElementTypeOther[@name="test-Toggle"]';
    static modalSelectorButtonSelector = '//XCUIElementTypeOther[@name="test-Modal Selector Button"]';
    static addToCartButtonSelector = '(//XCUIElementTypeOther[@name="test-ADD TO CART"])[1]';
    static removeButtonSelector = '//XCUIElementTypeOther[@name="test-REMOVE"]';
    static itemTitleSelector = '//XCUIElementTypeStaticText[@name="test-Item title"]';
    static priceSelector = '//XCUIElementTypeStaticText[@name="test-Price"]';
    static productItemTitleSelector: string;

    // Cart-specific selectors
    static yourCartSelector = '//XCUIElementTypeStaticText[@name="YOUR CART"]';
    static qtySelector = '//XCUIElementTypeStaticText[@name="QTY"]';
    static descriptionSelector = '//XCUIElementTypeStaticText[@name="DESCRIPTION"]';
    static productQtySelector = '//XCUIElementTypeStaticText[@name="1"]';
    static productNameSelector = '//XCUIElementTypeStaticText[@name="Sauce Labs Backpack"]';
    static productPriceSelector = '//XCUIElementTypeStaticText[@name="$29.99"]';
    static continueShoppingButtonSelector = '//XCUIElementTypeOther[@name="CONTINUE SHOPPING"]';
    static checkoutButtonSelector = '//XCUIElementTypeOther[@name="CHECKOUT"]';
    static amountSelector = '//XCUIElementTypeOther[@name="test-Amount"]';

    // Checkout Information Selectors
    static checkoutInformationTitleSelector = '//XCUIElementTypeStaticText[@name="CHECKOUT: INFORMATION"]';
    static firstNameFieldSelector = '//XCUIElementTypeTextField[@name="test-First Name"]';
    static lastNameFieldSelector = '//XCUIElementTypeTextField[@name="test-Last Name"]';
    static zipCodeFieldSelector = '//XCUIElementTypeTextField[@name="test-Zip/Postal Code"]';
    static cancelButtonSelector = '//XCUIElementTypeOther[@name="test-CANCEL"]';
    static continueButtonSelector = '//XCUIElementTypeOther[@name="test-CONTINUE"]';

    // Checkout Overview Selectors
    static checkoutOverviewTitleSelector = '//XCUIElementTypeStaticText[@name="CHECKOUT: OVERVIEW"]';
    static overviewProductDescriptionSelector = '//XCUIElementTypeStaticText[@name="carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."]';
    static paymentInformationSelector = '//XCUIElementTypeStaticText[@name="Payment Information:"]';
    static paymentMethodSelector = '//XCUIElementTypeStaticText[@name="SauceCard #31337"]';
    static shippingInformationSelector = '//XCUIElementTypeStaticText[@name="Shipping Information:"]';
    static shippingMethodSelector = '//XCUIElementTypeStaticText[@name="FREE PONY EXPRESS DELIVERY!"]';
    static itemTotalSelector = '//XCUIElementTypeStaticText[@name="Item total: $29.99"]';
    static taxSelector = '//XCUIElementTypeStaticText[@name="Tax: $2.40"]';
    static totalPriceSelector = '//XCUIElementTypeStaticText[@name="Total: $32.39"]';
    static finishButtonSelector = '//XCUIElementTypeOther[@name="test-FINISH"]';

    // Checkout Complete Selectors
    static checkoutCompleteTitleSelector = '//XCUIElementTypeStaticText[@name="CHECKOUT: COMPLETE!"]';
    static thankYouMessageSelector = '//XCUIElementTypeStaticText[@name="THANK YOU FOR YOU ORDER"]';
    static orderDispatchedMessageSelector = '//XCUIElementTypeStaticText[@name="Your order has been dispatched, and will arrive just as fast as the pony can get there!"]';
    static ponyExpressImageSelector = '//XCUIElementTypeImage[@name="assets/src/img/pony-express.png"]';
    static backHomeButtonSelector = '//XCUIElementTypeOther[@name="test-BACK HOME"]';
}
