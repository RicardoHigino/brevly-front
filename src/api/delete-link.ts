import { api } from "./axios";

export async function deleteLink(id: string) {
  await api.delete(`/links/${id}`);
}