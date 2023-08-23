import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  ci: {
    type: DataTypes.STRING,
    unique: true,
  },
  address: {
    type: DataTypes.TEXT,
  },
  telf: {
    type: DataTypes.STRING,
  },
  cel: {
    type: DataTypes.STRING,
  },
  inside: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export const Employee = sequelize.define("employees", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 1,
  },
  staff: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  admin:{
    type: DataTypes.BOOLEAN,
    default: false,
  }
});

User.hasOne(Employee, {
  foreignKey: "userId",
  sourceKey: "id",
});
Employee.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
  allowNull: false,
  unique: true,
});

export const External = sequelize.define(
  "Externals",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);

User.hasOne(External, {
  foreignKey: "userId",
  sourceKey: "id",
});

External.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
  allowNull: false,
  unique: true,
});
