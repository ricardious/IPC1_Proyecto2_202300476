import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, getUsersRequest } from "../api/auth";
import { set } from "react-hook-form";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);


    const signup = async (user) => {
        try {
            const { confirmPassword, genero, ...rest } = user;
            const userData = { ...rest, genero: genero.label };

            console.log(userData);
            const res = await registerRequest(userData);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    }

      // Guardamos el usuario en el localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            if (Array.isArray(error.response.data)) {

                return setErrors(error.response.data);
            }
            setErrors([error.response.data]);
        }
    }

    
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token);

                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }

        }
        checkLogin();
    }, []);

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
      };

    return (
        <AuthContext.Provider value={{
            signup,
            signin,
            loading,
            logout,
            user,
            isAuthenticated,
            errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}