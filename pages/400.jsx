import Head from "next/head";
import Link from "next/link";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  AboutIcon,
  MobileAppIcon,
  StoriesIcon,
} from "../components/layout/Icons";
import LayoutNoNav from "../components/layout/LayoutNoNav";

export default function Custom400() {
  const { t } = useTranslation("settings");

  return (
    <LayoutNoNav>
      <Head>
        <title>Spiritus | Oooops...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Ooooopsie... that page does not exist"
        />
      </Head>
      <section className="flex flex-col items-center justify-center text-sp-white">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="mb-10 rounded-sp-14 bg-gradient-to-r from-sp-dark-brown to-sp-brown p-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9022 11.2984C13.411 11.2984 12.2022 12.5072 12.2022 13.9984L12.2022 18.4984C12.2022 18.9954 11.7992 19.3984 11.3022 19.3984C10.8051 19.3984 10.4022 18.9954 10.4022 18.4984L10.4022 13.9984C10.4022 11.5131 12.4169 9.49837 14.9022 9.49837H16.3295L15.1658 8.33468C14.8143 7.98321 14.8143 7.41336 15.1658 7.06189C15.5173 6.71042 16.0871 6.71042 16.4386 7.06189L19.1386 9.76194C19.4901 10.1134 19.4901 10.6833 19.1386 11.0347L16.4386 13.7348C16.0871 14.0863 15.5173 14.0863 15.1658 13.7348C14.8143 13.3833 14.8143 12.8135 15.1658 12.462L16.3294 11.2984H14.9022ZM10.8202 1.50747C12.5776 -0.249884 15.4268 -0.249889 17.1842 1.50747L26.493 10.8163C28.2503 12.5736 28.2503 15.4229 26.493 17.1803L17.1842 26.4891C15.4268 28.2464 12.5776 28.2464 10.8202 26.4891L1.51138 17.1803C-0.245978 15.4229 -0.245983 12.5737 1.51138 10.8163L10.8202 1.50747ZM15.9114 2.78026C14.857 1.72585 13.1474 1.72585 12.093 2.78027L2.78417 12.0891C1.72975 13.1435 1.72976 14.853 2.78417 15.9075L12.093 25.2163C13.1474 26.2707 14.857 26.2707 15.9114 25.2163L25.2202 15.9075C26.2746 14.853 26.2746 13.1435 25.2202 12.0891L15.9114 2.78026Z"
                fill="#DB6D56"
              />
            </svg>
          </div>

          <h3 className="font-bold text-sp-fawn text-sm">400 Error</h3>

          <h1 className="text-center font-bold text-2xl">
            {t("settings:400_title")}
          </h1>

          <h2 className="text-center font-medium text-sp-lighter text-sm">
            {t("settings:400_subtitle")}
          </h2>
        </div>
        <p className="mt-16 text-center font-medium text-sp-lighter text-sm">
          {t("settings:400_subtitle_2")}
        </p>
        <Nav />
      </section>
    </LayoutNoNav>
  );
}

function Nav() {
  const { t } = useTranslation("common");

  const menuItems = [
    {
      name: "stories",
      // description: "The latest beautiful stories, memorials and anniversaries.",
      description: "m_desc_stories",
      href: "/",
      icon: <StoriesIcon fill="#ED9A4C" />,
    },
    {
      name: "mobile",
      // description: "Download the app from Google Play and App Store.",
      description: "m_desc_mobile_app",
      href: "/mobile-app",
      icon: <MobileAppIcon fill="#ED9A4C" />,
    },
    {
      name: "about",
      // description: "Learn more about Spiritus and our mission.",
      description: "m_desc_about",
      href: "/about",
      icon: <AboutIcon fill="#ED9A4C" />,
    },
  ];

  return (
    <div className="z-10">
      <div className="text-sp-black dark:text-sp-white">
        <div className="relative grid grid-cols-1 gap-6 p-6">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.name}
              className="flex items-center rounded-sp-14 px-2 py-4 ease-in-out hover:bg-gradient-to-r hover:from-sp-dark-brown hover:to-sp-brown"
            >
              <div className="flex h-10 w-10 shrink-0 items-start justify-center sm:h-12 sm:w-12">
                {item.icon}
              </div>
              <div className="ml-4">
                <p className="pb-0.5 font-semibold text-sp-white text-lg">
                  {t(item.name)}
                </p>
                <p className="text-sp-lighter text-sm">{t(item.description)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "cookies",
      ])),
    },
  };
}
