import "dotenv/config";
import db from "./db/db";
import { initBot } from "./bot/bot";
import cron from 'node-cron';
import { checkAllDiscounts } from "./utils/parser/parsePage";

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    initBot();
    console.log("DB connected");
  } catch (error) {
    console.error(error);
  }
    
  cron.schedule('* 8 * * *', async () => {
    await checkAllDiscounts()
  });
};

await start();
