import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty("El nombre es obligatorio"),
  lastname: z.string().nonempty("El apellido es obligatorio"),
  email: z.string().email("Ingrese un correo electrónico válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(15, "La contraseña debe tener menos de 15 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("Ingrese un correo electrónico válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(15, "La contraseña debe tener menos de 15 caracteres"),
});
