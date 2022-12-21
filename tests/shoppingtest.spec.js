const { test, expect, errors } = require('@playwright/test');

test.only('Client App login', async({page}) =>
{
    const products = page.locator('.card-body');
    const productName = 'zara coat 3'
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').type('Iamking@000');
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const countProducts = await products.count();  //how much elements in this selector

    for (let i = 0; i < countProducts; ++i) {
        if(await products.nth(i).locator('b').textContent() === productName) {
            // add to cart
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    await page.locator('[routerlink*="cart"]').click();
    //await page.waitForLoadState('networkidle');
    await page.locator('div li').first().waitFor(); //loading this items on the page tag + text
    const addedCartItem = await page.locator('h3:has-text("zara coat 3")').isVisible(); // add text selector (sudo-class), есть в доке Playwright #text-selector
    expect(addedCartItem).toBeTruthy();

    await page.locator('text="Checkout"').click();
    await page.locator('[placeholder*="Country"]').type('ind',{delay:100}); //type slowly
    const dropdownCountry = await page.locator('.ta-results');
    await dropdownCountry.waitFor();
    const dropdownCount = await dropdownCountry.locator('button').count();
    for(let i = 0; i < dropdownCount; ++i){
        const textDropdown = await dropdownCountry.locator('button').nth(i).textContent();
        if(textDropdown.trim() === 'India'){ // trim убирает все пробелы или можно использовать textDropdown.includes('India')
            // click on this option
            await dropdownCountry.locator('button').nth(i).click();
            break;
        }
        
    }
    await page.pause()







})