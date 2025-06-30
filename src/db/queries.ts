import { Model } from "sequelize";
import db from "./db";
import { User } from "./models";
import { TrackedItems } from "./models";
import { ItemData } from "./models";

export async function addItemToDb(
  itemId: number,
  itemName: string,
  itemPrice: number,
  itemPhoto: string,
  itemLink: string
) {
  return await ItemData.create({
    itemId: itemId,
    itemName: itemName,
    storedPrice: itemPrice,
    itemPhoto: itemPhoto,
    itemLink: itemLink,
  });
}

export async function checkItemAvailable(link: string) {
  return await ItemData.findOne({ where: { itemLink: link } });
}

export async function addItemToUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: Model<any, any>,
  userId: number
) {
  const [user, created] = await User.findOrCreate({ where: { tgId: userId } });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  await user.addItemData(item);
  const tracked = await TrackedItems.findOne({
    where: {
      userId: user.id,
      itemDataId: item.id,
    },
  });
  return tracked;
}
