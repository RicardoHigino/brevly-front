import { api } from "./axios";

export async function redirect(shortUrl: string) {
  const paramUrl = shortUrl.split('/').pop()
  
  const response = await api.get(`${paramUrl}?ref=app`);
  return response.data;
}