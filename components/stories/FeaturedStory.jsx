import Image from "next/legacy/image";
import Link from "next/link";

import { useTranslation } from "next-i18next";

import { ImagePlaceholder } from "../layout/Common";
import { VerticalSwiper } from "./Swipers";

export function FeaturedStory({
  title,
  subtitle,
  imageUrl,
  items,
}) {
  const { t } = useTranslation("common");

  return (
    <div className="my-10 grid w-full grid-cols-4 gap-4">
      <Link
        href={`/featured-story`}
        key="sow"
        id="story-of-the-week"
        className="col-span-3 w-full cursor-pointer"
      >
        <div className="relative w-full overflow-hidden rounded-sp-14 h-full">
          {imageUrl ? (
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
          ) : (
            <div className="h-64">
              <ImagePlaceholder />
            </div>
          )}

          <div className="absolute bottom-5 left-5 z-20 w-full p-4 text-white">
            <h2 className="font-semibold uppercase antialiased tracking-sp-tighten drop-shadow-3xl">
              {title}
            </h2>
            <h3 className="mb-2 font-semibold antialiased text-4xl tracking-tight sm:text-xl md:text-2xl xl:text-4xl drop-shadow-3xl">
              {subtitle}
            </h3>
            <div className="inline-flex items-center rounded-sp-40 bg-sp-white px-4 py-2 font-medium text-sp-black antialiased drop-shadow-3xl">
              {t("read_story")}
            </div>
          </div>
        </div>
      </Link>
      <div className="col-span-1">
        <VerticalSwiper
          items={items}
        />
      </div>
    </div>
  );
}
