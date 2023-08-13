import { User, External } from "../models/User.js";

export const getExternals = async (req, res) => {
  try {
    const external = await External.findAll({
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
        },
      ],
    });
    res.json(external);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getCiExternal = async (req, res) => {
  try {
    const external = await External.findOne({
      where: { ci: req.params.ci },
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
        },
      ],
    });
    res.json(external);
  } catch (error) {
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
        },
      ],
    });
    res.json(external);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateExternal = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, ci, address, telf, cel, role } = req.body;
    const external = await External.findByPk(id, {
      attributes: ["id"],
    });
    const user = await User.findByPk(external.id);

    user.first_name = first_name;
    user.last_name = last_name;
    user.ci = ci;
    user.address = address;
    user.telf = telf;
    user.cel = cel;

    await user.save();
    res.json(external);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
