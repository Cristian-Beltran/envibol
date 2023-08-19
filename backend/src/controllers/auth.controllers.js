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
      where: { email, status: "1" },
      attributes: ["id", "email", "password", "status"],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "address",
            "ci",
            "telf",
            "cel",
          ],
        },
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
      id: userFound.id,
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
        address: userFound.user.address,
        telf: userFound.user.telf,
        cel: userFound.user.cel,
      },
    });
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};

export const updatePassword = async (req, res) => {
  const { newPassword, oldPassword, repeatPassword } = req.body;
  try {
    const userFound = await Employee.findOne({
      where: { id: req.user.id },
    });
    if (!userFound) return res.status(404).json({ errors: ["User not found"] });

    const isMatch = await bcrypt.compare(oldPassword, userFound.password); // hashaleatorio

    if (!isMatch)
      return res.status(500).json({ errors: ["Contraseña incorrecta"] });

    const passwordHash = await bcrypt.hash(newPassword, 10); // hashaleatorio
    userFound.password = passwordHash;
    userFound.save();
    res.json({ id: userFound.id });
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
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "address",
            "ci",
            "telf",
            "cel",
          ],
        },
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
        where: { id: user.id, status: "1" },
        attributes: ["id", "email", "status"],
        include: [
          {
            model: User,
            attributes: [
              "id",
              "first_name",
              "last_name",
              "address",
              "ci",
              "telf",
              "cel",
            ],
          },
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

export const updateProfile = async (req, res) => {
  try {
    const { first_name, last_name, ci, address, telf, cel } = req.body;
    const employee = await Employee.findOne({
      where: { id: req.user.id },
      attributes: ["id", "email", "userId"],
    });
    if (!employee) return res.status(400).json({ errors: ["User not found"] });
    const user = await User.findOne({ where: { id: employee.userId } });

    user.first_name = first_name;
    user.last_name = last_name;
    user.ci = ci;
    user.address = address;
    user.telf = telf;
    user.cel = cel;

    await user.save();
    const userFound = await Employee.findOne({
      where: { id: req.user.id },
      attributes: ["id", "email"],
      include: [
        {
          model: User,
          attributes: [
            "id",
            "first_name",
            "last_name",
            "address",
            "ci",
            "telf",
            "cel",
          ],
        },
        { model: Role, attributes: ["id", "name"] },
      ],
    });
    res.json(userFound);
  } catch (error) {
    res.status(500).json({
      errors: [error.message],
    });
  }
};
