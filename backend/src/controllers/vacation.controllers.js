import { Vacation } from '../models/Vacation.js';
import { Employee } from '../models/User.js';

export const getVacations = async (req, res) => {
    try {
        const vacations = await Vacation.findAll();
        res.json(vacations);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

/* export const getVacation = async (req, res) => {
    const vacationId = req.params.id;
    try {
        const vacation = await Vacation.findByPk(vacationId);
        if (!vacation) {
            res.status(404).json({
                errors: ['Vacación no encontrada'],
            });
        } else {
            res.json(vacation);
        }
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
}; */

export const getVacation = async (req, res) => {
    const vacationId = req.params.id;
    try {
        const vacation = await Vacation.findByPk(vacationId, {
            include: Employee, // Incluye el empleado asociado a la vacación
        });

        if (!vacation) {
            res.status(404).json({
                errors: ['Vacación no encontrada'],
            });
        } else {
            // Accede al email del empleado a través de la relación
            const employeeEmail = vacation.Employee ? vacation.Employee.email : '';

            // Crea una respuesta JSON que incluye el email del empleado
            const response = {
                id: vacation.id,
                start: vacation.start,
                end: vacation.end,
                dateRequested: vacation.dateRequested,
                status: vacation.status,
                observations: vacation.observations,
                employeeId: vacation.employeeId,
                employeeEmail, // Agrega el email del empleado
            };

            res.json(response);
        }
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};


export const createVacation = async (req, res) => {
    try {
        const { start, end, dateRequested, status, observations, employeeId } = req.body;
        const vacation = await Vacation.create({
            start,
            end,
            dateRequested,
            status,
            observations,
            employeeId,
        });
        res.status(201).json(vacation);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

export const updateVacation = async (req, res) => {
    const vacationId = req.params.id;
    try {
        const vacation = await Vacation.findByPk(vacationId);
        if (!vacation) {
            res.status(404).json({
                errors: ['Vacación no encontrada'],
            });
        } else {
            const { start, end, dateRequested, status, observations } = req.body;
            await vacation.update({
                start,
                end,
                dateRequested,
                status,
                observations,
            });
            res.json(vacation);
        }
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

export const deleteVacation = async (req, res) => {
    const vacationId = req.params.id;
    try {
        const vacation = await Vacation.findByPk(vacationId);
        if (!vacation) {
            res.status(404).json({
                errors: ['Vacación no encontrada'],
            });
        } else {
            await vacation.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};