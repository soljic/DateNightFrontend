import Head from "next/head";

import { useSession, getSession } from "next-auth/react";
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
  const { t } = useTranslation("common");

  return (
    <div className="flex justify-end mt-4">
      <a
        href={`/edit/spiritus/${spiritusId}`}
        className="inline-flex items-center rounded-sp-40 border-2 border-sp-medium py-2 px-6 text-sp-white dark:text-sp-black"
      >
        <PencilIcon className="w-5 h-5 text-sp-lighter" />
        <span className="text-sp-lighter ml-2">{t("edit_button_text")}</span>
      </a>
    </div>
  );
}

function SetSpiritusOG(spiritus) {
  let tags = [
    <meta
      property="og:type"
      content="website"
      key={`spiritus-${spiritus.id}-ws`}
    />,
    <meta
      property="og:site_name"
      content="Spiritus"
      key={`spiritus-${spiritus.id}-site-name`}
    />,
    <meta
      property="og:title"
      content={
        spiritus
          ? `Spiritus | ${spiritus.name} ${spiritus.surname}`
          : "Spiritus"
      }
      key={`spiritus-${spiritus.id}-title`}
    />,
    <meta
      property="og:url"
      content={`https://spiritus.app/en/spiritus/${spiritus.slug}`}
      key={`spiritus-${spiritus.id}-url`}
    />,
    <meta
      property="og:description"
      content={
        spiritus.description.length
          ? spiritus.description
          : "Spiritus is the first digital assets platform that keeps your memories - forever! Read the latest beautiful stories, memorials and anniversaries."
      }
      key={`spiritus-${spiritus.id}-desc`}
    />,
  ];
  if (spiritus.images.length) {
    const useImage = spiritus.images[0];
    tags = tags.concat([
      <meta
        property="og:image"
        itemProp="image"
        content={useImage.url}
        key={`spiritus-${spiritus.id}-image`}
      />,
      <meta
        property="og:image:url"
        itemProp="image"
        content={useImage.url}
        key={`spiritus-${spiritus.id}-image-url`}
      />,
      // <meta
      //   property="og:image:secure_url"
      //   itemProp="image"
      //   content={useImage.url}
      //   key={`spiritus-${spiritus.id}-image-secure`}
      // />,
      <meta
        property="og:image:width"
        content={useImage.width}
        key={`spiritus-${spiritus.id}-image-w`}
      />,
      <meta
        property="og:image:height"
        content={useImage.height}
        key={`spiritus-${spiritus.id}-image-h`}
      />,
    ]);
  } else {
    tags = tags.concat([
      <meta
        property="og:image"
        itemProp="image"
        content="https://spiritus.app/images/share/banner.jpg"
        key="image"
      />,
      <meta
        property="og:image:url"
        itemProp="image"
        content="https://spiritus.app/images/share/banner.jpg"
        key="image"
      />,
      // <meta
      //   property="og:image:secure_url"
      //   itemProp="image"
      //   content="https://spiritus.app/images/share/banner.jpg"
      //   key="image"
      // />,
      <meta property="og:image:width" content="1200" key="image-w" />,
      <meta property="og:image:height" content="630" key="image-h" />,
    ]);
  }
  return tags;
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
        {SetSpiritusOG(spiritus)}
      </Head>
      {status === "authenticated" && sessionUserIsOwner() ? (
        <EditBtn spiritusId={spiritus.id} />
      ) : (
        ""
      )}

      <section className="mx-auto w-full lg:w-4/5 xl:w-5/6 flex flex-col justify-center items-center text-sp-white mt-4">
        <SpiritusOverview {...spiritus} />
        <SpiritusCarousel images={spiritus.images} />

        <div className="w-full md:w-3/4 lg:w-4/5 mx-auto text-sp-white lg:text-lg">
          {!sessionUserIsOwner() && <Tribute id={spiritus.id} />}
          <PageActions
            shareLink={spiritus.shortLink}
            id={spiritus.id}
            type={"SPIRITUS"}
            userIsOwner={sessionUserIsOwner()}
            saved={spiritus.flags.includes("SAVED")}
          />
        </div>
        <div className="w-full text-sp-white mt-4">
          <MoreStories
            stories={stories}
            spiritus={spiritus}
            userIsOwner={sessionUserIsOwner()}
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

// TODO: remove when there's isGuardian flag is added to spiritus
function filterStories(items, isOwner) {
  if (isOwner) {
    return items;
  }

  return items.filter((s) => s.flags.includes("PUBLIC"));
}

// Fetch spiritus and story data.
// Redirects to 404 in case of any errors.
export async function getServerSideProps(context) {
  const { slug } = context.query;
  // there some funny logic to figure out if user is spiritus owner
  let userCode = "";
  const session = await getSession(context);

  try {
    let spiritus;
    if (session && session?.user?.accessToken) {
      userCode = session.user.code;
      const res = await GetSpiritusBySlug(slug, session?.user?.accessToken);
      spiritus = res.data;
    } else {
      const res = await GetSpiritusBySlug(slug);
      spiritus = res.data;
    }
    const isOwner = spiritus.users.map((u) => u.code).includes(userCode);

    const { data: resStories } = await GetSpiritusStoriesBySlug(slug);
    const stories = filterStories(resStories?.content || [], isOwner);

    return {
      props: {
        key: `${context.locale}-spiritus-${slug}`,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
        ])),
        stories,
        spiritus,
        isLastPage: resStories.last,
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
