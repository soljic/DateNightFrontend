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
import Layout from "@/components/layout/Layout";

import { GetSpiritusById, GetTags } from "@/service/http/spiritus";

export default function CreateStoryPage({ spiritus, tags }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(true);
  const [newStoryURL, setNewStoryURL] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function onError(message) {
    setToastMessage(message);
    setToastOpen(true);
  }

  function onCancel() {
    router.push(`/spiritus/${spiritus.slug}/stories`);
  }

  const clearToast = () => {
    setToastOpen(false);
    setToastMessage("");
  };

  // scroll to top and redirect user to new story after 6 seconds
  const onSuccess = async (storySlug) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const url = `/spiritus/${spiritus.slug}/story/${storySlug}`;
    setNewStoryURL(url);

    setTimeout(async () => {}, 7000);
    router.push(url);
  };

  return (
    <Layout>
      <Head>
        <title>{t("meta_create_story_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_create_story_description")} />
      </Head>
      <div className="min-h-screen py-5">
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
        {newStoryURL ? (
          <CreateStorySuccess
            redirectURL={newStoryURL}
            name={spiritus.name}
            surname={spiritus.surname}
          />
        ) : (
          <div className="mx-auto mt-12 flex w-3/4 flex-1 flex-col space-y-6 pb-96">
            <div className="w-full rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-6 py-10 font-medium dark:from-sp-dark-brown dark:to-sp-brown">
              <h2 className="mb-6 px-1.5 text-center font-bold text-sp-black text-2xl dark:text-sp-white xl:text-3xl">
                {t("create_story")}
              </h2>
              <CreateStoryFormV2
                spiritusId={spiritus.id}
                tagChoices={tags}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { spiritus: id } = context.query;
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
    if (!id) {
      throw "SpiritusId not provided in story create";
    }

    const resSpiritus = await GetSpiritusById(id);
    const data = resSpiritus.data;
    const { data: tags } = await GetTags();

    return {
      props: {
        spiritus: data,
        tags,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
        ])),
      },
    };
  } catch (err) {
    console.log("error creating story\n", err);
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
