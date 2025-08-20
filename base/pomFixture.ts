import { chromium, test as baseTest } from "@playwright/test";

import path from "path"
import SeleniumPlaygroundPage from "../pages/seleniumPlaygroundPage";
import SimpleFormPage from "../pages/simpleFormPage";
import DragAndDropPage from "../pages/dragAndDropPage";
import InputFormPage from "../pages/inputFormPage";

type pages = {
    dragAndDropPage: DragAndDropPage;
    simpleFormPage: SimpleFormPage;
    seleniumPlaygroundPage: SeleniumPlaygroundPage;
    inputFormPage: InputFormPage
}

// LambdaTest capabilities
const capabilities = {
    browserName: "Chrome", // Browsers allowed: `Chrome`, `MicrosoftEdge`, `pw-chromium`, `pw-firefox` and `pw-webkit`
    browserVersion: "latest",
    "LT:Options": {
        platform: "Windows 11",
        build: "Playwright Test Build",
        name: "Playwright Test",
        user: 'anjusekharan3795',
        accessKey: 'LT_Od4JsnVDpyvfp45pV0mvV2WauQHiNAPo6VWBvzy8v4XeHEb',
        network: true,
        video: true,
        console: true,
        tunnel: false, // Add tunnel configuration if testing locally hosted webpage
        tunnelName: "", // Optional
        geoLocation: '', // country code can be fetched from https://www.lambdatest.com/capabilities-generator/
    },
};

// Patching the capabilities dynamically according to the project name.
const modifyCapabilities = (configName, testName) => {
    let config = configName.split("@lambdatest")[0];
    let [browserName, browserVersion, platform] = config.split(":");
    capabilities.browserName = browserName
        ? browserName
        : capabilities.browserName;
    capabilities.browserVersion = browserVersion
        ? browserVersion
        : capabilities.browserVersion;
    capabilities["LT:Options"]["platform"] = platform
        ? platform
        : capabilities["LT:Options"]["platform"];
    capabilities["LT:Options"]["name"] = testName;
};

const getErrorMessage = (obj, keys) =>
    keys.reduce(
        (obj, key) => (typeof obj == "object" ? obj[key] : undefined),
        obj
    );

const testPages = baseTest.extend<pages>({
    page: async ({ }, use, testInfo) => {
        let fileName = testInfo.file.split(path.sep).pop();
        if (testInfo.project.name.match(/lambdatest/)) {
            modifyCapabilities(
                testInfo.project.name,
                `${testInfo.title} - ${fileName}`
            );
            const browser = await chromium.connect(`wss://cdp.lambdatest.com/playwright?capabilities=
        ${encodeURIComponent(JSON.stringify(capabilities))}`);
            const context = await browser.newContext(testInfo.project.use);
            const ltPage = await context.newPage()
            await use(ltPage);
            const testStatus = {
                action: "setTestStatus",
                arguments: {
                    status: testInfo.status,
                    remark: getErrorMessage(testInfo, ["error", "message"]),
                },
            };
            await ltPage.evaluate(() => { },
                `lambdatest_action: ${JSON.stringify(testStatus)}`);
            await ltPage.close();
            await context.close();
            await browser.close();
        } else {
            const browser = await chromium.launch();
            const context = await browser.newContext();
            const page = await context.newPage()
            await use(page);
        }
    },

    dragAndDropPage: async ({ page }, use) => {
        await use(new DragAndDropPage(page));
    },
    simpleFormPage: async ({ page }, use) => {
        await use(new SimpleFormPage(page));
    },
    seleniumPlaygroundPage: async ({ page }, use) => {
        await use(new SeleniumPlaygroundPage(page));
    },
    inputFormPage: async ({ page }, use) => {
        await use(new InputFormPage(page));
    },

})

export const test = testPages;
export const expect = testPages.expect;
