import { TimeTable } from "../models/TimeTable.js";

//obtiene la tabla de tiempo
export const getTimeTables = async (req, res) => {
    try {
        const timeTable = await TimeTable.findAll();
        res.json(timeTable);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};
//obtener un solo tiempo
export const getTimeTableById = async (req, res) => {
    try {
        const timeTable = await TimeTable.findByPk(req.params.id);
        res.json(timeTable);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//crear un tiempo
export const createTimeTable = async (req, res) => {
    try {
        const {
            title,
            description,
            toleranceDelay,
            toleranceLack,
            toleranceOutput,
            earlyExit,
            puntuality,
            priority,
            mondayEntry,
            mondayExit,
            mondayEnable,
            tuesdayEntry,
            tuesdayExit,
            tuesdayEnable,
            wednesdayEntry,
            wednesdayExit,
            wednesdayEnable,
            thursdayEntry,
            thursdayExit,
            thursdayEnable,
            fridayEntry,
            fridayExit,
            fridayEnable,
            saturdayEntry,
            saturdayExit,
            saturdayEnable,
            sundayEntry,
            sundayExit,
            sundayEnable,
        } = req.body;
        const newTimetable = await TimeTable.create({
            title,
            description,
            toleranceDelay,
            toleranceLack,
            toleranceOutput,
            earlyExit,
            puntuality,
            priority,
            mondayEntry,
            mondayExit,
            mondayEnable,
            tuesdayEntry,
            tuesdayExit,
            tuesdayEnable,
            wednesdayEntry,
            wednesdayExit,
            wednesdayEnable,
            thursdayEntry,
            thursdayExit,
            thursdayEnable,
            fridayEntry,
            fridayExit,
            fridayEnable,
            saturdayEntry,
            saturdayExit,
            saturdayEnable,
            sundayEntry,
            sundayExit,
            sundayEnable,
        });
        return res.json(newTimetable);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};

//actualizar un tiempo
export const updateTimeTable = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const timeTable = await TimeTable.findByPk(id);
        timeTable.title = title;
        timeTable.description = description;
        await timeTable.save();
        res.json(timeTable);
    } catch (error) {
        res.status(500).json({
            errors: [error.message],
        });
    }
};