import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { tokenService } from "@/lib/authTokens";
import { useLogin } from "@/services";

interface AuthContextType {
    user: any | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any | null>(null);
    const [isInitializing, setIsInitializing] = useState(true);

    const loginMutation = useLogin();

    const login = async (username: string, password: string) => {
        const data = await loginMutation.mutateAsync({ username, password });
        setUser(data.user ?? { username });
    };

    const logout = () => {
        tokenService.clearTokens();
        setUser(null);
    };

    // 🔥 Restore auth BEFORE ProtectedRoute decides
    useEffect(() => {
        const accessToken = tokenService.getAccessToken();

        if (accessToken) {
            setUser({ isAuthenticated: true });
        }

        setIsInitializing(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isLoading: loginMutation.isPending || isInitializing,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
