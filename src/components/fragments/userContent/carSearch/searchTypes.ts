import * as Yup from 'yup';

export const SearchCarDto = Yup.object({
  withDriver: Yup.string().required('Driver selection is required'),
  startRent: Yup.date().required('Start Date is required'),
  capacity: Yup.number().min(1, 'Minimum capacity is 1').required('Capacity is required').nullable(),
});

export type CarSearchForm = Yup.InferType<typeof SearchCarDto>;

export interface CarSearchProps {
    withDriver: string;
    startRent: string;
    capacity: string;
}

