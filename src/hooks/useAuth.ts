import { useEffect, useState } from "react";
import { IUser } from "./userTypes";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getProfile, logout } from "../services/user/auth.services";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("USE AUTH");
    console.log("isAuthenticated", isAuthenticated);
    const accessTokenExpiresIn = localStorage.getItem("accessTokenExpiresIn");
    if (
      accessTokenExpiresIn &&
      parseInt(accessTokenExpiresIn) * 1000 > Date.now() && !isAuthenticated
    ) {
      initializeUser().then((role) => {
        if (!role) {
          navigate("/login");
        }
        if (role === "USER") {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      });
    }
  }, []);

  const initializeUser = async ():Promise<string> => {
    const { success, data } = await getProfile();
    if (!success) return "";
    setIsAuthenticated(true);
    const authUser: IUser = {
      name: data.name,
      initialUserName: data.name.charAt(0).toUpperCase(),
      role: data.role,
    };
    setUser(authUser);
    console.log("initializeUser", authUser);
    // setIsLoading(false);
    return data.role;
  };

  const verifyToken = async (token: string) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded) {
        localStorage.setItem(
          "accessTokenExpiresIn",
          JSON.stringify(decoded.exp)
        );
        await initializeUser().then((role) => {
          if (!role) {
            logoutUser();
          }
          if (role === "USER") {
            setIsAdmin(false);
            navigate("/");
          } else {
            setIsAdmin(true);
            navigate("/admin/dashboard");
          }

          console.log("User: ", user);
        })
      }
    } catch (error) {
      console.error("Error verifying token: ", error);
      logoutUser();
    }
  };

  const logoutUser = async () => {
    const { success, message } = await logout();
    if (success) {
      setIsAuthenticated(false);
      setUser(null);
      setIsAdmin(false);
      localStorage.removeItem("accessTokenExpiresIn");
      navigate("/login");
    } else {
      console.error("Logout failed: ", message);
    }
  };

  return { isAuthenticated, user, isAdmin, verifyToken, logoutUser};
};
