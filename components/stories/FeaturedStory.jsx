import Link from "next/link";
import { useTranslation } from "next-i18next";
import Image from "next/legacy/image";
import { ImagePlaceholder } from "../layout/Common";

export function FeaturedStory({ title, subtitle, imageUrl }) {
  const { t } = useTranslation("common");

  return (
    <Link
      href={`/featured-story`}
      key="sow"
      id="story-of-the-week"
      className="cursor-pointer"
    >
      <div className="relative my-10 w-full overflow-hidden rounded-sp-14">
        <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent to-sp-black opacity-80" />
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            className="object-center"
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

        <div className="absolute bottom-5 left-5 z-20 w-full p-4 text-white">
          <h2 className="font-semibold uppercase antialiased tracking-sp-tighten">
            {title}
          </h2>
          <h3 className="mb-2 font-semibold tracking-tight antialiased text-4xl sm:text-xl md:text-2xl xl:text-4xl">
            {subtitle}
          </h3>
          <div className="inline-flex items-center rounded-sp-40 bg-sp-white px-4 py-2 font-medium text-sp-black antialiased">
            {t("read_story")}
          </div>
        </div>
      </div>
    </Link>
  );
}
