import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    return <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
        {children}
    </LoginContext.Provider>
}