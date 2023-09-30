import { User, Employee } from "./models/User.js";
import { Role } from "./models/Role.js";
import readline from "readline";
import bcrypt from "bcryptjs";
import validator from "email-validator";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const userData = {};

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function askForData() {
  console.log("Creando usuario administrador");

  while (!userData.first_name) {
    userData.first_name = await askQuestion("Ingresa tu nombre/s: ");
  }

  while (!userData.last_name) {
    userData.last_name = await askQuestion("Ingresa tus apellidos: ");
  }

  while (!userData.email || !validator.validate(userData.email)) {
    if (userData.email) {
      console.log("Ingresa un email válido.");
    }
    userData.email = await askQuestion("Ingresa tu email: ");
  }

  while (!userData.password || userData.password.length <= 6) {
    if (userData.password) {
      console.log("Ingresa una contraseña valida.");
    }
    userData.password = await askQuestion(
      "Ingresa tu contraseña (debe ser mayor a 6 caracteres): "
    );
  }

  const passwordHash = await bcrypt.hash(userData.password, 10); // hashaleatorio

  const [role, createdRole] = await Role.findOrCreate({
    where: { name: "administrador" },
  });

  const [user, created] = await User.findOrCreate({
    where: { ci: "00000001" },
    defaults: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      ci: "00000001",
    },
  });

  const [employee, createdEmployee] = await Employee.findOrCreate({
    where: { userId: user.id },
    defaults: {
      userId: user.id,
      roleId: role.id,
      status: 1,
      staff: true,
      admin: true,
      email: userData.email,
      password: passwordHash,
    },
  });

  if (!created) console.log("El usuario ya ha sido creado anteriormente");
  console.log("Datos de usuario");
  console.log("Nombre/s:", user.first_name);
  console.log("Apellidos:", user.last_name);
  console.log("Email:", employee.email);
  rl.close();
}

askForData();
