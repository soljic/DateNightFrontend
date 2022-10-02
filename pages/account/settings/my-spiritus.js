import Head from "next/head";

import { getSession, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import LayoutNoFooter from "../../../components/layout/LayoutNoFooter";
import { Sidebar } from "../../../components/settings/Sidebar";
import { ProfileSpiritus } from "../../../service/http/auth";
import { MySpiritusGrid } from "../../../components/settings/Spiritus";
import { MobileSidebar } from "../../../components/settings/MobileSidebar";


export default function SpiritusPage({ spiritus, isLastPage }) {
  const { t } = useTranslation("common");

  return (
    <LayoutNoFooter>
      <Head>
        <title>Spiritus | Settings | My Spiritus Collection</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Spiritus - Settings - My Spiritus Collection" />
      </Head>
      <section className="pt-5 overflow-y-auto">
        <div className="w-full grid grid-cols-1 md:grid-cols-3">
          <div className="col-span-1 hidden sm:hidden md:block">
            <Sidebar selectedIndex={0} />
          </div>
          <div className="md:col-span-1 md:hidden">
            <MobileSidebar selectedIndex={0} />
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-center md:justify-start">
            <MySpiritusGrid spiritus={spiritus} isLastPage={isLastPage}/>
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

  const res = await ProfileSpiritus(session.user.accessToken)

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
      spiritus: res.data.content,
      isLastPage: res.data.last,
    },
  };
}
