import { useState, useEffect, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAuthSuccess = (accessToken) => {
    setToken(accessToken);
    const decodedToken = jwtDecode(accessToken);
    setUser({
      id: decodedToken.sub,
    });
  };
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await api.post("/auth/refresh");
        handleAuthSuccess(response.data.access_token);
      } catch (error) {
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    const handleForceLogout = () => {
      setToken(null);
      setUser(null);
    };
    window.addEventListener("force-logout", handleForceLogout);
    return () => window.removeEventListener("force-logout", handleForceLogout);
  }, []);

  const login = async (email, password) => {
    const response = await api.post(
      "/auth/login",
      {
        username: email,
        password: password,
      },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      },
    );
    handleAuthSuccess(response.data.access_token);
    return response.data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.log(
        "Backend session teardown failed, forcing client logout.",
        error,
      );
    } finally {
      setToken(null);
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
