import { DownloadCsvButton } from "./download-csv-button";
import { LinkInfo } from "./link-info";
import { useQuery } from "@tanstack/react-query";
import { getLinks } from "../api/get-links";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { SpinnerIcon, LinkSimpleIcon } from "@phosphor-icons/react";

export function LinkList() {
  const { data: links, refetch, isLoading, isRefetching } = useQuery({
    queryKey: ["links"],
    queryFn: () => getLinks()
  })


  return (
  <div className="flex flex-col items-center justify-center  bg-white rounded-xl max-w-2xl w-full md:w-2/3 shadow-md border border-gray-200 justify-self-center p-5 gap-2">
      <div className="flex items-center justify-between w-full border-b border-gray-200 pb-4">
        <span className="text-xl font-bold text-black w-full">Meus Links</span>
        <DownloadCsvButton disabled={!links || links?.length === 0 || isLoading || isRefetching} />
      </div>

      {
        isLoading || isRefetching ? (
          <div className="flex flex-col items-center justify-center w-full h-full gap-2">
            <SpinnerIcon className="w-6 h-6 text-gray-500 animate-spin"/>
            <span className="text-gray-500 text-xs">CARREGANDO...</span>
          </div>
        ) : (
          <ScrollArea.Root type="scroll" className="overflow-hidden w-full">
              <ScrollArea.Viewport style={{ height: `500px` }}>
                {links && links.length > 0 ? (
                  links.map((link: any) => (
                    <LinkInfo originalUrl={link.originalUrl} shortUrl={link.shortUrl} clicks={link.redirectCount} key={link.shortUrl} id={link.id} refetch={refetch}/>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                    <LinkSimpleIcon className="w-6 h-6 text-gray-500"/>
                    <span className="text-gray-500 text-xs">AINDA NÃO EXISTEM LINKS CADASTRADOS</span>
                  </div>
                )}
              </ScrollArea.Viewport>

              <ScrollArea.Scrollbar
                className="flex touch-none select-none bg-blue-300 p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-[var(--color-blue-base)] before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        )
      }
  </div>
  )
}