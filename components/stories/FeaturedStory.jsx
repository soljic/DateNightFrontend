import Image from "next/image";
import Link from "next/link";

import { useTranslation } from "next-i18next";

import { VerticalSwiper } from "./Swipers";

export function FeaturedStory({ title, subtitle, imageUrl, items }) {
  const { t } = useTranslation("common");

  return (
    <div className="my-10 grid w-full grid-cols-3 md:grid-cols-4 gap-4">
      <Link
        href={`/featured-story`}
        key="sow"
        id="story-of-the-week"
        className="col-span-3 w-full"
      >
        <div className="relative md:h-full h-96 w-full md:w-full overflow-hidden rounded-sp-14">
          <Image
            src={imageUrl}
            alt={title}
            className="h-full w-full object-center"
            // width={720}
            // height={520}
            layout="fill"
            // add priority since this is the first thing loaded in the UI
            priority
          />

          <div className="absolute bottom-5 left-5 z-20 w-full p-4 text-white">
            <h2 className="font-semibold uppercase antialiased drop-shadow-3xl tracking-sp-tighten">
              {title}
            </h2>
            <h3 className="mb-2 font-semibold antialiased drop-shadow-3xl text-4xl tracking-tight sm:text-xl md:text-2xl xl:text-4xl">
              {subtitle}
            </h3>
            <div className="inline-flex items-center rounded-sp-40 bg-sp-white px-4 py-2 font-medium text-sp-black antialiased drop-shadow-3xl">
              {t("read_story")}
            </div>
          </div>
        </div>
      </Link>
      <div className="hidden md:col-span-1 md:block">
        <VerticalSwiper items={items} />
      </div>
    </div>
  );
}
