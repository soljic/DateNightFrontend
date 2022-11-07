import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ImagePlaceholder } from "../layout/Common";

export function FeaturedStory({ title, subtitle, imageUrl }) {
  const { t } = useTranslation("common");

  return (
    <Link href={`/featured-story`}>
      <a key="sow" id="story-of-the-week" className="cursor-pointer">
        <div className="relative w-full overflow-hidden rounded-sp-14 my-10">
          <div className="absolute bg-gradient-to-b from-transparent to-sp-black opacity-80 w-full h-full z-10" />
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              className="object-cover"
              width={720}
              height={520}
              layout="responsive"
              // add priority since this is the first thing loaded in the UI
              priority
            />
          ) : (
            <div className="h-64">
              <ImagePlaceholder />
            </div>
          )}

          <div className="absolute bottom-5 left-5 w-full p-4 text-white z-20">
            <h2 className="uppercase font-semibold tracking-sp-tighten antialiased">
              {title}
            </h2>
            <h3 className="text-4xl xl:text-4xl md:text-2xl sm:text-xl tracking-tight font-semibold mb-2 antialiased">
              {subtitle}
            </h3>
            <div className="inline-flex bg-sp-white text-sp-black rounded-sp-40 px-4 py-2 items-center antialiased">
              {t("read_story")}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
