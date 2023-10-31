import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/NavBar";

import { GetCounter, GetRecentPaid } from "@/service/http/cms_counter";

export default function Home({ count, recent }) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("meta_home_title") + "| Counter"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_home_description")} />
      </Head>
      <Navbar />
      <main className="flex min-h-screen">
        <div className="mx-auto my-96 flex flex-col items-center justify-center gap-8">
          <h1 className="font-bold text-black text-6xl dark:text-white">
            New Memorials
          </h1>
          <h1 className="pb-24 font-bold text-black text-7xl dark:text-white">
            {count}
          </h1>
          {!!recent && recent?.length > 0 && (
            <div className="block overflow-hidden rounded-lg border-2 text-center font-medium text-lg">
              <table className="table-auto border-collapse border-spacing-x-8 border-spacing-y-2 border-transparent">
                <thead>
                  <tr>
                    <th className="border-r-2 border-sp-day-400 bg-sp-day-400/20 px-10 py-5">
                      Date
                    </th>
                    <th className="border-r-2 border-sp-day-400 bg-sp-day-400/20 px-10 py-5">
                      User
                    </th>
                    <th className="border-r-2 border-sp-day-400 bg-sp-day-400/20 px-10 py-5">
                      Spiritus
                    </th>
                  </tr>
                </thead>
                {recent.map((r, i) => {
                  return (
                    <tr key={i} className="border border-sp-day-400">
                      <td className="border-2 border-sp-day-400 px-10 py-4">
                        {r.date.slice(0, 19).replace("T", " ").replace("Z", "")}
                      </td>
                      <td className="border-2 border-sp-day-400 px-10 py-4">
                        {r.user}
                      </td>
                      <td className="border-2 border-sp-day-400 px-10 py-4">
                        {r.spiritus}
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          )}
        </div>
      </main>
      <div className="mx-auto w-full max-w-7xl p-2">
        <Footer />
      </div>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  if (session.user.email !== "dino@spiritus.app") {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  try {
    const res = await GetCounter(session.user.accessToken);
    const res2 = await GetRecentPaid(session.user.accessToken);

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          "common",
          "homepage",
          "settings",
          "auth",
          "about",
          "cookies",
        ])),
        key: `${context.locale}-main-index-page`,
        count: res?.data || 0,
        recent: res2?.data || [],
        // recent: [
        //   {
        //     spiritus: 1230,
        //     user: 1230,
        //     date: "2023-10-31T20:25:15.444Z",
        //   },
        // ],
      },
    };
  } catch (err) {
    console.log("Error loading counter", session?.user, err);
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
