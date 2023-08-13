import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { External } from "./User.js"; 

export const Visit = sequelize.define("visits", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  reason: {
    type: DataTypes.TEXT,
  },
});


External.hasMany(Visit,{
  foreignKey: "externalId",
  sourceKey: "id",
})
Visit.belongsTo(External,{
  foreignKey: "externalId",
  targetKey: "id",
  allowNull: false,
})
