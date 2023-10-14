import Head from "next/head";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "@/components/layout/Layout";
import { SectionItemGrid } from "@/components/sections/SectionItem";

import { GetSectionItem } from "@/service/http/sections";

export default function Category({
  section,
  id,
  title,
  totalPages,
  isLastPage,
  initialItems,
}) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Head>
        <title>{t("meta_section_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_section_description")} />
      </Head>
      <SectionItemGrid
        section={section}
        id={id}
        title={title}
        totalPages={totalPages}
        isLastPage={isLastPage}
        initialItems={initialItems}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { section, id, title } = context.query;

  try {
    const res = await GetSectionItem(section, id);
    return {
      props: {
        key: `${context.locale}-category-${section}-${id}`,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
          "cookies",
        ])),
        section: section,
        id: id,
        title: title,
        totalPages: res.data.items.totalPages,
        isLastPage: res.data.items.last,
        initialItems: res.data.items.content,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
