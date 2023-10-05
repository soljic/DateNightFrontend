import { useState } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  OurTechCheckboxIcon,
  OurTechNotesIcon,
  OurTechShieldIcon,
  OurTechTargetIcon,
} from "@/components/OurTechIcons";
import BecomeGuardianCTA from "@/components/about/BecomeGuardianComponent";
import FullWidthLayout from "@/components/layout/LayoutV2";

export default function OurTech() {
  const { t } = useTranslation("tech");

  const features = [
    {
      title: t("title_1"),
      text: t("text_1"),
      icon: <OurTechNotesIcon />,
    },
    {
      title: t("title_2"),
      text: t("text_2"),
      icon: <OurTechShieldIcon />,
    },
    {
      title: t("title_3"),
      text: t("text_3"),
      icon: <OurTechTargetIcon />,
    },
  ];

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_tech_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_tech_description")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus - Our Tech" />
        <meta property="og:url" content="https://spiritus.app/en/our-tech" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Spiritus is the first digital assets platform that keeps your memories - forever! Find out more about our Mission, Vision, potential partnerships and out unique team of experts."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://spiritus.app/images/share/banner.jpg"
        />
        <meta
          property="og:image:url"
          itemProp="image"
          content="https://spiritus.app/images/share/banner.jpg"
        />
        {/* <meta property="og:image:secure_url" itemProp="image" content="https://spiritus.app/images/share/banner.jpg"/> */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div className="mx-auto mb-96 h-full min-h-screen max-w-5xl flex-col px-4">
        <div className="lg:mx mx-4 mt-12 md:mt-32">
          <article className="mx-8 flex flex-col items-start">
            <div className="mb-5 rounded-sp-10 bg-sp-fawn-subtle p-2.5 dark:bg-sp-fawn dark:bg-opacity-40">
              <OurTechCheckboxIcon />
            </div>
            <h2 className="font-medium text-sp-dark-fawn">{t("hero_title")}</h2>
            <h1 className="max-w-lg font-bold text-3xl dark:text-sp-white md:text-4xl lg:text-5xl">
              {t("hero_subtitle")}
            </h1>
            <div className="mt-4 flex flex-col justify-between font-medium md:flex-row">
              <p className="whitespace-pre-line">{t("hero_text_1")}</p>
              <p className="whitespace-pre-line">{t("hero_text_2")}</p>
            </div>
            <Link
              href="/auth/register"
              className="mt-5 items-center rounded-2xl border-4 border-sp-fawn-subtle bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-6 py-4 text-center font-medium leading-5 text-sp-white dark:border-sp-fawn-subtle/50 dark:from-sp-dark-fawn dark:to-sp-fawn"
            >
              {t("hero_cta_button")}
            </Link>
          </article>
          <Image
            src="/images/img_tech_web2web3.png"
            alt="Our Tech Graphics"
            width={960}
            height={540}
            className="my-24 h-auto w-full"
          />
          <div className="mx-auto flex w-2/3 flex-col items-start space-y-12">
            {features.map((elem, index) => (
              <div
                key={`our-tech-elem-index-${index}`}
                className="flex items-start gap-4"
              >
                <div className="flex items-center justify-center rounded-sp-10 bg-sp-fawn-subtle p-2.5 dark:bg-sp-fawn dark:bg-opacity-40">
                  {elem.icon}
                </div>
                <div>
                  <h2 className="max-w-lg font-bold text-2xl dark:text-sp-white md:text-4xl">
                    {elem.title}
                  </h2>
                  <p className="whitespace-pre-line">{elem.text}</p>
                </div>
              </div>
            ))}
          </div>
          <BecomeGuardianCTA />
        </div>
      </div>
    </FullWidthLayout>
  );
}

{
  /* <div className="rounded-sp-10 bg-sp-fawn-subtle p-2.5 dark:bg-sp-fawn dark:bg-opacity-40">
{elem.icon}
</div> */
}

// fetch top 10 popular spirituses
export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "about",
        "auth",
        "tech",
      ])),
    },
  };
}
