import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const getLoggedInUser = async () => {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
            const res = await axios.get("http://192.168.29.156:4000/api/v1/users/getUserProfile", {
                headers: {
                    Authorization: `JWT ${token}`
                }
            })
            if (res.data.success === true) {
                setUser(res.data.user);
                setIsLoggedIn(true);
            } else {
                setUser({});
                setIsLoggedIn(false);
            }
        } else {
            setUser({});
            setIsLoggedIn(false);
        }
    }
    useEffect(() => {
        getLoggedInUser();
    }, [])
    return <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
        {children}
    </LoginContext.Provider>
}