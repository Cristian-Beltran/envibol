import Sequelize from "sequelize";

export const sequelize = new Sequelize("envibol", "postgres", "holamundo1", {
  host: "srv-captain--envibol-db",
  dialect: "postgres",
  timezone: "-04:00",
});
sequelize.options.logging = false;
