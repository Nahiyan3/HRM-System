
import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react";

import type { AuthUser, LoginInput } from "../types/auth";

import {
    login as loginRequest,
    logout as logoutRequest
} from "../services/authService";

interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (credentials: LoginInput) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(
        () => localStorage.getItem("token")
    );

    const [user, setUser] = useState<AuthUser | null>(() => {
        const storedUser = localStorage.getItem("user");

        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (credentials: LoginInput) => {
        const result = await loginRequest(credentials);

        const { token, user } = result.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setUser(user);
    };

    const logout = async () => {
        try {
            await logoutRequest();
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setToken(null);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};
