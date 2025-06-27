import puppeteer from "puppeteer";

// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
await page.goto(
  "https://www.atbmarket.com/product/moloko-15-g-den-u-den-nezbirane-zgusene-z-cukrom-85-stik/"
);

const selector =
  "#productMain > div > div.product-about__buy-row > div.product-price.product-price--weight.product-price--sale.product-about__price > data.product-price__top";

// await page.waitForSelector(selector);

// Set screen size.
await page.setViewport({ width: 1080, height: 1024 });

await page.screenshot({ path: "test.png", fullPage: true });
// // Type into search box using accessible input name.
// await page.locator("aria/Search").fill("automate beyond recorder");

// // Wait and click on first result.
// await page.locator(".devsite-result-item-link").click();

// Locate the full title with a unique string.
const textSelector = await page.locator(selector).waitHandle();
const text = await textSelector?.evaluate((el) => el.textContent);

// Print the full title.
console.log(text);

await browser.close();
