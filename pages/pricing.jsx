import Head from "next/head";
import Link from "next/link";

import { CheckIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FullWidthLayout from "@/components/layout/LayoutV2";

import BecomeGuardianCTA from "../components/about/BecomeGuardianComponent";

export default function PricingPage() {
  const { t } = useTranslation("pricing");

  const pricingPlans = [
    {
      title: t("pricing_plan_free_title"),
      subtitle: t("pricing_plan_free_subtitle"),
      price: t("pricing_plan_free_price"),
      list: [
        t("pricing_plan_free_list_1"),
        t("pricing_plan_free_list_2"),
        t("pricing_plan_free_list_3"),
        t("pricing_plan_free_list_4"),
      ],
    },
    {
      title: t("pricing_plan_subscribe_title"),
      subtitle: t("pricing_plan_subscribe_subtitle"),
      price: t("pricing_plan_subscribe_price"),
      list: [
        t("pricing_plan_subscribe_list_1"),
        t("pricing_plan_subscribe_list_2"),
        t("pricing_plan_subscribe_list_3"),
        t("pricing_plan_subscribe_list_4"),
        t("pricing_plan_subscribe_list_5"),
        t("pricing_plan_subscribe_list_6"),
      ],
    },
    {
      title: t("pricing_plan_lifetime_title"),
      subtitle: t("pricing_plan_lifetime_subtitle"),
      price: t("pricing_plan_lifetime_price"),
      list: [
        t("pricing_plan_lifetime_list_1"),
        t("pricing_plan_lifetime_list_2"),
        t("pricing_plan_lifetime_list_3"),
        t("pricing_plan_lifetime_list_4"),
        t("pricing_plan_lifetime_list_5"),
        t("pricing_plan_lifetime_list_6"),
        t("pricing_plan_lifetime_list_7"),
      ],
    },
  ];

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_about_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_about_description")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus - Pricing" />
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
        {/* Heading section */}
        <div className="mx-4 mt-24 lg:mx-0">
          <h1 className="mb-3 text-center font-bold tracking-tight text-cta dark:text-sp-white">
            {t("hero_title")}
          </h1>
          <h2 className="mb-3 mt-2 text-center font-medium leading-6 text-lg tracking-sp-tighten dark:text-sp-white">
            {t("hero_subtitle")}
          </h2>
        </div>

        {/* Pricing plans section */}
        <div className="mx-4 my-24 grid grid-cols-1 gap-8 px-2 md:grid-cols-2 lg:grid-cols-3">
          {pricingPlans.map((plan, idx) => (
            <div
              key={`Pricing plan ${idx}`}
              className="flex flex-col justify-between gap-4 rounded-xl bg-green-200 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-4 py-10 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
            >
              <div>
                <p className="mb-8 text-center font-bold tracking-tight text-cta dark:text-sp-white">
                  {plan.price}
                </p>
                <p className="text-center font-bold text-xl tracking-tight dark:text-sp-white">
                  {plan.title}
                </p>
                <p className="text-md mb-8 text-center font-medium leading-6 tracking-sp-tighten dark:text-sp-white">
                  {plan.subtitle}
                </p>
                <ul className="mb-8 flex list-none flex-col justify-center gap-4 px-2 text-sm tracking-sp-tighten dark:text-sp-white">
                  {plan.list.map((item, i) => (
                    <li
                      className="flex items-center gap-2"
                      key={`item-${idx}-${i}`}
                    >
                      <div className="rounded-full bg-sp-fawn p-0.5">
                        <CheckIcon className="h-3.5 w-3.5 text-sp-white" />
                      </div>
                      <p className="text-md mb-1 mt-0 px-2 text-[17px] opacity-70 tracking-sp-tighten dark:text-sp-white">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions section */}
        <div className="mx-6 flex flex-col gap-2 rounded-sp-10 border-2 border-sp-day-200 px-4 py-6 md:gap-1">
          <div className="flex w-full items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-lg tracking-tight dark:text-sp-white">
                {t("still_have_questions_heading")}
              </h2>
              <p className="text-md tracking-sp-tighten dark:text-sp-white">
                {t("still_have_questions_subheading")}
              </p>
            </div>
            <Link
              href="/need-help"
              className="w-64 rounded-sp-10 border-2 border-sp-day-400 px-12 py-2 text-center"
            >
              {t("still_have_questions_need_help")}
            </Link>
          </div>
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
        "pricing",
        "cookies",
      ])),
    },
  };
}
