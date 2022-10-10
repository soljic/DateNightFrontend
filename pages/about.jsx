import Head from "next/head";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../components/layout/Layout";
import Hero from "../components/about/Hero";
import Partnership from "../components/about/Partnership";
import Facts from "../components/about/Facts";
import Team from "../components/about/Team";
import Features from "../components/about/Features";
import BecomeGuardianCTA from "../components/about/BecomeGuardianComponent";
import FAQSection from "../components/about/FAQ";

export default function About() {
  const { t } = useTranslation("about");

  return (
    <Layout>
      <Head>
        <title>{t("meta_about_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_about_description")} />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus - About Us"/>
        <meta property="og:url" content="https://demo.spiritus.app/en/about"/>
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Spiritus is the first digital assets platform that keeps your memories - forever! Find out more about our Mission, Vision, potential partnerships and out unique team of experts." />
        <meta property="og:image" itemProp="image" content="https://demo.spiritus.app/images/share/banner.jpg"/>
        <meta property="og:image:secure_url" itemProp="image" content="https://demo.spiritus.app/images/share/banner.jpg"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="630"/>
      </Head>
      <Hero />
      <Features />
      <Partnership />
      <Facts />
      <Team />
      <FAQSection/>
      <BecomeGuardianCTA />
    </Layout>
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
      ])),
    },
  };
}
