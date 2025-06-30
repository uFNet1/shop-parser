import { Bot, InlineKeyboard } from "grammy";
import { BOT_TOKEN } from "../envConst";
import {
  getUserTrackedItems,
  trackNewItem,
  unsubscribeItemFromUser,
} from "./commands";
import { restorePhotoLink } from "../utils/link";
import { ItemDataModel } from "../types";
import {
  createItemCard,
  createItemCardPhoto,
  escapeMarkdown,
} from "./formatUtils";

const UNSUBSCRIBE_CALLBACK_START = "uns";

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

bot.command("list", async (ctx) => {
  const trackedItems = await getUserTrackedItems(ctx.chatId);
  let temp: string;
  let idsArr: string[][] = [];
  temp = "**>";
  for (let index = 0; index < trackedItems.length; index++) {
    console.log(index);
    const id = trackedItems[index].itemId;
    const name = trackedItems[index].itemName;

    idsArr.push([`❌ ${name}`, `${UNSUBSCRIBE_CALLBACK_START}${String(id)}`]);

    temp = temp.concat(`>${escapeMarkdown(name)}\\;`);
    if ((index % 5 === 0 && index !== 0) || index === trackedItems.length - 1) {
      temp = temp.concat("||");
      const buttonsColumn = idsArr.map(([label, data]) => [
        InlineKeyboard.text(label, data),
      ]);
      const keyboard = InlineKeyboard.from(buttonsColumn);
      await ctx.reply(temp, {
        parse_mode: "MarkdownV2",
        reply_markup: keyboard,
      });
      temp = "**>";
      idsArr = [];
    } else {
      temp = temp.concat("\n");
    }
  }
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

bot.on("callback_query:data", async (ctx) => {
  const data = ctx.callbackQuery.data;
  const userId = ctx.chatId;
  if (data.startsWith(UNSUBSCRIBE_CALLBACK_START)) {
    if (userId !== undefined) {
      const result = await unsubscribeItemFromUser(
        Number(data.slice(UNSUBSCRIBE_CALLBACK_START.length)),
        userId
      );
      if (result)
        await ctx.reply(
          `Успішно відписано від ${data.slice(
            UNSUBSCRIBE_CALLBACK_START.length
          )}`
        );
    }
  }
  await ctx.answerCallbackQuery();
});

export function initBot() {
  bot.start().catch((err: unknown) => {
    console.error(err);
  });
  console.log("Bot started!");
}
