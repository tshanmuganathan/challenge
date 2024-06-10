import UserSteps from "@restSteps/UserSteps";
import { test } from "@base-test";
import Allure from "@allure";

let user: UserSteps;
let API_KEY = process.env.API_TOKEN;
test.beforeEach(async ({ page }) => {
    user = new UserSteps(page);
});

test(`TC001 - Get Weather Details`, async () => {
    Allure.attachDetails('Get the current weather details[Get air quality data] for Sydney','TC001');
    const response = await user.get('/v1/current.json?q=sydney&aqi=no&key='+API_KEY, 'GET');
    await user.verifyStatusCode(response, "200");
    await user.verifyContentIsNotNull(response, '$.current.temp_c', 'Temperature in Celcius');
});

