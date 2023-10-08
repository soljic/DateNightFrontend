import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Checkout } from "@/components/Payment";
import FullWidthLayout from "@/components/layout/LayoutV2";

import {
  GetClaimSpiritusProduct,
  PAYMENT_MODE_LIFETIME,
  PAYMENT_MODE_SUBSCRIPTION,
} from "@/service/http/payment";
import { GetSpiritusBySlug } from "@/service/http/spiritus";

export default function ClaimSpiritusPage({
  spiritus,
  lifetimeProduct,
  subscriptionProduct,
  allProducts,
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
        <Checkout
          spiritus={spiritus}
          lifetimeProduct={lifetimeProduct}
          subscriptionProduct={subscriptionProduct}
          allProducts={allProducts}
          isClaim={true}
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

  let spiritus;
  let lifetimeProduct = null;
  let subscriptionProduct = null;
  let allProducts = [];
  try {
    const spRes = await GetSpiritusBySlug(
      slug,
      session.user.accessToken,
      context.locale
    );
    const claimable = spRes?.data?.flags.includes("CLAIMABLE");
    if (!claimable) {
      return {
        redirect: {
          destination: "/400",
          permanent: false,
        },
      };
    }

    spiritus = spRes.data;
    const res = await GetClaimSpiritusProduct(session?.user?.accessToken);
    if (!res?.data?.stripePackages) {
      throw new Error("no checkout packages found");
    }

    allProducts = res?.data.stripePackages || [];
    // get first occurence of lifetime and subscription product
    for (const product of allProducts) {
      if (product.mode === PAYMENT_MODE_LIFETIME) {
        lifetimeProduct = product;
        continue;
      }
      if (product.mode === PAYMENT_MODE_SUBSCRIPTION) {
        subscriptionProduct = product;
        continue;
      }

      if (lifetimeProduct && subscriptionProduct) {
        break;
      }
    }

    // both plans must be available to proceed
    if (!lifetimeProduct || !subscriptionProduct) {
      throw new Error("missing lifetime or subscription product");
    }
  } catch (err) {
    console.log(err);
    // TODO: handle errs and not just redirect to 400
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
      ])),
      spiritus,
      lifetimeProduct,
      subscriptionProduct,
      allProducts,
    },
  };
}
