import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const ADMIN_EMAIL = 'saxenabhavya15@gmail.com';

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logout = () => {
        return signOut(auth);
    };

    useEffect(() => {
        console.log("AuthProvider: Initializing Firebase Auth listener...");

        // Safety timeout to prevent permanent white screen
        const timer = setTimeout(() => {
            if (loading) {
                console.warn("AuthProvider: Auth initialization taking too long. Forcing render...");
                setLoading(false);
            }
        }, 5000);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("AuthProvider: Auth state changed.", user ? "User logged in" : "No user");
            setCurrentUser(user);
            setIsAdmin(user?.email === ADMIN_EMAIL);
            setLoading(false);
            clearTimeout(timer);
        }, (error) => {
            console.error("AuthProvider: Auth error:", error);
            setLoading(false);
            clearTimeout(timer);
        });

        return () => {
            unsubscribe();
            clearTimeout(timer);
        };
    }, []);

    const value = {
        currentUser,
        isAdmin,
        loginWithGoogle,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
