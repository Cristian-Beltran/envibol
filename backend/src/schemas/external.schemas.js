import { z } from "zod";

export const externalSchema = z.object({
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
            message: "El CI debe tener al menos 6 caracteres",
        })
        .max(15, {
            message: "El CI debe tener como máximo 15 caracteres",
        }),
    address: z.string(),
    telf: z.string(),
    cel: z.string(),
});