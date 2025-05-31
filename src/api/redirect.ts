import { api } from "./axios";
import { env } from "../env";

export async function redirect(shortUrl: string) {
  const shortUrlWithoutBrevly = shortUrl.replace(env.VITE_API_URL, "");

  const response = await api.get(`${shortUrlWithoutBrevly}?ref=app`);
  return response.data;
}