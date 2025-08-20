import { expect, Page } from "@playwright/test";
export default class SimpleFormPage {

    constructor(public page: Page) { }

    async validateUrl(url :string) {
        expect(this.page).toHaveURL(url);
    }

    async enterMessage(message: string) {
        await this.page.getByPlaceholder("Please enter your Message")
            .fill(message);
    }

    async clickGetCheckedValueBtn() {
           await this.page.click("#showInput");
    }
    
    async verifyEnteredMessage(message : string){
        const displayedMessage = this.page.locator('#message');
        await expect(displayedMessage).toHaveText(message);
        
    }
}