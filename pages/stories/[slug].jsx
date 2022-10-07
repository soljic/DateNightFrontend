import Image from "next/image";
import Head from "next/head";

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

import { GetSpiritusById } from "../../service/http/spiritus";
import {
  GetSpiritusStoriesBySlug,
  GetStoryBySlug,
} from "../../service/http/story";

function EditBtn({ storyId }) {
  return (
    <div className="flex justify-end mt-8">
      <a
        href={`/edit/story/${storyId}`}
        className="inline-flex items-center rounded-sp-40 border-2 border-sp-medium py-2 px-6 text-sp-white dark:text-sp-black"
      >
        <PencilIcon className="w-5 h-5 text-sp-lighter" />
        <span className="text-sp-lighter ml-2">Edit</span>
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

  const sessionUserIsOwner = () => {
    if (!spiritus || !spiritus?.users || !spiritus?.users.length) {
      return false;
    }
    for (const su of spiritus.users) {
      if (su.email == session?.user.email && su.code == session?.user.code) {
        return true;
      }
    }
    return false;
  };

  const getNextStorySlug = () => {
    for (const s of stories) {
      if (s.id < displayStory.id) {
        return s.slug;
      }
    }
    return "";
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
      {status === "authenticated" && sessionUserIsOwner() ? (
        <EditBtn storyId={displayStory.id} />
      ) : (
        ""
      )}
      <section
        className="mx-auto flex flex-col justify-center items-center mt-8"
        key="story"
      >
        <div className="w-full flex flex-col items-center text-left subpixel-antialiased">
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
            {displayStory.images.length ? (
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
        <div className="w-full md:w-3/4 lg:w-4/5 mx-auto text-sp-white mt-14 mb-4 lg:text-lg">
          {!sessionUserIsOwner() && <Tribute id={spiritus.id} />}
          <PageActions
            shareLink={displayStory.shortLink}
            id={displayStory.id}
            type={"STORY"}
            userIsOwner={sessionUserIsOwner()}
            nextStorySlug={getNextStorySlug()}
            saved={displayStory.flags.includes("SAVED")}
          />
          <HorizontalDivider />
        </div>
        <div className="w-full lg:w-4/5 xl:w-5/6 flex flex-col justify-center items-center text-sp-white mt-4">
          <SpiritusOverview {...spiritus} />
          <SpiritusCarousel images={spiritus.images} />
          <div className="text-sp-white mt-4">
            <MoreStories
              stories={stories}
              spiritus={spiritus}
              userIsOwner={sessionUserIsOwner()}
              isLastPage={isLastPage}
            />
            <div className="flex-1 items-center justify-center">
              <CTAAddMemory spiritusId={spiritus.id} name={spiritus.name} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// fetch first 5 spiritus stories, remove the story alredy being shown
// if user is logged in, fetch story using accessToken so flags are fetched
export async function getServerSideProps(context) {
  const { slug } = context.query;
  const session = await getSession(context);

  try {
    let resStory;
    if (session && session?.user?.accessToken) {
      resStory = await GetStoryBySlug(slug, session.user.accessToken);
    } else {
      resStory = await GetStoryBySlug(slug);
    }
    const resSpiritus = await GetSpiritusById(resStory.data.spiritus.id);
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
        ])),
        key: `${context.locale}-${slug}`,
        displayStory: resStory.data,
        stories: content,
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
