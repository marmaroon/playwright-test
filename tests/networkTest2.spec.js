const { test, expect, request, errors } = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayLoad = {userEmail: "anshika@gmail.com", userPassword: "Iamking@000"};
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
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/62026f4edfa52b09e0a20b18",
async route=>
{
  const response =  await page.request.fetch(route.request());
  let body =fakePayLoadOrders;
   route.fulfill(
      {
        response,
        body,

      });
    //intercepting response - APi response->{ playwright fakeresponse}->browser->render data on front end
});

await page.locator("button[routerlink*='myorders']").click();
//await page.pause();
console.log(await page.locator(".mt-4").textContent());

});