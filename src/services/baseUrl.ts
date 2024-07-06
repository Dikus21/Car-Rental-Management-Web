import axios from 'axios';
import { refreshToken } from './user/auth.services';

// let hasTriedRefreshToken = false;
const ignorePaths = ['/refresh-token', '/user/logout'];

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) => response, // Simply return the response if everything is fine
  async (error) => {
    const originalRequest = error.config;
    console.log('Error: ', originalRequest);

    // Check if we should refresh the token
    if (error.response.status === 401 && !ignorePaths.includes(originalRequest.url)){
      console.log('Refreshing token...');

      try {
        await refreshToken().then(({success}) => {
            if (success) {
                return axiosInstance(originalRequest) // Retry the original request with the new token
            }
        }); // Refresh the token
      } catch (refreshError) {
        return Promise.reject(refreshError); // If token refresh fails, reject the promise
      }
    }


    // For other response statuses or if retrying does not work, reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;
