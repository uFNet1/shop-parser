import { sendPriceCard } from "../../bot/externalBotCommunication";
import { getItemById } from "../../db/queries";
import { ItemDataModel } from "../../types";
import { fetchQueryPage } from "../dom";
import { findAllItemsOnPage, findLastPage } from "../dom/selectors/domSelectors";

const ECONOMY_PAGE = `https://www.atbmarket.com/promo/economy?page=`;
const SUPERDISCOUNTS_PAGE = `https://www.atbmarket.com/promo/sale_tovari?page=`;
const ATBCARDPRICE_PAGE = `https://www.atbmarket.com/promo/micni?page=`

const discountPagesArr = [ECONOMY_PAGE, SUPERDISCOUNTS_PAGE, ATBCARDPRICE_PAGE];

export async function checkAllDiscounts() {
  for (const discountPage of discountPagesArr) {
  console.log('Fetching page...')
  const firstPage = await fetchQueryPage(discountPage, 1);
  if (firstPage === null) return null;
  const pagesCount = findLastPage(firstPage);
  console.log('Got page count. ' + pagesCount + ' pages')
  for (let index = 1; index < (Number(pagesCount) + 1); index++) {
    console.log(`Processing page` + index)
    let page;
    if (index === 1) page = firstPage;
    else page = await fetchQueryPage(discountPage, index);
    const itemsArr = findAllItemsOnPage(page);
    for (const el of itemsArr) {
      if (el.id === null || el.price === null || el.oldPrice === null) continue;
      const rawItem = await getItemById(Number(el.id));
      if (rawItem === null) continue;
      const item = rawItem.dataValues as ItemDataModel;

      //discount without atb card discount
      if (item.itemPrice !== Number(el.price) && el.priceAtbCard === null) {
        rawItem.itemPrice = Number(el.price);
        rawItem.itemNonActionPrice = Number(el.oldPrice);
        rawItem.itemAtbCardPrice = null;
        await rawItem.save();
        await sendPriceCard(item.itemName, Number(el.price), null, Number(el.oldPrice), item.itemPhoto, Number(rawItem.dataValues.id));
      }
      //discount with atb card discount 
      else if (item.itemPrice !== Number(el.price) && (el.priceAtbCard !== null && item.itemAtbCardPrice !== Number(el.priceAtbCard))) {
        rawItem.itemPrice = Number(el.price);
        rawItem.itemNonActionPrice = Number(el.oldPrice);
        rawItem.itemAtbCardPrice = Number(el.priceAtbCard);
        await rawItem.save();
        await sendPriceCard(item.itemName, Number(el.price), Number(el.priceAtbCard), Number(el.oldPrice), item.itemPhoto, Number(rawItem.dataValues.id));
      }
      //atb card discount only
      else if (item.itemPrice === Number(el.price) && item.itemAtbCardPrice !== Number(el.priceAtbCard)) {
        rawItem.itemAtbCardPrice = Number(el.priceAtbCard);
        await rawItem.save();
        await sendPriceCard(item.itemName, Number(el.price), Number(el.priceAtbCard), null, item.itemPhoto, Number(rawItem.dataValues.id));
      }
    }
  }
  }
}