import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ClaimPaywall } from "@/components/ClaimPaywall";
import FullWidthLayout from "@/components/layout/LayoutV2";

export default function ClaimSpiritusPage({ slug }) {
  const { t } = useTranslation("common");

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_claim_spiritus_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={t("meta_claim_spiritus_description")}
        />
      </Head>
      <div className="mx-auto min-h-screen max-w-7xl py-5">
        <div className="min-h-screen space-y-36 py-12">
          <ClaimPaywall slug={slug} />
        </div>
      </div>
    </FullWidthLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { slug } = context.query;

  if (!session) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
        "paywall",
        "pricing",
        "cookies",
      ])),
      slug: slug || null,
    },
  };
}
