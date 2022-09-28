import Image from "next/image";
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

import { GetSpiritusById } from "../service/http/spiritus";
import { GetSpiritusStoriesBySlug, GetStoryById } from "../service/http/story";
import { GetParsedHomepage } from "../service/http/homepage";

export default function StoryOfTheWeek({ displayStory, stories, spiritus }) {
  const { t } = useTranslation("common");

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
        className="flex flex-col justify-center items-center mt-16 subpixel-antialiased"
        key={"story-of-the-week"}
      >
        <div className="w-full flex flex-col items-center text-left">
          <div className="w-3/4 flex flex-col justify-center text-sp-black dark:text-sp-white">
            <h1 className="mb-5 text-center uppercase">{displayStory.title}</h1>
            {!!displayStory.subtitle && (
              <h2 className="mb-6 text-cta px-4 font-bold text-center">
                {displayStory.subtitle}
              </h2>
            )}
            <h2 className="mb-10 text-cta px-4 font-bold text-center sm:text-xl md:text-cta">
              {displayStory.description}
            </h2>
          </div>

          <div className="w-full rounded-sp-14">
            {!!displayStory.images.length ? (
              <Image
                src={displayStory.images[0].url}
                alt={`Paragraph image ${displayStory.images[0].id}`}
                width={displayStory.images[0].width}
                height={displayStory.images[0].height}
                layout="responsive"
                className="rounded-sp-14"
              />
            ) : (
              <></>
            )}
          </div>

          {displayStory.paragraphs.length ? (
            <div className="w-full md:w-3/4 lg:w-4/5 mt-10 mb-3">
              {displayStory.paragraphs.map((p, i) => {
                return (
                  <p
                    className="tracking-sp-tighten subpixel-antialiased pt-5 text-base whitespace-pre-line break-words lg:text-lg"
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
        <div className="w-full md:w-3/4 lg:w-4/5 mx-auto text-sp-white lg:text-lg">
          {displayStory.tags?.length ? (
            <Tags tags={displayStory.tags} />
          ) : (
            <></>
          )}
        </div>
        <div className="w-full md:w-3/4 lg:w-4/5 mx-auto text-sp-white mt-8 lg:text-lg">
          <Tribute />
          <HorizontalDivider />
        </div>
        <div className="w-full lg:w-4/5 xl:w-5/6 flex flex-col justify-center items-center text-sp-white mt-4">
          <SpiritusOverview {...spiritus} />
          <SpiritusCarousel images={spiritus.images} />
          <div className="text-sp-white mt-4">
            <MoreStories stories={stories} spiritus={spiritus} />
            <div className="flex-1 items-center justify-center">
              <CTAAddMemory spiritusId={spiritus.id} name={spiritus.name} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(context) {
  // fetch homepage to get story of the week ID
  const {storyOfTheWeek} = await GetParsedHomepage();
  const {data: story} = await GetStoryById(storyOfTheWeek.itemId);
  const {data: spiritus} = await GetSpiritusById(story.spiritus.id);
  const {data: allStories} = await GetSpiritusStoriesBySlug(
    spiritus.slug,
    0,
    20
  );

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
      ...(await serverSideTranslations(context.locale, ["common"])),
      displayStory: story,
      stories: content,
      spiritus: spiritus,
      hasMore: !allStories.last,
      total: allStories.numberOfElements,
    },
    // in seconds
    revalidate: 60 * 60 * 6, // 6hrs
  };
}
