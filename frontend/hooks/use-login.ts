/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { LoginFormType, loginSchema } from "@/schemas/login";
import { login } from "@/services/auth-service";
import { InvalidCredentialsError } from "@/types/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useLogin() {
    const resolver = zodResolver(loginSchema)
    const router = useRouter();

    const form = useForm<LoginFormType>({
        resolver,
        defaultValues: {
            email: '',
            password: ''
        }
    })
    
    async function onSubmit(data: LoginFormType) {
        const toastId = toast.loading("Autenticando...");

        try {
            const user = await login(data)
            toast.success("Login realizado com sucesso!", { id: toastId })

            router.push('/');
        } catch (error) {
            console.error("Erro fatal detectado pelo JavaScript:", error);
            toast.error((error instanceof InvalidCredentialsError) ? "E-mail ou senha inválidos" : "Erro de conexão com o servidor. Tente novamente.", { id: toastId });
        }
    }

    return { form, onSubmit }
}