import { useMutation } from "@tanstack/react-query";
import { DownloadSimpleIcon, SpinnerIcon } from "@phosphor-icons/react";
import { exportCsv } from "../api/export-csv";
import { toast } from "react-toastify";
import { useState } from "react";

export function DownloadCsvButton({ disabled }: { disabled: boolean } ) {
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: () => {
      setIsLoading(true);
      return exportCsv();
    },
    onSuccess: (data: any) => {
      toast.success("CSV exportado com sucesso");
      window.open(data, "_blank");
      setIsLoading(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Erro ao criar link");
      setIsLoading(false);
    }
  });
  
  return (
    <button
      className={`w-40 text-sm p-2 rounded-md bg-gray-200 flex items-center justify-center gap-2  ${(disabled || isLoading) ? "opacity-50" : "hover:bg-gray-300 cursor-pointer"}`}
      disabled={disabled || isLoading}
      onClick={() => mutation.mutate()}
    >
      {isLoading ? (
        <SpinnerIcon className="w-4 h-4 animate-spin" />
      ) : (
        <DownloadSimpleIcon className="w-4 h-4" />
      )}
      <span className="text-xs">Baixar CSV</span>
    </button>
  )
}