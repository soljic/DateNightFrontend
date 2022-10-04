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

export default function About() {
  const { t } = useTranslation("about");

  return (
    <Layout>
      <Head>
        <title>{t("meta_about_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_about_description")} />
      </Head>
      <Hero />
      <Features />
      <Partnership />
      <Facts />
      <Team />
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
      ])),
    },
  };
}
