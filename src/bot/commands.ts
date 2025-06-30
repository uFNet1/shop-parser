import { addItemToDb, addItemToUser, checkItemAvailable } from "../db/queries";
import { fetchLink } from "../utils/dom";
import { sanitizeLink } from "../utils/link";

export async function trackNewItem(link: string, userId: number) {
  const fullLink = link;
  link = sanitizeLink(link);
  const item = await checkItemAvailable(link);
  if (!item) {
    const data = await fetchLink(fullLink);
    if (data !== null && data !== undefined) {
      const newItem = await addItemToDb(
        parseInt(data.id),
        data.name,
        parseFloat(data.price),
        data.photo,
        link
      );
      const addingItem = await addItemToUser(newItem, userId);
      if (addingItem !== null) {
        return addingItem;
      } else {
        return false;
      }
    } else {
      console.error("Data is null or undefined at trackNewItem()");
      return false;
    }
  } else {
    const addingItem = await addItemToUser(item, userId);
    if (addingItem !== null) {
      return addingItem;
    } else {
      return false;
    }
  }
}
