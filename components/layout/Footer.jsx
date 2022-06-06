import Image from "next/image";
import { Logo, NavItem } from "./Common";

export function Footer() {
  return (
    <div className="container mx-auto text-sp-white mt-12">
      <div className="flex flex-row xl:w-4/5 lg:w-full mx-auto text-sp-white items-center justify-around">
        <div className="inline-flex">
          <NavItem text={"About"} textsize={"sm"} />
          <NavItem text={"Stories"} textsize={"sm"} />
          <NavItem text={"Mobile app"} textsize={"sm"} />
          <NavItem text={"Terms of Service"} textsize={"sm"} />
          <NavItem text={"Privacy"} textsize={"sm"} />
          <NavItem text={"Contact"} textsize={"sm"} />
        </div>
      </div>
      <hr className="my-2 pb-4 mx-auto xl:w-4/5 lg:w-full"></hr>
      <div className="container xl:w-4/5 lg:w-full mx-auto justify-between text-sp-white pb-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row gap-2">
            <a
              href="https://www.facebook.com/spiritusmemoria"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/icons/facebook.svg"
                height={30}
                width={30}
                alt="facebook icon"
              />
            </a>
            <a
              href="https://www.instagram.com/spiritus.app/?hl=hr"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/icons/instagram.svg"
                height={30}
                width={30}
                alt="instagram icon"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/spiritus-memoria/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/icons/linkedin.svg"
                height={30}
                width={30}
                alt="linkedin icon"
              />
            </a>
          </div>
          <div className="text-sm text-sp-lighter">
            ©{new Date().getFullYear()} Spiritus Memoria. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
