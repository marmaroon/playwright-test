const { test, expect, request, errors } = require('@playwright/test');
const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
let token;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {data:loginPayLoad});
    // 200 status
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
})

test('Place the order', async({page}) =>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, token ); // the first is func and second is a parameter
    
    const email = '';
    const productName = 'zara coat 3'
    await page.goto('https://rahulshettyacademy.com/client/');
    const products = page.locator('.card-body');
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
    await page.waitForLoadState('networkidle');
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
    await expect(page.locator('text=anshika@gmail.com')).toHaveText(email);
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