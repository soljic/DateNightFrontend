import { useState } from "react";

import Head from "next/head";

import { PencilIcon } from "@heroicons/react/outline";
import { getSession, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../../../components/layout/Layout";
import { SpiritusCarousel } from "../../../components/spiritus/Carousel";
import { SpiritusOverview } from "../../../components/spiritus/Overview";
import {
  CTAAddMemory,
  MoreStories,
  PageActions,
} from "../../../components/stories/StoryPage";
import { GetSpiritusById } from "../../../service/http/spiritus";
import { GetSpiritusStoriesBySlug } from "../../../service/http/story";

function EditBtn({ spiritusId }) {
  const { t } = useTranslation("common");

  return (
    <div className="mt-4 flex justify-end">
      <a
        href={`/edit/spiritus/${spiritusId}`}
        className="inline-flex items-center rounded-sp-40 border-2 border-sp-medium px-6 py-2 text-sp-white dark:text-sp-black"
      >
        <PencilIcon className="h-5 w-5 text-sp-lighter" />
        <span className="ml-2 text-sp-lighter">{t("edit_button_text")}</span>
      </a>
    </div>
  );
}

export default function SpiritusIDPage({ spiritus, stories, isLastPage }) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  const [isGuardian, setIsGuardian] = useState(
    spiritus.flags.includes("GUARDIAN")
  );

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
      {status === "authenticated" && isGuardian ? (
        <EditBtn spiritusId={spiritus.id} />
      ) : (
        ""
      )}

      <section className="mx-auto mt-4 flex w-full flex-col items-center justify-center text-sp-white lg:w-4/5 xl:w-5/6">
        <SpiritusOverview {...spiritus} />
        <SpiritusCarousel images={spiritus.images} />
        <div className="mx-auto w-full text-sp-white md:w-3/4 lg:w-4/5 lg:text-lg">
          <PageActions
            shareLink={spiritus.shortLink}
            id={spiritus.id}
            type={"SPIRITUS"}
            isGuardian={isGuardian}
            saved={spiritus.flags.includes("SAVED")}
          />
        </div>
        <div className="mt-4 text-sp-white">
          <MoreStories
            stories={stories}
            spiritus={spiritus}
            isGuardian={isGuardian}
            isLastPage={isLastPage}
          />
          <div className="flex-1 items-center justify-center">
            <CTAAddMemory
              sessionStatus={status}
              spiritusId={spiritus.id}
              name={spiritus.name}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}

function filterStories(items, isOwner) {
  if (isOwner) {
    return items;
  }

  return items.filter((s) => s.flags.includes("PUBLIC"));
}

// Fetch spiritus and story data.
// Redirects to 404 in case of any errors.
export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);
  let isGuardian = false;

  try {
    let spiritus;
    if (session && session?.user?.accessToken) {
      const res = await GetSpiritusById(id, session?.user?.accessToken);
      spiritus = res.data;
      isGuardian = spiritus.flags.includes("GUARDIAN");
    } else {
      const res = await GetSpiritusById(id);
      spiritus = res.data;
    }
    const { data: spiritusStories } = await GetSpiritusStoriesBySlug(
      spiritus.slug,
      0,
      20
    );
    const stories = filterStories(spiritusStories.content, isGuardian);
    return {
      props: {
        key: `${context.locale}-spiritus-id-${id}`,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
          "cookies",
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
