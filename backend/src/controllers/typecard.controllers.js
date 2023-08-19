import { TypeCard } from "../models/Card.js";
import { User } from "../models/User.js";

export const getTypeCards = async (req, res) => {
  try {
    const typecard = await TypeCard.findAll();
    res.json(typecard);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const createTypeCard = async (req, res) => {
  const { name, color, description } = req.body;
  try {
    const newTypeCard = await TypeCard.create({
      name,
      color,
      description,
    });
    return res.json(newTypeCard);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const getTypeCard = async (req, res) => {
  const { id } = req.params;
  try {
    const typeCard = await TypeCard.findByPk(id);
    res.json(typeCard);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const deleteTypeCard = async (req, res) => {
  const { id } = req.params;
  try {
    const typecard = await TypeCard.findByPk(id);
    if (!typecard)
      return res 
        .status(404)
        .json({ errors: ["Tipo de tarjeta no encontrada"] });

    await typecard.destroy();
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const updateTypeCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, description } = req.body;
    const typecard = await TypeCard.findByPk(id);
    typecard.color = color;
    typecard.name = name;
    typecard.description = description;
    await typecard.save();
    res.json(typecard);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};
