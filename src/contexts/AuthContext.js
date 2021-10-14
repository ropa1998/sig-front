import React, {useContext, useState, createContext, useEffect} from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
        }
    }, []);

    const getUserInfo = () => isLoggedIn;

    const isUserLoggedIn = () => {
        return localStorage.getItem("token");
    };

    const isAdmin = () => {
        let jwt = localStorage.getItem("token");
        let decoded = jwt_decode(jwt);

        console.log('decoded: ' + decoded)

        let roles = decoded.roles
        let isAdmin = roles.contains("ROLE_ADMIN")

        console.log('Is admin: ' + isAdmin)
        return isAdmin
    }

    const logOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
    };

    const setUserInfo = (response) => {
        setIsLoggedIn(true);
        localStorage.setItem("token", response.headers.token);
    };

    return (
        <AuthContext.Provider
            value={{isLoggedIn, logOut, getUserInfo, setUserInfo, isUserLoggedIn, isAdmin}}
        >
            {children}
        </AuthContext.Provider>
    );
}
