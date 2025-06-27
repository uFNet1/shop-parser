import jsdom from "jsdom";
import dotenv from "dotenv";
const { JSDOM } = jsdom;

dotenv.config();

const url =
  "https://www.atbmarket.com/product/moloko-15-g-den-u-den-nezbirane-zgusene-z-cukrom-85-stik";
const response = await fetch(url);

if (response.ok) {
  const json = await response.text();
  const dom = parseDOM(json);
  console.log(findPrice(dom));
  console.log(findActionLabel(dom));
} else {
  console.log(response.status);
}

function findPrice(dom: jsdom.JSDOM) {
  const selector = `body > div.product-about-fixed.js-product-container.js-product-header-container.product-page-header--hide > div > div > div.product-about__buy-row > div.product-price-wrapper > div.product-price.product-price--weight.product-price--sale.product-about__price > data.product-price__top > span`;

  return findLogic(dom, selector);
}
function findPriceAtbCard(dom: jsdom.JSDOM) {
  const selector =
    "#productMain > div > div.product-about__buy-row > div.atbcard-sale > div > data > span";
  return findLogic(dom, selector);
}

function parseDOM(html: string) {
  const dom = new JSDOM(html);
  return dom;
}

function findActionLabel(dom: jsdom.JSDOM) {
  const selector =
    "#productMain > div > div.product-slider > div.product-about__labels > span:nth-child(2)";

  return findLogic(dom, selector);
}

function findLogic(dom: jsdom.JSDOM, selector: string) {
  const data = dom.window.document.querySelector(selector)?.textContent;
  return data;
}
