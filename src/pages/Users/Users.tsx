import { useState } from "react";
import {
    SidebarLayout,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
} from "@/components";
import { usersColumns } from "./UsersColumns";
import type { User } from "../Dashboard/DashboardData";
import { useUsersPaginated } from "@/services";
import { DataTable } from "@/CommonComponents";
import { UserDetailModal } from "./UsersDetailModal";

const PAGE_SIZE = 10;

export default function UsersPage() {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const { data, isLoading } = useUsersPaginated({
        limit: PAGE_SIZE,
        skip: page * PAGE_SIZE,
        search,
    });

    const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE);

    return (
        <SidebarLayout>
            <div className="p-4 space-y-6">

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Users</CardTitle>

                        <Input
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => {
                                setPage(0);
                                setSearch(e.target.value);
                            }}
                            className="max-w-xs"
                        />
                    </CardHeader>

                    <CardContent>
                        <DataTable
                            columns={usersColumns}
                            data={data?.users ?? []}
                            pagination
                            onRowClick={setSelectedUser}
                        />
                    </CardContent>
                </Card>

                <UserDetailModal
                    user={selectedUser}
                    open={!!selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            </div>
        </SidebarLayout>
    );
}
