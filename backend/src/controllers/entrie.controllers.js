import { Entrie } from "../models/Entrie.js";
import { User } from "../models/User.js";
import { Card } from "../models/Card.js";
import { Turnstile } from "../models/Turnstile.js";
import { Op } from "sequelize";

export const getEntriesToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const entrie = await Entrie.findAll({
      where: {
        type: "entrie",
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

export const getEntries = async (req, res) => {
  try {
    const entrie = await Entrie.findAll({
      where: { type: "entrie" },
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
    const entrie = await Entrie.findAll({
      where: { type: "exit" },
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
  const { rfid, turnstileId, type } = req.body;
  try {
    const card = await Card.findOne({
      where: { rfid },
    });
    if (!card) return res.status(404).json({ errors: ["Couldn't find card"] });
    if (!card.userId)
      return res.status(404).json({ errors: ["Card is not available"] });

    const newEntrie = await Entrie.create({
      type,
      turnstileId,
      userId: card.userId,
    });
    return res.json(newEntrie);
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};
