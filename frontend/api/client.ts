import axios from 'axios';
import { tokenStorage } from "../lib/tokenStorage";
import { refresh } from '../features/auth/api/auth.api';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
let isRefreshing = false;
let waiters: ((token: string | null) => void)[] = [];

if (!BASE_URL) {
  throw new Error("API BASE URL이 설정되지 않았습니다.");
}

export const notify = (token: string | null) => {
  waiters.forEach((cb) => cb(token));
  waiters = [];
}

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10_000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const plain = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  headers: {
      'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getAccess();
  if(token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if(err.response?.status !== 401) throw err;
    if(original._retry) throw err;
    original._retry = true;

    if(isRefreshing){
      return new Promise((resolve,reject) => {
        waiters.push((token) => {
          if(!token) return reject(err);
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        });
      });
    }
    isRefreshing = true;

    try {
      const rToken = await tokenStorage.getRefresh();
      if(!rToken) throw err;

      const data = await refresh(rToken);
      await tokenStorage.setTokens(data.accessToken, data.refreshToken);

      notify(data.accessToken);

      original.headers.Authorization = `Bearer ${data.accessToken}`;
      return api(original);
    } catch(e) {
      notify(null);
      await tokenStorage.clear();
      throw e;
    } finally {
      isRefreshing = false;
    }
  })