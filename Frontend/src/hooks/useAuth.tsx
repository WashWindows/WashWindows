import { useState, useEffect } from 'react';
import { User } from '../interface/User';

interface UseAuthReturn {
    token: string | null;
    user: User | null;
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
    setUser: (user: User | null) => void;
    onLogout: () => void;
}

export const useAuth = (): UseAuthReturn => {
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(savedUser));
        }
    }, [token]);

    const onLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return {
        token,
        user,
        isLoggedIn,
        setIsLoggedIn,
        setUser,
        onLogout
    };
};