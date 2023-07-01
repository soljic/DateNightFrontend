import Head from "next/head";
import Image from "next/image";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CreateMemorialBanner } from "@/components/homepage/CreateMemorialBanner";
import LayoutHeroImage from "@/components/layout/LayoutHeroImage";

import { FeaturedProject } from "../components/projects/FeaturedProject";
import {
  CTADownloadLinks,
  GetSpiritusCTA,
  SearchPlacesCTA,
  SearchSpiritusCTA,
} from "../components/stories/CTAs";
import { FeaturedStory } from "../components/stories/FeaturedStory";
import {
  CategoriesSwiper,
  HomepageSwiper,
} from "../components/stories/Swipers";
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
    <LayoutHeroImage>
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
    </LayoutHeroImage>
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
