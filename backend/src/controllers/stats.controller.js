import { Entrie } from "../models/Entrie.js";
import { Employee, External, User } from "../models/User.js";
import { Op, fn, literal, col } from "sequelize";
import { Visit } from "../models/Visit.js";

export const getTotal = async (req, res) => {
  try {
    const initDate = new Date();
    const finalDate = new Date();
    initDate.setHours(0, 0, 0, 0);
    const entries = await Entrie.count({
      where: {
        type: "entry",
        createdAt: {
          [Op.between]: [initDate, finalDate],
        },
      },
    });
    const exits = await Entrie.count({
      where: {
        type: "exit",
        createdAt: {
          [Op.between]: [initDate, finalDate],
        },
      },
    });

    const employees = await Employee.count({
      where: { status: "1" },
    });

    const visits = await Visit.count({
      where: {
        createdAt: {
          [Op.between]: [initDate, finalDate],
        },
      },
    });

    res.json({
      entries: entries,
      exits: exits,
      employees: employees,
      visits: visits,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

const convertArray = (data) => {
  const dataFormat = [];
  for (let i = 0; i < 24; i++) {
    dataFormat.push(0);
  }
  data.forEach((item) => {
    const { hour, count } = item.dataValues;
    const date = new Date(hour); // Obtener la parte de la fecha YYYY-MM-DD
    const dateHour = date.getHours();
    dataFormat[dateHour] += parseInt(count, 10);
  });
  return dataFormat;
};

export const getEntrieHour = async (req, res) => {
  try {
    const initDate = new Date();
    const finalDate = new Date();
    initDate.setHours(0, 0, 0, 0);

    const entrieEmployee = await Entrie.findAll({
      attributes: [
        [fn("date_trunc", "hour", col("entries.createdAt")), "hour"],
        [fn("count", "*"), "count"],
      ],
      include: [
        {
          model: User,
          attributes: ["id"],
          include: [
            {
              model: Employee,
              attributes: ["id"],
            },
          ],
        },
      ],
      where: {
        type: "entry",
        createdAt: {
          [Op.between]: [initDate, finalDate],
        },
        "$user.employee.id$": {
          [Op.not]: null, // Filtrar las entradas que tengan un Empleado asociado
        },
      },
      group: ["hour", "user.id", "user.employee.id"],
    });

    const exitEmployee = await Entrie.findAll({
      attributes: [
        [fn("date_trunc", "hour", col("entries.createdAt")), "hour"],
        [fn("count", "*"), "count"],
      ],
      include: [
        {
          model: User,
          attributes: ["id"],
          include: [
            {
              model: Employee,
              attributes: ["id"],
            },
          ],
        },
      ],
      where: {
        type: "exit",
        createdAt: {
          [Op.between]: [initDate, finalDate],
        },
        "$user.employee.id$": {
          [Op.not]: null, // Filtrar las entradas que tengan un Empleado asociado
        },
      },
      group: ["hour", "user.id", "user.employee.id"],
    });

    const entrieExternal = await Entrie.findAll({
      attributes: [
        [fn("date_trunc", "hour", col("entries.createdAt")), "hour"],
        [fn("count", "*"), "count"],
      ],
      include: [
        {
          model: User,
          attributes: ["id"],
          include: [
            {
              model: Employee,
              attributes: ["id"],
            },
          ],
        },
      ],
      where: {
        type: "entry",
        createdAt: {
          [Op.between]: [initDate, finalDate],
        },
        "$user.employee.id$": null, // Filtrar las entradas que tengan un Empleado asociado
      },
      group: ["hour", "user.id", "user.employee.id"],
    });
    const exitExternal = await Entrie.findAll({
      attributes: [
        [fn("date_trunc", "hour", col("entries.createdAt")), "hour"],
        [fn("count", "*"), "count"],
      ],
      include: [
        {
          model: User,
          attributes: ["id"],
          include: [
            {
              model: Employee,
              attributes: ["id"],
            },
          ],
        },
      ],
      where: {
        type: "exit",
        createdAt: {
          [Op.between]: [initDate, finalDate],
        },
        "$user.employee.id$": null, // Filtrar las entradas que tengan un Empleado asociado
      },
      group: ["hour", "user.id", "user.employee.id"],
    });
    res.json({
      entrieEmployee: convertArray(entrieEmployee),
      exitEmployee: convertArray(exitEmployee),
      entrieExternal: convertArray(entrieExternal),
      exitExternal: convertArray(exitExternal),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employeeInside = await Employee.count({
      include: [
        {
          model: User,
          where: {
            inside: true,
          },
        },
      ],
      where: {
        status: "1",
      },
    });
    const employeeOutside = await Employee.count({
      include: [
        {
          model: User,
          where: {
            inside: false,
          },
        },
      ],
      where: {
        status: "1",
      },
    });
    res.json({
      inside: employeeInside,
      outside: employeeOutside,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getExternal = async (req, res) => {
  try {
    const externalInside = await External.count({
      include: [
        {
          model: User,
          where: {
            inside: true,
          },
        },
      ],
    });
    const externalOutside = await External.count({
      include: [
        {
          model: User,
          where: {
            inside: false,
          },
        },
      ],
    });
    res.json({
      inside: externalInside,
      outside: externalOutside,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};
