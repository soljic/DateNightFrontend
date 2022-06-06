import Image from "next/image";
import { Logo, NavItem } from "./Common";

export function Footer() {
  return (
    <div className="container mx-auto text-sp-white mt-12">
      <div className="flex flex-col xl:w-4/5 lg:w-full mx-auto text-sp-white">
        <Logo />
        <div className="flex flex-row justify-between items-center -ml-3 pt-2">
          <div className="inline-flex">
            <NavItem text={"Stories"} />
            <NavItem text={"Mobile app"} />
            <NavItem text={"About"} />
            <NavItem text={"Contact"} />
            <NavItem text={"Privacy"} />
          </div>
        </div>
      </div>
      <hr className="my-2 pb-2 mx-auto xl:w-4/5 lg:w-full"></hr>
      <div className="container xl:w-4/5 lg:w-full mx-auto justify-between text-sp-white pb-4">
        <div className="flex flex-row justify-between">
          <div className="text-sm text-sp-lighter">
            ©{new Date().getFullYear()} Spiritus Memoria. All rights reserved.
          </div>
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
        </div>
        <div className="text-sm text-sp-lighter -mt-2">
          <p>{"Proud partners with:"}</p>
          <Image
            src="/icons/partners.png"
            height={50}
            width={400}
            alt="partners"
          />
        </div>
      </div>
    </div>
  );
}
