import Sequelize from "sequelize";

export const sequelize = new Sequelize("envibol", "postgres", "holamundo", {
  host: "localhost",
  dialect: "postgres",
  timezone: "-04:00",
});
