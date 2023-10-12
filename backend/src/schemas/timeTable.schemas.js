import { z } from "zod";

export const timeTableSchema = z.object({
    title: z.string({
        required_error: "El horario es requerido",
        min: 1,
        max: 100,
    }),
    description: z.string({
        min: 0,
        max: 500,
    }),
    toleranceDelay: z.number({
        min: 0,
        max: 60,
    }),
    toleranceLack: z.number({
        min: 0,
        max: 60,
    }),
    toleranceOutput: z.number({
        min: 0,
        max: 60,
    }),
    earlyExit: z.number({
        min: 0,
        max: 60,
    }),
    puntuality: z.number({
        min: 0,
        max: 60,
    }),
    priority: z.number({
        min: 0,
        max: 10,
    }),
/*     schedule: z.object({
        entry: z.string().refine(
            (value) => /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value),
            { message: "Formato de hora incorrecto. Debe ser HH:MM:SS." }
        ),
        exit: z.string().refine(
            (value) => /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value),
            { message: "Formato de hora incorrecto. Debe ser HH:MM:SS." }
        ),
        enable: z.boolean(),
    }) */
});