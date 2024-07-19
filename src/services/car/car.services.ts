import axios from 'axios';
import axiosInstance from '../baseUrl';
import { CarSearchProps } from '../../components/fragments/userContent/carSearch/searchTypes';

export const getCarList = async () => {
  try {
    const response = await axiosInstance.get('/car/list');
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
    return { success: false, message: response.data.error };
  } catch (error) {
    console.error('Error fetching car list: ', error);
    throw error;
  }
};

export const getSearchCars = async (data: CarSearchProps) => {
  try {
    const response = await axiosInstance.get('/car/search', { params: data });
    if (response.status === 200) {
      return { success: true, data: response.data };
    }
    return { success: false, message: response.data.error };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error('Error fetching search cars: ', error.response.data);
      return { success: false, message: error.response.data.error };
    }
    console.error('Error fetching search cars: ', error);
    return { success: false, message: 'Error fetching search cars' };
  }
};

export const addCar = async (data: FormData) => {
  try {
    const response = await axiosInstance.post('/car', data);
    if (response.status === 200) {
      return { success: true, message: response.data.message };
    }
    return { success: false, message: response.data.error };
  } catch (error) {
    console.error('Error logging out: ', error);
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error('Error logging out: ', error.response);
      return {
        success: false,
        message: error.response.data.error
      };
    }
  }
};

export const deleteCar = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/car/${id}`);
    if (response.status === 200) {
      return { success: true, message: response.data.message };
    }
    return { success: false, message: response.data.error };
  } catch (error) {
    console.error('Error deleting car: ', error);
    throw error;
  }
};

export const updateCar = async (id: number, data: FormData) => {
  try {
    const response = await axiosInstance.put(`/car/${id}`, data);
    if (response.status === 200) {
      return { success: true, message: response.data.message };
    }
    return { success: false, message: response.data.error };
  } catch (error) {
    console.error('Error updating car: ', error);
    throw error;
  }
};
