import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { createLink } from "../api/create-link";
import { toast } from "react-toastify";
import { SpinnerIcon } from "@phosphor-icons/react";

export function NewLink() {
  const queryClient = useQueryClient();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const mutation = useMutation({
    mutationFn: (data: { originalUrl: string, shortUrl: string }) => createLink(data.originalUrl, data.shortUrl),
    onSuccess: () => {
      toast.success("Link criado com sucesso");
      setOriginalUrl("");
      setShortUrl("");
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error: any) => {
      toast.error((error.response?.data?.message) || error.message || "Erro ao criar link");
      const originalUrlInput = document.querySelector("#originalUrl");
      const shortUrlInput = document.querySelector("#shortUrl");
      if (originalUrlInput) {
        originalUrlInput.classList.add("border-red-500");
      }
      if (shortUrlInput) {
        shortUrlInput.classList.add("border-red-500");
      }
    }
  });

  return (
  <div className="flex flex-col items-start justify-center bg-white rounded-xl max-w-md w-full md:w-[420px] shadow border border-gray-200 p-8 gap-6 self-start">
    <span className="text-2xl text-black font-bold mb-2">Novo link</span>
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-col gap-2 w-full">
        <span className="text-xs text-gray-600 opacity-90">LINK ORIGINAL</span>
        <input
          id="originalUrl"
          className="text-base w-full p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-base)] transition-all"
          type="text"
          placeholder="www.google.com"
          value={originalUrl}
          onChange={(e) => {
            setOriginalUrl(e.target.value);
            const originalUrlInput = document.querySelector("#originalUrl");
            if (originalUrlInput && originalUrlInput.classList.contains("border-red-500")) {
              originalUrlInput.classList.remove("border-red-500");
            }
          }}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="text-xs text-gray-600 opacity-90">LINK ENCURTADO</span>
        <input
          id="shortUrl"
          className="text-base w-full p-3 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-base)] transition-all"
          type="text"
          placeholder="brev.ly/"
          value={shortUrl}
          onChange={(e) => {
            setShortUrl(e.target.value);
            const shortUrlInput = document.querySelector("#shortUrl");
            if (shortUrlInput && shortUrlInput.classList.contains("border-red-500")) {
              shortUrlInput.classList.remove("border-red-500");
            }
          }}
        />
      </div>
      <button
        className={`w-full text-base p-3 rounded-md bg-[var(--color-blue-base)] text-white font-semibold transition-all mt-2 flex items-center justify-center gap-2 ${(mutation.isPending || !originalUrl || !shortUrl) ? "opacity-50" : "cursor-pointer hover:bg-[var(--color-blue-dark)]"}`}
        onClick={() => {
          if (originalUrl && shortUrl) {
            mutation.mutate({ originalUrl, shortUrl });
          }
        }}
        disabled={mutation.isPending || !originalUrl || !shortUrl}
      >
        {mutation.isPending && <SpinnerIcon className="animate-spin" size={20} />}
        Salvar link
      </button>
    </div>
  </div>
  )
}