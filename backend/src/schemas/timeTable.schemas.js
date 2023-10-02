import { z } from "zod";

// Validador de formato de hora
const timeValidator = z.string().refine((value) => /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value), {
    message: "Formato de hora incorrecto. Debe ser HH:MM:SS.",
});

export const timeTableSchema = z.object({
    title: z
        .string({
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
    mondayEntry: timeValidator,
    mondayExit: timeValidator,
    mondayEnable: z.boolean({
        message: "El campo debe ser verdadero o falso.",
    }),
    tuesdayEntry: timeValidator,
    tuesdayExit: timeValidator,
    tuesdayEnable: z.boolean({
        message: "El campo debe ser verdadero o falso.",
    }),
    wednesdayEntry: timeValidator,
    wednesdayExit: timeValidator,
    wednesdayEnable: z.boolean({
        message: "El campo debe ser verdadero o falso.",
    }),
    thursdayEntry: timeValidator,
    thursdayExit: timeValidator,
    thursdayEnable: z.boolean({
        message: "El campo debe ser verdadero o falso.",
    }),
    fridayEntry: timeValidator,
    fridayExit: timeValidator,
    fridayEnable: z.boolean({
        message: "El campo debe ser verdadero o falso.",
    }),
    saturdayEntry: timeValidator,
    saturdayExit: timeValidator,
    saturdayEnable: z.boolean({
        message: "El campo debe ser verdadero o falso.",
    }),
    sundayEntry: timeValidator,
    sundayExit: timeValidator,
    sundayEnable: z.boolean({
        message: "El campo debe ser verdadero o falso.",
    }),
});