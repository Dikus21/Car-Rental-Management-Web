import { format } from 'date-fns';

export function formatDateTime(date: Date | string) {
  return format(date, 'd MMM yyyy, HH:mm');
}

export function formatDate(date: Date | string) {
  return format(date, 'd MMM yyyy');
}
