class DashboardPage {

    constructor(page)
    {
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator('[routerlink*="cart"]');
    }

    async searchProductAddCart(productName)
    {
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        
        const countProducts = await this.products.count();  //how much elements in this selector
        for (let i = 0; i < countProducts; ++i) {
            if(await this.products.nth(i).locator('b').textContent() === productName) {
                // add to cart
                await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.cart.click();
    }

}
module.exports = {DashboardPage};