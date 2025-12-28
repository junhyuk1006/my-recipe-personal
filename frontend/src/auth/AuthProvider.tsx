import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { tokenStorage } from '../../lib/tokenStorage';

type AuthContextValue = {
    isAuthReady: boolean;
    isLoggedIn: boolean;
    refreshAuth: () => Promise<void>;
    signIn: (accessToken: string, refreshToken: string) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children } : { children:  React.ReactNode }) {
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const refreshAuth = async () => {
        const access = await tokenStorage.getAccess();
        setIsLoggedIn(!!access);
        setIsAuthReady(true);
    };

    const signIn = async (accessToken: string, refreshToken: string) =>{
        await tokenStorage.setTokens(accessToken, refreshToken);
        setIsLoggedIn(true);
    }

    const signOut = async () => {
        await tokenStorage.clear();
        setIsLoggedIn(false);
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    const value = useMemo(
        () => ({ isAuthReady, isLoggedIn, refreshAuth, signIn, signOut }),
        [isAuthReady, isLoggedIn]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error ("useAuth must be used within AuthProvider");
    return ctx;
}