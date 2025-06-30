import { Bot } from "grammy";
import { BOT_TOKEN } from "../envConst";
import { trackNewItem } from "./commands";
import { restorePhotoLink } from "../utils/link";
import { ItemDataModel } from "../types";
import { createItemCard, createItemCardPhoto } from "./formatUtils";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const bot = new Bot(BOT_TOKEN!);

await bot.api.setMyCommands([
  {
    command: "/addnewitem",
    description: "Додати товар",
  },
]);

bot.command("start", (ctx) => ctx.reply("Up and running!"));

bot.command("addnewitem", async (ctx) => {
  console.log("track new item");
  await ctx.reply("Надішли посилання"); //TODO Specify how to send link
});

bot
  .on("message:entities:url")
  .hears(/^https:\/\/www\.atbmarket\.com(?=\/|$)/, async (ctx) => {
    const addToTrack = await trackNewItem(
      ctx.message.text,
      ctx.message.chat.id
    );
    if (
      addToTrack !== false &&
      addToTrack !== null &&
      addToTrack !== "alreadyAdded"
    ) {
      await ctx.reply("Товар додано до списку!");
      const item = addToTrack.dataValues as ItemDataModel;
      let atbCardPrice: number | null;
      if (item.itemAtbCardPrice === null) {
        atbCardPrice = null;
      } else {
        atbCardPrice = item.itemAtbCardPrice;
      }

      let nonActionPrice: number | null;
      if (item.itemNonActionPrice === null) {
        nonActionPrice = null;
      } else {
        nonActionPrice = item.itemNonActionPrice;
      }

      const photo =
        typeof item.itemPhoto === "string"
          ? restorePhotoLink(item.itemPhoto)
          : null;
      if (photo === null) {
        const card = createItemCard(
          item.itemName,
          item.itemPrice,
          atbCardPrice,
          nonActionPrice
        );
        await ctx.reply(card.text, card.options);
      } else {
        const card = createItemCardPhoto(
          photo,
          item.itemName,
          item.itemPrice,
          atbCardPrice,
          nonActionPrice
        );
        await ctx.replyWithPhoto(card.photo, {
          caption: card.caption,
          ...card.options,
        });
      }
      console.log(addToTrack);
    } else if (addToTrack === "alreadyAdded") {
      await ctx.reply("Ви вже додали цей товар у свій список.");
    } else {
      await ctx.reply(
        "Нажаль, не вдалося додати товар до списку. Спробуйте пізніше або зверніться до розробника @support_atb_track."
      ); //TODO change tg username
    }
  });

export function initBot() {
  bot.start().catch((err: unknown) => {
    console.error(err);
  });
  console.log("Bot started!");
}
