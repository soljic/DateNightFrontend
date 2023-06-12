import Head from "next/head";
import Image from "next/image";

import { ClassicObituary_1 } from "components/obituary/viewTemplates/Classic1";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FullWidthLayout from "@/components/layout/LayoutV2";
import { ProfileHeader, Tabs } from "@/components/spiritus/Sections";

import { GetObituaryBySpiritusId } from "@/service/http/obituary";
import {
  GetSpiritusBySlug,
  GetSpiritusCoverImages,
} from "@/service/http/spiritus";

import { SetSpiritusOG } from "@/utils/metaTags";

export default function FuneralNoticePage({
  spiritus,
  coverImages,
  obituary,
  organization,
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
      name: "Spiritus",
      href: `/spiritus/${spiritus.slug}`,
      current: false,
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
      current: true,
    },
  ];

  return (
    <FullWidthLayout>
      <Head>
        <title>{`Spiritus - ${t("funeral_notice")}| ${spiritus.name} ${
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
        coverImages={coverImages}
        age={age}
        deathDate={deathDate}
        birthDate={birthDate}
        isGuardian={isGuardian}
      />

      <section className="mx-auto mb-96 h-full min-h-screen flex-col text-sp-white md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
        <Tabs tabs={tabs} />

        <div className="mx-auto mt-7 flex w-full flex-col items-center justify-center space-y-4 overflow-x-auto px-4 sm:space-y-8 md:px-0">
          {/* classic obituary view */}
          <ClassicObituary_1
            image={obituary.obituaryImage}
            religImage={obituary.religiousImage}
            texts={obituary.texts}
          />

          {/* partner */}
          <div className="mx-auto flex w-full max-w-obituary items-center space-x-4 rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop p-4 text-sp-black dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-white">
            {organization.image && organization.image?.url ? (
              <div className="flex h-44 w-56">
                <Image
                  src={organization.image.url || ""}
                  width={organization.image.width}
                  height={organization.image.height}
                  alt="funeral partner logo image"
                />
              </div>
            ) : null}
            <div className="flex flex-col justify-start px-2 py-5">
              <p className="font-semibold uppercase text-sp-day-400">
                {t("funeral_partner_org")}
              </p>
              <h2 className="mb-2 font-bold text-2xl">{organization.name}</h2>
              <ul className="ml-8 list-disc">
                {!!organization.address && (
                  <li className="font-medium">{organization.address}</li>
                )}
                {!!organization.phoneNumber && (
                  <li className="font-medium">{organization.phoneNumber}</li>
                )}
                {!!organization.webpage && (
                  <li>
                    <a
                      className="text-sp-cotta dark:text-sp-fawn"
                      href={`${
                        organization.webpage.startsWith("http")
                          ? organization.webpage
                          : "https://" + organization.webpage
                      }`}
                    >
                      {organization.webpage}
                    </a>
                  </li>
                )}
                {!!organization.email && (
                  <li>
                    <a
                      href={`mailto:${organization.email}?subject=Contact - Spiritus Partner`}
                      className="text-sp-cotta dark:text-sp-fawn"
                    >
                      {organization.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
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

    if (!spiritus.obituaryId) {
      throw "No obituary id";
    }

    const resObituary = await GetObituaryBySpiritusId(spiritus.id);
    const obituary = resObituary.data;

    return {
      props: {
        key: `${context.locale}-spiritus-funeral-notice-${slug}`,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
        ])),
        spiritus,
        coverImages,
        obituary: obituary.obituary,
        organization: obituary.organization,
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
