import Head from "next/head";

import { getSession, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import LayoutNoFooter from "../../../components/layout/LayoutNoFooter";
import { Sidebar } from "../../../components/settings/Sidebar";
import { GuardianID } from "../../../components/settings/Guardian";

export default function GuardianIDPage() {
  const { data: session, status } = useSession();
  const { t } = useTranslation("common");

  return (
    <LayoutNoFooter>
      <Head>
        <title>Settings | My Guardian ID</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Get your unique guardian ID" />
      </Head>
      <section className="pt-5">
        <div className="w-full grid grid-cols-3">
          <div className="col-span-1">
            <Sidebar selectedIndex={4}/>
          </div>
          <div className="col-span-2 flex justify-center ">
            <GuardianID guardianID={session?.user.code || ""} />
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
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}