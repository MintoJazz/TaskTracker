import { User } from "@/types/user"
import { apiFetch } from "./api"

export const userService = {
    async getAllUsers(): Promise<User[]> {
        const response = await apiFetch("/users")
        if (!response.ok) throw new Error("Failed to fetch users")
        return response.json()
    }
}