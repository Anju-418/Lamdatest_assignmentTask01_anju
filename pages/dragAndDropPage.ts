import { expect, Page } from "@playwright/test";
export default class DragAndDropPage {


    constructor(public page: Page) { }
    

    async dragAndDrop(){
    const slider = this.page.locator('//input[@type="range" and @value="15"]');
    const boundingBox = await slider.boundingBox();
    if (!boundingBox) {
        throw new Error('Slider not found!');
    }
    const sliderStartX = boundingBox.x + boundingBox.width / 2;
    const sliderStartY = boundingBox.y + boundingBox.height / 2;
    await this.page.mouse.move(sliderStartX, sliderStartY);
    await this.page.mouse.down();
    await this.page.mouse.move(sliderStartX + 215, sliderStartY); 
    await this.page.mouse.up();
    const rangeValue = await this.page.evaluate(() => {
        const element = document.querySelector('#rangeSuccess');
        return element ? element.textContent?.trim() : null;
    });
    expect(rangeValue).toEqual('95');
     }

}