const base = require('@playwright/test');

// это если мы не делаем json и отдельно хотим вынести кастомный тест с фикстурой, как все-таки лучше?

exports.customtest = base.test.extend(
    {
        testDataForOrder : //custom fixture
            {
            username : "anshika@gmail.com",
            password : "Iamking@000",
            productName : "zara coat 3"
            }, 
    }

)