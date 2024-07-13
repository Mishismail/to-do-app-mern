import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response => {
                setUser(response.data);
            }).catch(error => {
                console.error(error);
                localStorage.removeItem('token');
            });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('token', data.token);
            setUser(data);
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    };

    const signup = async (name, surname, email, password) => {
        try {
            const { data } = await axios.post('/api/users', { name, surname, email, password });
            localStorage.setItem('token', data.token);
            setUser(data);
        } catch (error) {
            console.error('Error during signup:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };