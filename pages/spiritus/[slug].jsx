import Head from "next/head";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PencilIcon } from "@heroicons/react/outline";

import Layout from "../../components/layout/Layout";
import { CTAAddMemory, MoreStories } from "../../components/stories/StoryPage";
import { SpiritusOverview } from "../../components/spiritus/Overview";
import { SpiritusCarousel } from "../../components/spiritus/Carousel";

import { GetSpiritusBySlug } from "../../service/http/spiritus";
import { GetSpiritusStoriesBySlug } from "../../service/http/story";

function EditBtn({ spiritusId }) {
  return (
    <div className="flex justify-end mt-4">
      <a
        href={`/edit/spiritus/${spiritusId}`}
        className="inline-flex items-center rounded-sp-40 border-2 border-sp-medium py-2 px-6 text-sp-white dark:text-sp-black"
      >
        <PencilIcon className="w-5 h-5 text-sp-lighter" />
        <span className="text-sp-lighter ml-2">Edit</span>
      </a>
    </div>
  );
}

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
      <EditBtn spiritusId={spiritus.id} />

      <section className="mx-auto w-full lg:w-4/5 xl:w-5/6 flex flex-col justify-center items-center text-sp-white mt-4">
        <SpiritusOverview {...spiritus} />
        <SpiritusCarousel images={spiritus.images} />
        <div className="text-sp-white mt-4">
          <MoreStories stories={stories} spiritus={spiritus} />
          <div className="flex-1 items-center justify-center">
            <CTAAddMemory spiritusId={spiritus.id} name={spiritus.name} />
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

  const resStories = await GetSpiritusStoriesBySlug(slug, 0, 20);
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
