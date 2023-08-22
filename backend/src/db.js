import Sequelize from "sequelize";

export const sequelize = new Sequelize("envibol", "postgres", "holamundo1", {
  host: "localhost",
  dialect: "postgres",
  timezone: "-04:00",
});
