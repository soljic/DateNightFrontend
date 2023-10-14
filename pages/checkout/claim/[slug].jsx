import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Checkout } from "@/components/Checkout";
import FullWidthLayout from "@/components/layout/LayoutV2";

import { GetSpiritusBySlug } from "@/service/http/spiritus";

export default function ClaimSpiritusPage({ spiritus, paymentFailed }) {
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
        <Checkout
          spiritus={spiritus}
          isClaim={true}
          paymentFailed={paymentFailed}
        />
      </div>
    </FullWidthLayout>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const session = await getSession(context);

  if (!session || !slug) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const res = await GetSpiritusBySlug(
      slug,
      session.user.accessToken,
      context.locale
    );

    const claimable = res?.data?.flags.includes("CLAIMABLE");
    if (!claimable) {
      return {
        redirect: {
          destination: "/400",
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
        spiritus: res.data,
        paymentFailed: context.query.payment_failed || false,
      },
    };
  } catch (err) {
    console.log("err loading claim page:", err);
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
}
