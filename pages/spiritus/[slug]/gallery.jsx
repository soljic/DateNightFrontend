import { useState } from "react";

import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { LoginModal } from "@/components/auth/Login";
import FullWidthLayout from "@/components/layout/LayoutV2";
import { Gallery } from "@/components/spiritus/Gallery";
import { ProfileHeader, Tabs } from "@/components/spiritus/Sections";
import { CreateStoryCTA } from "@/components/spiritus/StoryList";

import { GetSpiritusGalleryImagesV2 } from "@/service/http/spiritus";

import { dateDiffYears } from "@/utils/dateDiff";
import { SetSpiritusOG } from "@/utils/metaTags";

export default function SpiritusGalleryPage({
  spiritus,
  images,
  isGuardian,
  claimable,
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
  // number of years
  const age =
    birthDate && deathDate ? dateDiffYears(deathDate, birthDate) : null;

  const tabs = [
    {
      name: t("spiritus_tab"),
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
      name: t("spiritus_links"),
      href: `/spiritus/${spiritus.slug}/links`,
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
      <LoginModal isOpen={isOpen} closeModal={closeModal} />

      <ProfileHeader
        spiritus={spiritus}
        age={age}
        deathDate={deathDate}
        birthDate={birthDate}
        claimable={claimable || false}
        isGuardian={isGuardian}
        setOpenModal={openModal}
      />
      <section className="mx-auto mb-96 h-full min-h-screen flex-col text-sp-white md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
        <Tabs tabs={tabs} />
        <div className="mt-7">
          <CreateStoryCTA spiritusId={spiritus.id} isGuardian={isGuardian} />
        </div>
        {!!images && images.length > 0 && (
          <div className="px-4 md:px-0">
            <Gallery images={images} />
          </div>
        )}
      </section>
    </FullWidthLayout>
  );
}

// Redirects to 404 in case of any errors.
export async function getServerSideProps(context) {
  const { slug } = context.query;
  const session = await getSession(context);

  let isGuardian = false;
  let claimable = false;
  try {
    const resGallery = await GetSpiritusGalleryImagesV2(
      slug,
      0,
      20,
      session?.user?.accessToken || null
    );
    const spiritus = resGallery.data.spiritus;
    isGuardian = spiritus.flags.includes("GUARDIAN");
    claimable = spiritus.flags.includes("CLAIMABLE");

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
        claimable,
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
