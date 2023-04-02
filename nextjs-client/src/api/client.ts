import axios from 'axios';

export const axiosClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  baseURL: process.env.NEXT_PUBLIC_FUNCTION_BASE_URL,
});
