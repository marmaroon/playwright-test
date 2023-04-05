const playwright = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");
const { Before, After, BeforeStep, AfterStep, Status } = require("@cucumber/cucumber");

Before( async function () {
  const browser = await playwright.chromium.launch({
    //get browser object
    headless: false,
  });
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

BeforeStep(function () {});

AfterStep(async function ({ result }) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "screenshot1.png" });
  }
});

After(function () {
  console.log("The process is finished");
});
