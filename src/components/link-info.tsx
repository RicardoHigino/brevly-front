import { toast } from "react-toastify";
import { deleteLink } from "../api/delete-link";
import { useNavigate } from "react-router-dom";
import { env } from "../env";
import { CopyIcon, TrashIcon } from "@phosphor-icons/react";

interface LinkInfoProps {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  id: string;
  refetch: () => void;
}

export function LinkInfo({ originalUrl, shortUrl, clicks, id, refetch }: LinkInfoProps) {
  const navigate = useNavigate();
  const handleDeleteLink = async (id: string) => {
    try {
      await deleteLink(id);
      toast.success("Link deletado com sucesso");
      refetch();
    } catch (error) {
      toast.error("Erro ao deletar link");
    }
  }

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Link copiado para a área de transferência");
  }

  const getShortUrl = (shortUrl: string) => {
    return shortUrl.replace(env.VITE_API_URL, "");
  }

  return (
    <div className="flex items-center justify-between w-full rounded-md p-2 gap-2 border-b border-gray-100 pb-4">
      <div className="flex flex-col">
        <span className="text-sm text-blue-700 font-bold cursor-pointer" onClick={() => navigate(`${getShortUrl(shortUrl)}`)}>{shortUrl}</span>
        <span className="text-sm text-gray-500 opacity-90" >{originalUrl}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-gray-500 opacity-90">{clicks} {clicks === 1 ? "acesso" : "acessos"}</span>
        <button
          className="text-sm  hover:bg-gray-300 bg-gray-100 rounded-md p-1 w-6 h-6 cursor-pointer"
          onClick={() => handleCopyLink(shortUrl)}
          >
          <CopyIcon className="w-4 h-4" />
        </button>
        <button
          className="text-sm  hover:bg-gray-300 bg-gray-100 rounded-md p-1 w-6 h-6 cursor-pointer"
          onClick={() => handleDeleteLink(id)}
          >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
} 