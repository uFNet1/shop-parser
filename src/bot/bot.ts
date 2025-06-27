import { Bot } from "grammy";
import { BOT_TOKEN } from "../envConst";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const bot = new Bot(BOT_TOKEN!);

bot.command("start", (ctx) => ctx.reply("Up and running!"));

bot.on("message", (ctx) => ctx.reply("Message!"));

bot.start();
