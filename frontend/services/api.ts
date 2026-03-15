"use server"

import { getSession } from "./auth-service"

export async function apiFetch(path: string, options?: RequestInit) {
  const session = await getSession()
  console.log("session:", session)
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${session?.token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })
  return response
}