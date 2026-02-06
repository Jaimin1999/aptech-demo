import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { useState } from "react";
import { ConfirmDialog } from "@/CommonComponents";
import { Button, SidebarLayout } from "@/components";
import { useTheme } from "@/lib/ThemeContext/ThemeContext";



export default function Dasboard() {

    const { logout } = useAuth();

    const [isLogoutModal, setIsLogoutModal] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const toggleLogoutModal = () => setIsLogoutModal(prev => !prev);

    return (
        <SidebarLayout>
            <div className="  bg-gray-100 p-4">
                <div className="bg-white text-black dark:bg-pink-500 dark:text-white p-4">
                    Hello Dark Mode 🌙
                </div>
                <Button onClick={toggleLogoutModal}>Loggout</Button>
                <Button onClick={toggleTheme}>{theme}</Button>
                <ConfirmDialog open={isLogoutModal} onOpenChange={toggleLogoutModal} onConfirm={logout} />
            </div>
        </SidebarLayout>
    );
}
