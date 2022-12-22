const { test, expect } = require('@playwright/test');

test('Popup validations', async({page}) => {

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





})