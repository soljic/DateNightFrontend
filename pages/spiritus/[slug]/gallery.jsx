import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FullWidthLayout from "@/components/layout/LayoutV2";
import { Gallery } from "@/components/spiritus/Gallery";
import { ProfileHeader, Tabs } from "@/components/spiritus/Sections";
import { CreateStoryCTA } from "@/components/spiritus/StoryList";

import { GetSpiritusGalleryImagesV2 } from "@/service/http/spiritus";

import { SetSpiritusOG } from "@/utils/metaTags";

export default function SpiritusGalleryPage({ spiritus, images, isGuardian }) {
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
      current: true,
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
        <title>{`Spiritus ${t("spiritus_gallery")} | ${spiritus.name} ${
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
      <section className="mx-auto mb-96 h-full min-h-screen flex-col text-sp-white md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
        <Tabs tabs={spiritus.obituaryId ? tabs : tabs.slice(0, 3)} />
        <div className="px-4 md:px-0">
          <div className="mt-7">
            <CreateStoryCTA spiritusId={spiritus.id} />
          </div>
          {!!images && images.length > 0 && <Gallery images={images} />}
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
    const resGallery = await GetSpiritusGalleryImagesV2(
      slug,
      0,
      20,
      session?.user?.accessToken || null
    );
    const spiritus = resGallery.data.spiritus;
    isGuardian = spiritus.flags.includes("GUARDIAN");

    return {
      props: {
        key: `${context.locale}-spiritus-gallery-${slug}`,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
          "cookies",
        ])),
        spiritus,
        images: resGallery.data.images.content,
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
