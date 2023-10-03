import { z } from "zod";

export const employeeSchema = z.object({
  first_name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(4, {
      message: "El nombre debe tener al menos 4 caracteres",
    })
    .max(50, {
      message: "El nombre debe tener como máximo 50 caracteres",
    })
    .regex(/^[a-zA-ZÀÁÉÍÓÚÑ ]+$/, {
      message: "El nombre solo puede contener letras y un espacio",
    }),
  last_name: z
    .string({
      required_error: "El apellido es requerido",
    })
    .min(4, {
      message: "El apellido debe tener al menos 4 caracteres",
    })
    .max(50, {
      message: "El apellido debe tener como máximo 50 caracteres",
    })
    .regex(/^[a-zA-ZÀÁÉÍÓÚÑ ]+$/, {
      message: "El apellido solo puede contener letras y un espacio",
    }),
  ci: z
    .string({
      required_error: "El CI es requerido",
    })
    .min(4, {
      message: "El CI debe tener al menos 4 caracteres",
    })
    .max(15, {
      message: "El CI debe tener como máximo 15 caracteres",
    }),
  address: z
    .string({
      required_error: "La dirección es requerida",
      invalid_type_error: "La dirección debe ser un string",
    }),
  telf: z.string(),
  cel: z.string(),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "Email invalido",
    }),
  password: z
    .string({
      min_length: 6,
      max_length: 20,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,20}$/,
      required_error: "Por favor, ingrese una contraseña.",
      min_length_error: "La contraseña debe tener al menos 6 caracteres.",
      max_length_error: "La contraseña no debe tener más de 20 caracteres.",
      pattern_error: "La contraseña debe incluir al menos una letra mayúscula, una letra minúscula y un número (por ejemplo, 'Abc123').",
    }),
  roleId: z
    .string({
      required_error: "El rol es requerido",
    }),
  staff: z.boolean(),
  admin: z.boolean(),
});
