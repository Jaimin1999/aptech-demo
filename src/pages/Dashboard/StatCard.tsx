import { Card, CardContent } from "@/components";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4 p-4">
                <div className="rounded-md bg-muted p-3 text-primary">
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-2xl font-semibold">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}