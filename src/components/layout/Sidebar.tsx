import { type ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    Users,
    Settings,
    Menu,
    LogOut,
} from "lucide-react";

import { Button } from "@/components";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";
import { ConfirmDialog } from "@/CommonComponents";

interface SidebarLayoutProps {
    children: ReactNode;
}

const NAV_ITEMS = [
    { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
    { label: "Products", to: "/products", icon: Package },
    { label: "Users", to: "/users", icon: Users },
    { label: "Settings", to: "/settings", icon: Settings },
];

export function SidebarLayout({ children }: SidebarLayoutProps) {


    const [collapsed, setCollapsed] = useState<boolean>(() => {
        const saved = localStorage.getItem("sidebar-collapsed");
        return saved !== null ? JSON.parse(saved) : false;
    });
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);


    const { logout } = useAuth();

    const toggleSidebar = () => {
        setCollapsed((prev) => {
            localStorage.setItem("sidebar-collapsed", JSON.stringify(!prev));
            return !prev;
        });
    };

    return (
        <div className="flex bg-background">
            {/* Sidebar */}
            <aside
                className={cn(
                    "border-r bg-card transition-all duration-300 flex flex-col",
                    collapsed ? "w-16" : "w-64"
                )}
            >
                {/* Top Section */}
                <div>
                    {/* Header */}
                    <div className="flex h-14 items-center justify-between px-3 border-b">
                        {!collapsed && (
                            <span className="text-lg font-semibold">Admin</span>
                        )}
                        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="p-2 space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            return (
                                <NavLink
                                    key={item.label}
                                    to={item.to}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                            "hover:bg-muted",
                                            isActive && "bg-muted text-primary"
                                        )
                                    }
                                >
                                    <Icon className="h-5 w-5" />
                                    {!collapsed && <span>{item.label}</span>}
                                </NavLink>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="mt-auto border-t p-2 space-y-1">


                    {/* Logout */}
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-destructive hover:text-destructive"
                        onClick={() => setIsLogoutOpen(true)}
                    >
                        <LogOut className="h-4 w-4" />
                        {!collapsed && <span>Logout</span>}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">{children}</main>

            {/* Logout Confirm Dialog */}
            <ConfirmDialog
                open={isLogoutOpen}
                onOpenChange={setIsLogoutOpen}
                onConfirm={logout}
            />
        </div>
    );
}
