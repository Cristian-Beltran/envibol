import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Employee } from "./User.js";

export const Role = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

Role.hasMany(Employee, {
  foreignKey: "roleId",
  sourceKey: "id",
});

Employee.belongsTo(Role, {
  foreignKey: "roleId",
  targetKey: "id",
});
