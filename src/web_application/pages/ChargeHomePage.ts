export default class ChargeHomePage {
    static readonly FIND_A_CHARGING_LOCATION_LINK = "//a[@class='link'][normalize-space()='FIND A CHARGING LOCATION']";
    static readonly LOCATION_SEARCH_TEXT_BOX = "//span[@class='ant-select-selection-item']";
    static readonly FUZZY_LOGIC_SEARCH_FIRST_RESULT = "//*[@id='rc_select_0_list_0']";
    static readonly EV_CHARGING_PORTLET = "(//button[normalize-space()='EV Charging (AmpCharge)'])[1]";
    static readonly EV_CHARGING_AVAILABLE_OPTIONS = "(//*[@id='accordion-panel'])[3]";
    static readonly AMPOL_ENERGY_LOGO = "[id='AmpEnergy']";
}
