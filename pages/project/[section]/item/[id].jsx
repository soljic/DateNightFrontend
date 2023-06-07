import Head from "next/head";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../../../../components/layout/Layout";
import { GetSectionItem } from "../../../../service/http/sections";
import { ProjectItemGrid } from "../../../../components/sections/SectionItem";

export default function Project({
  section,
  id,
  title,
  subtitle,
  totalPages,
  isLastPage,
  initialItems,
}) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Head>
        <title>{`${t("meta_section_title")} | ${t(
          "project_vukovar_title"
        )}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_section_description")} />
      </Head>
      <ProjectItemGrid
        section={section}
        id={id}
        title={title}
        subtitle={true} // TODO: fixme - subtitle is not read; it just causes a render
        totalPages={totalPages}
        isLastPage={isLastPage}
        initialItems={initialItems}
      />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { section, id, title } = context.query;

  const res = await GetSectionItem(section, id);

  return {
    props: {
      key: `${context.locale}-category-${section}-${id}`,
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
      ])),
      section: section,
      id: id,
      title: title,
      totalPages: res.data.items.totalPages,
      isLastPage: res.data.items.last,
      initialItems: res.data.items.content,
    },
  };
}
