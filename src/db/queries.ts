import { Model } from "sequelize";
import db from "./db";
import { User } from "./models";
import { TrackedItems } from "./models";
import { ItemData } from "./models";

export async function addItemToDb(
  itemId: number,
  itemName: string,
  itemPrice: number,
  itemAtbCardPrice: number | null,
  itemNonActionPrice: number | null,
  itemPhoto: string | null,
  itemLink: string
) {
  return await ItemData.create({
    itemId: itemId,
    itemName: itemName,
    itemPrice: itemPrice,
    itemAtbCardPrice: itemAtbCardPrice,
    itemNonActionPrice: itemNonActionPrice,
    itemPhoto: itemPhoto,
    itemLink: itemLink,
  });
}

export async function checkItemAvailable(fullLink: string) {
  return await ItemData.findOne({ where: { itemLink: fullLink } });
}

export async function addItemToUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: Model<any, any>,
  userId: number
) {
  const [user, created] = await User.findOrCreate({ where: { tgId: userId } });
  const tracked = await TrackedItems.findOne({
    where: {
      userId: user.id,
      itemDataId: item.id,
    },
  });
  if (!tracked) {
    await user.addItemData(item);
  } else {
    return null;
  }
  const newItem = await TrackedItems.findOne({
    where: {
      userId: user.id,
      itemDataId: item.id,
    },
  });
  return newItem;
}
