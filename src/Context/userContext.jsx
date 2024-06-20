import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";

const TokenContext = createContext();

export const TokenContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setToken(token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            setUserType(decoded.type);
        }
    }, []);

    const getUserData = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setToken(token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            setUserType(decoded.type);
            return decoded;
        }
        return null;
    };

    return (
        <TokenContext.Provider value={{ token, setToken, user, setUser, userType, setUserType, getUserData }}>
            {props.children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
