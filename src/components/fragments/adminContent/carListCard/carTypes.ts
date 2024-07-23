import { createContext } from 'react';
import * as Yup from 'yup';

export const CarAddDto = Yup.object({
  model: Yup.string().required('Model is required'),
  manufacture: Yup.string().required('Manufacture is required'),
  year: Yup.string().required('Year is required'),
  rentPerDay: Yup.string().required('Price is required'),
  capacity: Yup.string().required('Capacity is required'),
  transmission: Yup.string().required('Transmission is required'),
  withDriver: Yup.string().required('With Driver is required'),
  description: Yup.string(),
  image: Yup.string()
});

export type CarFormProps = Yup.InferType<typeof CarAddDto>;

export interface CarProps extends CarFormProps {
  id: number;
  imageUrl: string;
  startRent?: string;
  endRent?: string;
  finishRent?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const CarsListContext = createContext<{ cars: CarProps[]; fetchCarList: (refresh: boolean) => void } | null>(
  null
);
