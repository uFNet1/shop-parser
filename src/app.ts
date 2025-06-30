import "dotenv/config";
import db from "./db/db";
import { initBot } from "./bot/bot";

const start = async () => {
  try {
    await db.authenticate();
    await db.sync();
    initBot();
    console.log("DB connected");
  } catch (error) {
    console.error(error);
  }
};

await start();
