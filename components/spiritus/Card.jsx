import Image from "next/image";
import Link from "next/link";

import { useTranslation } from "next-i18next";

import { StoryHookIcon } from "../Icons";
import { ImagePlaceholder } from "../layout/Common";

export function SpiritusCard({ slug, title, subtitle, imageUrl, description }) {
  const { t } = useTranslation(["common", "settings"]);

  return (
    <div className="flex break-inside-avoid flex-col">
      <Link href={`/spiritus/${slug}`}>
        {!!imageUrl ? (
          <div className="h-full w-full">
            <Image
              src={imageUrl}
              alt={`featured-spiritus-image-${slug}`}
              height={0}
              width={0}
              sizes="100vw"
              className="aspect-auto h-auto w-full rounded-sp-14 object-cover"
            />
          </div>
        ) : (
          <div className="h-[20vh]">
            <ImagePlaceholder />
          </div>
        )}
        <div className="mt-1">
          <h3 className="font-semibold leading-6 text-lg dark:text-sp-white">
            {title}
          </h3>
          <p className="text-sp-black text-opacity-60 text-sm dark:text-sp-white dark:text-opacity-60">
            {subtitle}
          </p>
          <p className="text-sp-black text-opacity-60 text-base dark:text-sp-white dark:text-opacity-60">
            {description}
          </p>
        </div>
      </Link>
      <div className="mt-1 flex w-full">
        <Link
          href={`/spiritus/${slug}`}
          className="flex w-full items-center justify-center rounded-sp-10 border border-sp-day-400 p-1.5 font-semibold text-sm"
        >
          {t("term_view")}
        </Link>
      </div>
    </div>
  );
}

export function StoryCard({
  slug,
  spiritusSlug,
  title,
  subtitle,
  imageUrl,
  tags,
}) {
  const { t } = useTranslation("common");
  let titleStr = title.length <= 32 ? title : `${title.substring(0, 29)}...`;

  let descPara = "";
  if (subtitle && subtitle.length) {
    descPara =
      subtitle.length <= 150 ? subtitle : `${subtitle.substring(0, 147)}...`;
  }
  return (
    <article className="break-inside-avoid-column text-sp-black dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-white">
      {!!imageUrl ? (
        <div className="h-full w-full">
          <Image
            src={imageUrl}
            alt={`featured-story-image-${slug}`}
            height={0}
            width={0}
            sizes="100vw"
            className="aspect-auto h-auto w-full rounded-sp-14 object-cover"
          />
        </div>
      ) : (
        <div className="h-[20vh]">
          <ImagePlaceholder />
        </div>
      )}
      <div className="mt-4 flex flex-col space-y-2 overflow-hidden text-ellipsis tracking-sp-tighten">
        <div>
          <h3 className="text-ellipsis font-bold leading-5 text-lg tracking-sp-tighten">
            {titleStr}
          </h3>
          <p className="text-ellipsis leading-5 text-xs tracking-sp-tighten sm:text-sm">
            {descPara}
          </p>
        </div>
        <Link
          href={`/spiritus/${spiritusSlug}/story/${slug}`}
          className="w-full rounded-sp-10 border border-sp-day-400 p-1.5 text-center font-semibold text-sm"
        >
          {t("read_story")}
        </Link>
      </div>
    </article>
  );
}
