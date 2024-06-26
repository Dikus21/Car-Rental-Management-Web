import { jwtDecode } from "jwt-decode";
import axiosInstance from "../baseUrl";
import { ILoginData } from "./loginTypes";
import axios from "axios";

export const login = async (data: ILoginData) => {
  try {
    const response = await axiosInstance.post("/user/login", data);
    if (response.status === 200 && response.data.accessToken) {
      const decoded = jwtDecode(response.data.accessToken);
      if (decoded.exp) {
        localStorage.setItem(
          "accessTokenExpiresIn",
          JSON.stringify(decoded.exp)
        );
      }
      return {
        success: true,
        message: "Login successful",
        token: response.data.accessToken,
      };
    } else {
      console.log("Login failed: ", response.data.error);
      return { success: false, message: response.data.error };
    }
  } catch (err) {
    console.log("Login failed: ", err);
    if (axios.isAxiosError(err) && err.response?.data) {
      return { success: false, message: err.response.data.error };
    }
    return { success: false, message: "Login failed, unexpected error" };
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");
    if (response.status === 200) {
      console.log("Get Profile Success");
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.error };
    }
  } catch (error) {
    console.error("Error fetching profile: ", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/user/logout");
    if (response.status === 200) {
      localStorage.removeItem("accessTokenExpiresIn");
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: "Logout failed." };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error || "Logout failed, unexpected error",
    };
  }
};
