import {
  googleLogout,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { GoogleUser } from "../types/Auth";
import axios from "axios";

interface AuthContextType {
  login: () => void;
  logout: () => void;
  user: GoogleUser | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access_token")
  );
  const isAuthenticated = !!user;

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", token);
    } else {
      localStorage.removeItem("access_token");
    }
  }, [token]);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      const accessToken = tokenResponse.access_token;
      setToken(accessToken);
      localStorage.setItem("access_token", accessToken);
      const res = await axios.post("http://localhost:3001/auth/verify-token", {
        token: accessToken,
      });
      const user = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      // localStorage.setItem("authToken", tokenId);
      console.log("User authenticated and stored:", user);

      // Fetch user info from Google API
      fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
        .then((response) => response.json())
        .then((data: GoogleUser) => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(user));
        })
        .catch((error) => console.error("Failed to fetch user info", error));
    },
    onError: (error) => console.error("Login failed", error),
  });

  const logout = () => {
    googleLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
