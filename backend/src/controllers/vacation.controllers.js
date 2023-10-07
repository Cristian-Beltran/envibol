import { Vacation } from '../models/Vacation.js';
import { Employee, User } from '../models/User.js';

export const getVacations = async (req, res) => {
    try {
        const vacations = await Vacation.findAll({
            include: [
                {
                    model: Employee,
                    include: [{ model: User, }],
                }],
        });
        const vacationModify = vacations.map((vacation) => ({
            id: vacation.id,
            start: vacation.start,
            end: vacation.end,
            dateRequested: vacation.dateRequested,
            status: vacation.status,
            observations: vacation.observations,
            employeeFirstName: vacation.employee && vacation.employee.user ? vacation.employee.user.first_name : null,
            employeeLastName: vacation.employee && vacation.employee.user ? vacation.employee.user.last_name : null,
            employeeCI: vacation.employee && vacation.employee.user ? vacation.employee.user.ci : null,
            employeeTelephone: vacation.employee && vacation.employee.user ? vacation.employee.user.telf : null,
            employeeCelphone: vacation.employee && vacation.employee.user ? vacation.employee.user.cel : null,
            createdAt: vacation.createdAt
        }));

        res.json(vacationModify);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

export const getVacation = async (req, res) => {
    const vacationId = req.params.id;
    try {
        const vacation = await Vacation.findByPk(vacationId, {
            include: [
                {
                    model: Employee,
                    include: [{ model: User }]
                }
            ]
        });

        if (!vacation) {
            res.status(404).json({
                errors: ['Vacación no encontrada'],
            });
        } else {
            const vacationModify = {
                id: vacation.id,
                start: vacation.start,
                end: vacation.end,
                dateRequested: vacation.dateRequested,
                status: vacation.status,
                observations: vacation.observations,
                employeeFirstName: vacation.employee && vacation.employee.user ? vacation.employee.user.first_name : null,
                employeeLastName: vacation.employee && vacation.employee.user ? vacation.employee.user.last_name : null,
                employeeCI: vacation.employee && vacation.employee.user ? vacation.employee.user.ci : null,
                employeeTelephone: vacation.employee && vacation.employee.user ? vacation.employee.user.telf : null,
                employeeCelphone: vacation.employee && vacation.employee.user ? vacation.employee.user.cel : null,
                createdAt: vacation.createdAt
            };

            res.json(vacationModify);
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