import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { Spinner } from "@/components/Status";
import FullWidthLayout from "@/components/layout/LayoutV2";

import { GetSpiritusById } from "@/service/http/spiritus";

export default function RedirectSpiritusIDPage({ spiritus }) {
  const { t } = useTranslation("common");

  return (
    <FullWidthLayout>
      <Head>
        <title>{`Spiritus | ${spiritus.name} ${spiritus.surname}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={
            spiritus.description ||
            `${t("meta_spiritus_description")} ${spiritus.name} ${
              spiritus.surname
            }.`
          }
        />
      </Head>

      <section className="mx-auto mt-4 flex w-full max-w-7xl flex-col items-center justify-center">
        <Spinner />
      </section>
    </FullWidthLayout>
  );
}

// Fetch spiritus and redirect to their slug page.
// Redirects to 404 in case of any errors.
export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);
  let isGuardian = false;

  try {
    let spiritus;
    if (session && session?.user?.accessToken) {
      const res = await GetSpiritusById(id, session?.user?.accessToken);
      spiritus = res.data;
      isGuardian = spiritus.flags.includes("GUARDIAN");
    } else {
      const res = await GetSpiritusById(id);
      spiritus = res.data;
    }

    return {
      redirect: {
        destination: `/${context.locale || "en"}/spiritus/${spiritus.slug}`,
        permanent: true, // the page is redirected permanently!
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
