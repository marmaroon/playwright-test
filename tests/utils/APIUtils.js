class APIUtils
{

    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext; // this относится конкретно к этому классу
        this.loginPayLoad = loginPayLoad;
    }

    async getToken()
    {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {
            data:this.loginPayLoad
        });
        // 200, 201 status
        // expect(loginResponse.ok()).toBeTruthy(); можно убрать, т.к. теперь это не тест, а precondition
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token; // вытаскиваем из response нужный нам объект
        console.log(token);
        return token;
    }

    async createOrder(orderPayLoad)
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
    {
        data:orderPayLoad,
        headers:{
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                },
    
    })

    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    const orderId = orderResponseJson.orders[0] // вытаскиваем из response нужный нам объект
    response.orderId = orderId;
    return response; // теперь он возвращает и токен, и айдишник заказа
    }
}
module.exports = {APIUtils};