import { Card } from "../models/Card.js";
import { User } from "../models/User.js";

export const getCards = async (req, res) => {
  try {
    const card = await Card.findAll();
    res.json(card);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const createCard = async (req, res) => {
  const { type, rfid, description } = req.body;
  try {
    const newCard = await Card.create({
      type,
      description,
      rfid,
    });
    return res.json(newCard);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByPk(id);
    res.json(card);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, rfid, description } = req.body;
    const card = await Card.findByPk(id);
    card.type = type;
    card.description = description;
    card.rfid = rfid;
    await card.save();
    res.json(card);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const connectCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) return res.status(404).json({ errors: ["User not found"] });

    const card = await Card.findByPk(id);
    card.userId = userId;
    card.save();
    res.json(card);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const disconnectCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByPk(id);
    card.userId = null;
    res.json(card);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};
