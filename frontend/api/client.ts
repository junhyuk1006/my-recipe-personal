import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("API BASE URL이 설정되지 않았습니다.");
}

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10_000,
    headers: {
        'Content-Type': 'application/json',
    },
});