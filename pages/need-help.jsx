import { useState } from "react";

import Head from "next/head";

import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FullWidthLayout from "@/components/layout/LayoutV2";

import Hero from "../components/need-help/Hero";

export default function NeedHelp() {
  const { t } = useTranslation("needhelp");

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_about_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_about_description")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus - Need Help" />
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
      <div className="mx-auto mb-96 h-full min-h-screen flex-col md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
        <div className="mx-4 lg:mx-0">
          <Hero />
        </div>
        <div className="my-24 px-4 md:my-32">
          <Questions />
        </div>
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
        "needhelp",
      ])),
    },
  };
}

export function Questions() {
  const { t } = useTranslation("needhelp");

  const items = [
    {
      Q: t("needhelp_1_question"),
      A: t("needhelp_1_answer"),
    },
    {
      Q: t("needhelp_2_question"),
      A: t("needhelp_2_answer"),
    },
    {
      Q: t("needhelp_3_question"),
      A: t("needhelp_3_answer"),
    },
    {
      Q: t("needhelp_4_question"),
      A: t("needhelp_4_answer"),
    },
    {
      Q: t("needhelp_5_question"),
      A: t("needhelp_5_answer"),
    },
    {
      Q: t("needhelp_6_question"),
      A: t("needhelp_6_answer"),
    },
    {
      Q: t("needhelp_7_question"),
      A: t("needhelp_7_answer"),
    },
    {
      Q: t("needhelp_8_question"),
      A: t("needhelp_8_answer"),
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2.5">
      {items.map((item, i) => (
        <Accordion
          key={`faq-section-question-${i}`}
          title={item.Q}
          text={item.A}
        />
      ))}
    </div>
  );
}

function Accordion({ title, text }) {
  const { t } = useTranslation("faq");

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      className={`w-full cursor-pointer rounded-sp-10 md:w-2/3 ${
        open
          ? "bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:from-sp-dark-brown dark:to-sp-brown"
          : ""
      }`}
    >
      <button
        onClick={toggleOpen}
        className="flex w-full items-center justify-between rounded-sp-10 px-4 py-4 hover:bg-gradient-to-r hover:from-day-gradient-start  hover:to-day-gradient-stop dark:text-sp-white dark:hover:from-sp-dark-brown dark:hover:to-sp-brown lg:py-5"
      >
        <div className="text-left font-medium leading-[22px] text-lg tracking-sp-tighten lg:text-xl">
          {title}
        </div>
        {open ? (
          <XIcon className="h-5 w-5 text-sp-lighter" />
        ) : (
          <PlusIcon className="h-5 w-5 text-sp-lighter" />
        )}
      </button>
      {open && (
        <p className="whitespace-pre-line px-4 pb-3 font-normal leading-6 text-sp-black text-opacity-70 text-base tracking-sp-tighten dark:text-sp-white dark:text-opacity-70 md:pb-6 lg:pb-8">
          {text}
        </p>
      )}
    </div>
  );
}
