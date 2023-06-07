import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FullWidthLayout from "@/components/layout/LayoutV2";
import { ProfileHeader, Tabs } from "@/components/spiritus/Sections";
import { StoryList } from "@/components/spiritus/StoryList";

import {
  GetSpiritusBySlug,
  GetSpiritusCoverImages,
} from "@/service/http/spiritus";
import { GetSpiritusStoriesBySlug } from "@/service/http/story";

import { SetSpiritusOG } from "@/utils/metaTags";

export default function SpiritusStoriesPage({
  spiritus,
  stories,
  coverImages,
  isLastPage,
  isGuardian,
}) {
  const { t } = useTranslation("common");

  const birthDate = spiritus.birth ? new Date(spiritus.birth) : null;
  const deathDate = spiritus.death ? new Date(spiritus.death) : null;
  // number of years
  const age =
    birthDate && deathDate
      ? Math.round(
          Math.abs(deathDate - birthDate) / (1000 * 60 * 60 * 24 * 365)
        )
      : null;

  const tabs = [
    {
      name: t("spiritus_about"),
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
        <title>{`Spiritus ${t("spiritus_stories")} | ${spiritus.name} ${
          spiritus.surname
        }`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={
            spiritus.description ||
            `${t("meta_spiritus_description")} ${spiritus.name} ${
              spiritus.surname
            }.`
          }
        />
        {SetSpiritusOG(spiritus)}
      </Head>
      <header className="h-[50vh] w-full sm:h-96">
        <ProfileHeader
          spiritus={spiritus}
          coverImages={coverImages}
          age={age}
          deathDate={deathDate}
          birthDate={birthDate}
          isGuardian={isGuardian}
        />
      </header>
      {/* <section className="min-h-screen mx-auto flex flex-col md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5 h-full items-center text-sp-white"> */}
      <section className="mx-auto text-sp-white md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
        <Tabs tabs={spiritus.obituaryId ? tabs : tabs.slice(0, 3)} />
        <StoryList
          stories={stories}
          spiritus={spiritus}
          isGuardian={false}
          isLastPage={isLastPage}
        />
      </section>
    </FullWidthLayout>
  );
}

// Redirects to 404 in case of any errors.
export async function getServerSideProps(context) {
  const { slug } = context.query;
  const session = await getSession(context);

  let isGuardian = false;

  try {
    let res;
    if (session && session?.user?.accessToken) {
      res = await GetSpiritusBySlug(slug, session.user.accessToken);
      isGuardian = res?.data?.flags.includes("GUARDIAN");
    } else {
      res = await GetSpiritusBySlug(slug);
    }
    const spiritus = res.data;

    const resCover = await GetSpiritusCoverImages();
    const coverImages = resCover.data;

    const { data: resStories } = await GetSpiritusStoriesBySlug(
      slug,
      0,
      20,
      session?.user?.accessToken || null
    );
    const stories = isGuardian
      ? resStories.content.sort((c) => (c.flags.includes("PUBLIC") ? -1 : 1))
      : resStories.content.filter((s) => s.flags.includes("PUBLIC"));

    return {
      props: {
        key: `${context.locale}-spiritus-stories-${slug}`,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
        ])),
        spiritus,
        stories,
        coverImages,
        isLastPage: resStories.last,
        isGuardian,
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
