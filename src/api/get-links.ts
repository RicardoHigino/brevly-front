import { api } from "./axios";

interface GetLinksResponse {
  id: string;
  originalLink: string;
  shortLink: string;
  redirectCount: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export async function getLinks() {
  const response = await api.get<GetLinksResponse[]>("/links");

  return response.data;
}
