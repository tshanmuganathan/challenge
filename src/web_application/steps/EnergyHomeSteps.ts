import test, {Page} from "@playwright/test";
import UIActions from "@uiActions/UIActions";
import EnergyHomePage from "@pages/EnergyHomePage";
import EnergyHomePageConstants from "@uiConstants/EnergyHomePageConstants";
import {writeFileSync} from "fs";
import process from "node:process";

export default class EnergyHomeSteps {
    private ui: UIActions;
    public result : any;

    constructor(private page: Page) {
        this.ui = new UIActions(page);
    }

    /**
     * Launch the Application
     */
    public async launchApplication() {
        await test.step(`Launching the application`, async () => {
            await this.ui.goto(process.env.ENERGY_BASE_URL, "Navigating to Energy Base URL");
        });
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

    /**
     * Enter Address or PostCode and Select the first one in the FuzzyLogic Search
     */
    public async searchByPostCode(postCode: string, suburb: string) {

        await test.step(`Enter PostCode and Select the Suburb from the result`, async () => {
            await this.ui.waitForLoadState();
            await this.ui.element(EnergyHomePage.ADDRESS_POSTCODE_TEXTBOX, EnergyHomePageConstants.ADDRESS_POSTCODE_TEXTBOX).click();
            await this.ui.editBox(EnergyHomePage.ADDRESS_POSTCODE_TEXTBOX, EnergyHomePageConstants.ADDRESS_POSTCODE_TEXTBOX).type(postCode);
            let Modified_Search_Result = EnergyHomePage.ADDRESS_FUZZY_LOGIC_SEARCH_RESULT.replace('#SUBURB#', "'" + suburb + "'");
            await this.page.isVisible(Modified_Search_Result);
            await this.ui.element(Modified_Search_Result, "Selecting based on Suburb Name - " + suburb).click();
        });
    }


    /**
     * Capture Network Traffic and capture Response
     */
    public async startinterceptNetworkAndCaptureResponse(url: string) {
        await test.step(`Intercept Network Traffic and Capture Response in logs - ` + url, async () => {
            await this.page.route(url, async (route) => {
                const response = await route.fetch();
                // Get the response
                const result = await response.json();
                console.log(result.json().toString());
            });
        });
    }


    /**
     * Click View Plans Button
     */
    public async clickViewPlansButton() {
        await test.step(`Click on ViewPlans Button`, async () => {
            await this.ui.element(EnergyHomePage.VIEW_PLANS_BUTTON, EnergyHomePageConstants.VIEW_PLANS_BUTTON).click();
        });
    }

    /**
     * Save Captured Response to a JSON File
     */
    public async saveCapturedResonsetoFile() {
        await test.step(`Save Captured Response to a File`, async () => {
            console.log("INSIDE FILE WRITE", this.result.toString());
            writeFileSync("./test-results/report/leadapiResponse.json", this.result.toString(), {
                flag: "w"
            })
        });
    }


}
