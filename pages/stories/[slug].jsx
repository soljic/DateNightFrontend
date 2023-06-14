import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import BecomeGuardianCTA from "@/components/about/BecomeGuardianComponent";
import { HorizontalDivider } from "@/components/layout/Common";
import FullWidthLayout from "@/components/layout/LayoutV2";
import { Links, ProfileHeader, Tributes } from "@/components/spiritus/Sections";
import { SpiritusStory } from "@/components/spiritus/Story";
import { StoryList } from "@/components/spiritus/StoryList";

import {
  GetSpiritusById,
  GetSpiritusCoverImages,
  GetSpiritusTributes,
} from "@/service/http/spiritus";
import { GetSpiritusStoriesBySlug, GetStoryBySlug } from "@/service/http/story";

import { SetStoryOG } from "@/utils/metaTags";

export default function StoryPage({
  displayStory,
  stories,
  spiritus,
  tributes,
  coverImages,
  isGuardian,
  isLastPage,
}) {
  const { t } = useTranslation("common");
  const birthDate = spiritus.birth ? new Date(spiritus.birth) : null;
  const deathDate = spiritus.death ? new Date(spiritus.death) : null;
  const guardians =
    spiritus.users && spiritus.users.length > 0
      ? spiritus.users
          .map((user) => {
            return `${user.name} ${user.surname}`;
          })
          .join(", ")
      : "";
  // number of years
  const age =
    birthDate && deathDate
      ? Math.round(
          Math.abs(deathDate - birthDate) / (1000 * 60 * 60 * 24 * 365)
        )
      : null;

  return (
    <FullWidthLayout>
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
      <ProfileHeader
        spiritus={spiritus}
        coverImages={coverImages}
        age={age}
        deathDate={deathDate}
        birthDate={birthDate}
        isGuardian={isGuardian}
      />
      <section className="mx-auto mb-96 h-full min-h-screen flex-col text-sp-white md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
        <div className="mt-7 grid w-full gap-8 px-4 sm:space-y-0 md:grid-cols-3 md:px-0">
          <div className="col-span-1 md:col-span-2">
            <SpiritusStory story={displayStory} />
            <Tributes
              spiritusId={spiritus.id}
              tributes={tributes}
              isLastPage={isLastPage}
            />
          </div>
          <div className="relative col-span-1">
            <Links
              shortLink={spiritus.shortLink}
              obituary={null}
              spiritusId={spiritus.id}
              memoryGuardians={guardians}
            />
          </div>
        </div>

        <div className="mb-16 mt-20">
          <HorizontalDivider />
        </div>
        <h2 className="text-[22px] font-bold text-black tracking-sp-tighten dark:text-sp-white lg:text-[24px]">
          {t("story_more_stories")}
        </h2>
        <StoryList
          stories={stories}
          spiritus={spiritus}
          isGuardian={false}
          isLastPage={isLastPage}
        />
        <BecomeGuardianCTA />
      </section>
    </FullWidthLayout>
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

    const resTributes = await GetSpiritusTributes(
      resStory.data.spiritus.id,
      session?.user?.accessToken
    );

    const resCover = await GetSpiritusCoverImages();
    const coverImages = resCover.data;

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
        tributes: resTributes.data?.content || [],
        isGuardian,
        coverImages,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
