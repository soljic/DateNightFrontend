import Head from "next/head";

import { getSession, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import BecomeGuardianCTA from "@/components/about/BecomeGuardianComponent";
import { HorizontalDivider } from "@/components/layout/Common";
import FullWidthLayout from "@/components/layout/LayoutV2";
import {
  Links,
  ProfileHeader,
  Tabs,
  Tributes,
} from "@/components/spiritus/Sections";
import { SpiritusStory } from "@/components/spiritus/Story";
import { StoryList } from "@/components/spiritus/StoryList";

import { GetObituaryBySpiritusId } from "@/service/http/obituary";
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
  obituary,
  tributes,
  coverImages,
  spiritus,
  isLastPage,
  isGuardian,
}) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

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

  const tabs = [
    {
      name: "Spiritus",
      href: `/spiritus/${spiritus.slug}`,
      current: false,
    },
    {
      name: t("spiritus_stories"),
      href: `/spiritus/${spiritus.slug}/stories`,
      current: true,
    },
    {
      name: t("spiritus_gallery"),
      href: `/spiritus/${spiritus.slug}/gallery`,
      current: false,
    },
    {
      name: t("funeral_notice"),
      href: `/spiritus/${spiritus.slug}/funeral-notice`,
      current: false,
    },
  ];

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
        <Tabs tabs={spiritus.obituaryId ? tabs : tabs.slice(0, 3)} />

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
              obituary={obituary}
              spiritusId={spiritus.id}
              memoryGuardians={guardians}
            />
          </div>
        </div>

        <div className="mb-10 mt-16">
          <HorizontalDivider />
        </div>
        <h2 className="text-[22px] font-bold text-black tracking-sp-tighten lg:text-[24px]">
          Read other stories
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
  const { storyslug } = context.query;
  const session = await getSession(context);
  let isGuardian = false;

  let spiritus;
  try {
    let resStory;
    let resSpiritus;
    if (session && session?.user?.accessToken) {
      resStory = await GetStoryBySlug(storyslug, session.user.accessToken);
      resSpiritus = await GetSpiritusById(
        resStory.data.spiritus.id,
        session.user.accessToken
      );
      isGuardian = resSpiritus?.data?.flags.includes("GUARDIAN");
      spiritus = resSpiritus.data;
    } else {
      resStory = await GetStoryBySlug(storyslug);
      resSpiritus = await GetSpiritusById(resStory.data.spiritus.id);
      spiritus = resSpiritus.data;
    }

    const resCover = await GetSpiritusCoverImages();
    const coverImages = resCover.data;

    const resTributes = await GetSpiritusTributes(
      resStory.data.spiritus.id,
      session?.user?.accessToken
    );

    // this req can fail
    let obituary = null;
    if (spiritus.obituaryId) {
      try {
        const resObituary = await GetObituaryBySpiritusId(spiritus.id);
        obituary = resObituary.data;
      } catch (error) {
        // do nothing
      }
    }

    const resAllStories = await GetSpiritusStoriesBySlug(
      resSpiritus.data.slug,
      0,
      20,
      session?.user?.accessToken || null
    );

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
      return x.slug != storyslug;
    });

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
          "about",
        ])),
        key: `${context.locale}-${storyslug}`,
        displayStory: resStory.data,
        stories: filterStories(content, isGuardian),
        coverImages,
        tributes: resTributes.data?.content || [],
        spiritus,
        isLastPage: resAllStories.data.last,
        obituary,
        isGuardian,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
