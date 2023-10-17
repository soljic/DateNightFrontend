import Head from "next/head";
import Link from "next/link";

import { CheckIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import BecomeGuardianCTA from "@/components/about/BecomeGuardianComponent";
import FullWidthLayout from "@/components/layout/LayoutV2";

import { PricingPageInfo } from "@/service/http/payment";

export default function PricingPage({ plans, locale }) {
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
      title: plans[0].title,
      subtitle: plans[0].subtitle,
      price: `${plans[0].price}${plans[0].currency === "eur" ? "€" : "$"}`,
      list: plans[0].listDescription,
    },
    {
      title: plans[1].title,
      subtitle: plans[1].subtitle,
      price: `${plans[1].price}${plans[1].currency === "eur" ? "€" : "$"}`,
      list: plans[1].listDescription,
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
    </FullWidthLayout>
  );
}

export async function getStaticPaths(context) {
  return {
    paths: context.locales.map((loc) => ({
      params: {
        slug: "usd",
      },
      locale: loc,
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const res = await PricingPageInfo(context.locale);
  // sort so lower is first
  res?.data.sort((a, b) => {
    if (a.price > b.price) {
      return 1;
    }
    if (a.price < b.price) {
      return -1;
    }
    return 0;
  });

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
      plans: res.data,
      locale: context.locale,
    },
  };
}
