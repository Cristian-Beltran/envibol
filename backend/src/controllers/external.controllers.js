import { User, External, Employee } from "../models/User.js";
import { Card, TypeCard } from "../models/Card.js";

export const getExternals = async (req, res) => {
  try {
    const externals = await External.findAll({
      attributes: ["id"],
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
            "inside",
            "createdAt",
          ],
          include: [
            {
              model: Card,
              include: [
                {
                  model: TypeCard,
                  attributes: ["id", "name", "color"],
                },
              ],
            },
          ],
        },
      ],
    });
    const externalsModify = externals.map((external) => ({
      id: external.id,
      createdAt: external.createdAt,
      first_name: external.user.first_name,
      last_name: external.user.last_name,
      ci: external.user.ci,
      address: external.user.address,
      telf: external.user.telf,
      cel: external.user.cel,
      inside: external.user.inside,
      createdAt: external.user.createdAt,
      card: external.user.card ? external.user.card.typeCard.color : "",
    }));
    res.json(externalsModify);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getCiExternal = async (req, res) => {
  const { ci } = req.params;
  try {
    const employee = await Employee.findOne({
      include: [
        {
          model: User,
          where: { ci },
        },
      ],
    });
    if (employee)
      return res
        .status(500)
        .json({ errors: ["El ci pertenece a un empleado"] });
    const external = await External.findOne({
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
          where: { ci },
          include: [
            {
              model: Card,
              include: [
                {
                  model: TypeCard,
                  attributes: ["id", "name", "color"],
                },
              ],
            },
          ],
        },
      ],
    });
    if (!external) return res.sendStatus(200);
    res.json({
      id: external.id,
      createdAt: external.createdAt,
      first_name: external.user.first_name,
      last_name: external.user.last_name,
      ci: external.user.ci,
      address: external.user.address,
      telf: external.user.telf,
      cel: external.user.cel,
      inside: external.user.inside,
      card: external.user.card,
      userId: external.user.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const getExternal = async (req, res) => {
  const { id } = req.params;
  try {
    const external = await External.findByPk(id, {
      attributes: ["id"],
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
          include: [
            {
              model: Card,
              include: [
                {
                  model: TypeCard,
                  attributes: ["id", "name", "color"],
                },
              ],
            },
          ],
        },
      ],
    });
    res.json({
      id: external.id,
      createdAt: external.createdAt,
      first_name: external.user.first_name,
      last_name: external.user.last_name,
      ci: external.user.ci,
      address: external.user.address,
      telf: external.user.telf,
      cel: external.user.cel,
      inside: external.user.inside,
      card: external.user.card,
      userId: external.user.id,
    });
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const createExternal = async (req, res) => {
  const { first_name, last_name, ci, address, telf, cel } = req.body;

  try {
    const userCi = await User.findOne({ where: { ci } });
    if (userCi)
      return res.status(400).json({ errors: ["El ci ya esta ingresado"] });

    const newUser = await User.create({
      first_name,
      last_name,
      ci,
      address,
      telf,
      cel,
    });
    const newExternal = await External.create({
      userId: newUser.id,
    });

    return res.json(newExternal);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};

export const updateExternal = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, ci, address, telf, cel } = req.body;

    const external = await External.findByPk(id);

    const user = await User.findByPk(external.userId);

    const userCi = await User.findOne({ where: { ci } });
    if (userCi.id != user.id && userCi.ci === user.ci)
      return res.status(400).json({ errors: ["El CI ya esta ingresado"] });

    user.first_name = first_name;
    user.last_name = last_name;
    user.ci = ci;
    user.address = address;
    user.telf = telf;
    user.cel = cel;

    await user.save();
    res.json(external);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: [error] });
  }
};
