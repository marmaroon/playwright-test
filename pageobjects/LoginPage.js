class LoginPage {

    constructor(page) {
        this.page = page; // making available for validateLogin
        this.signInBtn = page.locator('[value="Login"]');
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    async goTo() //custom methods
    {
        await this.page.goto('https://rahulshettyacademy.com/client');
    }

    async validLogin(username, password)
    {   
        await this.userName.type(username);
        await this.password.type(password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = {LoginPage};