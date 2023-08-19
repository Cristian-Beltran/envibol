import { User, External } from "../models/User.js";
import { Visit } from "../models/Visit.js";
import { Card } from "../models/Card.js";

export const getVisits = async (req, res) => {
  try {
    const visits = await Visit.findAll({
      include: [
        {
          model: External,
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
    console.log(visits);
    const visitsModify = visits.map((visit) => ({
      id: visit.id,
      reason: visit.reason,
      full_name: visit.External.user.first_name +" " + visit.External.user.last_name,
      ci: visit.External.user.ci,
      createdAt: visit.createdAt,
    }));
    res.json(visitsModify);
  } catch (error) {
    console.log(error);
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
          model: External,
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
    const { first_name, last_name, ci, address, telf, cel, reason, card } =
      req.body;
    const user = await User.findOne({
      where: { ci },
    });
    let userId;
    let external;
    if (user) {
      user.first_name = first_name;
      user.last_name = last_name;
      user.address = address;
      user.telf = telf;
      user.cel = cel;
      user.save();
      userId = user.id;
      external = await External.findOne({
        where: { userId },
      });
    } else {
      const newUser = await User.create({
        first_name,
        last_name,
        ci,
        address,
        telf,
        cel,
      });
      userId = newUser.id;
      external = await External.create({
        userId,
      });
    }

    const cardFound = await Card.findOne({ where: { id: card } });
    if (!cardFound.userId) {
      cardFound.userId = userId;
      cardFound.save();
    } else {
      if (cardFound.userId != userId) {
        cardFound.userId = userId;
      }
    }

    const visit = await Visit.create({
      externalId: external.id,
      reason,
    });
    return res.json(visit);
  } catch (error) {
    console.log(error);
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
