import Link from "next/link";
import Image from "next/legacy/image";
import { useTranslation } from "next-i18next";
import { ArrowRightIcon } from "@heroicons/react/outline";

import DesktopBanner from "../../public/images/img_vukovar_desktop.jpg";

export function FeaturedProject({ project }) {
  const { t } = useTranslation(["banners", "common"]);

  return (
    <Link
      href={`/project/${project.section_id}/item/${project.item_id}?title=Vukovar`}
      key="featured-project-vukovar"
      id="featured-project-vukovar"
      className="cursor-pointer"
    >
      <div className="relative my-10 w-full overflow-hidden rounded-sp-14">
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent to-sp-black opacity-80" />
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

        <div className="absolute bottom-5 left-5 z-20 w-full p-4 text-white">
          <h2 className="font-semibold uppercase antialiased tracking-sp-tighten">
            {t("common:term_project")}
          </h2>
          <h3 className="mb-2 font-semibold tracking-tight antialiased text-4xl sm:text-xl md:text-2xl xl:text-4xl">
            {t("homepage_eternal_thanks")}
          </h3>
          <div className="inline-flex items-center rounded-sp-40 bg-sp-white px-4 py-2 font-medium text-sp-black antialiased">
            {t("vukovar_button")}{" "}
            <span className="ml-1">
              <ArrowRightIcon className="h-5 w-5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
