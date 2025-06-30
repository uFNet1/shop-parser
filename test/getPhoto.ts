import jsdom from "jsdom";
const { JSDOM } = jsdom;

export async function fetchLink(url: string) {
  const response = await fetch(url);

  if (response.ok) {
    const json = await response.text();
    const dom = parseDOM(json);
    console.log(findActionLabel(dom));
  } else {
    console.log(response.status);
  }
  // const data = { price: findPrice(dom) };
  return;
}

function parseDOM(html: string) {
  const dom = new JSDOM(html);
  return dom;
}

function findActionLabel(dom: jsdom.JSDOM) {
  const selector =
    "#productMain > div > div.product-slider > div.cardproduct-slider-wrapper > div > div > picture > img";

  return findLogic(dom, selector);
}

function findLogic(dom: jsdom.JSDOM, selector: string) {
  const data = dom.window.document.querySelector(selector);
  console.log(data);
  if (data !== null && data instanceof dom.window.HTMLImageElement) {
    return data.src.trim();
  } else return false;
}
await fetchLink(
  "https://www.atbmarket.com/product/moloko-15-g-den-u-den-nezbirane-zgusene-z-cukrom-85-stik"
);
