import Image from "next/legacy/image";
import Head from "next/head";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../components/layout/Layout";
import { HorizontalDivider } from "../components/layout/Common";
import {
  CTAAddMemory,
  MoreStories,
  Tags,
  Tribute,
} from "../components/stories/StoryPage";
import { SpiritusOverview } from "../components/spiritus/Overview";
import { SpiritusCarousel } from "../components/spiritus/Carousel";
import BecomeGuardianCTA from "../components/about/BecomeGuardianComponent";

import { GetSpiritusById, GetSpiritusGalleryImages } from "../service/http/spiritus";
import { GetSpiritusStoriesBySlug, GetStoryById } from "../service/http/story";
import { GetParsedHomepage } from "../service/http/homepage";

export default function FeaturedStory({
  displayStory,
  stories,
  spiritus,
  images,
  isLastPage,
}) {
  const { t } = useTranslation("common");

  const calculateImageLayout = (width, height) => {
    if (width > height) {
      return "w-full md:w-2/3";
    } else {
      return "w-full md:w-1/2";
    }
  };

  return (
    <Layout>
      <Head>
        <title>{`Spiritus | ${spiritus.name} ${spiritus.surname} - ${displayStory.title}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={
            spiritus.description ||
            `${t("meta_story_description")} ${spiritus.name} ${
              spiritus.surname
            }.`
          }
        />
      </Head>
      <section
        className="mt-16 flex flex-col items-center justify-center subpixel-antialiased"
        key={"featured-story"}
      >
        <div className="flex w-full flex-col items-center text-left">
          <div className="flex w-3/4 flex-col justify-center text-sp-black dark:text-sp-white">
            <h1 className="mb-5 text-center uppercase">{displayStory.title}</h1>
            {!!displayStory.subtitle && (
              <h2 className="mb-6 px-4 text-center font-bold text-cta">
                {displayStory.subtitle}
              </h2>
            )}
            <h2 className="mb-10 px-4 text-center font-bold text-2xl md:text-cta">
              {displayStory.description}
            </h2>
          </div>

          {!!displayStory.images.length ? (
            <div
              className={`${calculateImageLayout(
                displayStory.images[0].width,
                displayStory.images[0].height
              )} max-h-screen rounded-sp-14`}
            >
              <Image
                src={displayStory.images[0].url}
                alt={`Paragraph image ${displayStory.images[0].id}`}
                width={displayStory.images[0].width}
                height={displayStory.images[0].height}
                layout="responsive"
                className="rounded-sp-14"
              />
            </div>
          ) : (
            <></>
          )}

          {displayStory.paragraphs.length ? (
            <div className="mb-3 mt-10 w-full md:w-3/4 lg:w-4/5">
              {displayStory.paragraphs.map((p, i) => {
                return (
                  <p
                    className="whitespace-pre-line break-words pt-5 subpixel-antialiased text-base tracking-sp-tighten lg:text-lg"
                    key={`para-${i}`}
                  >
                    {p.text}
                  </p>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="mx-auto w-full text-sp-white md:w-3/4 lg:w-4/5 lg:text-lg">
          {displayStory.tags?.length ? (
            <Tags tags={displayStory.tags} />
          ) : (
            <></>
          )}
        </div>
        <div className="mx-auto mt-8 w-full text-sp-white md:w-3/4 lg:w-4/5 lg:text-lg">
          <Tribute id={spiritus.id} />
          <HorizontalDivider />
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center text-sp-white lg:w-4/5 xl:w-5/6">
          <SpiritusOverview {...spiritus} />
          <SpiritusCarousel images={images} />
          <div className="mt-4 w-full text-sp-white">
            <MoreStories
              stories={stories}
              spiritus={spiritus}
              isLastPage={isLastPage}
            />
            <div className="flex-1 items-center justify-center">
              <CTAAddMemory spiritusId={spiritus.id} name={spiritus.name} />
            </div>
          </div>
        </div>
      </section>
      <BecomeGuardianCTA />
    </Layout>
  );
}

export async function getStaticProps(context) {
  // fetch homepage to get featured story
  const { featuredStory } = await GetParsedHomepage();
  const { data: story } = await GetStoryById(featuredStory.itemId);
  const { data: spiritus } = await GetSpiritusById(story.spiritus.id);
  const { data: allStories } = await GetSpiritusStoriesBySlug(spiritus.slug);
  const { data: gallery} = await GetSpiritusGalleryImages(spiritus.id)

  let content = allStories?.content ? allStories?.content : [];

  // sort story paragraphs by index
  if (story.paragraphs) {
    story.paragraphs.sort((p1, p2) => {
      if (p1.index < p2.index) {
        return -1;
      }
      if (p1.index > p2.index) {
        return 1;
      }
      // if equal
      return 0;
    });
  }

  // remove story already being displayed
  content = content.filter((x) => {
    return x.id != story.id;
  });

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
        "about",
      ])),
      displayStory: story,
      stories: content.filter((s) => s.flags.includes("PUBLIC")),
      spiritus: spiritus,
      isLastPage: allStories.last,
      images: gallery?.content || [],
      total: allStories.numberOfElements,
    },
    // in seconds
    revalidate: 60 * 10, // 10min
  };
}
