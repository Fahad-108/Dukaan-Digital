import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // initial load pe storage se read karega
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : {
            id: null,
            name: "",
            email: "",
            role: "",
        };
    });

    // jab bhi user change hoga, storage me save karo
    useEffect(() => {
        if (user && user.id) {
            sessionStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
    return useContext(UserContext);
};