import { format } from 'date-fns';
import React from 'react';

export function formatDateTime(date: Date | string) {
  return format(date, 'd MMM yyyy, HH:mm');
}

export function formatDate(date: Date | string) {
  return format(date, 'd MMM yyyy');
}

export function handleKeyNumberOnly (event: React.KeyboardEvent<HTMLInputElement>) {
  const key = event.key;
  if (!/^\d+$/.test(key) && event.key !== 'Backspace' && event.key !== 'Delete') {
    event.preventDefault();
  }
}
