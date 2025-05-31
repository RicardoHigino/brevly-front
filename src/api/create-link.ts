import { api } from "./axios";
import { z } from "zod";

const createLinkSchema = z.object({
  originalUrl: z.string().refine((url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }, { message: "Link original inválido" }),
  shortUrl: z.string().refine((url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }, { message: "URL encurtada inválida" }),
});

export async function createLink(originalUrl: string, shortUrl: string) {
  console.log(originalUrl, shortUrl);
  const parsedData = createLinkSchema.safeParse({ originalUrl, shortUrl });

  console.log(parsedData);
  if (!parsedData.success) {
    const errorMessage = parsedData.error.errors.map((error) => error.message).join(", ");
    throw new Error(errorMessage);
  }

  const { data } = await api.post("/links", {
    originalUrl,
    shortUrl
  });

  console.log(data);
  return data;
}