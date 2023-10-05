import { Absence } from "../models/Absence.js";

// Controlador para obtener todas las ausencias
export const getAbsences = async (req, res) => {
    try {
        const absences = await Absence.findAll();
        res.json(absences);
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

// Controlador para obtener una ausencia por ID
export const getAbsence = async (req, res) => {
    const { id } = req.params;
    try {
        const absence = await Absence.findByPk(id);
        if (!absence) {
            return res.status(404).json({ error: "Ausencia no encontrada" });
        }
        return res.json(absence);
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
