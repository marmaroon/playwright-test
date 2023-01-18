const { test, expect, request, errors } = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad = {userEmail: "mashamasha@gmail.com", userPassword: "Iamking@00"};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]};
const fakePayLoadOrders = {data: [], message: "No Orders"};
let response;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad)

});

test('Place the order', async({page}) =>
{
    page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token ); // the first is func and second is a parameter
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("button[routerlink*='myorders']").click();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63bc2fb2568c3e9fb1f1dc3e',
    route=> route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63bc284a568c3e9fb1f1d3e2'})
    )

    await page.locator('text=View').first().click();
    await page.pause()


});