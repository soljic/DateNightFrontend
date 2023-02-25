import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";

import Layout from "../components/layout/Layout";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";

export default function Partners() {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Head>
        <title>{`Spiritus | Partners`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={"Spiritus partners"} />
      </Head>
      <div className="flex flex-col items-center my-20">
        <h1 className="text-5xl font-bold subpixel-antialiased tracking-tight text-sp-black dark:text-sp-white">
          Our Partners
        </h1>
        <p className="text-sp-lighter dark:text-sp-lighter mt-2 w-full lg:w-1/2 text-center">
          Funeral agencies we partner with. We are open to more partnerships.
          Let us know.
        </p>

        <div className="inline-flex mt-3 items-center gap-3">
          <Link href={"/notices"}>
            <a className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-1.5 px-4 text-base font-medium gap-x-4">
              <ArrowLeftIcon className="h-5 w-4" /> <span>Funeral notices</span>
            </a>
          </Link>
          <div className="border-r-3 h-5 w-1 border-sp-brown rounded-sm"></div>
          <button className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-2 px-4 text-base font-medium">
            Contact Us
          </button>
        </div>
      </div>
      <section
        className="flex flex-col justify-center items-center mt-8"
        key="obituary"
      >
        <div className="w-full lg:w-3/4 flex bg-sp-day-50 dark:bg-sp-black rounded-sp-14 border-2 border-sp-fawn/20 text-sp-black dark:text-sp-white">
          <div className="flex p-4">
            <div className="h-48 w-48 item-center overflow-hidden rounded-sp-14">
              <img
                src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col justify-start p-4">
            <h5 className="mb-2 text-2xl font-bold">Card title</h5>
            <ul className="list-disc ml-8">
              <li>A</li>
              <li>A</li>
              <li>A</li>
              <li>A</li>
              <li>A</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      key: `${context.locale}-notices-homepage`,
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
      ])),
    },
  };
}
