"use client"

import { Task } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";

export const columns: ColumnDef<Task>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID do Chamado"
    },
    {
        accessorKey: "titulo",
        header: "Título"
    },
    {
        accessorKey: "criador.nome",
        header: "Criador",
    }
]