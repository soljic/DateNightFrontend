import Head from "next/head";

import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PencilIcon } from "@heroicons/react/outline";

import Layout from "../../components/layout/Layout";
import {
  CTAAddMemory,
  MoreStories,
  PageActions,
  Tribute,
} from "../../components/stories/StoryPage";
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

export default function SpiritusPage({ spiritus, stories, isLastPage }) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  const sessionUserIsOwner = () => {
    if (!spiritus || !spiritus?.users || !spiritus?.users.length) {
      return false;
    }
    for (const su of spiritus.users) {
      if (su.email == session?.user.email && su.code == session?.user.code) {
        return true;
      }
    }
    return false;
  };

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
      {status === "authenticated" && sessionUserIsOwner() ? (
        <EditBtn storyId={displayStory.id} />
      ) : (
        ""
      )}

      <section className="mx-auto w-full lg:w-4/5 xl:w-5/6 flex flex-col justify-center items-center text-sp-white mt-4">
        <SpiritusOverview {...spiritus} />
        <SpiritusCarousel images={spiritus.images} />

        <div className="w-full md:w-3/4 lg:w-4/5 mx-auto text-sp-white lg:text-lg">
          <Tribute id={spiritus.id}/>
          <PageActions
            shareLink={spiritus.shortLink}
            id={spiritus.id}
            type={"SPIRITUS"}
            saved={spiritus.flags.includes("SAVED")}
          />
        </div>
        <div className="text-sp-white mt-4">
          <MoreStories
            stories={stories}
            spiritus={spiritus}
            userIsOwner={sessionUserIsOwner()}
            isLastPage={isLastPage}
          />
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
  const { data: spiritus } = await GetSpiritusBySlug(slug);

  const { data: resStories } = await GetSpiritusStoriesBySlug(slug);
  const stories = resStories?.content;

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "settings"])),
      stories,
      spiritus,
      isLastPage: resStories.last,
    },
  };
}
