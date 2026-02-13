import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components";
import type { User } from "../Dashboard/DashboardData";

interface Props {
    user: User | null;
    open: boolean;
    onClose: () => void;
}

export function UserDetailModal({ user, open, onClose }: Props) {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-3 text-sm">
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>

                    <p>
                        <strong>Address:</strong>{" "}
                        {user.address.city},{" "}
                        {user.address.state}
                    </p>

                    <p>
                        <strong>Company:</strong> {user.company.name} —{" "}
                        {user.company.title}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
