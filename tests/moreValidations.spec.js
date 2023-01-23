const { test, expect } = require('@playwright/test');

test.describe.configure({mode: 'parallel'})
test('@Web Popup validations', async({page}) => {

await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
// await page.goto('https://google.com');
// await page.goBack();
await expect(page.locator('#displayed-text')).toBeVisible();
await page.locator('#hide-textbox').click();
await expect(page.locator('#displayed-text')).toBeHidden();
page.on('dialog', dialog => dialog.accept()); //js event, if cancel use dismiss
await page.locator('#confirmbtn').click();

// hover
await page.locator('#mousehover').hover();
// frames
const framesPage = page.frameLocator('#courses-iframe');
await framesPage.locator('li a[href*="lifetime-access"]:visible').click();
const textCheck = await framesPage.locator('.text h2').textContent();
console.log(textCheck.split(' ')[1]);

})

test('Screenshot & Visual validations', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'screenshotlocator.png'})
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.on('dialog', dialog => dialog.accept()); //js event, if cancel use dismiss
    await page.locator('#confirmbtn').click();
})

test('Compare screenshots', async({page}) => {
    await page.goto('https://flightaware.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})