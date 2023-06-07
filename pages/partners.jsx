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
      <div className="min-h-screen">
        <div className="my-20 flex flex-col items-center">
          <h1 className="font-bold text-sp-black subpixel-antialiased text-5xl tracking-tight dark:text-sp-white">
            {t("funeral_notices_partners")}
          </h1>
          <p className="mt-2 w-full text-center text-sp-lighter dark:text-sp-lighter lg:w-1/2">
            {t("funeral_notices_subtitle")}
          </p>

          <div className="mt-3 inline-flex items-center gap-3">
            <Link
              href={"/notices"}
              className="inline-flex items-center gap-1 gap-x-4 rounded-full border border-sp-lighter from-sp-day-300 to-sp-day-100 px-4 py-1.5 font-medium text-base hover:bg-gradient-to-r focus:outline-none dark:border-sp-medium dark:bg-sp-medlight dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
            >
              <ArrowLeftIcon className="h-5 w-4" />{" "}
              <span>{t("funeral_notice")}</span>
            </Link>
            <div className="h-5 w-1 rounded-sm border-r-3 border-sp-brown"></div>
            <button className="inline-flex items-center gap-1 rounded-full border border-sp-lighter from-sp-day-300 to-sp-day-100 px-4 py-2 font-medium text-base hover:bg-gradient-to-r focus:outline-none dark:border-sp-medium dark:bg-sp-medlight dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
              {t("contact")}
            </button>
          </div>
        </div>
        <section
          className="mt-8 flex flex-col items-center justify-center gap-6"
          key="obituary"
        >
          {partners.map((p, i) => {
            return (
              <div
                key={i}
                className="flex w-full flex-col items-center rounded-sp-14 border-2 border-sp-cotta/30 bg-sp-day-50 p-2 text-sp-black dark:border-sp-fawn/20 dark:bg-sp-black dark:text-sp-white md:flex-row md:items-start lg:w-3/4"
              >
                {p.image && p.image?.url ? (
                  <div className="flex h-44 w-56 p-4 md:h-44 md:w-44">
                    <div
                      className="flex 
                    items-center justify-center overflow-hidden rounded-sp-14"
                    >
                      <img src={p.image.url || ""} />
                    </div>
                  </div>
                ) : null}
                <div className="flex flex-col justify-start px-2 py-5">
                  <h5 className="mb-2 font-bold text-2xl">{p.name}</h5>
                  <ul className="ml-8 list-disc">
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
