import { Task } from "@/types/task";

interface Props {
    tasks: Task[]
}

export default function TaskManager({ tasks }: Props) {
    return tasks.map(t => <p key={t.id}>{t.title}</p>)
} 