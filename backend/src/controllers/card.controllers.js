import { Card, TypeCard } from "../models/Card.js";
import { User, Employee, External } from "../models/User.js";

import { Op } from "sequelize";

export const getCards = async (req, res) => {
  try {
    const cards = await Card.findAll({
      include: [
        {
          model: TypeCard,
          attributes: ["id", "name", "color"],
        },
        {
          model: User,
        },
      ],
    });
    const cardModify = cards.map((card) => ({
      id: card.id,
      typeCardId: card.typeCardId,
      rfid: card.rfid,
      description: card.description,
      createdAt: card.createdAt,
      type: card.typeCard.name,
      color: card.typeCard.color,
      userName: card.user
        ? card.user.first_name + " " + card.user.last_name
        : "",
      connect: card.user ? true : false,
    }));
    res.json(cardModify);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getCardsType = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const cards = await Card.findAll({
      where: {
        [Op.or]: [{ userId: null }, { userId: userId }],
      },
      include: [
        {
          model: TypeCard,
          attributes: ["id", "name", "color"],
          where: { id },
        },
      ],
    });
    const cardModify = cards.map((card) => ({
      id: card.id,
      typeCardId: card.typeCardId,
      rfid: card.rfid,
      description: card.description,
      createdAt: card.createdAt,
      type: card.typeCard.name,
    }));
    res.json(cardModify);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getCardsExternal = async (req, res) => {
  const { userId } = req.params;
  try {
    const cards = await Card.findAll({
      where: {
        [Op.or]: [{ userId: null }, { userId: userId }],
      },
      include: [
        {
          model: TypeCard,
          attributes: ["id", "name", "color"],
          where: { name: "Visitante" },
        },
      ],
    });
    const cardModify = cards.map((card) => ({
      id: card.id,
      typeCardId: card.typeCardId,
      rfid: card.rfid,
      description: card.description,
      createdAt: card.createdAt,
    }));
    res.json(cardModify);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getCardsExternalEmpty = async (req, res) => {
  try {
    const cards = await Card.findAll({
      where: {
        userId: null,
      },
      include: [
        {
          model: TypeCard,
          attributes: ["id", "name", "color"],
          where: { name: "Visitante" },
        },
      ],
    });
    const cardModify = cards.map((card) => ({
      id: card.id,
      typeCardId: card.typeCardId,
      rfid: card.rfid,
      description: card.description,
      createdAt: card.createdAt,
    }));
    res.json(cardModify);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const createCard = async (req, res) => {
  const { typeCardId, rfid, description } = req.body;
  try {
    const foundCard = await Card.findOne({ where: { rfid } });
    if (foundCard)
      return res.status(500).json({ errors: ["La tarjeta ya esta ingresada"] });

    const newCard = await Card.create({
      typeCardId,
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
    const card = await Card.findByPk(id, {
      include: [{ model: TypeCard, attributes: ["id", "name", "color"] }],
    });
    res.json({
      id: card.id,
      typeCardId: card.typeCardId,
      rfid: card.rfid,
      description: card.description,
      createdAt: card.createdAt,
      type: card.typeCard.name,
      color: card.typeCard.color,
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getCardEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    const card = await Card.findOne({ where: { userId: employee.userId } });
    if (!card)
      return res.status(404).json({ errors: ["El usuario no tiene tarjeta"] });
    return res.json({
      card: card.id,
      type: card.typeCardId,
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getCardExternal = async (req, res) => {
  const { id } = req.params;
  try {
    const external = await External.findByPk(id);
    const card = await Card.findOne({ where: { userId: external.userId } });
    if (!card)
      return res.status(404).json({ errors: ["El usuario no tiene tarjeta"] });
    return res.json({
      card: card.id,
      type: card.typeCardId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    const card = await Card.findByPk(id);
    if (!card)
      return res.status(404).json({ errors: ["Tarjeta no encontrada"] });

    await card.destroy();
    res.sendStatus(202);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { typeCardId, rfid, description } = req.body;
    const card = await Card.findByPk(id);
    card.typeCardId = typeCardId;
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
    const cardOld = await Card.findOne({ where: { userId: userId } });

    if (cardOld) {
      if (cardOld.id == id) return res.json(cardOld);
      cardOld.userId = null;
      cardOld.save();
    }
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
    if (!card.userId)
      return res.status(400).json({ erros: ["Tarjeta no vinculada"] });
    card.userId = null;
    card.save();
    res.json(card);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const disconnectEmployeeCard = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    const card = await Card.findOne({ where: { userId: employee.userId } });
    if (!card) return res.status(400).json({ erros: ["Tarjeta no vinculada"] });
    card.userId = null;
    card.save();
    res.json(card);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const disconnectExternalCard = async (req, res) => {
  try {
    const { id } = req.params;
    const external = await External.findByPk(id);
    const card = await Card.findOne({ where: { userId: external.userId } });
    if (!card) return res.status(400).json({ erros: ["Tarjeta no vinculada"] });
    card.userId = null;
    card.save();
    res.json(card);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      errors: [error.message],
    });
  }
};
