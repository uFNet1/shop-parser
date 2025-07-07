import "dotenv/config";
import db from "./db/db";
import { initBot } from "./bot/bot";
import cron from 'node-cron';
import { checkAllDiscounts } from "./utils/parser/parsePage";
import express from "express";

const server = express();
server.use(express.json());

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

server.get("/testing", (req, res) => {
  res.sendStatus(200);
});

server.listen((process.env.S_PORT as unknown as number) || 8080, () => {
  console.log("Server started");
});