import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../components/layout/Layout";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { GetPartners } from "../service/http/obituary";

const ps = [
  {
    name: "Pokop.hr",
    address: "Vukovarska ulica 2, 10040 Zagreb-Dubrava",
    webpage: "www.pokop.hr",
    email: "pokop@pokop.hr",
    phoneNumber: "01/2984-625 ; 091/2984-625",
    type: "PARTNER",
  },
];

export default function Partners({ partners }) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Head>
        <title>{`Spiritus | Partners`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={"Spiritus partners"} />
      </Head>
      <div className="h-screen">
        <div className="flex flex-col items-center my-20">
          <h1 className="text-5xl font-bold subpixel-antialiased tracking-tight text-sp-black dark:text-sp-white">
            {t("funeral_notices_partners")}
          </h1>
          <p className="text-sp-lighter dark:text-sp-lighter mt-2 w-full lg:w-1/2 text-center">
            {t("funeral_notices_subtitle")}
          </p>

          <div className="inline-flex mt-3 items-center gap-3">
            <Link href={"/notices"}>
              <a className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-1.5 px-4 text-base font-medium gap-x-4">
                <ArrowLeftIcon className="h-5 w-4" />{" "}
                <span>{t("funeral_notice")}</span>
              </a>
            </Link>
            <div className="border-r-3 h-5 w-1 border-sp-brown rounded-sm"></div>
            <button className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-2 px-4 text-base font-medium">
              {t("contact")}
            </button>
          </div>
        </div>
        <section
          className="flex flex-col justify-center items-center mt-8 gap-6"
          key="obituary"
        >
          {partners.map((p, i) => {
            return (
              <div
                key={i}
                className="w-full lg:w-3/4 flex p-2 flex-col items-center md:flex-row md:items-start bg-sp-day-50 dark:bg-sp-black rounded-sp-14 border-2 border-sp-cotta/30 dark:border-sp-fawn/20 text-sp-black dark:text-sp-white"
              >
                {p.image && p.image?.url ? (
                  <div className="h-44 w-56 md:h-44 md:w-44 p-4 flex">
                    <div className="flex 
                    justify-center items-center overflow-hidden rounded-sp-14">
                      <img src={p.image.url || ""}  />
                    </div>
                  </div>
                ) : null}
                <div className="flex flex-col justify-start py-5 px-2">
                  <h5 className="mb-2 text-2xl font-bold">{p.name}</h5>
                  <ul className="list-disc ml-8">
                    {!!p.address && (
                      <li className="font-medium">{p.address}</li>
                    )}
                    {!!p.phoneNumber && (
                      <li className="font-medium">{p.phoneNumber}</li>
                    )}
                    {!!p.webpage && (
                      <li>
                        <a
                          className="text-sp-cotta dark:text-sp-fawn"
                          href={`${
                            p.webpage.startsWith("http")
                              ? p.webpage
                              : "https://" + p.webpage
                          }`}
                        >
                          {p.webpage}
                        </a>
                      </li>
                    )}
                    {!!p.email && (
                      <li>
                        <a
                          href={`mailto:${p.email}?subject=Contact - Spiritus Partner`}
                          className="text-sp-cotta dark:text-sp-fawn"
                        >
                          {p.email}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await GetPartners();
  
  return {
    props: {
      key: `${context.locale}-notices-homepage`,
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
      ])),
      partners: res.data || [],
    },
  };
}
