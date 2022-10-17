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
import BecomeGuardianCTA from "../../components/about/BecomeGuardianComponent";

import { GetSpiritusById } from "../../service/http/spiritus";
import {
  GetSpiritusStoriesBySlug,
  GetStoryBySlug,
} from "../../service/http/story";

function EditBtn({ storyId }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex justify-end mt-8">
      <a
        href={`/edit/story/${storyId}`}
        className="inline-flex items-center rounded-sp-40 border-2 border-sp-medium py-2 px-6 text-sp-white dark:text-sp-black"
      >
        <PencilIcon className="w-5 h-5 text-sp-lighter" />
        <span className="text-sp-lighter ml-2">{t("edit_button_text")}</span>
      </a>
    </div>
  );
}

function SetStoryOG(spiritus, story) {
  let tags = [
    <meta property="og:type" content="website" key={`story-${story.id}-ws`} />,
    <meta
      property="og:site_name"
      content="Spiritus"
      key={`story-${story.id}-site-name`}
    />,
    <meta
      property="og:title"
      content={
        `${spiritus.name} ${spiritus.surname} — ${story.title}` ||
        "Spiritus Stories"
      }
      key={`story-${story.id}-title`}
    />,
    <meta
      property="og:url"
      content={`https://spiritus.app/en/stories/${story.slug}`}
      key={`story-${story.id}-url`}
    />,
    <meta
      property="og:description"
      content={
        story.description.length
          ? story.description
          : "Spiritus is the first digital assets platform that keeps your memories - forever! Read the latest beautiful stories, memorials and anniversaries."
      }
      key={`story-${story.id}-desc`}
    />,
  ];
  if (story.images.length) {
    const useImage = story.images[0];
    tags = tags.concat([
      <meta
        property="og:image"
        itemProp="image"
        content={useImage.url}
        key={`story-${story.id}-image`}
      />,
      <meta
        property="og:image:url"
        itemProp="image"
        content={useImage.url}
        key={`story-${story.id}-image-url`}
      />,
      // <meta
      //   property="og:image:secure_url"
      //   itemProp="image"
      //   content={useImage.url}
      //   key="image"
      // />,
      <meta property="og:image:width" content={useImage.width} key="image-w" />,
      <meta
        property="og:image:height"
        content={useImage.height}
        key={`story-${story.id}-image-h`}
      />,
    ]);
  } else {
    tags = tags.concat([
      <meta
        property="og:image"
        itemProp="image"
        content="https://spiritus.app/images/share/banner.jpg"
        key={`story-${story.id}-image`}
      />,
      <meta
        property="og:image:url"
        itemProp="image"
        content="https://spiritus.app/images/share/banner.jpg"
        key={`story-${story.id}-image-url`}
      />,
      // <meta
      //   property="og:image:secure_url"
      //   itemProp="image"
      //   content="https://spiritus.app/images/share/banner.jpg"
      //   key="image"
      // />,
      <meta
        property="og:image:width"
        content="1200"
        key={`story-${story.id}-image-w`}
      />,
      <meta
        property="og:image:height"
        content="630"
        key={`story-${story.id}-image-h`}
      />,
    ]);
  }
  return tags;
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
            <h2 className="mb-10 text-2xl md:text-cta px-4 font-bold text-center">
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
            <div className="w-full md:w-3/4 lg:w-4/5 mt-10 mb-3">
              {displayStory.paragraphs.map((p, i) => {
                // if andrija cordas, center all text because this is a poem/song
                if (displayStory.slug === "story-of-andrija-cordas-f7067426") {
                  return (
                    <p
                      className="tracking-sp-tighten subpixel-antialiased pt-5 text-base whitespace-pre-line break-words lg:text-lg text-center"
                      key={`para-${i}`}
                    >
                      {p.text}
                    </p>
                  );
                }

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
          <div className="w-full text-sp-white mt-4">
            <MoreStories
              stories={stories}
              spiritus={spiritus}
              userIsOwner={sessionUserIsOwner()}
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

// TODO: remove when there's isGuardian flag is added to spiritus
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
  // there some funny logic to figure out if user is spiritus owner
  let userCode = "";
  const session = await getSession(context);

  try {
    let resStory;
    if (session && session?.user?.accessToken) {
      userCode = session.user.code;
      resStory = await GetStoryBySlug(slug, session.user.accessToken);
    } else {
      resStory = await GetStoryBySlug(slug);
    }
    const resSpiritus = await GetSpiritusById(resStory.data.spiritus.id);
    const resAllStories = await GetSpiritusStoriesBySlug(resSpiritus.data.slug);

    const isOwner = resSpiritus?.data?.users
      .map((u) => u.code)
      .includes(userCode);

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
        stories: filterStories(content, isOwner),
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
