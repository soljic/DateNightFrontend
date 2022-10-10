import Head from "next/head";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../../../components/layout/Layout";
import { SectionGrid } from "../../../components/sections/Section";
import { GetSection } from "../../../service/http/sections";

// TODO: in this part I need some description tags too
// I only have:
// {
//		"id": 2,
//		"viewType": null,
//		"gridCount": null,
//		"items": {
//			"content": [...]
//		}
//  // NEEDED:
//  // title
//  // subtitle
// }
export default function Section({
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
      <SectionGrid
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
  const { id, title } = context.query;

  const res = await GetSection(id);
  // const res = {
  //   data: content
  // }

  return {
    props: {
      key: `${context.locale}-section-id-${id}`,
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
      ])),
      id: res.data.id,
      title: title,
      totalPages: res.data.items.totalPages,
      isLastPage: res.data.items.last,
      initialItems: res.data.items.content,
    },
  };
}
