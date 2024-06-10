import { test } from "@base-test";
import Allure from "@allure";
import Assert from "@asserts/Assert";
import HomeSteps from "@uiSteps/HomeSteps";
import ChargeHomeSteps from "@uiSteps/ChargeHomeSteps";
import EnergyHomeSteps from "@uiSteps/EnergyHomeSteps";

let home: HomeSteps;
test.beforeEach(async ({ page }) => {
    home = new HomeSteps(page);
});

test(`TC002 - Verify Available Chargers`, async ({ page }) => {
    Allure.attachDetails('Verify Available Chargers', 'TC002');
    await home.launchApplication();
    await home.navigateToEVCharging();
    await Assert.assertEquals(await home.getCurrentUrl(), "https://ampcharge.ampol.com.au/", "Verify the Current URL");
    let chargehomepage = new ChargeHomeSteps(page);
    await chargehomepage.navigateToFindChargingLocation();
    await chargehomepage.searchEVLocations("Sydney NSW");
    await chargehomepage.reportCharingOptions("Sydney", await chargehomepage.expandEVChargingPortletAndGetEVChargingOptions());
    await chargehomepage.searchEVLocations("Melbourne VIC");
    await chargehomepage.reportCharingOptions("Melbourne", await chargehomepage.expandEVChargingPortletAndGetEVChargingOptions());
    await chargehomepage.navigateToAmpolEnergy();
    let energyHomeSteps = new EnergyHomeSteps(page);
    await energyHomeSteps.clickSwitchNow();
    await Assert.assertEquals(await home.getCurrentUrl(), "https://energy.ampol.com.au/sign-up/postcode", "Verify the Current URL");
});


//UI - Scenario B - Partially complete.
test(`TC003 - View Energy Plans and Intercept Traffic`, async ({ page }) => {
    Allure.attachDetails('View Energy Plans and Intercept Traffic', 'TC003');
    let energyHomeSteps = new EnergyHomeSteps(page);
    await energyHomeSteps.launchApplication();
    await energyHomeSteps.clickSwitchNow();
    await energyHomeSteps.searchByPostCode('4011', 'Clayfield');
    await energyHomeSteps.clickViewPlansButton();

});