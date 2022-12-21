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

  const fillPassword = page.getByPlaceholder('Пароль');
  await fillPassword.fill(userPassword); //fill works with defined locators, instead u can use .type()
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
  await page.waitForLoadState('networkidle') // ждем пока страница прогрузится, можно выбрать разные опции
  await page.goto('https://samokat2023-test.smartheadtest.ru/getPrize');
  const textUnavailablePrizes = page.locator('p.MuiTypography-root.MuiTypography-body1.css-y9bs3l');
  await expect(textUnavailablePrizes).toHaveText('Приз этого уровня недоступен или уже был получен');
  await page.getByRole('button', { name: 'Перейти к карточкам' }).click();
})

test.describe('Correct alerts', () =>  {
  test('should be correct copy top promocode from collection', async ({ page }) => {
  await page.goto('https://samokat2023-test.smartheadtest.ru/?tab=collection')
  await page.locator('(//button[@type="button"])[5]').click()
  await expect(page.locator('[role = "presentation"]')).toContainText('Cкопировано в буфер обмена.')//шрифт?
  })
  
  test('should be correct copy promocode after win game', async ({page}) => {
    await page.goto('https://samokat2023-test.smartheadtest.ru/?tab=game');
    await page.locator('button.MuiButtonBase-root.MuiButton-root').click();
    await expect(page.locator('[role = "presentation"]')).toContainText('Cкопировано в буфер обмена.')
  })
})

test.afterAll(async ({page}) => {
  await page.locator('(//button[@type="button"])[1]').click()
  await expect(page).toHaveURL('https://samokat2023-test.smartheadtest.ru/')
  await page.pause()
})


// всплываюшие уведомления
//expect(page.locator('[role = "presentation"]')).toContainText('Неверный логин или пароль')

// первый элемент 
// console.log(await page.locator('.card-body a).first().textContent())
// await.page(locator('.MuiBox-root css-1t6p8u7).first().

// последний элемент 
// console.log(await page.locator('.card-body a).first().textContent())

// 2 элемент и тд
// console.log(await page.locator('.card-body a).nth(1).textContent())

// возвращает массив со списком текстового контента, либо ставим waitForLoadState, либо перед этим выводим какой-то один из списка, потому что Playwright не ждет весь текстовый контент, а сразу возвращает его(дока autowaiting)
// console.log(await page.locator('.card-body a).nth(1).AllTextContent())

//await page.waitForLoadState('networkidle') // ждем пока страница прогрузится, можно выбрать разные опции

// если у нас non service oriented page, то используем race condition
// await Promise.all(
//   [
//     page.waitForNavigation(),
//     signIn.click(),
//   ]

// для чекбоксов проверка
// await expect(page.locator('').toBeChecked());
// console.log(await page.locator('').isChecked()) return true or false
