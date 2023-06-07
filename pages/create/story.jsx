import { useState } from "react";

import Head from "next/head";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Alert } from "@/components/Status";
import { CreateStoryFormV2 } from "@/components/forms/CreateStory";
import Layout from "@/components/layout/Layout";

import { GetSpiritusById, GetTags } from "@/service/http/spiritus";

export default function CreateStoryPage({ spiritus, tags }) {
  const { t } = useTranslation("common");
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function onError(message) {
    setToastMessage(message);
    setToastOpen(true);
  }

  const clearToast = () => {
    setToastOpen(false);
    setToastMessage("");
  };

  function onSuccess() {
    setIsSuccess(true);
    setToastMessage(t("message_save_success"));
    setToastOpen(true);
  }

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
        <div className="mx-auto mt-12 flex w-3/4 flex-1 flex-col space-y-6 pb-96">
          <div className="w-full rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-6 py-10 font-medium dark:from-sp-dark-brown dark:to-sp-brown">
            <CreateStoryFormV2
              spiritusId={spiritus.id}
              tagChoices={tags}
              onError={onError}
              onSuccess={onSuccess}
            />
          </div>
        </div>
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
