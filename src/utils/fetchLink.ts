import { CartDataObject } from "../types";

const CART_URL = "https://www.atbmarket.com/shop/cart/wcart";

async function getCartHash(itemId: number, shopId = 200381) {
  const promise = await fetch(
    `https://www.atbmarket.com/shop/cart/wquantity?quantity=1&shopid=${String(
      shopId
    )}&productid=${String(itemId)}&measure=0`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": "PostmanRuntime/7.44.1",
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
      },
      body: null,
      method: "GET",
    }
  );
  if (!promise.ok) return null;
  const cookie = promise.headers.get("set-cookie");
  const cartCookie = cookie?.slice(cookie.indexOf("cart="));
  return cartCookie;
}

async function getItemPrice(itemId: number) {
  const cookie = await getCartHash(itemId);
  if (cookie === null || cookie === undefined) {
    return null;
  }
  const priceDataRaw = await fetch(CART_URL, {
    headers: {
      accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": "PostmanRuntime/7.44.1",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
      Cookie: cookie,
    },
    method: "GET",
  });
  if (!priceDataRaw.ok) {
    return null;
  }
  return JSON.parse(await priceDataRaw.text()) as CartDataObject;
}

async function 