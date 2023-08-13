import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { Turnstile } from "./Turnstile.js";

export const Entrie = sequelize.define("entries", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Entrie, {
  foreignKey: "userId",
  sourceKey: "id",
});
Entrie.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});

Turnstile.hasMany(Entrie, {
  foreignKey: "turnstileId",
  sourceKey: "id",
});

Entrie.belongsTo(Turnstile, {
  foreignKey: "turnstileId",
  targetKey: "id",
});
