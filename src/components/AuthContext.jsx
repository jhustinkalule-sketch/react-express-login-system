import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    async function register(name, email, password, confirmPassword) {
        try {
            const response = await axios.post('https://react-express-login-system-dpxv.onrender.com/register', { name, email, password, confirmPassword }, { withCredentials: true });

            if (response.data.success) {
                setUser(response.data.user); 
            } else {
                alert(response.data.message || "An error occurred");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message || "An error occurred");
            } else {
                alert("An error occurred");
            }
            console.error("Registration error:", error);
        }
    }

    async function login(email, password) {
        try {
            const response = await axios.post('https://react-express-login-system-dpxv.onrender.com/login', { email, password }, { withCredentials: true });

            if (response.data.success) {
                setUser(response.data.user); 
            } else {
                alert(response.data.message || "An error occurred");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message || "An error occurred");
            } else {
                alert("An error occurred");
            }
            console.error("Login error:", error);
        }
    }


    async function logout() {
        setUser(null);
        const response = await axios.post('https://react-express-login-system-dpxv.onrender.com/logout', {}, { withCredentials: true });

        if (response.data.success) {
            alert('User logged out');
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };