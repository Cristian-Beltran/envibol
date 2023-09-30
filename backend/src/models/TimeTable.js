import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const TimeTable = sequelize.define("timeTable", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  toleranceDelay: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  toleranceLack: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  toleranceOutput: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  earlyExit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  puntuality: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mondayEntry: {
    type: DataTypes.TIME,
  },
  mondayExit: {
    type: DataTypes.TIME,
  },
  mondayEnable: {
    type: DataTypes.BOOLEAN,
  },
  tuesdayEntry: {
    type: DataTypes.TIME,
  },
  tuesdayExit: {
    type: DataTypes.TIME,
  },
  tuesdayEnable: {
    type: DataTypes.BOOLEAN,
  },
  wednesdayEntry: {
    type: DataTypes.TIME,
  },
  wednesdayExit: {
    type: DataTypes.TIME,
  },
  wednesdayEnable: {
    type: DataTypes.BOOLEAN,
  },
  thursdayEntry: {
    type: DataTypes.TIME,
  },
  thursdayExit: {
    type: DataTypes.TIME,
  },
  thursdayEnable: {
    type: DataTypes.BOOLEAN,
  },
  fridayEntry: {
    type: DataTypes.TIME,
  },
  fridayExit: {
    type: DataTypes.TIME,
  },
  fridayEnable: {
    type: DataTypes.BOOLEAN,
  },
  saturdayEntry: {
    type: DataTypes.TIME,
  },
  saturdayExit: {
    type: DataTypes.TIME,
  },
  saturdayEnable: {
    type: DataTypes.BOOLEAN,
  },
  sundayEntry: {
    type: DataTypes.TIME,
  },
  sundayExit: {
    type: DataTypes.TIME,
  },
  sundayEnable: {
    type: DataTypes.BOOLEAN,
  },
});
