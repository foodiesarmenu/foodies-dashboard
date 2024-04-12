import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
const TokenContext = createContext();

export const TokenContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);


    useEffect(() => {
        console.log('asd');
        if (localStorage.getItem('accessToken')) {
            setToken(localStorage.getItem('accessToken'))
            const decoded = jwtDecode(localStorage.getItem('accessToken'));
            setUserType(decoded.type)
        }

    }, [])

    

    return (
        <TokenContext.Provider value={{ token, setToken, user, setUser, userType, setUserType }}>
            {props.children}
        </TokenContext.Provider>
    );
};

export default TokenContext;