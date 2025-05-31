import { NewLink } from "./new-link";
import { LinkList } from "./link-list";
import Logo from "../assets/Logo_Icon.svg";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center md:items-start justify-center min-h-screen gap-4 pt-5">
        <div className="flex items-center gap-2">
          <img className="w-10 h-10 mr-2" src={Logo} alt="Logo" />
          <span className="text-2xl font-bold text-blue-700">brev.ly</span>
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <NewLink/>
          <LinkList/>
        </div>
      </div>
    </div>
  )
}