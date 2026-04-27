import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true // 🔥 VERY IMPORTANT
});

// REGISTER
export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        });
        return response.data;
    } catch (err) {
        console.log("REGISTER ERROR:", err);
        throw err;
    }
}

// LOGIN
export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        });

        console.log("LOGIN RESPONSE:", response.data);

        return response.data; // ❌ NO localStorage
    } catch (err) {
        console.log("LOGIN ERROR:", err.response?.data);
        throw err;
    }
}

// LOGOUT
export async function logout() {
    try {
        const response = await api.get("/api/auth/logout");
        return response.data;
    } catch (err) {
        console.log("LOGOUT ERROR:", err);
        throw err;
    }
}

// GET CURRENT USER
export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (err) {
        console.log("GETME ERROR:", err.response?.data);
        throw err;
    }
}