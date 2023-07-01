import Image from "next/image";

import { CreateMemorialBanner } from "../homepage/CreateMemorialBanner";
import { Footer } from "./Footer";
import { Navbar } from "./NavBar";

export default function LayoutHeroImage({ locale, children }) {
  return (
    <div>
      <div className="w-full bg-sp-day-50 dark:bg-sp-black">
        <div className="z-10 mx-auto w-full p-2 md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
          <Navbar />
        </div>
      </div>
      <div className="relative h-screen">
        <div className="overflow-none absolute h-full w-full">
          <Image
            src="/images/img_hero_desktop.jpg"
            alt="bg-image"
            quality={100}
            priority={true}
            className="-z-20 -mt-12 hidden object-cover md:block"
            width={0}
            height={0}
            sizes="100vw"
            fill
          />
          <Image
            src="/images/img_hero_mobile.jpg"
            alt="bg-image-mobile"
            quality={100}
            priority={true}
            className="-z-20 -mt-12 block object-cover md:hidden"
            width={0}
            height={0}
            sizes="100vw"
            fill
          />
        </div>
        <div className="hero-gradient dark-hero-gradient h-screen">
          <div className="z-50 mx-auto w-full p-2 md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
            <CreateMemorialBanner />
          </div>
        </div>
      </div>
      <div className="mx-5">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
