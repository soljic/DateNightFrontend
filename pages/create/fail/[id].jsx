import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { Spinner } from "@/components/Status";
import FullWidthLayout from "@/components/layout/LayoutV2";

import { GetSpiritusById } from "@/service/http/spiritus";

export default function RedirectCheckoutFail({ spiritus }) {
  const { t } = useTranslation("common");

  return (
    <FullWidthLayout>
      <Head>
        <title>Spiritus | Checkout Fail | Retrying...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Retrying checkout process after failure..."
        />
      </Head>

      <section className="mx-auto mt-4 flex w-full max-w-7xl flex-col items-center justify-center">
        <Spinner />
      </section>
    </FullWidthLayout>
  );
}

// Fetch spiritus and redirect back to checkout page.
// * if spiritus is claimable redirect to claim page.
// * if spiritus is not claimable redirect to create page.
// Redirects to 404 in case of any errors.
export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);

  try {
    let spiritus;
    if (session && session?.user?.accessToken) {
      const res = await GetSpiritusById(id, session?.user?.accessToken);
      spiritus = res.data;
    } else {
      const res = await GetSpiritusById(id);
      spiritus = res.data;
    }

    // NOTE: this is a naive check
    // spiritus that failed creation should not be claimable in most cases
    // refactor if this becomes a problem
    const claimable = spiritus.flags.includes("CLAIMABLE");
    const redirectURL = claimable
      ? `/${context.locale}/checkout/claim/${spiritus.slug}?payment_failed=true`
      : `/${context.locale}/checkout/create/${spiritus.id}?payment_failed=true`;

    return {
      redirect: {
        destination: redirectURL,
        permanent: false,
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
