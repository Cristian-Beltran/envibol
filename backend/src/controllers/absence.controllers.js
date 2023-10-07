import { Absence, AbsenceType } from "../models/Absence.js";
import { Employee, User } from '../models/User.js';

// Controlador para obtener todas las ausencias
export const getAbsences = async (req, res) => {
    try {
        const absences = await Absence.findAll({
            include: [
                {
                    model: AbsenceType,
                },
                {
                    model: Employee,
                    include: [{ model: User }],
                },
            ],
        });

        const absenceModify = absences.map((absence) => ({
            id: absence.id,
            start: absence.start,
            end: absence.end,
            detail: absence.detail,
            documentation: absence.documentation,
            absenceTypeName: absence.absence_type ? absence.absence_type.name : null,
            absenceTypeDetail: absence.absence_type ? absence.absence_type.detail : null,
            employeeFirstName: absence.employee && absence.employee.user ? absence.employee.user.first_name : null,
            employeeLastName: absence.employee && absence.employee.user ? absence.employee.user.last_name : null,
            employeeCI: absence.employee && absence.employee.user ? absence.employee.user.ci : null,
            employeeTelephone: absence.employee && absence.employee.user ? absence.employee.user.telf : null,
            employeeCelphone: absence.employee && absence.employee.user ? absence.employee.user.cel : null,
            createdAt: absence.createdAt,
        }));

        res.json(absenceModify);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

// Controlador para obtener una ausencia por ID
export const getAbsence = async (req, res) => {
    const absenceId = req.params.id;
    try {
        const absence = await Absence.findByPk(absenceId, {
            include: [
                {
                    model: AbsenceType,
                },
                {
                    model: Employee,
                    include: [{ model: User }],
                },
            ],
        });

        if (!absence) {
            res.status(404).json({
                errors: ['Ausencia no encontrada'],
            });
        } else {
            const absenceModify = {
                id: absence.id,
                start: absence.start,
                end: absence.end,
                detail: absence.detail,
                documentation: absence.documentation,
                absenceTypeName: absence.absence_type.name,
                absenceTypeDetail: absence.absence_type.detail,
                employeeFirstName: absence.employee.user.first_name,
                employeeLastName: absence.employee.user.last_name,
                employeeCI: absence.employee.user.ci,
                employeeTelephone: absence.employee.user.telf,
                employeeCelphone: absence.employee.user.cel,
                createdAt: absence.createdAt
            };

            res.json(absenceModify);
        }
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

// Controlador para crear una nueva ausencia
export const createAbsence = async (req, res) => {
    try {
        const newAbsence = await Absence.create(req.body);
        return res.json(newAbsence);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

// Controlador para actualizar una ausencia por ID
export const updateAbsence = async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Absence.update(req.body, {
            where: { id },
        });
        if (updated) {
            const updatedAbsence = await Absence.findByPk(id);
            return res.json(updatedAbsence);
        }
        return res.status(404).json({ error: "Ausencia no encontrada" });
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

// Controlador para eliminar una ausencia por ID
export const deleteAbsence = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Absence.destroy({
            where: { id },
        });
        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ error: "Ausencia no encontrada" });
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};
