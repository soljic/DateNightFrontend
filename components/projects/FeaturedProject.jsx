import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { ArrowRightIcon } from "@heroicons/react/outline";

import DesktopBanner from "../../public/images/img_vukovar_desktop.jpg";

export function FeaturedProject({ project }) {
  const { t } = useTranslation(["banners", "common"]);

  return (
    <Link href={`/project/${project.section_id}/item/${project.item_id}?title=Vukovar`}>
      <a
        key="featured-project-vukovar"
        id="featured-project-vukovar"
        className="cursor-pointer"
      >
        <div className="relative w-full overflow-hidden rounded-sp-14 my-10">
          <div className="absolute bg-gradient-to-b from-transparent to-sp-black opacity-80 w-full h-full z-10" />
          <Image
            src={DesktopBanner}
            alt={"Eternal Thanks Image"}
            className="object-cover"
            width={720}
            height={520}
            layout="responsive"
            // add priority since this is the first thing loaded in the UI
            priority
          />

          <div className="absolute bottom-5 left-5 w-full p-4 text-white z-20">
            <h2 className="uppercase font-semibold tracking-sp-tighten antialiased">
              {t("common:term_project")}
            </h2>
            <h3 className="text-4xl xl:text-4xl md:text-2xl sm:text-xl tracking-tight font-semibold mb-2 antialiased">
              {t("homepage_eternal_thanks")}
            </h3>
            <div className="inline-flex bg-sp-white text-sp-black font-medium rounded-sp-40 px-4 py-2 items-center antialiased">
              {t("vukovar_button")}{" "}
              <span className="ml-1">
                <ArrowRightIcon className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
