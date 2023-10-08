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
import FullWidthLayout from "@/components/layout/LayoutV2";

import { GetSpiritusById, GetTags } from "@/service/http/spiritus";

export default function CreateStoryPage({
  spiritus,
  isGuardian,
  tags,
  locale,
}) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [isSuccess, setIsSuccess] = useState(true);
  // const [redirectURL, setRedirectURL] = useState("123");
  const [redirectURL, setRedirectURL] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  function onError(message) {
    setIsSuccess(false);
    setToastMessage(message);
    setToastOpen(true);
  }

  function onCancel() {
    router.push(`/spiritus/${spiritus.slug}/stories`);
  }

  const clearToast = () => {
    setToastOpen(false);
    setToastMessage("");
    setIsSuccess(true);
  };

  // scroll to top and redirect user to new story after 6 seconds
  const onSuccess = async (storySlug) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    let url = `/spiritus/${spiritus.slug}/stories`;
    if (isGuardian) {
      const url = `/spiritus/${spiritus.slug}/story/${storySlug}`;
    }
    setRedirectURL(url);
    setIsSuccess(true);

    setTimeout(async () => {}, 7000);
    router.push(url);
  };

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_create_story_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_create_story_description")} />
      </Head>
      <div className="mx-auto min-h-screen max-w-7xl py-5">
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
        {redirectURL ? (
          <div className="flex h-full justify-center">
            <CreateStorySuccess
              redirectURL={redirectURL}
              name={spiritus.name}
              surname={spiritus.surname}
            />
          </div>
        ) : (
          <div className="mx-auto mt-12 flex w-3/4 flex-1 flex-col space-y-6 pb-96">
            <div className="w-full rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-6 py-10 font-medium dark:from-sp-dark-brown dark:to-sp-brown">
              {isGuardian ? (
                <h2 className="mb-6 px-1.5 text-center font-bold text-sp-black text-2xl dark:text-sp-white xl:text-3xl">
                  {t("create_story")}
                </h2>
              ) : (
                <div className="mb-6 text-center">
                  <h2 className="mb-2 px-1.5 text-center font-bold text-sp-black text-2xl dark:text-sp-white xl:text-3xl">
                    {t("suggest_story")}
                  </h2>
                  <p className="font-normal text-sp-day-400 text-sm">
                    {t("suggest_story_subtitle")}
                  </p>
                </div>
              )}
              <CreateStoryFormV2
                spiritusId={spiritus.id}
                isGuardian={isGuardian}
                tagChoices={tags}
                onError={onError}
                onSuccess={onSuccess}
                onCancel={onCancel}
                locale={locale}
              />
            </div>
          </div>
        )}
      </div>
    </FullWidthLayout>
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

    const resSpiritus = await GetSpiritusById(id, session?.user?.accessToken);
    const data = resSpiritus.data;
    const isGuardian = data?.flags.includes("GUARDIAN");

    const { data: tags } = await GetTags(context.locale);

    return {
      props: {
        spiritus: data,
        isGuardian,
        tags,
        locale: context.locale || "en",
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
