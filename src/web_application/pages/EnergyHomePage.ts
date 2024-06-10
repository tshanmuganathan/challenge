export default class EnergyHomePage {
    static readonly SWITCH_NOW_BUTTON = "(//a[normalize-space()='Switch now'])[1]";
    static readonly ADDRESS_POSTCODE_TEXTBOX = "[id='postcode']";
    static readonly ADDRESS_FUZZY_LOGIC_SEARCH_RESULT = "//span[contains(text(), #SUBURB#)]";
    static readonly VIEW_PLANS_BUTTON = "//button[normalize-space()='View Plans']";
}
