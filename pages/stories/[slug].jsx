import Image from "next/legacy/image";
import Head from "next/head";

import { useState } from "react";
import { useSession, getSession } from "next-auth/react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PencilIcon } from "@heroicons/react/outline";

import Layout from "../../components/layout/Layout";
import { HorizontalDivider } from "../../components/layout/Common";
import {
  CTAAddMemory,
  MoreStories,
  PageActions,
  Tags,
  Tribute,
} from "../../components/stories/StoryPage";
import { SpiritusOverview } from "../../components/spiritus/Overview";
import { SpiritusCarousel } from "../../components/spiritus/Carousel";
import BecomeGuardianCTA from "../../components/about/BecomeGuardianComponent";

import { GetSpiritusById } from "../../service/http/spiritus";
import {
  GetSpiritusStoriesBySlug,
  GetStoryBySlug,
} from "../../service/http/story";

import { SetStoryOG } from "../../utils/metaTags";

function EditBtn({ storyId }) {
  const { t } = useTranslation("common");

  return (
    <div className="mt-8 flex justify-end">
      <a
        href={`/edit/story/${storyId}`}
        className="inline-flex items-center rounded-sp-40 border-2 border-sp-medium px-6 py-2 text-sp-white dark:text-sp-black"
      >
        <PencilIcon className="h-5 w-5 text-sp-lighter" />
        <span className="ml-2 text-sp-lighter">{t("edit_button_text")}</span>
      </a>
    </div>
  );
}

export default function StoryPage({
  displayStory,
  stories,
  spiritus,
  isLastPage,
}) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  const [isGuardian, setIsGuardian] = useState(
    spiritus.flags.includes("GUARDIAN")
  );

  const getNextStorySlug = () => {
    for (const s of stories) {
      if (s.id < displayStory.id) {
        return s.slug;
      }
    }
    return "";
  };

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
        {SetStoryOG(spiritus, displayStory)}
      </Head>
      {status === "authenticated" && isGuardian ? (
        <EditBtn storyId={displayStory.id} />
      ) : (
        ""
      )}
      <section
        className="mx-auto mt-8 flex flex-col items-center justify-center"
        key="story"
      >
        <div className="flex w-full flex-col items-center text-left subpixel-antialiased">
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
                // if andrija cordas, center all text because this is a poem/song
                if (displayStory.slug === "story-of-andrija-cordas-f7067426") {
                  return (
                    <p
                      className="whitespace-pre-line break-words pt-5 text-center subpixel-antialiased text-base tracking-sp-tighten lg:text-lg"
                      key={`para-${i}`}
                    >
                      {p.text}
                    </p>
                  );
                }

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
        <div className="mx-auto mb-4 mt-14 w-full text-sp-white md:w-3/4 lg:w-4/5 lg:text-lg">
          {!isGuardian && <Tribute id={spiritus.id} />}
          <PageActions
            shareLink={displayStory.shortLink}
            id={displayStory.id}
            type={"STORY"}
            isGuardian={isGuardian}
            nextStorySlug={getNextStorySlug()}
            saved={displayStory.flags.includes("SAVED")}
          />
          <HorizontalDivider />
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center text-sp-white lg:w-4/5 xl:w-5/6">
          <SpiritusOverview {...spiritus} />
          <SpiritusCarousel images={spiritus.images} />
          <div className="mt-4 w-full text-sp-white">
            <MoreStories
              stories={stories}
              spiritus={spiritus}
              isGuardian={isGuardian}
              isLastPage={isLastPage}
            />
            <div className="flex-1 items-center justify-center">
              <CTAAddMemory
                sessionStatus={status}
                spiritusId={spiritus.id}
                name={spiritus.name}
              />
            </div>
          </div>
        </div>
      </section>
      <BecomeGuardianCTA />
    </Layout>
  );
}

function filterStories(items, isOwner) {
  if (isOwner) {
    return items;
  }

  return items.filter((s) => s.flags.includes("PUBLIC"));
}

// fetch first 5 spiritus stories, remove the story alredy being shown
// if user is logged in, fetch story using accessToken so flags are fetched
export async function getServerSideProps(context) {
  const { slug } = context.query;
  const session = await getSession(context);
  let isGuardian = false;

  try {
    let resStory;
    let resSpiritus;
    if (session && session?.user?.accessToken) {
      resStory = await GetStoryBySlug(slug, session.user.accessToken);
      resSpiritus = await GetSpiritusById(
        resStory.data.spiritus.id,
        session.user.accessToken
      );
      isGuardian = resSpiritus?.data?.flags.includes("GUARDIAN");
    } else {
      resStory = await GetStoryBySlug(slug);
      resSpiritus = await GetSpiritusById(resStory.data.spiritus.id);
    }
    const resAllStories = await GetSpiritusStoriesBySlug(resSpiritus.data.slug);

    let content = resAllStories.data?.content
      ? resAllStories.data?.content
      : [];
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
      return x.slug != slug;
    });

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
          "about",
        ])),
        key: `${context.locale}-${slug}`,
        displayStory: resStory.data,
        stories: filterStories(content, isGuardian),
        spiritus: resSpiritus.data,
        isLastPage: resAllStories.data.last,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
