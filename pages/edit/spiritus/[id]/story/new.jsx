import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/navigation";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Alert } from "@/components/Status";
import {
  CreateStoryFormV2,
  CreateStorySuccess,
} from "@/components/forms/CreateStory";
import { EditorLayout } from "@/components/forms/Layout";
import Layout from "@/components/layout/Layout";

import { GetSpiritusById, GetTags } from "@/service/http/spiritus";

export default function NewStory({ spiritus, tags }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);
  const [newStoryURL, setNewStoryURL] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function onError(message) {
    setIsSuccess(false);
    setToastMessage(message);
    setToastOpen(true);
  }

  const clearToast = () => {
    setToastOpen(false);
    setToastMessage("");
    setIsSuccess(false);
  };

  // scroll to top and redirect user to new story after 6 seconds
  const onSuccess = async (storySlug) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const url = `/spiritus/${spiritus.slug}/story/${storySlug}`;
    setNewStoryURL(url);

    setTimeout(async () => {}, 7000);
    router.push(url);
  };

  function onCancel() {
    router.push(`/edit/spiritus/${spiritus.id}/stories`);
  }

  return (
    <Layout>
      <Head>
        <title>{t("edit_spiritus_meta_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("edit_spiritus_meta_desc")} />
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
          <div className="pb-96">
            {newStoryURL ? (
              <CreateStorySuccess
                redirectURL={newStoryURL}
                name={spiritus.name}
                surname={spiritus.surname}
              />
            ) : (
              <CreateStoryFormV2
                spiritusId={spiritus.id}
                tagChoices={tags}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
              />
            )}
          </div>
        </EditorLayout>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
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
    const { data: spiritus } = await GetSpiritusById(id);
    const { data: tags } = await GetTags();

    return {
      props: {
        spiritus,
        tags,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
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
