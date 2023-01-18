const { test, expect, request, errors } = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};

let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
});

test('Place the order', async({page}) =>
{
    

    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token ); // the first is func and second is a parameter
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('tbody').waitFor(); // wait for loading selectors
    
    const rows = await page.locator('tbody tr');
    for(let i = 0; i<await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator('th').textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }        
    }


    const orderIdDetails = await page.locator('.col-text').textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();

    // verify if order created is showing in history page
    // Precondition: create order 








})