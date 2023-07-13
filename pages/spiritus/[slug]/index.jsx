import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FullWidthLayout from "@/components/layout/LayoutV2";
import {
  About,
  Links,
  ProfileHeader,
  Tabs,
  Tributes,
} from "@/components/spiritus/Sections";

import {
  GetSpiritusBySlug,
  GetSpiritusTributes,
} from "@/service/http/spiritus";

import { SetSpiritusOG } from "@/utils/metaTags";

export default function SpiritusPage({
  spiritus,
  tributes,
  isLastPage,
  isGuardian,
  saved,
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

  const tabs = [
    {
      name: "Spiritus",
      href: `/spiritus/${spiritus.slug}`,
      current: true,
    },
    {
      name: t("spiritus_stories"),
      href: `/spiritus/${spiritus.slug}/stories`,
      current: false,
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
        <title>{`Spiritus | ${spiritus.name} ${spiritus.surname}`}</title>
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

      <section className="mx-auto mb-96 h-full min-h-screen flex-col text-sp-white md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
        <Tabs tabs={spiritus.obituaryId ? tabs : tabs.slice(0, 3)} />

        <div className="mt-7 grid w-full gap-8 px-4 sm:space-y-0 md:grid-cols-3 md:px-0">
          <div className="col-span-1 md:col-span-2">
            <About
              age={age}
              birth={birthDate}
              death={deathDate}
              quote={spiritus.quote}
              description={spiritus.description}
              location={spiritus.location}
            />
            <Tributes
              spiritusId={spiritus.id}
              tributes={tributes}
              isLastPage={isLastPage}
            />
          </div>
          <div className="relative col-span-1">
            <Links
              shortLink={spiritus.shortLink}
              funeralOrg={spiritus.funeralOrg || null}
              spiritusId={spiritus.id}
              spiritusSlug={spiritus.slug}
              memoryGuardians={guardians}
              isGuardian={isGuardian}
              saved={saved}
            />
          </div>
        </div>
      </section>
    </FullWidthLayout>
  );
}

// Redirects to 404 in case of any errors.
export async function getServerSideProps(context) {
  const { slug } = context.query;
  const session = await getSession(context);
  let isGuardian = false;
  let saved = false;

  try {
    let res;
    if (session && session?.user?.accessToken) {
      res = await GetSpiritusBySlug(slug, session.user.accessToken);
      isGuardian = res?.data?.flags.includes("GUARDIAN");
      saved = res?.data?.flags.includes("SAVED");
    } else {
      res = await GetSpiritusBySlug(slug);
    }
    const spiritus = res.data;
    const resTributes = await GetSpiritusTributes(
      spiritus.id,
      session?.user?.accessToken
    );

    return {
      props: {
        key: `${context.locale}-spiritus-index-${slug}`,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
        ])),
        spiritus,
        tributes: resTributes.data?.content || [],
        isLastPage: resTributes.data?.last || true,
        isGuardian,
        saved,
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