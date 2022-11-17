import Head from "next/head";
import { useState, useEffect } from "react"
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
import Layout from "../components/layout/Layout";

import { GetParsedHomepage } from "../service/http/homepage";
import { VukovarModal } from "../components/banners/Vukovar";
import { gtagPageView } from "../utils/gtag";
import { FeaturedProject } from "../components/projects/FeaturedProject";

export default function Home({
  featuredStory,
  featured,
  discover,
  categories,
  anniversaries,
  featuredProject,
}) {
  const { t } = useTranslation("common");

  let [modalOpen, setModalOpen] = useState(false);

  function closeModal() {
    setModalOpen(false);
  }

  function maybeOpenModal() {
    setModalOpen(true);
    const date = new Date();

    const start = new Date("2022-11-17");
    const end = new Date("2022-11-19");

    // show modal only in selected range
    if (!(date > start && date < end)) {
      return;
    }

    const ms = localStorage.getItem("modal_status");
    if (!ms) {
      localStorage.setItem("modal_status", JSON.stringify({ dt: new Date() }));
      gtagPageView({
        title: "Vukovar Banner",
        location: "/",
      });
      setModalOpen(true);
      return;
    }

    const dt = JSON.parse(ms)?.dt;
    if (dt) {
      const diff = Math.abs(new Date() - new Date(dt));
      // if diff > 8hrs, rounded down
      if (Math.floor(diff / 1000 / 3600) > 8) {
        localStorage.setItem(
          "modal_status",
          JSON.stringify({ dt: new Date() })
        );
        gtagPageView({
          title: "Vukovar Banner",
          location: "/",
        });
        setModalOpen(true);
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      maybeOpenModal();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
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
      {modalOpen ? (
        <VukovarModal isOpen={modalOpen} closeModal={closeModal} />
      ) : null}
      <FeaturedProject project={featuredProject}  />
      <GetSpiritusCTA />
      <div className="flex flex-col mx-auto items-center pt-5">
        <CTADownloadLinks />
      </div>
      <FeaturedStory
        title={featuredStory.title}
        subtitle={featuredStory.subtitle}
        imageUrl={featuredStory.imageUrl}
      />
      <HomepageSwiper
        sectionId={anniversaries.id}
        itemType={anniversaries.itemType}
        titleTranslation={"section_anniversaries_title"}
        items={anniversaries.items}
        title={anniversaries.title}
      />
      <SearchSpiritusCTA />
      <CategoriesSwiper
        sectionId={categories.id}
        categories={categories.items}
        itemType={categories.itemType}
        titleTranslation={"section_categories_title"}
      />
      <HomepageSwiper
        sectionId={discover.id}
        itemType={discover.itemType}
        titleTranslation={"section_discover_title"}
        items={discover.items}
        title={discover.title}
      />

      <HomepageSwiper
        sectionId={featured.id}
        itemType={featured.itemType}
        titleTranslation={"section_featured_title"}
        items={featured.items}
        featured={true}
        title={featured.title}
        subtitle={"section_featured_subtitle"}
      />
      <SearchPlacesCTA />
    </Layout>
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
      featuredProject: sections.project,
      featuredStory: sections.featuredStory,
      featured: sections.featured,
      discover: sections.discover,
      categories: sections.categories,
      anniversaries: sections.anniversaries,
    },
    // in seconds
    revalidate: 60 * 10, // 10min
  };
}
