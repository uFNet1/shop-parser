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
    console.log('starting experiment')
    const startT = performance.now();
    await checkAllDiscounts()
    const endT = performance.now();
    console.log(`Time took to perform this request: ` + String((endT - startT)));
//   cron.schedule('49 17 * * *', () => {
//   console.log('running a task every minute');
// });
};

await start();
