import test, {Page} from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import EnergyHomePage from "@pages/EnergyHomePage";
import EnergyHomePageConstants from "@uiConstants/EnergyHomePageConstants";

export default class EnergyHomeSteps {
    private ui: UIActions;

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }

    /**
     * Navigate to Find Charging Location screen
     */
    public async clickSwitchNow() {
        await test.step(`Click on Switch NOW`, async () => {
            await this.ui.waitForLoadState();
            await this.ui.element(EnergyHomePage.SWITCH_NOW_BUTTON, EnergyHomePageConstants.SWITCH_NOW_BUTTON).click();
            await this.page.isVisible(EnergyHomePage.ADDRESS_POSTCODE_TEXTBOX);
        });
    }

}
