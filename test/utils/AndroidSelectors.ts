export class AndroidSelectors {

    // Header Selectors
    static menuSelector = '//android.view.ViewGroup[@content-desc="test-Menu"]';
    static cartBadgeSelector = '//android.widget.TextView[@text="1"]';
    static cartButtonSelector = '//android.view.ViewGroup[@content-desc="test-Cart"]';
    static headerSwagLogoSelector = '//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.ImageView[2]';

    // Footer Selectors
    static footerTextSelector = '//android.widget.TextView[@text="© 2024 Sauce Labs. All Rights Reserved."]';
    static termsTextSelector = '//android.widget.TextView[@text="Terms of Service | Privacy Policy"]';
    static swagBotImageSelector = '//android.widget.ScrollView[@content-desc="test-PRODUCTS"]/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup/android.widget.ImageView';

    // Login Selectors
    static swagLogoSelector = '//android.widget.ScrollView[@content-desc="test-Login"]/android.view.ViewGroup/android.widget.ImageView[1]';
    static usernameSelector = '//android.widget.EditText[@content-desc="test-Username"]';
    static passwordSelector = '//android.widget.EditText[@content-desc="test-Password"]';
    static loginButtonSelector = '//android.view.ViewGroup[@content-desc="test-LOGIN"]';
    static loginBotSelector = '//android.widget.ScrollView[@content-desc="test-Login"]/android.view.ViewGroup/android.widget.ImageView[1]';
    static errorMessageSelector = '//android.view.ViewGroup[@content-desc="test-Error message"]';

    // Product list selectors
    static productsTitleSelector = '//android.widget.TextView[@text="PRODUCTS"]';
    static toggleButtonSelector = '//android.view.ViewGroup[@content-desc="test-Toggle"]';
    static modalSelectorButtonSelector = '//android.view.ViewGroup[@content-desc="test-Modal Selector Button"]';
    static addToCartButtonSelector = '(//android.view.ViewGroup[@content-desc="test-ADD TO CART"])[1]';
    static removeButtonSelector = '//android.view.ViewGroup[@content-desc="test-REMOVE"]';
    static itemTitleSelector = '//android.widget.TextView[@content-desc="test-Item title" and @text="Sauce Labs Backpack"]';
    static priceSelector = '//android.widget.TextView[@content-desc="test-Price" and @text="$29.99"]';
    static productItemTitleSelector = '//android.widget.TextView[@content-desc="test-Item title"]';

    // Sort Modal Selectors
    static sortModalTitleSelector = '//android.widget.TextView[@text="Sort items by..."]';
    static sortByNameAscSelector = '//android.widget.TextView[@text="Name (A to Z)"]';
    static sortByNameDescSelector = '//android.widget.TextView[@text="Name (Z to A)"]';
    static sortByPriceLowToHighSelector = '//android.widget.TextView[@text="Price (low to high)"]';
    static sortByPriceHighToLowSelector = '//android.widget.TextView[@text="Price (high to low)"]';

    // Cart-specific selectors
    static yourCartSelector = '//android.widget.TextView[@text="YOUR CART"]';
    static qtySelector = '//android.widget.TextView[@text="QTY"]';
    static descriptionSelector = '//android.widget.TextView[@text="DESCRIPTION"]';
    static productQtySelector = '(//android.widget.TextView[@text="1"])[2]';
    static productNameSelector = '//android.widget.TextView[@text="Sauce Labs Backpack"]';
    static productPriceSelector = '//android.widget.TextView[@text="$29.99"]';
    static continueShoppingButtonSelector = '//android.view.ViewGroup[@content-desc="test-CONTINUE SHOPPING"]';
    static checkoutButtonSelector = '//android.view.ViewGroup[@content-desc="test-CHECKOUT"]';
    static amountSelector = '//android.view.ViewGroup[@content-desc="test-Amount"]';

    // Checkout Information Selectors
    static checkoutInformationTitleSelector = '//android.widget.TextView[@text="CHECKOUT: INFORMATION"]';
    static firstNameFieldSelector = '//android.widget.EditText[@content-desc="test-First Name"]';
    static lastNameFieldSelector = '//android.widget.EditText[@content-desc="test-Last Name"]';
    static zipCodeFieldSelector = '//android.widget.EditText[@content-desc="test-Zip/Postal Code"]';
    static cancelButtonSelector = '//android.view.ViewGroup[@content-desc="test-CANCEL"]';
    static continueButtonSelector = '//android.view.ViewGroup[@content-desc="test-CONTINUE"]';

    // Checkout Overview Selectors
    static checkoutOverviewTitleSelector = '//android.widget.TextView[@text="CHECKOUT: OVERVIEW"]';
    static overviewProductDescriptionSelector = '//android.widget.TextView[@text="carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection."]';
    static paymentInformationSelector = '//android.widget.TextView[@text="Payment Information:"]';
    static paymentMethodSelector = '//android.widget.TextView[@text="SauceCard #31337"]';
    static shippingInformationSelector = '//android.widget.TextView[@text="Shipping Information:"]';
    static shippingMethodSelector = '//android.widget.TextView[@text="FREE PONY EXPRESS DELIVERY!"]';
    static itemTotalSelector = '//android.widget.TextView[@text="Item total: $29.99"]';
    static taxSelector = '//android.widget.TextView[@text="Tax: $2.40"]';
    static totalPriceSelector = '//android.widget.TextView[@text="Total: $32.39"]';
    static finishButtonSelector = '//android.view.ViewGroup[@content-desc="test-FINISH"]';

    // Checkout Complete Selectors
    static checkoutCompleteTitleSelector = '//android.widget.TextView[@text="CHECKOUT: COMPLETE!"]';
    static thankYouMessageSelector = '//android.widget.TextView[@text="THANK YOU FOR YOU ORDER"]';
    static orderDispatchedMessageSelector = '//android.widget.TextView[@text="Your order has been dispatched, and will arrive just as fast as the pony can get there!"]';
    static ponyExpressImageSelector = '//android.widget.ScrollView[@content-desc="test-CHECKOUT: COMPLETE!"]/android.view.ViewGroup/android.widget.ImageView'; // To check
    static backHomeButtonSelector = '//android.view.ViewGroup[@content-desc="test-BACK HOME"]';
}
