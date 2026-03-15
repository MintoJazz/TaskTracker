'use server'

import { columns } from "@/components/task-table/columns"
import { DataTable } from "@/components/ui/data-table"
import { taskService } from "@/services/task-service"
import { userService } from "@/services/user-service"

export default async function Page() {
    const [myTasks, allUsers] = await Promise.all([
        taskService.getMyTasks(),
        userService.getAllUsers()
    ])

    const tasks = myTasks.map(t => ({ ...t, criador: allUsers.find(u => u.id === t.criador_id) }))

    return <div className="p-6">
        <DataTable columns={columns} data={tasks} />
    </div>
}