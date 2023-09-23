import Sequelize from "sequelize";
import { DB, HOST, PASSWORD, PORT, USERNAME } from "./config.js";

export const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {
  host: HOST,
  port: PORT,
  dialect: "postgres",
  timezone: "-04:00",
});
sequelize.options.logging = false;
