import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Por favor, digite um e-mail válido."),
    password: z.string().min(4, "A senha precisa ter pelo menos 4 caracteres.")
});

export type LoginFormType = z.infer<typeof loginSchema>;