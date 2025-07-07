import jsdom from "jsdom";
import { ParserData } from "../../../types";

export function findPrice(dom: jsdom.JSDOM) {
  const selectorArr = [
    `#productMain > div > div.product-about__buy-row > div.product-price.product-price--weight.product-about__price > data > span`,
    `body > div.product-about-fixed.js-product-container.js-product-header-container.product-page-header--hide > div > div > div.product-about__buy-row > div.product-price-wrapper > div > data > span`,
    `#productMain > div > div.product-about__buy-row > div.product-price.product-price--weight.product-price--sale.product-about__price > data.product-price__top > span`,
  ];
  for (const element of selectorArr) {
    const content = findLogic(dom, element, "text");
    if (content !== null) {
      return content;
    }
  }
  return null;
}

export function findNonActionPrice(dom: jsdom.JSDOM) {
  const selector = `#productMain > div > div.product-about__buy-row > div.product-price.product-price--weight.product-price--sale.product-about__price > data.product-price__bottom > span`;

  return findLogic(dom, selector, "text");
}

export function findPriceAtbCard(dom: jsdom.JSDOM) {
  const selector =
    "#productMain > div > div.product-about__buy-row > div.atbcard-sale > div > data > span";
  return findLogic(dom, selector, "text");
}

export function findActionLabel(dom: jsdom.JSDOM) {
  const selector =
    "#productMain > div > div.product-slider > div.product-about__labels > span:nth-child(2)";

  return findLogic(dom, selector, "text");
}

export function findPhoto(dom: jsdom.JSDOM) {
  const selector =
    "#productMain > div > div.product-slider > div.cardproduct-slider-wrapper > div > div > picture > img";

  return findLogic(dom, selector, "src");
}

export function findName(dom: jsdom.JSDOM) {
  const selector = "#productMain > div > h1";
  return findLogic(dom, selector, "text");
}
export function findItemId(dom: jsdom.JSDOM) {
  const selector = `#productMain > div > div.product-about__buttons-row > div.product-about__tags > span > span > strong`;
  return findLogic(dom, selector, "text");
}
export function findLastPage(dom: jsdom.JSDOM) {
  const selector = `#main > section > div > div > div > div.product-pagination > nav > ul`
  const el = dom.window.document.querySelector(selector);
  const elArr =  el?.querySelectorAll('.product-pagination__item');
  if (elArr !== undefined) return elArr[elArr.length - 2].textContent;
  else return null;
  
}
export function findAllItemsOnPage(dom: jsdom.JSDOM) {
  const selectorData = '#main > section > div > div > div > div.catalog-page__list > div.catalog-list > article > div.catalog-item__photo > div.catalog-item__counter > div';
  const selectorPrice = `#main > section > div > div > div > div.catalog-page__list > div.catalog-list > article > div.catalog-item__bottom > div > data.product-price__top > span`;
  const selectorOldPrice = `#main > section > div > div > div > div.catalog-page__list > div.catalog-list > article > div.catalog-item__bottom > div > data.product-price__bottom > span`;
  const selectorPriceAtbCard = `#main > section > div > div > div > div.catalog-page__list > div.catalog-list > article > div.catalog-item__bottom > div.atbcard-sale > div > data > span`;

  const nodeDataList = dom.window.document.querySelectorAll(selectorData);
  const nodePriceList = dom.window.document.querySelectorAll(selectorPrice);
  const nodeOldPriceList = dom.window.document.querySelectorAll(selectorOldPrice);
  const nodePriceAtbCardList = dom.window.document.querySelectorAll(selectorPriceAtbCard);

  const itemsArr:ParserData[] = [];
  for (let index = 0; index < nodeDataList.length; index++) {
    const id = nodeDataList[index].getAttribute('data-productid');
    const price = nodePriceList[index].textContent;
    const oldPrice = nodeOldPriceList[index].textContent;
    const priceAtbCard = nodePriceAtbCardList.length !== 0 ? nodePriceAtbCardList[index].textContent : null;
    itemsArr.push({id, price, oldPrice, priceAtbCard});
  }

  return itemsArr;
}
function findLogic(dom: jsdom.JSDOM, selector: string, type: string) {
  if (type === "text") {
    const data = dom.window.document.querySelector(selector);
    if (data) {
      if (data.textContent !== "" && data.textContent !== null)
        return data.textContent.trim();
    } else return null;
  } else if (type === "src") {
    const data = dom.window.document.querySelector(selector);
    if (data !== null && data instanceof dom.window.HTMLImageElement) {
      return data.src.trim();
    } else return null;
  }
}
