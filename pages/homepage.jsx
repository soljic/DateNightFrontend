import Head from "next/head";
import Image from "next/image";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CreateMemorialBanner } from "@/components/homepage/CreateMemorialBanner";
import { SearchBanner } from "@/components/homepage/SearchBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/NavBar";

import { GetParsedHomepage } from "../service/http/homepage";

export default function Home(
  {
    // featuredStory,
    // featured,
    // discover,
    // categories,
    // anniversaries,
    // featuredProject,
  }
) {
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
      <main>
        <div className="w-full bg-sp-day-50 dark:bg-sp-black">
          <div className="z-10 mx-auto w-full p-2 md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
            <Navbar />
          </div>
        </div>
        <div className="relative h-[100svh] lg:h-screen">
          <div className="overflow-none absolute h-full w-full">
            <Image
              src="/images/img_hero_desktop.jpg"
              alt="bg-image"
              quality={100}
              priority={true}
              className="-z-20 -mt-12 hidden object-cover md:block"
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
              className="-z-20 -mt-12 block object-cover md:hidden"
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
        <div className="z-10 mx-auto w-full md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-2/5">
          <SearchBanner />
        </div>
      </main>
      <div className="z-10 mx-auto w-full p-2 md:w-5/6 lg:w-3/4 xl:w-2/3 2xl:w-3/5">
        <Footer />
      </div>
    </>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context) {
  const sections = await GetParsedHomepage();
  // const sections = {
  // featuredStory: {},
  // featured: {},
  // discover: {},
  // categories: {},
  // anniversaries: {},
  // };

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
        "banners",
      ])),
      key: `${context.locale}-stories-index-page`,
      // featuredProject: sections.project,
      // featuredStory: sections.featuredStory,
      // featured: sections.featured,
      // discover: sections.discover,
      // categories: sections.categories,
      // anniversaries: sections.anniversaries,
    },
    // in seconds
    revalidate: 60 * 10, // 10min
  };
}
