import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import is from "sharp/lib/is";

import FullWidthLayout from "@/components/layout/LayoutV2";
import { ProfileHeader, Tabs } from "@/components/spiritus/Sections";
import { CreateStoryCTA, StoryList } from "@/components/spiritus/StoryList";

import { GetSpiritusBySlug } from "@/service/http/spiritus";
import { GetSpiritusStoriesBySlug } from "@/service/http/story";

import { SetSpiritusOG } from "@/utils/metaTags";

export default function SpiritusStoriesPage({
  spiritus,
  stories,
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
      name: t("spiritus_tab"),
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
      <ProfileHeader
        spiritus={spiritus}
        age={age}
        deathDate={deathDate}
        birthDate={birthDate}
        isGuardian={isGuardian}
      />
      <section className="mx-auto text-sp-white md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
        <Tabs tabs={spiritus.obituaryId ? tabs : tabs.slice(0, 3)} />
        <div className="mt-7">
          <CreateStoryCTA spiritusId={spiritus.id} isGuardian={isGuardian} />
        </div>

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

  let res;
  try {
    if (session && session?.user?.accessToken) {
      res = await GetSpiritusBySlug(
        slug,
        session.user.accessToken,
        context.locale
      );
      isGuardian = res?.data?.flags.includes("GUARDIAN");
    } else {
      res = await GetSpiritusBySlug(slug, null, context.locale);
    }
    const spiritus = res.data;

    const { data: resStories } = await GetSpiritusStoriesBySlug(
      slug,
      0,
      20,
      session?.user?.accessToken || null,
      context.locale
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
          "cookies",
        ])),
        spiritus,
        stories,
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
