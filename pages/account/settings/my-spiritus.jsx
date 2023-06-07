import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FullWidthLayout from "@/components/layout/LayoutV2";
import { MobileSidebar } from "@/components/settings/MobileSidebar";
import { Sidebar } from "@/components/settings/Sidebar";
import { MySpiritusGrid } from "@/components/settings/Spiritus";

import { ProfileSpiritus } from "@/service/http/auth";

export default function SpiritusPage({ spiritus, isLastPage }) {
  const { t } = useTranslation("settings");

  return (
    <FullWidthLayout>
      <Head>
        <title>{`Spiritus | ${t("settings")} | ${t("spiritus")}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Spiritus - Settings - My Spiritus Collection"
        />
      </Head>
      <section className="mx-auto min-h-screen w-full p-2 pt-5 lg:w-2/3 xl:w-2/3 2xl:w-2/5">
        <div className="grid w-full grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 hidden sm:hidden md:block">
            <Sidebar selectedIndex={0} />
          </div>
          <div className="md:col-span-1 md:hidden">
            <MobileSidebar selectedIndex={0} />
          </div>
          <div className="col-span-1 md:col-span-3">
            <MySpiritusGrid spiritus={spiritus} isLastPage={isLastPage} />
          </div>
        </div>
      </section>
    </FullWidthLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const res = await ProfileSpiritus(session.user.accessToken);

  return {
    props: {
      key: `${context.locale}-settings-my-spiritus`,
      ...(await serverSideTranslations(context.locale, ["common", "settings"])),
      spiritus: res.data.content,
      isLastPage: res.data.last,
    },
  };
}
