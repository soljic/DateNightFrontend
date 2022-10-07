import Head from "next/head";

import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PencilIcon } from "@heroicons/react/outline";

import Layout from "../../../components/layout/Layout";
import {
  CTAAddMemory,
  MoreStories,
} from "../../../components/stories/StoryPage";
import { SpiritusOverview } from "../../../components/spiritus/Overview";
import { SpiritusCarousel } from "../../../components/spiritus/Carousel";

import { GetSpiritusById } from "../../../service/http/spiritus";
import { GetSpiritusStoriesBySlug } from "../../../service/http/story";

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

export default function SpiritusIDPage({ spiritus, stories, isLastPage }) {
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
        <EditBtn spiritusId={spiritus.id} />
      ) : (
        ""
      )}

      <section className="mx-auto w-full lg:w-4/5 xl:w-5/6 flex flex-col justify-center items-center text-sp-white mt-4">
        <SpiritusOverview {...spiritus} />
        <SpiritusCarousel images={spiritus.images} />
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

// Fetch spiritus and story data.
// Redirects to 404 in case of any errors.
export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const { data: spiritus } = await GetSpiritusById(id);
    const { data: spiritusStories } = await GetSpiritusStoriesBySlug(
      spiritus.slug,
      0,
      20
    );
    const stories = spiritusStories.content;
    return {
      props: {
        key: `${context.locale}-spiritus-id-${id}`,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
        ])),
        stories,
        spiritus,
        isLastPage: spiritusStories.last,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
