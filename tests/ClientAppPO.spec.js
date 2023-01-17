const { test, expect, errors } = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');

test('Client App login', async({page}) =>
{
    const poManager = new POManager(page);
    // js file-. Login js, Dashboard js, 
    const productName = 'zara coat 3'
    const username = 'anshika@gmail.com';
    const password = 'Iamking@000'

    // add methods for login in other file
    const loginPage = poManager.getLoginPage(); //instead of import new class every time we can import only 1 poManager
    await loginPage.goTo();
    await loginPage.validLogin(username, password); //отдельно вызываем все функции, принимающие в себя аргументы
    
    // method for search products and add it in cart
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();


    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
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