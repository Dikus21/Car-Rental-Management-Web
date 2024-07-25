import axiosInstance from '../baseUrl';
import { ILoginData, IRegisterData } from '../../components/fragments/userContent/userTypes';
import axios from 'axios';

export const login = async (data: ILoginData) => {
  try {
    const response = await axiosInstance.post('/user/login', data);
    if (response.status === 200 && response.data.accessToken) {
      return {
        success: true,
        message: 'Login successful',
        token: response.data.accessToken
      };
    } else {
      console.log('Login failed: ', response.data.detail);
      return { success: false, message: response.data.detail };
    }
  } catch (err) {
    console.log('Login failed: ', err);
    if (axios.isAxiosError(err) && err.response?.data) {
      return { success: false, message: err.response.data.detail };
    }
    return { success: false, message: 'Login failed, unexpected error' };
  }
};

export const register = async (data: IRegisterData) => {
  try {
    const response = await axiosInstance.post('/user', data);
    if (response.status === 200) {
      console.log('Register');
      return { success: true, message: 'Register successful' };
    } else {
      console.log('Register failed: ', response.data.detail);
      return { success: false, message: response.data.detail };
    }
  } catch (err) {
    console.log('Register failed: ', err);
    if (axios.isAxiosError(err) && err.response?.data) {
      return { success: false, message: err.response.data.detail };
    }
    return { success: false, message: 'Register failed, unexpected error' };
  }
}

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/user/profile');
    if (response.status === 200) {
      console.log('Get Profile Success');
      return { success: true, data: response.data };
    } else {
      return { success: false, message: response.data.detail };
    }
  } catch (error) {
    console.error('Error fetching profile: ', error);
    return { success: false, message: error };
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post('/user/logout');
    if (response.status === 200) {
      console.log('Logout successful: ', response.data.message);
      return { success: true, message: response.data.message };
    } else {
      return { success: false, message: 'Logout failed.' };
    }
  } catch (error) {
    console.error('Error logging out: ', error);
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error('Error logging out: ', error.response.data.detail);
      return {
        success: false,
        message: error.response.data.detail
      };
    } else {
      return { success: false, message: 'Logout failed.' };
    }
  }
};

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/refresh-token');
    console.log('Refresh token response: ', response.status);
    if (response.status === 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return { success: true, token: response.data.accessToken };
    } else {
      return { success: false, message: response.data.error, detail: response.data.detail };
    }
  } catch (error) {
    console.error('Error refreshing token: ', error);
    return { success: false, message: error };
  }
};
