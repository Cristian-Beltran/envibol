import { User, Employee } from "../models/User.js";
import { Role } from "../models/Role.js";
import { Card, TypeCard } from "../models/Card.js";
import { Op } from "sequelize";
import bcrypt from "bcryptjs";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: ["id", "email", "status", "createdAt"],
      where: { status: { [Op.ne]: "0" }, id: { [Op.ne]: req.user.id } },
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
        { model: Role, attributes: ["id", "name"] },
      ],
    });

    const employeesModify = employees.map((user) => ({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      first_name: user.user.first_name,
      last_name: user.user.last_name,
      ci: user.user.ci,
      address: user.user.address,
      telf: user.user.telf,
      cel: user.user.cel,
      role: user.role.name,
      status: user.status,
      inside: user.user.inside,
      card: user.user.card ? user.user.card.typeCard.color : "",
    }));
    res.json(employeesModify);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const createEmployee = async (req, res) => {
  const {
    first_name,
    last_name,
    ci,
    address,
    telf,
    cel,
    email,
    password,
    roleId,
  } = req.body;

  try {
    const userEmail = await Employee.findOne({ where: { email } });
    if (userEmail)
      return res.status(400).json({ errors: ["El correo ya existe"] });
    const userCi = await Employee.findOne({
      include: [{ model: User, where: { ci } }],
    });
    if (userCi)
      return res.status(400).json({ errors: ["El ci ya esta ingresado"] });
    const passwordHash = await bcrypt.hash(password, 10); // hashaleatorio

    const newUser = await User.create({
      first_name,
      last_name,
      ci,
      address,
      telf,
      cel,
    });

    const newEmployee = await Employee.create({
      email,
      password: passwordHash,
      roleId,
      userId: newUser.id,
    });
    return res.json(newEmployee);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id, {
      attributes: ["id", "email", "status"],
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
        { model: Role, attributes: ["id", "name"] },
      ],
    });
    res.json({
      id: employee.id,
      email: employee.email,
      createdAt: employee.createdAt,
      first_name: employee.user.first_name,
      last_name: employee.user.last_name,
      ci: employee.user.ci,
      address: employee.user.address,
      telf: employee.user.telf,
      cel: employee.user.cel,
      roleId: employee.role.id,
      status: employee.status,
      userId: employee.user.id,
    });
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, ci, address, telf, cel, role } = req.body;

    const employee = await Employee.findByPk(id, {
      attributes: ["id", "email", "roleId"],
    });

    const user = await User.findByPk(employee.id);

    const userCi = await Employee.findOne({
      include: [{ model: User, where: { ci } }],
    });

    if (userCi.ci === user.ci && userCi.id != user.id)
      return res.status(400).json({ errors: ["El ci ya esta ingresado"] });

    user.first_name = first_name;
    user.last_name = last_name;
    user.ci = ci;
    user.address = address;
    user.telf = telf;
    user.cel = cel;

    employee.roleId = role;
    await user.save();
    await employee.save();

    res.json(employee);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    employee.status = 0;
    employee.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error] });
  }
};

export const updateStatusEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByPk(id);
    if (employee.status === "1") employee.status = 2;
    else employee.status = 1;
    employee.save();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ errors: [error.message] });
  }
};
