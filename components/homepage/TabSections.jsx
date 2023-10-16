import Link from "next/link";

import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SpiritusCard, StoryCard } from "../spiritus/Card";

export function TabSections({ featured, anniversaries, recent }) {
  const { t } = useTranslation("homepage");

  return (
    <Tabs defaultValue="featured">
      <TabsList className="w-full pb-4 lg:pb-8">
        <nav className="flex w-full justify-start space-x-3 rounded-none border-b border-sp-day-400 lg:space-x-4">
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
    <div className="rounded-sp-10 from-day-gradient-start to-day-gradient-stop p-2 font-medium text-black hover:bg-gradient-to-r group-data-[state=active]:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-white dark:hover:from-sp-dark-brown dark:hover:to-sp-brown md:w-full">
      <h2 className="flex w-full items-center justify-center whitespace-break-spaces text-center">
        {text}
      </h2>
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
            <StoryCard
              spiritusSlug={s.parentId}
              slug={s.itemId}
              title={s.title}
              subtitle={s.placeholderText}
              image={s.imageObject}
              tags={[]}
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

function FeaturedSpiritus({ featured }) {
  const { t } = useTranslation("common");
  return (
    <div className="mx-auto mt-5 w-11/12 p-1 text-sp-black dark:text-sp-white md:w-full lg:mt-2">
      {featured && featured?.items.length ? (
        <div className="w-full columns-1 space-y-8 md:columns-2 md:space-y-12 lg:columns-3">
          {featured.items.map((s) => (
            <SpiritusCard
              slug={s.itemId}
              title={s.title}
              subtitle={s.subtitle}
              description={s.placeholderText}
              image={s.imageObject}
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

function SeeMoreButton({ sectionId, title }) {
  const { t } = useTranslation(["common"]);

  return (
    <div className="mx-5 mt-12 flex overflow-hidden rounded-2xl border-6 border-sp-fawn/30 md:mx-0">
      <Link
        className="flex w-full items-center justify-center rounded-xl border border-black bg-sp-day-50 px-4 py-2 text-center font-medium text-sp-black text-lg dark:border-sp-day-400 dark:bg-sp-black dark:text-sp-white xl:py-3"
        href={`/section/id/${sectionId}?title=${title}`}
      >
        {t("explore_more_memories")}
        <ArrowCircleRightIcon className="ml-3 inline-block h-6 w-6" />
      </Link>
    </div>
  );
}
