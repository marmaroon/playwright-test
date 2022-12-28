const { test, expect } = require('@playwright/test');

test.only('Popup validations', async({page}) => {

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