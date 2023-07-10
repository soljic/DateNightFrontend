import Image from "next/image";
import Link from "next/link";

import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabSections({ featured, anniversaries, recent }) {
  const { t } = useTranslation("homepage");

  return (
    <Tabs defaultValue="featured">
      <TabsList className="w-full pb-4 lg:pb-8">
        <nav className="flex w-full justify-start space-x-4 rounded-none border-b border-sp-day-400">
          <TabsTrigger value="featured">
            <TabPill text={t("featured")} />
          </TabsTrigger>
          <TabsTrigger value="anniversaries">
            <TabPill text={t("anniversaries")} />
          </TabsTrigger>
          <TabsTrigger value="recent">
            <TabPill text={t("recent")} />
          </TabsTrigger>
        </nav>
      </TabsList>
      <TabsContent value="featured">
        <FeaturedStories featured={featured} />
        <SeeMoreButton
          sectionId={featured.id}
          title={featured.title || t("discover")}
        />
      </TabsContent>
      <TabsContent value="anniversaries">
        <FeaturedSpiritus featured={anniversaries} />
        <SeeMoreButton
          sectionId={anniversaries.id}
          title={anniversaries.title || t("anniversaries")}
        />
      </TabsContent>
      <TabsContent value="recent">
        <FeaturedSpiritus featured={recent} />
        <SeeMoreButton
          sectionId={recent.id}
          title={recent.title || t("recent")}
        />
      </TabsContent>
    </Tabs>
  );
}

// uses group-data-[state=active] to set the active state of the tab depending on parent state
function TabPill({ text }) {
  return (
    <div className="w-full rounded-sp-10 from-day-gradient-start to-day-gradient-stop p-2 font-medium text-black hover:bg-gradient-to-r group-data-[state=active]:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-white dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
      {text}
    </div>
  );
}

function FeaturedStories({ featured }) {
  const { t } = useTranslation("common");
  return (
    <div className="mx-auto mt-5 w-11/12 p-1 text-sp-black dark:text-sp-white md:w-full lg:mt-2">
      {featured && featured?.items.length ? (
        <div className="w-full columns-1 space-y-8 md:columns-2 md:space-y-12 lg:columns-3">
          {featured.items.map((s) => (
            <FeaturedStoryCard
              spiritusSlug={s.parentId}
              slug={s.itemId}
              title={s.title}
              subtitle={s.placeholderText}
              imageUrl={s.imageUrl}
              tags={s.flags}
              key={`story-elem-featured-${s.title}-${s.itemId}`}
            />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sp-lighter dark:text-sp-lighter">
          {t("more_stories_no_stories")}
        </p>
      )}
    </div>
  );
}

function FeaturedStoryCard({
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
      {imageUrl && (
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

function FeaturedSpiritus({ featured }) {
  const { t } = useTranslation("common");
  return (
    <div className="mx-auto mt-5 w-11/12 p-1 text-sp-black dark:text-sp-white md:w-full lg:mt-2">
      {featured && featured?.items.length ? (
        <div className="w-full columns-1 space-y-8 md:columns-2 md:space-y-12 lg:columns-3">
          {featured.items.map((s) => (
            <FeaturedSpiritusCard
              slug={s.itemId}
              title={s.title}
              subtitle={s.subtitle}
              description={s.placeholderText}
              imageUrl={s.imageUrl}
              key={`spiritus-elem-featured-${s.title}-${s.itemId}`}
            />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sp-lighter dark:text-sp-lighter">
          {t("more_stories_no_stories")}
        </p>
      )}
    </div>
  );
}

function FeaturedSpiritusCard({
  slug,
  title,
  subtitle,
  imageUrl,
  description,
}) {
  const { t } = useTranslation(["common", "settings"]);

  return (
    <>
      <div className="flex break-inside-avoid flex-col">
        <Link href={`/spiritus/${slug}`}>
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
    </>
  );
}

function SeeMoreButton({ sectionId, title }) {
  const { t } = useTranslation(["common"]);

  return (
    <div className="mx-5 mt-12 flex overflow-hidden rounded-2xl border-6 border-sp-fawn/30">
      <Link
        className="w-full rounded-xl border border-black bg-sp-day-50 px-4 py-2 text-center font-medium text-sp-black text-lg dark:border-sp-day-400 dark:bg-sp-black dark:text-sp-white xl:py-3"
        href={`/section/id/${sectionId}?title=${title}`}
      >
        {`${t("action_show_more_from")} ${title}`}
        <ArrowCircleRightIcon className="ml-3 inline-block h-6 w-6" />
      </Link>
    </div>
  );
}
