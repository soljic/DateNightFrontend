import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { CheckIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CommunityIcon, PeopleIcon } from "@/components/Icons";
import FullWidthLayout from "@/components/layout/LayoutV2";

import BecomeGuardianCTA from "../components/about/BecomeGuardianComponent";
import WhyUsImage1 from "../public/images/why-us/img_whyus_01.png";
import WhyUsImage2 from "../public/images/why-us/img_whyus_02.png";
import WhyUsImage3 from "../public/images/why-us/img_whyus_03.png";

export default function About() {
  const { t } = useTranslation("whyus");

  const features = [
    {
      title: "feature_2_title",
      subtitle: "feature_2_subtitle_1",
      list: [
        "feature_2_list_1",
        "feature_2_list_2",
        "feature_2_list_3",
        "feature_2_list_4",
      ],
      image: WhyUsImage2,
      buttonText: "feature_2_create_memorial",
      buttonLink: "/create/spiritus",
    },
    {
      title: "feature_3_title",
      subtitle: "feature_3_subtitle_1",
      list: [
        "feature_3_list_1",
        "feature_3_list_2",
        "feature_3_list_3",
        "feature_3_list_4",
      ],
      image: WhyUsImage3,
      buttonText: "feature_3_learn_about_museum",
      buttonLink: "/museums",
    },
  ];

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_about_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Why us description */}
        <meta name="description" content={"Why us description"} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus - About Us" />
        <meta property="og:url" content="https://spiritus.app/en/about" />
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
      <div className="mx-auto mb-96 h-full min-h-screen w-full max-w-7xl flex-col">
        {/* Hero section */}
        <div className="mx-4 lg:mx-0">
          <div className="relative flex h-[560px] w-full items-center justify-center rounded-2xl bg-[url('../public/images/why-us/photos_bg.png')] bg-cover bg-center">
            <div className="max-w-4xl text-center">
              <div className="flex w-full justify-center drop-shadow-xl">
                <PeopleIcon width={15} height={15} />
              </div>
              <h1 className="mb-3 mt-6 text-center font-bold drop-shadow-lg text-4xl dark:text-sp-white md:text-5xl">
                {t("hero_title")}
              </h1>
              <h2 className="text-md ldrop-shadow-md mb-3 mt-6 text-center font-medium text-lg tracking-sp-tighten dark:text-sp-white">
                {t("hero_subtitle")}
              </h2>
            </div>
          </div>
        </div>

        {/* Legacy section */}
        <div className="mx-auto my-32 flex max-w-4xl flex-col items-center justify-center">
          <h1 className="mb-3 px-2 text-center font-bold text-2xl dark:text-sp-white sm:text-3xl md:text-4xl">
            {t("legacy_title")}
          </h1>
          <h2 className="mb-3 mt-2 px-2 text-center text-lg tracking-sp-tighten dark:text-sp-white">
            {t("legacy_subtitle")}
          </h2>
        </div>

        {/* Features section */}
        <div class="grid grid-cols-1 gap-8 px-4 md:grid-cols-2">
          <div class="appearance-none rounded-sp-14 border-2 border-sp-day-200 p-4 md:col-span-2">
            <div class="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
              <div class="md:order-1">
                <Image
                  src={WhyUsImage1}
                  alt="Image"
                  className="h-auto w-full rounded-sp-14 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-20 py-4 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                />
              </div>
              <div class="md:order-2">
                <h2 className="text-[22px] font-bold leading-6 tracking-wide dark:text-sp-white">
                  {t("feature_1_title")}
                </h2>
                <p className="mb-3 mt-2 pb-2 text-start font-medium leading-6 text-lg tracking-sp-tighten dark:text-sp-white">
                  {t("feature_1_subtitle_1")}
                </p>
                <p className="mb-4 opacity-70 text-base tracking-sp-tighten dark:text-sp-white">
                  {t("feature_1_subtitle_2")}
                </p>

                <ul className="flex list-none flex-col gap-2 text-base tracking-sp-tighten dark:text-sp-white">
                  {[
                    t("feature_1_list_1"),
                    t("feature_1_list_2"),
                    t("feature_1_list_3"),
                  ].map((item, i) => {
                    return (
                      <li
                        className="flex items-center pl-2"
                        key={`item-feature-fst-${i}`}
                      >
                        <div className="rounded-full  bg-sp-fawn p-0.5">
                          <CheckIcon className="h-3.5 w-3.5 text-sp-white" />
                        </div>
                        <p className="mb-1 mt-0 px-2 font-medium not-italic leading-5 opacity-70 tracking-normal dark:text-sp-white">
                          {item}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {features.map((feature, idx) => (
            <div
              key={`feature-scnd-row-${idx}`}
              className="flex justify-between"
            >
              <div class="w-full rounded-sp-14 border-2 border-sp-day-300 p-4">
                <div>
                  <Image
                    src={feature.image}
                    alt="Image"
                    className="h-auto w-full rounded-sp-14 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-20 py-4 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                  />
                </div>
                <div>
                  <h2 className="my-4 text-[22px] font-bold leading-6 tracking-wide dark:text-sp-white">
                    {t(feature.title)}
                  </h2>
                  <p className="mb-4 opacity-70 text-base tracking-sp-tighten dark:text-sp-white">
                    {t(feature.subtitle)}
                  </p>

                  <ul className="flex list-none flex-col gap-2 text-base tracking-sp-tighten dark:text-sp-white">
                    {feature.list.map((item, idx) => {
                      return (
                        <li
                          className="flex items-center pl-2"
                          key={`other-features-item-${idx}`}
                        >
                          <div className="align-self-start rounded-full bg-sp-fawn p-0.5">
                            <CheckIcon className="h-3.5 w-3.5 text-sp-white" />
                          </div>
                          <p className="px-2 opacity-70 tracking-normal dark:text-sp-white">
                            {t(item)}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                  <Link
                    href={feature.buttonLink || "/why-us"}
                    className="mt-12 block w-full rounded-sp-14 border-2 border-sp-day-200 p-2 text-center font-semibold"
                  >
                    {t(feature.buttonText)}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join community section */}
        <div className="mx-auto mb-64 mt-32 flex max-w-4xl flex-col items-center justify-center gap-2">
          <CommunityIcon width={15} height={15} />
          <h1 className="mb-3 mt-4 px-2 text-center font-bold text-4xl dark:text-sp-white md:text-5xl">
            {t("join_community_title")}
          </h1>
          <h2 className="mb-3 mt-2 px-2 text-center text-lg tracking-sp-tighten dark:text-sp-white">
            {t("join_community_subtitle")}
            <span className="text-sp-day-fawn">
              {" "}
              {t("join_community_subtitle_forever_span")}
            </span>
          </h2>
          <Link
            href="/auth/register"
            className="items-center rounded-2xl border-4 border-sp-fawn-subtle bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-6 py-4 text-center font-medium leading-5 text-sp-white dark:from-sp-dark-fawn dark:to-sp-fawn"
          >
            {t("join_community_become_guardian")}
          </Link>
        </div>

        {/* Become a guardian section */}
        <BecomeGuardianCTA />
      </div>
    </FullWidthLayout>
  );
}

// fetch top 10 popular spirituses
export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "about",
        "faq",
        "auth",
        "whyus",
      ])),
    },
  };
}
