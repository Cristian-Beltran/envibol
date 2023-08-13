import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";

export const Card = sequelize.define("cards", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  rfid: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
});

User.hasOne(Card, {
  foreignKey: "userId",
  sourceKey: "id",
});

Card.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
  allowNull: true,
  unique: true,
});
