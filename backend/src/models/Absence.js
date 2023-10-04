import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Employee } from "./User.js";

export const Absence = sequelize.define("absences", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    absenceStart: {
        type: DataTypes.DATE,
    },
    absenceEnd: {
        type: DataTypes.DATE,
    },
    //Tipo de ausencia
    absenceType: {
        type: DataTypes.STRING,
    },
    //Detalle de ausencia
    absenceDetail: {
        type: DataTypes.TEXT,
    },
    //Este campo se utiliza para almacenar cualquier documentación relacionada con la ausencia. Esto podría incluir un certificado médico, una carta de solicitud, u otra información relevante.
    documentation: {
        type: DataTypes.BLOB,
    },
});


Employee.hasMany(Absence, {
    foreignKey: "employeeId",
    sourceKey: "id",
});
Absence.belongsTo(Employee, {
    foreignKey: "employeeId",
    targetKey: "id",
    allowNull: false,
});