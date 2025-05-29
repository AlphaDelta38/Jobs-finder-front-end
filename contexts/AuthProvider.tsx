'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from '@/lib/axios';
import { User } from '@/types/user.types';
import routes from '@/routes'


interface AuthContextType {
    user: User | null;
    setToken: (token: string) => void;
    setUserData: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            axios.get(routes.checkAuth).then((res) => {
                setUserData(res.data)
            }).catch((e)=>{})
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const setToken = (token: string) => {
        localStorage.setItem('token', token);
    }

    const setUserData = (token: string)=>{
        const decoded = jwtDecode<User>(token);
        setUser(decoded)
    }

    return (
        <AuthContext.Provider value={{ user, logout, setToken, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
