import { useState } from "react";

import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Alert } from "@/components/Status";
import { EditStoryForm } from "@/components/forms/EditStory";
import { EditorLayout } from "@/components/forms/Layout";
import FullWidthLayout from "@/components/layout/LayoutV2";

import { GetSpiritusById, GetTags } from "@/service/http/spiritus";
import { GetStoryById } from "@/service/http/story";
import { GetStoryInOriginalLang } from "@/service/http/story_crud";

export default function EditStoryPage({ spiritus, story, tags }) {
  const { t } = useTranslation("common");

  const [isSuccess, setIsSuccess] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function onSuccess() {
    setIsSuccess(true);
    setToastMessage(t("message_save_success"));
    setToastOpen(true);
  }

  function onError(message) {
    setIsSuccess(false);
    setToastMessage(message);
    setToastOpen(true);
  }

  const clearToast = () => {
    setToastOpen(false);
    setToastMessage("");
  };

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("edit_story_meta_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("edit_story_meta_desc")} />
      </Head>
      <div className="relative mb-64 min-h-screen">
        {toastOpen && (
          <div className="sticky right-0 top-8 z-50 mb-5">
            <div className="flex justify-end">
              <Alert
                isSuccess={isSuccess}
                message={toastMessage}
                onClick={clearToast}
              />
            </div>
          </div>
        )}
        <EditorLayout
          menuId={2} //stories
          spiritusSlug={spiritus.slug}
          name={spiritus.name}
          surname={spiritus.surname}
          spiritusId={spiritus.id}
          birth={spiritus.birth}
          death={spiritus.death}
          onDelete={() => {}}
        >
          <EditStoryForm
            story={story}
            tagChoices={tags}
            onError={onError}
            onSuccess={onSuccess}
          />
        </EditorLayout>
      </div>
    </FullWidthLayout>
  );
}

export async function getServerSideProps(context) {
  const { storyId: id } = context.query;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const { data: story } = await GetStoryInOriginalLang(
      session.user.accessToken,
      id
    );
    const { data: spiritus } = await GetSpiritusById(
      story.spiritus.id,
      session.user.accessToken,
      context.locale
    );
    const { data: tags } = await GetTags(context.locale);

    if (!spiritus || !spiritus?.users) {
      throw "missing spiritus data";
    }

    let isOwner = false;
    for (const su of spiritus.users) {
      if (su.email === session.user.email && su.code === session.user.code) {
        isOwner = true;
      }
    }

    if (!isOwner) {
      throw "edit not permitted";
    }

    const initText = story.paragraphs
      .sort((p1, p2) => {
        if (p1.index < p2.index) {
          return -1;
        }
        if (p1.index > p2.index) {
          return 1;
        }
        // if equal
        return 0;
      })
      .reduce((prev, cur) => prev + `${cur.text}\n\n`, "");
    return {
      props: {
        story: { ...story, storyText: initText },
        spiritus,
        tags,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
          "cookies",
        ])),
      },
    };
  } catch (err) {
    // redirect to home in case of err
    // known errs: 404 Not Found Spiritus
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
