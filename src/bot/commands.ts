import {
  addItemToDb,
  addItemToUser,
  checkItemAvailable,
  removeItemFromUser,
  returnAllTrackedItems,
} from "../db/queries";
import { ItemDataModel } from "../types";
import { fetchLink } from "../utils/dom";
import { sanitizeLink } from "../utils/link";

export async function trackNewItem(link: string, userId: number) {
  const sanitizedLink = sanitizeLink(link);
  if (sanitizedLink === null) return false;
  const item = await checkItemAvailable(sanitizedLink);
  if (!item) {
    const data = await fetchLink(link);
    if (data !== null && data !== undefined) {
      console.log("Adding item to DB");
      const newItem = await addItemToDb(
        parseInt(data.id),
        data.name,
        parseFloat(data.price),
        typeof data.cardPrice === "string" ? parseFloat(data.cardPrice) : null,
        typeof data.nonActionPrice === "string"
          ? parseFloat(data.nonActionPrice)
          : null,
        data.photo,
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
      console.error("Data is null or undefined at trackNewItem()");
      return false;
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
