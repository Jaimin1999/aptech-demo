import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "../Dashboard/DashboardData";

export const usersColumns: ColumnDef<User>[] = [
    {
        accessorKey: "image",
        header: "Avatar",
        cell: ({ row }) => (
            <img
                src={row.original.image}
                alt={row.original.firstName}
                className="h-10 w-10 rounded-full object-cover"
            />
        ),
    },
    {
        header: "Name",
        cell: ({ row }) =>
            `${row.original.firstName} ${row.original.lastName}`,
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        header: "Company",
        cell: ({ row }) => row.original.company?.name,
    },
    {
        header: "City",
        cell: ({ row }) => row.original.address?.city,
    },
];
