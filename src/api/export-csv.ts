import { api } from "./axios";

export async function exportCsv() {
  const response = await api.get("/export-csv");
  return response.data;
}