import jsdom from "jsdom";
const { JSDOM } = jsdom;

// const url =
//   "https://www.atbmarket.com/product/moloko-15-g-den-u-den-nezbirane-zgusene-z-cukrom-85-stik";

export async function fetchLink(url: string) {
  const response = await fetch(url);

  if (response.ok) {
    const json = await response.text();
    const dom = parseDOM(json);

    const id = findItemId(dom);
    const name = findName(dom);
    const price = findPrice(dom);
    const cardPrice = findPriceAtbCard(dom);
    const action = findActionLabel(dom);
    const photo = findPhoto(dom);
    if (
      typeof id === "string" &&
      typeof name === "string" &&
      typeof price === "string" &&
      typeof cardPrice === "string" &&
      typeof action === "string" &&
      typeof photo === "string"
    ) {
      return {
        id: id,
        name: name,
        price: price,
        cardPrice: cardPrice,
        action: action,
        photo: photo,
      };
    }
  } else {
    console.error(`Can't fetch ${url} status ${String(response.status)}`);
    return null;
  }
}

function parseDOM(html: string) {
  const dom = new JSDOM(html);
  return dom;
}

function findPrice(dom: jsdom.JSDOM) {
  const selector = `body > div.product-about-fixed.js-product-container.js-product-header-container.product-page-header--hide > div > div > div.product-about__buy-row > div.product-price-wrapper > div.product-price.product-price--weight.product-price--sale.product-about__price > data.product-price__top > span`;

  return findLogic(dom, selector, "text");
}

function findPriceAtbCard(dom: jsdom.JSDOM) {
  const selector =
    "#productMain > div > div.product-about__buy-row > div.atbcard-sale > div > data > span";
  return findLogic(dom, selector, "text");
}

function findActionLabel(dom: jsdom.JSDOM) {
  const selector =
    "#productMain > div > div.product-slider > div.product-about__labels > span:nth-child(2)";

  return findLogic(dom, selector, "text");
}

function findPhoto(dom: jsdom.JSDOM) {
  const selector =
    "#productMain > div > div.product-slider > div.cardproduct-slider-wrapper > div > div > picture > img";

  return findLogic(dom, selector, "src");
}

function findName(dom: jsdom.JSDOM) {
  const selector = "#productMain > div > h1";
  return findLogic(dom, selector, "text");
}
function findItemId(dom: jsdom.JSDOM) {
  const selector = `#productMain > div > div.product-about__buttons-row > div.product-about__tags > span > span > strong`;
  return findLogic(dom, selector, "text");
}
function findLogic(dom: jsdom.JSDOM, selector: string, type: string) {
  if (type === "text") {
    const data = dom.window.document.querySelector(selector);
    if (data) {
      if (data.textContent !== "" && data.textContent !== null)
        return data.textContent.trim();
    } else return false;
  } else if (type === "src") {
    const data = dom.window.document.querySelector(selector);
    if (data !== null && data instanceof dom.window.HTMLImageElement) {
      return data.src.trim();
    } else return false;
  }
}
