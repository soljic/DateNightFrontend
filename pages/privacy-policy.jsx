import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { CheckIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CommunityIcon, PeopleIcon } from "@/components/Icons";
import FullWidthLayout from "@/components/layout/LayoutV2";

import BecomeGuardianCTA from "../components/about/BecomeGuardianComponent";

export default function About() {
  const { t } = useTranslation("privacypolicy");

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_privacy_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Why us description */}
        <meta name="description" content={"Privacy Policy description"} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus - Privacy Policy" />
        <meta property="og:url" content="https://spiritus.app/en/privacy-policy" />
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

        {/* Legacy section */}
        <div className="mx-auto my-32 flex max-w-4xl flex-col items-center justify-center">
          <h1 className="mb-3 px-2 text-center font-bold text-2xl dark:text-sp-white sm:text-3xl md:text-4xl">
            {t("privacy_title")}
          </h1>
          <h2 className="mb-3 mt-2 px-2 text-center text-lg tracking-sp-tighten dark:text-sp-white">
            {t("privacy_subtitle")}
          </h2>
          <div>
            <p>{t("updated_date")}</p>
            <p>{t("address")}</p>
          </div>
        </div>
        <div className="mx-auto my-32 flex max-w-4xl flex-col justify-center">
          <ol>
            <li><a href="#chapter1"><span>{t("chapter_1_title")}</span></a></li>
            <li><a href="#chapter2"><span>{t("chapter_2_title")}</span></a></li>
            <li><a href="#chapter3"><span>{t("chapter_3_title")}</span></a></li>
            <li><a href="#chapter4"><span>{t("chapter_4_title")}</span></a></li>
            <li><a href="#chapter5"><span>{t("chapter_5_title")}</span></a></li>
            <li><a href="#chapter6"><span>{t("chapter_6_title")}</span></a></li>
            <li><a href="#chapter7"><span>{t("chapter_7_title")}</span></a></li>
            <li><a href="#chapter8"><span>{t("chapter_8_title")}</span></a></li>
            <li><a href="#chapter9"><span>{t("chapter_9_title")}</span></a></li>
            <li><a href="#chapter10"><span>{t("chapter_10_title")}</span></a></li>
          </ol>
        </div>
        <div className="mx-auto my-32 flex max-w-4xl flex-col justify-center">
          <h2 id="chapter1" className="font-bold">{t("chapter_1_title")}</h2>
      <br />
          <p>{t("chapter_1_text_p1")}</p>
          <br />
          <p>{t("chapter_1_text_p2")}</p>
          <br />
          <p>{t("chapter_1_text_p3")}</p>
          <br />
          <p>{t("chapter_1_text_p4")}</p>
          <br />
          <h2 id="chapter2" className="font-bold">{t("chapter_2_title")}</h2>
          <br />
          <p>{t("chapter_2_text_p1")}</p>
          <br />
          <h2 id="chapter3" className="font-bold">{t("chapter_3_title")}</h2>
          <br />
          <p>{t("chapter_3_text_p1")}</p>
          <br />
          <h2 id="chapter4" className="font-bold">{t("chapter_4_title")}</h2>
          <br />
          <p>{t("chapter_4_text_p1")}</p><br />
          <h2 id="chapter5" className="font-bold">{t("chapter_5_title")}</h2>
          <br />
          <p>{t("chapter_5_text_p1")}</p>
          <br />
          <h2 id="chapter6" className="font-bold">{t("chapter_6_title")}</h2>
          <br />
          <p>{t("chapter_6_text_p1")}</p>
          <br />
          <h2 id="chapter7" className="font-bold">{t("chapter_7_title")}</h2>
          <br />
          <p>{t("chapter_7_text_p1")}</p>
          <br />
          <h2 id="chapter8" className="font-bold">{t("chapter_8_title")}</h2>
          <br />
          <p>{t("chapter_8_text_p1")}</p>
          <br />
          <h2 id="chapter9" className="font-bold">{t("chapter_9_title")}</h2>
          <br />
          <p>{t("chapter_9_text_p1")}</p>
          <br />
          <h2 id="chapter10" className="font-bold">{t("chapter_10_title")}</h2>
          <br />
          <p>{t("chapter_10_text_p1")}</p>
          <br />
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
        "privacypolicy",
        "cookies",
      ])),
    },
  };
}
