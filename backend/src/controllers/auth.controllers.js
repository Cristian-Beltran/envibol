import { Employee, User } from "../models/User.js";
import { Role } from "../models/Role.js";
import bcrypt from "bcryptjs";
import { createdAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await Employee.findOne({
      where: { email },
      attributes: ["id", "email", "password"],
      include: [
        { model: User, attributes: ["id", "first_name", "last_name", "ci"] },
        { model: Role, attributes: ["id", "name"] },
      ],
    });
    if (!userFound) return res.status(404).json({ errors: ["User not found"] });

    const isMatch = await bcrypt.compare(password, userFound.password); // hashaleatorio

    if (!isMatch)
      return res.status(404).json({ errors: ["Password incorrect"] });

    const token = await createdAccessToken({
      id: userFound.id,
    });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      email: userFound.email,
      role: {
        id: userFound.role.id,
        name: userFound.role.name,
      },
      user: {
        id: userFound.user.id,
        first_name: userFound.user.first_name,
        last_name: userFound.user.last_name,
        ci: userFound.user.ci,
      },
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const userFound = await Employee.findOne({
      where: { id: req.user.id },
      attributes: ["id", "email"],
      include: [
        { model: User, attributes: ["id", "first_name", "last_name", "ci"] },
        { model: Role, attributes: ["id", "name"] },
      ],
    });
    if (!userFound) return res.status(400).json({ errors: ["User not found"] });

    res.json(userFound);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errors: ["Unauthorized"] });
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
      if (err) return res.status(401).json({ errors: ["Unauthorized"] });
      const userFound = await Employee.findOne({
        where: { id: user.id },
        attributes: ["id", "email"],
        include: [
          { model: User, attributes: ["id", "first_name", "last_name", "ci"] },
          { model: Role, attributes: ["id", "name"] },
        ],
      });
      if (!userFound) return res.status(401).json({ errors: ["Unauthorized"] });
      res.json(userFound);
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};
