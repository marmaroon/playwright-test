const { test, expect, errors } = require('@playwright/test');

test('should be correct UI controls', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const userName = page.locator('#username')
    const signIn = page.locator('#signInBtn')
    const documentLink = page.locator('[href*="documents-request"]')
    const dropdown = page.locator('select.form-control')
    await dropdown.selectOption('consult')
    await page.locator('.radiotextsty').last().click()
    await page.locator('#okayBtn').click()
    //console.log(await expect(page.locator('.radiotextsty').last().isChecked());
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('#terms').click()
    await expect(page.locator('#terms')).toBeChecked();
    await page.locator('#terms').uncheck()
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect (documentLink).toHaveAttribute('class', 'blinkingText')

})


test('Child windows hadl', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    const documentLink = page.locator('[href*="documents-request"]')
    const [newPage] = await Promise.all( // for opening new tab
  [
    context.waitForEvent('page'),
    documentLink.click(),
  ]
    )
  const text = await newPage.locator('.red').textContent()
  const arrayText = text.split('@')
  const domain = arrayText[1].split(' ')[0]
  console.log(domain);
  await userName.fill(domain);
})


// --debug
