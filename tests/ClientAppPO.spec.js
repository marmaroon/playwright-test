const { test, expect, errors } = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
// json -> string -> js object
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

test('Client App login', async({page}) =>
{
    const poManager = new POManager(page);
    
    // add methods for login in other file
    const loginPage = poManager.getLoginPage(); //instead of import new class every time we can import only 1 poManager
    await loginPage.goTo();
    await loginPage.validLogin(dataSet.username, dataSet.password); //отдельно вызываем все функции, принимающие в себя аргументы
    
    // method for search products and add it in cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataSet.productName);
    await dashboardPage.navigateToCart();


    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(dataSet.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

})