const { test, expect, errors } = require('@playwright/test');
const {LoginPage} = require('../pageobjects/LoginPage');
const {DashboardPage} = require('../pageobjects/DashboardPage');

test('Client App login', async({page}) =>
{
    // js file-. Login js, Dashboard js, 
    const productName = 'zara coat 3'
    const username = 'anshika@gmail.com';
    const password = 'Iamking@000'

    // add methods for login in other file
    const loginPage = new LoginPage(page);
    await loginPage.goTo();
    await loginPage.validLogin(username, password); //отдельно вызываем все функции, принимающие в себя аргументы
    
    // method for search products and add it in cart
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart()


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
    // assert correct email and subnit the order
    await expect(page.locator('text=anshika@gmail.com')).toHaveText(username);
    await page.locator('.action__submit').click();
    // assert text thanks for the order
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');

    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('tbody').waitFor(); // wait for loading selectors
    
    const rows = await page.locator('tbody tr');
    for(let i = 0; i<await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }        
    }

    const orderIdDetails = await page.locator('.col-text').textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
})