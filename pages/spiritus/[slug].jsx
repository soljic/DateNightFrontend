import Head from "next/head";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../../components/layout/Layout";
import { CTAAddMemory, MoreStories } from "../../components/stories/StoryPage";
import { SpiritusOverview } from "../../components/spiritus/Overview";
import { SpiritusCarousel } from "../../components/spiritus/Carousel";

import { GetSpiritusBySlug } from "../../service/http/spiritus";
import { GetSpiritusStoriesBySlug } from "../../service/http/story";

export default function SpiritusPage({ spiritus, stories, hasMore, total }) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Head>
        <title>{`Spiritus | ${spiritus.name} ${spiritus.surname}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={
            spiritus.description ||
            `${t("meta_spiritus_description")} ${spiritus.name} ${
              spiritus.surname
            }.`
          }
        />
      </Head>
      <section className="container mx-auto px-5" key="story">
        <div className="flex flex-col items-center py-8">
          <div className="flex flex-col w-full mb-12 text-left">
            <div className="w-full mx-auto lg:w-3/5 text-sp-white mt-4">
              <SpiritusOverview {...spiritus} />
            </div>
            <div className="w-full mx-autotext-sp-white mt-4">
              <SpiritusCarousel images={spiritus.images} />
            </div>
            <div className="w-full mx-auto lg:w-1/2 text-sp-white mt-4">
              <MoreStories stories={stories} spiritus={spiritus} />
              <div className="flex-1 items-center justify-center px-4">
                <CTAAddMemory name={spiritus.name} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// fetch first 5 spiritus stories
export async function getServerSideProps(context) {
  const { slug } = context.query;
  const resSpiritus = await GetSpiritusBySlug(slug);
  const spiritus = resSpiritus.data;

  const resStories = await GetSpiritusStoriesBySlug(slug, 0, 10);
  const stories = resStories.data?.content;

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
      stories,
      spiritus,
      hasMore: !resStories.data.last,
      total: resStories.data.numberOfElements,
    },
  };
}
