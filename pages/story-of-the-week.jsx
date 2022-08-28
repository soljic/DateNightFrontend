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
      <section className="container mx-auto px-5" key="story">
        <div className="flex flex-col items-center py-8">
          <div className="flex flex-col w-full mb-12 text-left">
            <div className="w-full sm:w-full lg:w-3/5 mx-auto text-sp-black dark:text-sp-white">
              <h1 className="mx-auto mb-6 font-semibold text-center uppercase">
                {displayStory.title}
              </h1>
              <h2 className="mx-auto mb-6 text-2xl px-4 font-semibold text-center lg:text-3xl">
                {displayStory.subtitle}
              </h2>
              <h2 className="mx-auto mb-6 text-2xl px-4 font-semibold text-center lg:text-3xl">
                {displayStory.description}
              </h2>
              {displayStory.images.length && (
                <div className="object-fill mx-auto rounded-lg overflow-hidden px-4">
                  <Image
                    src={displayStory.images[0].url}
                    alt={`Paragraph image ${displayStory.images[0].id}`}
                    width={400}
                    height={400}
                    layout="responsive"
                  />
                </div>
              )}
              {displayStory.paragraphs &&
                displayStory.paragraphs.map((p, i) => {
                  // check if text is empty -> don't render if it is
                  return (
                    <p
                      className="mx-auto leading-relaxed pt-4 px-2 pb-6 whitespace-pre-line text-justify"
                      key={`para-${i}`}
                    >
                      {p.text}
                    </p>
                  );
                })}
            </div>
            <div className="w-full mx-auto lg:w-3/5 text-sp-white">
              {displayStory.tags?.length ? (
                <Tags tags={displayStory.tags} />
              ) : (
                <></>
              )}

              <Tribute />
              <HorizontalDivider />
              <SpiritusOverview {...spiritus} />
            </div>
            <div className="w-full mx-autotext-sp-white mt-4">
              <SpiritusCarousel images={spiritus.images} />
            </div>
            <div className="w-full mx-auto lg:w-1/2 text-sp-white mt-4">
              <MoreStories stories={stories} spiritus={spiritus} />
              <div className="flex-1 items-center justify-center px-4">
                <CTAAddMemory name={spiritus.name} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// fetch first 5 spiritus stories, remove the story alredy being shown
export async function getServerSideProps(context) {
  const { id } = context.query;
  const resStory = await GetStoryById(id);
  const resSpiritus = await GetSpiritusById(resStory.data.spiritus.id);
  const resAllStories = await GetSpiritusStoriesBySlug(
    resSpiritus.data.slug,
    0,
    5
  );

  let content = resAllStories.data?.content ? resAllStories.data?.content : [];
  // sort story paragraphs by index
  if (resStory.paragraphs) {
    resStory.paragraphs.sort((p1, p2) => {
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
    return x.id != id;
  });

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
      displayStory: resStory.data,
      stories: content,
      spiritus: resSpiritus.data,
      hasMore: !resAllStories.data.last,
      total: resAllStories.data.numberOfElements,
    },
  };
}