import Head from "next/head";
import Image from "next/image";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CTA } from "@/components/homepage/CTA";
import { CategoryTiles } from "@/components/homepage/Categories";
import { CreateMemorialBanner } from "@/components/homepage/CreateMemorialBanner";
import { SearchBanner } from "@/components/homepage/SearchBanner";
import { TabSections } from "@/components/homepage/TabSections";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/NavBar";

import { GetParsedHomepage } from "../service/http/homepage";

export default function Home({ featured, categories, anniversaries, recent }) {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("meta_home_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_home_description")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus Stories" />
        <meta property="og:url" content="https://spiritus.app/en/" />
        <meta
          property="og:description"
          content="Spiritus is the first digital assets platform that keeps your memories - forever! Read the latest beautiful stories, memorials and anniversaries."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://spiritus.app/images/share/banner.jpg"
        />
        <meta
          property="og:image:url"
          itemProp="image"
          content="https://spiritus.app/images/share/banner.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <Navbar />
      <main>
        <div className="relative h-[100svh] lg:h-screen">
          <div className="overflow-none absolute h-full w-full">
            <Image
              src="/images/img_hero_desktop.jpg"
              alt="bg-image"
              quality={100}
              priority={true}
              className="-z-20 -mt-12 hidden object-cover sm:hidden md:block"
              width={0}
              height={0}
              sizes="100vw"
              fill
            />
            <Image
              src="/images/img_hero_mobile.jpg"
              alt="bg-image-mobile"
              quality={100}
              priority={true}
              className="-z-20 -mt-12 block object-cover sm:block md:hidden"
              width={0}
              height={0}
              sizes="100vw"
              fill
            />
          </div>
          <div
            className="absolute h-screen w-full bg-subtle-white dark:bg-subtle-black"
            id="create-memorial"
          >
            <div className="z-50 mx-auto w-full md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
              <CreateMemorialBanner />
            </div>
          </div>
        </div>
        <div className="mx-auto mb-8 min-h-[60vh] w-full md:w-5/6 lg:mb-16 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
          <SearchBanner />
        </div>
        <div className="mx-auto min-h-screen w-full md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
          <TabSections
            featured={featured}
            anniversaries={anniversaries}
            recent={recent}
          />
        </div>
        <div className="mx-auto my-12 min-h-[50vh] w-full md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
          <CategoryTiles categories={categories} />
        </div>
        <div className="mx-auto w-full bg-gradient-to-b from-day-gradient-start to-day-gradient-stop py-24 dark:from-sp-black dark:via-sp-dark-gradient-mid dark:to-sp-brown">
          <CTA />
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
export async function getStaticProps(context) {
  const { featured, anniversaries, recent, categories } =
    // { locales: [ 'hr', 'en' ], locale: 'en', defaultLocale: 'hr' }
    await GetParsedHomepage(context.locale);

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "homepage",
        "settings",
        "auth",
        "about",
      ])),
      key: `${context.locale}-main-index-page`,
      featured,
      anniversaries,
      recent,
      categories,
    },
    revalidate: 60 * 10, // 10min
  };
}
