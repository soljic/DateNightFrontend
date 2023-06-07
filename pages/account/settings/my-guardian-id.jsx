import Head from "next/head";

import { getSession, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FullWidthLayout from "@/components/layout/LayoutV2";
import { GuardianID } from "@/components/settings/Guardian";
import { MobileSidebar } from "@/components/settings/MobileSidebar";
import { Sidebar } from "@/components/settings/Sidebar";

export default function GuardianIDPage() {
  const { data: session } = useSession();
  const { t } = useTranslation(["settings"]);

  return (
    <FullWidthLayout>
      <Head>
        <title>{`Spiritus | ${t("settings")} | ${t("guardian_id")}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Get your unique guardian ID" />
      </Head>
      <section className="mx-auto min-h-screen w-full p-2 pt-5 lg:w-2/3 xl:w-2/3 2xl:w-2/5">
        <div className="grid w-full grid-cols-1 md:grid-cols-4">
          <div className="col-span-1 hidden sm:hidden md:block">
            <Sidebar selectedIndex={1} />
          </div>
          <div className="md:col-span-1 md:hidden">
            <MobileSidebar selectedIndex={1} />
          </div>
          <div className="flex justify-start md:col-span-3">
            <GuardianID guardianID={session?.user.code || ""} />
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

  return {
    props: {
      key: `${context.locale}-settings-guardian-id`,
      ...(await serverSideTranslations(context.locale, ["common", "settings"])),
    },
  };
}
