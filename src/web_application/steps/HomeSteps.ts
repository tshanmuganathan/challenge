import test, { Page } from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import HomePageConstants from "@uiConstants/HomePageConstants";
import HomePage from "@pages/HomePage";

export default class HomeSteps {    
    private ui: UIActions;

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }
    /**
     * Launch the Application
     */
    public async launchApplication() {
        await test.step(`Launching the application`, async () => {
            await this.ui.goto(process.env.BASE_URL, HomePageConstants.HOME_PAGE);
        });
    }

    /**
     * Navigate to Management Console screen
     */
    public async navigateToEVCharging() {
        await test.step(`Navigate to your Vehicle`, async () => {
            await this.ui.waitForLoadState();
            await this.ui.element(HomePage.YOUR_VEHICLE_LINK, HomePageConstants.YOUR_VEHICLE_LINK).hover();
            await this.ui.element(HomePage.EV_CHARGING_LINK, HomePageConstants.EV_CHARGING_LINK).click();
        });
    }
    /**
     * Navigate to Management Console screen
     */
    public async getCurrentUrl() {
        let currentUrl : string;
        await test.step(`Verify current url`, async () => {
            currentUrl = this.page.url();
        });
        return currentUrl;
    }

}
