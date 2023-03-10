import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../../components/layout/Layout";

import { NoticesGrid } from "../../components/sections/Obituaries";
import { GetObituaries } from "../../service/http/obituary";

const pavao = {
  id: 12,
  image: {
    id: 12,
    url: "/test_ob_image.jpg",
    height: 120,
    width: 90,
  },
  name: "Pavao",
  surname: "Vukelić",
  birth: "1923-02-24T09:32:13.403Z",
  death: "2023-02-24T09:32:13.403Z",
};

const obs = [
  pavao,
  pavao,
  {
    id: 12,
    image: {},
    name: "Pavao",
    surname: "Vukelić",
    birth: "1923-02-24T09:32:13.403Z",
    death: "2023-02-24T09:32:13.403Z",
  },
  pavao,
  pavao,
  pavao,
  // pavao,
  // pavao,
  // pavao,
  // pavao,
  // pavao,
  // pavao,
  // pavao,
  // pavao,
  // pavao,
  // pavao,
];

export default function Notices({ date, isLastPage, initialItems }) {
  const { t } = useTranslation("common");
  return (
    <Layout>
      <Head>
        <title>{t("meta_home_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_home_description")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus Stories" />
        <meta property="og:url" content="https://spiritus.app/en/notices" />
        <meta
          property="og:description"
          content="Spiritus is the first digital assets platform that keeps your memories - forever! Read the latest beautiful stories, memorials and anniversaries."
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
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* <!-- Google font --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={""}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NoticesGrid
        date={date}
        isLastPage={isLastPage}
        initialItems={initialItems}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const date = new Date().toISOString().split("T")[0];
  const obs = await GetObituaries(date);

  if (process?.env?.NEXT_API_URL !== "https://walk.spiritusapp.com") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      key: `${context.locale}-notices-homepage`,
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
      ])),
      date,
      isLastPage: obs.data.last,
      initialItems: obs.data.content,
    },
  };
}
