import { test } from "../base/pomFixture";
import * as data from "../test-data/lambdaTest-test-data.json"


const message ="Welcome to LambdaTest";
const alertMessage="Please fill in the fields";
const successMessge="Thanks for contacting us, we will get back to you shortly.";

 test.describe("Lambda Test Assesment", () => {

    test("Test Scenario_01", async ({ page, baseURL, seleniumPlaygroundPage,simpleFormPage }) => {
        await page.goto(`${baseURL}`);
        await seleniumPlaygroundPage.clickOnSimpleFormDemoMenu();
        await simpleFormPage.validateUrl(data.url);
        await simpleFormPage.enterMessage(message);
        await simpleFormPage.clickGetCheckedValueBtn();
        await simpleFormPage.verifyEnteredMessage(message);
    })

    test("Test Scenario_02", async ({ page, baseURL, seleniumPlaygroundPage,dragAndDropPage }) => {
        await page.goto(`${baseURL}`)
        await seleniumPlaygroundPage.clickOnDragAndDropMenu();
        await dragAndDropPage.dragAndDrop();


    })

    test("Test Scenario_03", async ({ page, baseURL, seleniumPlaygroundPage, inputFormPage }) => {
        await page.goto(`${baseURL}`);
        await seleniumPlaygroundPage.clickOnInputFormSubmitMenu();
        await inputFormPage.verifyAlertMessage(alertMessage);
        await inputFormPage.enterName(data.name);
        await inputFormPage.enterEmail(data.email);
        await inputFormPage.enterPassword(data.password);
        await inputFormPage.enterCompany(data.company);
        await inputFormPage.enterWebsite(data.website);
        await inputFormPage.selectCountry(data.country);
        await inputFormPage.enterCity(data.city);
        await inputFormPage.enterAddress(data.addressone,data.addresstwo);
        await inputFormPage.enterState(data.state);
        await inputFormPage.enterZipcode(data.zipcode);
        await inputFormPage.clickSubmitBtn();
        await inputFormPage.verifySuccessMessage(successMessge);

    })
})