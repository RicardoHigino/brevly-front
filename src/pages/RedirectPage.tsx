import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { redirect } from "../api/redirect";
import Logo from "../assets/Logo_Icon.svg";
import { Info } from "../components/info";

export function RedirectPage() {
	const { shortUrl } = useParams();
	console.log(shortUrl);

	if (!shortUrl) {
		window.location.href = "/not-found";
		return null;
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ["redirect", shortUrl],
		queryFn: () => redirect(shortUrl),
		enabled: !!shortUrl,
	});

	console.log(data);
	if (data?.url) {
		window.location.href = data.url;
		return null;
	}

	if (!isLoading && !data && error) {
		console.error("Error fetching short URL:", error);
		window.location.href = "/not-found";
		return null;
	}

	return (
		<Info
			Icon={Logo}
			info="Redirecionando..."
			description="O link será aberto automaticamente em alguns instantes."
			linkTitle="Acesse aqui"
			linkDescription="Não foi redirecionado?"
			linkPath={data?.url || ""}
			isLoading={isLoading}
		/>
	);
}