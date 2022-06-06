import Link from "next/link";
import { Logo, NavItem } from "./Common";
import { GlobeAltIcon, SearchIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";


const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "hr",
    name: "Hrvatski",
    country_code: "hr",
  },
];


export function Navbar() {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto bg-sp-dark py-3 mb-2 opacity-90 backdrop-blur-md sticky top-0 z-50">
      <div className="flex flex-row xl:w-4/5 lg:w-full mx-auto justify-between text-sp-white">
        <div className="inline-flex items-center">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
          <nav className="inline-flex ml-3">
            <NavItem text={"Stories"} />
            <NavItem text={"Mobile app"} />
            <NavItem text={"About"} />
          </nav>
        </div>

        <div className="inline-flex items-center gap-3">
          <SearchIcon className="h-6 w-6 text-sp-white" />
          <Link href={session?.name ? "/account/settings" : "/auth/login"}>
            <a className="bg-sp-medlight border border-sp-medium hover:bg-sp-medium inline-flex justify-center rounded-full py-2 px-6 font-semibold focus:outline-none">
              { session?.user?.name ? session.user.name : "Log in"}
            </a>
          </Link>
          <GlobeAltIcon className="h-6 w-6 text-sp-white" />
        </div>
      </div>
    </div>
  );
}
