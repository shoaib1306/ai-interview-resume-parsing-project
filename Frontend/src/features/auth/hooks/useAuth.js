import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    // ✅ LOGIN
    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });

            console.log("LOGIN:", data);

            // 🔥 FIX: handle both cases
            setUser(data.user || data || null);

        } catch (err) {
            console.log("LOGIN ERROR:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // ✅ REGISTER
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });

            setUser(data.user || data || null);

        } catch (err) {
            console.log("REGISTER ERROR:", err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // ✅ LOGOUT
    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.log("LOGOUT ERROR:", err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const autoLogin = async () => {
            try {
                // 🔥 HARDCODE LOGIN (temporary)
                const data = await login({
                    email: "test123@gmail.com",
                    password: "123456"
                });
    
                setUser(data.user);
            } catch (err) {
                console.log("AUTO LOGIN ERROR:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
    
        autoLogin();
    }, []);

    return { user, loading, handleRegister, handleLogin, handleLogout };
};