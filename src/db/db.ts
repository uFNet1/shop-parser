import { Sequelize } from "sequelize";

export default new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_LOGIN,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_URL,
  port: process.env.DB_PORT,
  dialect: "postgres",
  // dialectOptions: {
  //   ssl: {
  //     require: ,
  //     rejectUnauthorized: false,
  //   },
  // },
});
