import { Bot } from "grammy";
import { BOT_TOKEN } from "../envConst";
import { fetchLink } from "../utils/dom";
import { trackNewItem } from "./commands";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const bot = new Bot(BOT_TOKEN!);

// bot.on("message", (ctx) => ctx.reply("Message!"));
// bot.on("message", (ctx) => ctx.reply("Testing!"));

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
    if (addToTrack !== false) {
      await ctx.reply("Товар додано до списку!");
      await ctx.reply("TODO Add item name, photo, price"); //TODO Add itme name photo price
      console.log(addToTrack);
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
