import { useState } from "react";

import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { LoginModal } from "@/components/auth/Login";
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

import { dateDiffYears } from "@/utils/dateDiff";
import { SetSpiritusOG } from "@/utils/metaTags";

export default function SpiritusPage({
  spiritus,
  tributes,
  isLastPage,
  isGuardian,
  saved,
  claimable,
  upgradeable,
}) {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
    birthDate && deathDate ? dateDiffYears(deathDate, birthDate) : null;

  const tabs = [
    {
      name: t("spiritus_tab"),
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
      name: t("spiritus_links"),
      href: `/spiritus/${spiritus.slug}/links`,
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
      <LoginModal isOpen={isOpen} closeModal={closeModal} />

      <ProfileHeader
        spiritus={spiritus}
        age={age}
        deathDate={deathDate}
        birthDate={birthDate}
        isGuardian={isGuardian}
        claimable={claimable || false}
        setOpenModal={openModal}
      />

      <section className="mx-auto mb-96 h-full min-h-screen flex-col text-sp-white md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
        <Tabs tabs={tabs} />

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
              upgradeable={upgradeable || false}
              claimable={claimable || false}
              hideBacklink={true}
              setOpenModal={openModal}
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
  let claimable = false;
  let upgradeable = false;
  try {
    let res;
    if (session && session?.user?.accessToken) {
      res = await GetSpiritusBySlug(
        slug,
        session.user.accessToken,
        context.locale
      );
      isGuardian = res?.data?.flags.includes("GUARDIAN");
      saved = res?.data?.flags.includes("SAVED");
      claimable = res?.data?.flags.includes("CLAIMABLE");
      upgradeable = res?.data?.flags.includes("SUBSCRIPTION");
    } else {
      res = await GetSpiritusBySlug(slug, null, context.locale);
      claimable = res?.data?.flags.includes("CLAIMABLE");
    }
    const spiritus = res.data;

    let resTributes;
    try {
      resTributes = await GetSpiritusTributes(
        spiritus.id,
        0,
        12,
        context.locale
      );
    } catch (err) {
      console.log("Failed fetching tributes", err?.response?.data);
    }

    return {
      props: {
        key: `${context.locale}-spiritus-index-${slug}`,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
          "cookies",
        ])),
        spiritus,
        tributes: resTributes?.data?.content || [],
        isLastPage: resTributes?.data?.last || true,
        isGuardian,
        saved,
        claimable,
        upgradeable,
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
