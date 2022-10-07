import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import LayoutNoFooter from "../../../components/layout/LayoutNoFooter";
import { Sidebar } from "../../../components/settings/Sidebar";
import { Theme } from "../../../components/settings/Theme";
import { MobileSidebar } from "../../../components/settings/MobileSidebar";

export default function ThemePage() {
  const { t } = useTranslation("settings");

  return (
    <LayoutNoFooter>
      <Head>
        <title>{`Spiritus | ${t("settings")} | ${t("theme")}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Spiritus - Settings - Theme" />
      </Head>
      <section className="pt-5 overflow-y-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-1 hidden sm:hidden md:block">
            <Sidebar selectedIndex={2} />
          </div>
          <div className="md:col-span-1 md:hidden">
            <MobileSidebar selectedIndex={2} />
          </div>
          <div className="md:col-span-2 flex justify-start">
            <Theme />
          </div>
        </div>
      </section>
    </LayoutNoFooter>
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

  return {
    props: {
      key: `${context.locale}-settings-theme`,
      ...(await serverSideTranslations(context.locale, ["common", "settings"])),
    },
  };
}
