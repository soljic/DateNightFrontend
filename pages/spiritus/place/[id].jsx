import Head from "next/head";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../../../components/layout/Layout";
import { PlacesGrid } from "../../../components/places/Grid";
import { GetSpiritusByPlaceId } from "../../../service/http/spiritus";

export default function PlacesPage({
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
      <PlacesGrid
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
  const { id, location } = context.query;

  const { data: res } = await GetSpiritusByPlaceId(id);
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
      id: id,
      title: location,
      totalPages: res.totalPages,
      isLastPage: res.last,
      initialItems: res.content,
    },
  };
}
