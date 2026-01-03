import axios from "axios";
import { api } from "../../../api/client";

export type ItemResponse = {
    id: number;
    name: string;
    unit: string;
    expirationDate: string;
}

export type ItemRequest = {
    name: string;
    unit: string;
    expirationDate: string;
}

export type ApiErrorResponse = {
    message: string;
    error?: string;
    code?: number;
};

export async function findItem(): Promise<ItemResponse[]>{
    const res = await api.get<ItemResponse[]>('/api/refrigerator/item');
    return res.data;
}

export async function createItem(request: ItemRequest): Promise<ItemResponse>{
    const res = await api.post<ItemResponse>('/api/refrigerator/item', request);
    return res.data;
}

export async function deleteItem(itemId: number): Promise<void>{
    await api.delete<void>(`/api/refrigerator/item/${itemId}`);
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