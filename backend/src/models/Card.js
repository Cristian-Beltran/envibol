import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { User } from "./User.js";

export const Card = sequelize.define("cards", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

export const TypeCard = sequelize.define("typeCards",{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  color:{
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  
})

TypeCard.hasOne(Card, {
  foreignKey: "typeCardId",
  sourceKey: "id",
});

Card.belongsTo(TypeCard, {
  foreignKey: "typeCardId",
  targetKey: "id",
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
