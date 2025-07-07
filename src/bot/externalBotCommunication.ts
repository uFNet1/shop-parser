import { getAllSubscribedUsersByItemId, getUserById } from "../db/queries";
import { CardMessage, CardPhoto } from "../types";
import { restorePhotoLink } from "../utils/formatLink";
import { bot } from "./bot";
import { createItemCard, createItemCardPhoto } from "./formatUtils";

export async function sendPriceCard(
  name: string,
  price: number,
  cardPrice: number | null,
  oldPrice: number | null,
  photoUrl: string | null,
  itemDbId: number
) {
  let cardPhoto: CardPhoto | null = null;
  let card: CardMessage | null = null;
  console.log("Creating card for message");
  if (photoUrl !== null) {
    photoUrl = restorePhotoLink(photoUrl);
    cardPhoto = createItemCardPhoto(photoUrl, name, price, cardPrice, oldPrice);
  } else {
    card = createItemCard(name, price, cardPrice, oldPrice);
  }
  if (photoUrl !== null && cardPhoto !== null) {
    const subsArr = await getAllSubscribedUsersByItemId(itemDbId);
    for (const sub of subsArr) {
      const subId = sub.dataValues.userId;
      const user = await getUserById(Number(subId));
      const userTgId = user?.dataValues.tgId;
      console.log("Sending photo card");
      await bot.api.sendPhoto(Number(userTgId), photoUrl, {
        caption: cardPhoto.caption,
        ...cardPhoto.options,
      });
    }
  } else if (card !== null) {
    const subsArr = await getAllSubscribedUsersByItemId(itemDbId);
    for (const sub of subsArr) {
      const subId = sub.dataValues.id;
      const user = await getUserById(Number(subId));
      const userTgId = user?.dataValues.tgId;
      console.log("Sending card");
      await bot.api.sendMessage(Number(userTgId), card.text, card.options);
    }
  }
  // await ctx.replyWithPhoto(card.photo, {
  //       caption: card.caption,
  //       ...card.options,
  //     });
}
