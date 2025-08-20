import { devices, PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: "chrome:latest:MacOS Catalina@lambdatest",
            use: {
                viewport: { width: 1920, height: 1080 },
            },
        },
        {
            name: "chrome:latest:Windows 10@lambdatest",
            use: {
                viewport: { width: 1280, height: 720 },
            },
        },
    ],

    testMatch: ["tests/lambdaTestScenarios.test.ts"],
    use: {
        baseURL: "https://www.lambdatest.com/selenium-playground/",
        headless: true,
        screenshot: "on",
        video: "on",
        launchOptions: {
    
        },
    },
    timeout: 60 * 1000 * 5,
    fullyParallel:true,
    retries: 0,
    reporter: [["dot"], ["json", {
        outputFile: "jsonReports/jsonReport.json"
    }], ["html", {
        open: "never"
    }]]
};

export default config;
