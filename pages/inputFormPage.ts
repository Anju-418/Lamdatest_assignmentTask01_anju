import { expect, Page } from "@playwright/test";

export default class InputFormPage{

    constructor(public page: Page) { }

    async clickSubmitBtn() { 
        await this.page.getByRole('button', { name: 'Submit' }).click();
        
    }

    async verifyAlertMessage(message : string) { 
        this.page.on("dialog",async(alert)=>{
              const alertMessage=alert.defaultValue();
              expect(alertMessage).toEqual(message);
        })
    }

    async enterName(name : string){
        await this.page.locator("#name").fill(name);
    }

    async enterEmail(email : string){
        await this.page.locator("#inputEmail4").fill(email);
    }

    async enterPassword(password : string){
        await this.page.getByPlaceholder("Password").fill(password);
    }

    async enterCompany(company : string){
        await this.page.locator("#company").fill(company);
    }

    async enterWebsite(website : string){
        await this.page.locator("#websitename").fill(website);
    }
    
    async selectCountry(country : string){
        await this.page.waitForTimeout(3000);
        await this.page.selectOption("//select[@name='country']",
        {
            value:country
        }
       )
    }

    async enterCity(city : string){
        await this.page.locator("#inputCity").fill(city);
    }

    async enterAddress(addressOne : string,addressTwo: string){
        await this.page.locator("#inputAddress1").fill(addressOne);
        await this.page.locator("#inputAddress2").fill(addressTwo);
    }

    async enterState(state : string){
        await this.page.locator("#inputState").fill(state);
    }

    async enterZipcode(zipcode : string){
        await this.page.locator("#inputZip").fill(zipcode);
    }

    async verifySuccessMessage(message:string){
         const successMessge= await this.page.locator("//p[@class='success-msg hidden']").textContent();
         expect(successMessge).toEqual(message);
    }
    
}