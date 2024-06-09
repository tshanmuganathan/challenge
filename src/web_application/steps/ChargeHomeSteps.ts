import test, {Page} from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import ChargeHomePageConstants from "@uiConstants/ChargeHomePageConstants";
import ChargeHomePage from "@pages/ChargeHomePage";

export default class ChargeHomeSteps {
    private ui: UIActions;

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }

    /**
     * Navigate to Find Charging Location screen
     */
    public async navigateToFindChargingLocation() {
        await test.step(`Navigate to Find Charging Location Page`, async () => {
            await this.ui.waitForLoadState();
            await this.ui.element(ChargeHomePage.FIND_A_CHARGING_LOCATION_LINK, ChargeHomePageConstants.FIND_A_CHARGING_LOCATION_LINK).click();
            await this.page.isVisible(ChargeHomePage.LOCATION_SEARCH_TEXT_BOX);
        });
    }

    /**
     * Search EV Locations by Fuzzy Logic Search
     */
    public async searchEVLocations(evLocation: string) {
        await test.step(`Search EV Location`, async () => {
            await this.ui.element(ChargeHomePage.LOCATION_SEARCH_TEXT_BOX, ChargeHomePageConstants.LOCATION_SEARCH_TEXT_BOX).click();
            await this.ui.editBox(ChargeHomePage.LOCATION_SEARCH_TEXT_BOX, ChargeHomePage.LOCATION_SEARCH_TEXT_BOX).type(evLocation);
            await this.page.isVisible(ChargeHomePage.FUZZY_LOGIC_SEARCH_FIRST_RESULT);
            await this.ui.editBox(ChargeHomePage.FUZZY_LOGIC_SEARCH_FIRST_RESULT, ChargeHomePageConstants.FUZZY_LOGIC_SEARCH_FIRST_RESULT).click();
        });
    }
    /**
     * Expand the EV Charging Portlet and Get EV Charging Options
     */
    public async expandEVChargingPortletAndGetEVChargingOptions() {
        let evchargingOptions;
        await test.step(`Get EV Charging Options`, async () => {
            await this.ui.element(ChargeHomePage.EV_CHARGING_PORTLET, ChargeHomePageConstants.EV_CHARGING_PORTLET).click();
            evchargingOptions = await this.ui.element(ChargeHomePage.EV_CHARGING_AVAILABLE_OPTIONS, ChargeHomePageConstants.EV_CHARGING_AVAILABLE_OPTIONS).getTextContent();
            console.log(evchargingOptions);
            await this.ui.element(ChargeHomePage.EV_CHARGING_PORTLET, ChargeHomePageConstants.EV_CHARGING_PORTLET).click();
        });
        return evchargingOptions;
    }
    /**
     * Evaluate the Availability of the Specific Charging Options based on Fetched Charging Options
     */
    public async reportCharingOptions(city: string, fetchedEVChargingOptions : string ) {
        const checkFor = ["CCS 1", "CCS 2", "CHAdeMO"];
        const included = checkFor.filter(evoption => fetchedEVChargingOptions.includes(evoption))
        const excluded = checkFor.filter(evoption => !fetchedEVChargingOptions.includes(evoption))
        switch(city) {
            case "Sydney": {
                console.log('Sydney has the following chargers - ', included);
                console.log('Sydney DONOT have the following chargers - ', excluded);
                break;
            }
            case "Melbourne": {
                console.log('Melbourne has the following chargers - ', included);
                console.log('Melbourne DONOT have the following chargers - ', excluded);
                break;
            }
        }
    }
    /**
     * Navigate to Ampol Energy
     */
    public async navigateToAmpolEnergy() {
        await test.step(`Navigate to AMPOL Energy`, async () => {
            await this.ui.element(ChargeHomePage.AMPOL_ENERGY_LOGO, ChargeHomePageConstants.AMPOL_ENERGY_LOGO).click();
        });
    }
}
