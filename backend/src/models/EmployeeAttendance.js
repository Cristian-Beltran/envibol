import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Employee } from "./User.js";
import { TimeTable } from "./TimeTable.js";

export const EmployeeAttendance = sequelize.define('employeeAttendance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    entryHour: {
        type: DataTypes.TIME,
    },
    exitHour: {
        type: DataTypes.TIME,
    },
    day: {
        type: DataTypes.DATEONLY,
    },

    // *Solo se permiten "onTime" y "late"
    punctualityStatus: {
        type: DataTypes.STRING,
    },
});

EmployeeAttendance.hasOne(TimeTable, {
    foreignKey: "timeTableId",
    sourceKey: "id",
});
TimeTable.belongsTo(EmployeeAttendance, {
    foreignKey: "employeeAttendanceId",
    targetKey: "id",
    allowNull: true,
    unique: true,
});

Employee.hasMany(EmployeeAttendance, {
    foreignKey: "employeeId",
    sourceKey: "id",
});
EmployeeAttendance.belongsTo(Employee, {
    foreignKey: "employeeAttendanceId",
    targetKey: "id",
    allowNull: false,
    unique: true,
});