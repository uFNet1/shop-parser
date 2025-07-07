import {
  addItemToDb,
  addItemToUser,
  checkItemAvailable,
  removeItemFromUser,
  returnAllTrackedItems,
} from "../db/queries";
import { ItemDataModel } from "../types";
import { fetchLink } from "../utils/dom";
import { findItemId, findName, findPrice, findNonActionPrice, findPriceAtbCard, findPhoto } from "../utils/dom/selectors/domSelectors";
import { sanitizeLink, sanitizePhotoLink } from "../utils/formatLink";

export async function trackNewItem(link: string, userId: number) {
  const sanitizedLink = sanitizeLink(link);
  if (sanitizedLink === null) return false;
  const item = await checkItemAvailable(sanitizedLink);
  if (!item) {
    const dom = await fetchLink(link);
    if (dom === null) return false;

    const id = findItemId(dom);
    const name = findName(dom);
    const price = findPrice(dom);
    const nonActionPrice = findNonActionPrice(dom);
    const cardPrice = findPriceAtbCard(dom);
    const photo = findPhoto(dom);

    if (id !== null && id !== undefined && name !== null && name !== undefined && price !== null && price !== undefined) {
      let sanitizedPhoto: string | null;
      if (typeof photo === "string") {
        sanitizedPhoto = sanitizePhotoLink(photo);
      } else {
        sanitizedPhoto = null;
      }
      console.log("Adding item to DB");
      const newItem = await addItemToDb(
        parseInt(id),
        name,
        parseFloat(price),
        typeof cardPrice === "string" ? parseFloat(cardPrice) : null,
        typeof nonActionPrice === "string"
          ? parseFloat(nonActionPrice)
          : null,
        sanitizedPhoto,
        sanitizedLink
      );
      const addingItem = await addItemToUser(newItem, userId);
      if (addingItem !== null) {
        const addedItem = await checkItemAvailable(sanitizedLink);
        return addedItem;
      } else {
        return "alreadyAdded";
      }

    } else {
      console.error(`Can't return data because important parameter is null`);
      console.log(id);
      console.log(name);
      console.log(price);
    }

  } else {
    console.log("ITEM ALREDY EXISTS!");
    const addingItem = await addItemToUser(item, userId);
    if (addingItem !== null) {
      const addedItem = await checkItemAvailable(sanitizedLink);
      return addedItem;
    } else {
      return "alreadyAdded";
    }
  }
}

export async function getUserTrackedItems(userId: number) {
  //
  const userItems = (await returnAllTrackedItems(userId)) as any[];
  //userItems = [itemData{dataValues{}}]
  const userItemsArr: ItemDataModel[] = [];
  userItems.map((el) => {
    return userItemsArr.push(el.dataValues as ItemDataModel);
  });
  return userItemsArr;
}

export async function unsubscribeItemFromUser(itemId: number, userId: number) {
  return await removeItemFromUser(itemId, userId);
}
