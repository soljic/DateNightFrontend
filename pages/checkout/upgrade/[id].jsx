import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { UpgradeCheckout } from "@/components/UpgradeCheckout";
import FullWidthLayout from "@/components/layout/LayoutV2";

import { GetSpiritusById } from "@/service/http/spiritus";

export default function UpgradeSubscriptionSpiritusPage({
  spiritus,
  paymentFailed,
}) {
  const { t } = useTranslation("common");

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_create_spiritus_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={t("meta_create_spiritus_description")}
        />
      </Head>
      <div className="mx-auto min-h-screen max-w-7xl py-5">
        <UpgradeCheckout spiritus={spiritus} paymentFailed={paymentFailed} />
      </div>
    </FullWidthLayout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const { data: spiritus } = await GetSpiritusById(
      id,
      session.user.accessToken,
      context.locale
    );

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
        spiritus,
        paymentFailed: context.query.payment_failed || false,
      },
    };
  } catch (err) {
    console.log("err loading checkout page", err);
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
}
