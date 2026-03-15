/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"
import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode" // <-- Importa aqui
import { LoginFormType } from "@/schemas/login"

interface Payload {
    sub: number
    role: string
    exp?: number
    iat?: number
}

export async function loginAction(data: LoginFormType) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            }
        )

        const responseData = await response.json()

        if (!response.ok) {
            return { success: false, error: responseData.erro }
        }

        const cookieStore = await cookies()
        cookieStore.set("meu_token", responseData.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7200,
            path: "/",
        })

        const decodedToken = jwtDecode<Payload>(responseData.token)

        return {
            success: true,
            user: {
                id: decodedToken.sub,
                role: decodedToken.role,
            },
        }
    } catch (error) {
        return { success: false, error: "Erro interno de conexão." }
    }
}

export async function apiFetch(path: string, options?: RequestInit) {
    const cookieStore = cookies();
    const token = (await cookieStore).get('meu_token')?.value;

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            ...options?.headers,
        },
    })
}