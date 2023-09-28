import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Checkout } from "@/components/Payment";
import FullWidthLayout from "@/components/layout/LayoutV2";

import { GetClaimSpiritusProduct } from "@/service/http/payment";
import { GetSpiritusBySlug } from "@/service/http/spiritus";

export default function ClaimSpiritusPage({ spiritus, product }) {
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
          productCurrency={product.currency}
          productPrice={product.price}
          productId={product.pkgServerId}
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

  let productData;
  let spiritus;
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
    productData = res.data;
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
      ])),
      spiritus,
      product: productData,
    },
  };
}
