import { Entrie } from "../models/Entrie.js";
import { Employee, External, User } from "../models/User.js";
import { Card } from "../models/Card.js";
import { Turnstile } from "../models/Turnstile.js";
import { Op } from "sequelize";
import { Role } from "../models/Role.js";


export const getEntriesToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const entries = await Entrie.findAll({
      where: {
        type: "entry",
        createdAt: {
          [Op.between]: [today, new Date()],
        },
      },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "ci",
            "address",
            "telf",
            "cel",
          ],
          include: [{ model: Employee, include: [{ model: Role }] }],
        },
        {
          model: Turnstile,
          attributes: ["name"],
        },
      ],
    });
    const entriesModify = entries.map((entrie) => ({
      id: entrie.id,
      createdAt: entrie.createdAt,
      full_name: entrie.user.first_name + " " + entrie.user.last_name,
      ci: entrie.user.ci,
      role: entrie.user.employee.role.name,
      turnstile: entrie.turnstile.name,
    }));
    res.json(entriesModify);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getEntries = async (req, res) => {
  try {
    const { init, final } = req.params;
    const initDate = new Date(init);
    const finalDate = new Date(final);
    initDate.setUTCHours(initDate.getUTCHours() + 4);
    finalDate.setUTCHours(finalDate.getUTCHours() + 28);
    const entries = await Entrie.findAll({
      where: {
        type: "entry",
        createdAt: {
          [Op.between]: [initDate, finalDate],
        },
        "$user.employee.id$": {
          [Op.not]: null, // Filtrar las entradas que tengan un Empleado asociado
        },
      },
      order: [
        ["createdAt", "DESC"], // Ordenar por fecha de creación en orden descendente
      ],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "ci",
            "address",
            "telf",
            "cel",
          ],
          include: [{ model: Employee, include: [{ model: Role }] }],
        },
        {
          model: Turnstile,
          attributes: ["name"],
        },
      ],
    });
    const entriesModify = entries.map((entrie) => ({
      id: entrie.id,
      createdAt: entrie.createdAt,
      full_name: entrie.user.first_name + " " + entrie.user.last_name,
      ci: entrie.user.ci,
      role: entrie.user.employee.role.name,
      turnstile: entrie.turnstile.name,
    }));
    res.json(entriesModify);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getExitsToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const entrie = await Entrie.findAll({
      where: {
        type: "exit",
        createdAt: {
          [Op.gte]: today,
        },
      },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "ci",
            "address",
            "telf",
            "cel",
          ],
        },
        {
          model: Turnstile,
          attributes: ["name"],
        },
      ],
    });
    res.json(entrie);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getExits = async (req, res) => {
  try {
    const { init, final } = req.params;
    const initDate = new Date(init);
    const finalDate = new Date(final);
    initDate.setUTCHours(initDate.getUTCHours() + 4);
    finalDate.setUTCHours(finalDate.getUTCHours() + 28);
    console.log(initDate, finalDate);
    const entries = await Entrie.findAll({
      where: {
        type: "exit",
        createdAt: {
          [Op.between]: [initDate, finalDate],
        },
        "$user.employee.id$": {
          [Op.not]: null, // Filtrar las entradas que tengan un Empleado asociado
        },
      },
      order: [
        ["createdAt", "DESC"], // Ordenar por fecha de creación en orden descendente
      ],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "ci",
            "address",
            "telf",
            "cel",
          ],
          include: [{ model: Employee, include: [{ model: Role }] }],
        },
        {
          model: Turnstile,
          attributes: ["name"],
        },
      ],
    });
    const entriesModify = entries.map((entrie) => ({
      id: entrie.id,
      createdAt: entrie.createdAt,
      full_name: entrie.user.first_name + " " + entrie.user.last_name,
      ci: entrie.user.ci,
      role: entrie.user.employee.role.name,
      turnstile: entrie.turnstile.name,
    }));
    res.json(entriesModify);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getUserEntrie = async (req, res) => {
  try {
    const entrie = await Entrie.findAll({
      where: { userId: req.params.userId },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "ci",
            "address",
            "telf",
            "cel",
          ],
        },
        {
          model: Turnstile,
          attributes: ["name"],
        },
      ],
    });
    res.json(entrie);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getEntrie = async (req, res) => {
  const { id } = req.params;
  try {
    const entrie = await entrie.findByPk(id, {
      include: [
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "ci",
            "address",
            "telf",
            "cel",
          ],
        },
        {
          model: Turnstile,
          attributes: ["name"],
        },
      ],
    });
    res.json(entrie);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const createEntrie = async (req, res) => {
  const { rfid, turnstile, type } = req.body;
  try {
    const card = await Card.findOne({
      where: { rfid: rfid.trim() },
    });
    if (!card) return res.status(404).json({ res: "I" });
    if (!card.userId) return res.status(404).json({ res: "I" });

    const employee = await Employee.findOne({ where: { userId: card.userId } });
    if (employee) {
      if (employee.status != "1") return res.status(400).json({ res: "I" });
    }
    const getTurnstile = await Turnstile.findOne({
      where: { name: turnstile },
    });

    const newEntrie = await Entrie.create({
      type,
      turnstileId: getTurnstile.id,
      userId: card.userId,
    });

    const user = await User.findByPk(card.userId);
    if (type === "entry") user.inside = true;
    else if (type === "exit") user.inside = false;
    user.save();

    const response = {
      res: type === "entry" ? "E" : "S",
    };
    return res.json(response);
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

export const createEntrieMQTT = async (rfid, turnstile, type) => {
  try {
    const card = await Card.findOne({
      where: { rfid: rfid.trim() },
    });
    if (!card) return "I";
    if (!card.userId) return "I";

    const employee = await Employee.findOne({ where: { userId: card.userId } });
    if (employee) {
      if (employee.status != "1") return "I";
    }
    const getTurnstile = await Turnstile.findOne({
      where: { name: turnstile },
    });

    const newEntrie = await Entrie.create({
      type,
      turnstileId: getTurnstile.id,
      userId: card.userId,
    });

    const user = await User.findByPk(card.userId);
    if (type === "entry") user.inside = true;
    else if (type === "exit") user.inside = false;
    user.save();

    const response = type === "entry" ? "E" : "S";
    return response;
  } catch (error) {
    return error;
  }
};
