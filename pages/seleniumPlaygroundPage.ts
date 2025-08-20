import { Page } from "@playwright/test";

export default class SeleniumPlaygroundPage {


    constructor(public page: Page) {

    }

    async clickOnSimpleFormDemoMenu() {
        await Promise.all([
            this.page.waitForLoadState('networkidle'), 
            this.page.click("//a[text()='Simple Form Demo']")
        ])
    }
    async clickOnDragAndDropMenu() {
        await Promise.all([
            this.page.waitForLoadState('networkidle'), 
            this.page.click("//a[text()='Drag & Drop Sliders']")
        ])
    }
    async clickOnInputFormSubmitMenu() {

        await Promise.all([
            await this.page.click("//a[text()='Input Form Submit']"),
            await this.page.waitForLoadState('networkidle')
        ])
    }
}