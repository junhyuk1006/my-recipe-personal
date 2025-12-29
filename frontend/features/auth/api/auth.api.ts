import axios from "axios";
import { api, plain } from "../../../api/client";

export type SignupRequest = {
  email: string;
  password: string;
  nickname: string;
};

export type SignupResponse = {
  user:{
    id: number;
    nickname: string;
    handle: string;
  };
  tokens:{
    accessToken: string;
    refreshToken: string;
  }
};

export type LoginRequest = {
  email: string;
  password: string;
}

export type LoginResponse = {
  user:{
    id: number;
    email: string;
    nickname: string;
    handle: string;
  };
  tokens:{
    accessToken: string;
    refreshToken: string;
  }
}

export type ApiErrorResponse = {
    message: string;
    error?: string;
    code?: number;
};

export type RefreshResponse = {
    accessToken: string;
    refreshToken: string;
}

export async function signup(request: SignupRequest): Promise<SignupResponse> {
  const res = await api.post<SignupResponse>('/api/auth/signup', request);
  return res.data;
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const res = await plain.post<LoginResponse>("/api/auth/login", request);
  return res.data;
}

export async function refresh(refreshToken: string) : Promise<RefreshResponse> {
  const res = await plain.post<RefreshResponse>('/api/auth/refresh', { refreshToken });
  return res.data;
}

// 화면에서 에러 메시지 뽑아 쓰기 편하게
export function getApiErrorMessage(err: unknown, fallback = "요청에 실패했습니다."): string {
  console.log("API ERROR >>>", err);
  if (!axios.isAxiosError(err)) return fallback;

  console.log("status:", err.response?.status);
  console.log("data:", err.response?.data);
  console.log("message:", err.message);
  if (!err.response) return "서버에 연결할 수 없습니다. (주소/서버 실행/네트워크 확인)";
  
  const data = err.response?.data as ApiErrorResponse | undefined;
  return data?.message || data?.error || fallback;
}