import { User, Employee } from "../models/User.js";
import { Role } from "../models/Role.js";
import bcrypt from "bcryptjs";

export const getEmployees = async (req, res) => {
  try {
    const users = await Employee.findAll({
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
    res.json(users);
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
    const userFound = await Employee.findOne({ where: { email } });
    if (userFound)
      return res.status(400).json({ errors: ["The email already exists"] });
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
    res.json(employee);
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
