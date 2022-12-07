const { test, expect, errors } = require('@playwright/test');

const phoneNumber = '9278626209';
const userPassword = 'Qwerty123';

test.beforeEach(async ({page}) => {
  await page.goto('https://samokat2023-test.smartheadtest.ru/');
  await page.getByRole('button', { name: 'Ок' }).click();
  const authButton = page.getByText('Войти').click()
  const fillMobilePhone = page.getByPlaceholder('+7 9XX XXX-XX-XX');
  // fill number
  await fillMobilePhone.fill(phoneNumber);
  // click button
  await page.getByText('Дальше').click()

  const fillPassword = page.getByPlaceholder('Пароль'); //в чем разница если выносить отдельно page или отдельно fillPassword?
  await fillPassword.fill(userPassword); //fill works with defined locators, instead u can use .type()
  // click button
  await page.getByText('Войти').click()
  await expect(page).toHaveTitle('Плед, какао и волшебные карты')
  // скрин страницы лк
  //await page.screenshot({ path: 'img/login.jpg' });
})


test.describe('Click tabs', () =>  {
  test('should be succesfull click on tab collections', async ({ page }) => {
  await page.getByRole('tab', { name: 'Моя коллекция 0' }).click();
  await expect(page).toHaveURL('https://samokat2023-test.smartheadtest.ru/?tab=collection');
  //await page.screenshot({ path: 'img/collection.jpg' })
  })

  test('should be successfull click on tab cards and open 1 card',  async ({ page }) => {
  await page.getByRole('tab', { name: 'Карточки' }).click();
  await expect(page).toHaveURL('https://samokat2023-test.smartheadtest.ru/');
  //await page.screenshot({ path: 'img/cards.jpg' })
  await page.getByRole('button', { name: 'ПЕРЕВЕРНУТЬ' }).click();
  //await page.screenshot({ path: 'img/opencard.jpg' })
  await expect(page.locator('span.MuiBadge-badge.MuiBadge-standard')).toHaveText('1');
})

test('should be successfull click on tab game and start it',  async ({ page }) => {
  await page.getByRole('tab', { name: 'Игра' }).click();
  await expect(page).toHaveURL('https://samokat2023-test.smartheadtest.ru/?tab=game');
  //await page.screenshot({ path: 'img/game.jpg' })
  await page.getByRole('button', { name: 'Играть' }).click();
  await page.getByRole('button', { name: 'Начать' }).click();

  })
})

test('should be unavailable level prize', async ({page}) => {
  await page.goto('https://samokat2023-test.smartheadtest.ru/getPrize')
  const textUnavailablePrizes = page.locator('p.MuiTypography-root.MuiTypography-body1.css-y9bs3l');
  await expect(textUnavailablePrizes).toHaveText('Приз этого уровня недоступен или уже был получен');
  await page.getByRole('button', { name: 'Перейти к карточкам' }).click();
})

test.describe('Correct alerts', () =>  {
  test('should be correct copy top promocode from collection', async ({ page }) => {
  await page.goto('https://samokat2023-test.smartheadtest.ru/?tab=collection')
  await page.locator('(//div[@class="MuiBox-root css-1a2z64m"]//button)[1]').click()
  await expect(page.locator('[role = "presentation"]')).toContainText('Cкопировано в буфер обмена.')//шрифт?
  })
  
  test.only('should be corrrect copy promocode after win game', async ({page}) => {
    await page.goto('https://samokat2023-test.smartheadtest.ru/?tab=game');
    await page.locator('button.MuiButtonBase-root.MuiButton-root').click();
    await expect(page.locator('[role = "presentation"]')).toContainText('Cкопировано в буфер обмена.')
  })
})

test.afterAll(async ({page}) => {
  await page.locator('button.MuiButtonBase-root.MuiIconButton-root').click()
  await expect(page).toHaveURL('https://samokat2023-test.smartheadtest.ru/landing')
})

// всплываюшие уведомления
  //expect(page.locator('[role = "presentation"]')).toContainText('Неверный логин или пароль')

// первый элемент 
// console.log(await page.locator('.card-body a).first().textContent())

// 2 элемент и тд
// console.log(await page.locator('.card-body a).nth(1).textContent())