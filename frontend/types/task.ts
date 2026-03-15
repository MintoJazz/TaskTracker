import { User } from "./user";

export type TaskStatus =  'FINALIZADO' | 'CANCELADO' | 'INICIADO' | 'EM ATENDIMENTO' | 'AGUARDANDO ATENDIMENTO'

export type Task = {
    id: number
    titulo: string
    descricao: string
    data_hora_criacao: string
    criador_id: number
    status: TaskStatus
    criador?: User
}