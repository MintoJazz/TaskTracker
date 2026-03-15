'use server'

import { LoginFormType } from "@/schemas/login"
import { InvalidCredentialsError, ServerError } from "@/types/errors"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

export async function login(data: LoginFormType) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    const json = await response.json()
    if (response.status === 401) throw new InvalidCredentialsError()
    else if (!response.ok) throw new ServerError();

    (await cookies()).set("meu_token", json.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7200,
        path: "/",
    })

    const { sub, role } = jwtDecode<{ sub: number; role: string }>(json.token)
    return { id: sub, role }
}

export async function getSession() {
    const token = (await cookies()).get("meu_token")?.value

    if (!token) return null

    const { sub, role } = jwtDecode<{ sub: number; role: string }>(token)
    return { id: sub, role, token }
}

export async function logout(): Promise<void> {
    (await cookies()).delete("meu_token")
}