import { User, External } from "../models/User.js";
import { Visit } from "../models/Visit.js";

export const getVisits = async (req, res) => {
  try {
    const visit = await Visit.findAll({
      include: [
        {
          model: "External",
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
        },
      ],
    });
    res.json(visit);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getVisitToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const visit = await Visit.findAll({
      where: {
        fecha: {
          [Op.gte]: today,
        },
      },
      include: [
        {
          model: "External",
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
        },
      ],
    });
    res.json(visit);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getExternalVisit = async (req, res) => {
  try {
    const { externalId } = req.params;
    const visit = await Visit.findAll({
      where: { externalId },
    });
    res.json(visit);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const createVisit = async (req, res) => {
  try {
    const { first_name, last_name, ci, address, telf, cel, reason } = req.body;

    const [user, created] = await User.findOrCreate({
      where: { ci },
      default: {
        first_name,
        last_name,
        ci,
        address,
        telf,
        cel,
      },
    });

    const newExternal = await External.create({
      userId: user.id,
    });

    const newVisit = await Visit.create({
      externalId: newExternal.id,
      reason,
    });
    return res.json(newVisit);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getVisit = async (req, res) => {
  const { id } = req.params;
  try {
    const visit = await Visit.findByPk(id, {
      include: [
        {
          model: "External",
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
        },
      ],
    });
    res.json(visit);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const visit = await External.findByPk(id);
    visit.reason = reason;
    await visit.save();
    res.json(visit);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};
