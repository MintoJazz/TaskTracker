import { apiFetch } from "./api"
import { Task } from "@/types/task"

export const taskService = {
    async getMyTasks(): Promise<Task[]> {
        const response = await apiFetch("/my-tasks")
        if (!response.ok) throw new Error("Failed to fetch tasks")
        return response.json()
    },
}
