import axios from 'axios';
import { refreshToken } from './user/auth.services';
import store from '../redux/store';
import { resetAuthUser } from '../redux/authSlice';

// let hasTriedRefreshToken = false;
const ignorePaths = ['/refresh-token', '/user/logout'];

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  console.log("ORIGINAL REQUEST: ", config);
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response, // Simply return the response if everything is fine
  async (error) => {
    const originalRequest = error.config;

    // Check if we should refresh the token
    if (error.response.status === 401 && !ignorePaths.includes(originalRequest.url)) {
      console.log('Refreshing token...');

      try {
        const { success, message }= await refreshToken();

        console.log("Refresh Token M: ", message)

        if (success) {
            return await axiosInstance(originalRequest); // Retry the original request with the new token
          } else {
            store.dispatch(resetAuthUser());
            localStorage.removeItem('accessToken');
          }
      } catch (refreshError) {
        return Promise.reject(refreshError); // If token refresh fails, reject the promise
      }
    }

    // For other response statuses or if retrying does not work, reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;
