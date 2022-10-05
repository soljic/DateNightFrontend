import { useState } from "react";

import Head from "next/head";
import Router from "next/router";

import { getSession, useSession } from "next-auth/react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getISOLocalDate } from "@wojtekmaj/date-utils";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  PlusCircleIcon as OutlinePlusCircleIcon,
  UploadIcon,
} from "@heroicons/react/outline";

import { GetSpiritusById } from "../../service/http/spiritus";
import { ProxyCreateStory } from "../../service/http/proxy";

import LayoutNoFooter from "../../components/layout/LayoutNoFooter";
import {
  StoryDate,
  StorySummary,
  StoryTextEditor,
  StoryTitle,
  StoryType,
} from "../../components/forms/CreateStory";
import { StoryImageUploader } from "../../components/Uploaders";
import { ProgressBar, Spinner } from "../../components/Status";
import { StoryIcon } from "../../components/Icons";

// TODO: create story local storage, pass request to BE
export default function CreateStoryPage({ spiritus }) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  // stepper is 0 indexed!
  const numSteps = 5;
  const [step, setStep] = useState(0);

  // form fields
  const [isPrivate, setIsPrivate] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [storyText, setStoryText] = useState("");
  const [date, setDate] = useState();

  // check /component/Uploaders::StoryImageUploader
  // for more context
  const [images, setImages] = useState([]);
  const [summary, setSummary] = useState("");

  const [story, setStory] = useState(false);

  // true if view is waiting for BE response
  const [pending, setPending] = useState(false);

  const nextStep = () => {
    if (step < numSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const createStory = async () => {
    try {
      setPending(true);
      const form = new FormData();
      const body = {
        spiritusId: spiritus.id,
        title,
        tags: tags.map((t) => t.id),
        paragraphs: setParagraphs(storyText),
        description: summary,
        date: date ? getISOLocalDate(date) : null,
        private: isPrivate,
      };
      console.log("KREIRAJ", body);
      const blob = new Blob([JSON.stringify(body)], {
        type: "application/json",
      });
      form.append("request", blob);

      if (images.length) {
        form.append("file", images[0].file);
      }
      const res = await ProxyCreateStory(session.user.accessToken, form);

      setStory(res.data);
      setPending(false);
    } catch (err) {
      console.log("GREŠKA", err);
      setPending(false);
    }
  };

  // TODO: remove spliting into paras if we change
  // to .md or .rtf or use <p style="whitespace: pre-line;">
  const setParagraphs = (story) => {
    return story.split("\n\n").map((para, idx) => {
      return { index: idx, text: para.trim() };
    });
  };

  const showCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <StoryTextEditor storyText={storyText} setStoryText={setStoryText} />
        );
      case 2:
        return <StoryDate date={date} setDate={setDate} />;
      case 3:
        return (
          <StoryTitle
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
          />
        );
      case 4:
        return <StoryImageUploader images={images} setImages={setImages} />;
      case 5:
        return <StorySummary summary={summary} setSummary={setSummary} />;

      default:
        return <StoryType setIsPrivate={setIsPrivate} nextStep={nextStep} />;
    }
  };
  return (
    <LayoutNoFooter>
      <Head>
        <title>{t("meta_create_story_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_create_story_description")} />
      </Head>
      <div className="py-5 h-screen">
        <div>
          {story ? (
            <Success
              storyId={story.id}
              name={spiritus.name}
              surname={spiritus.surname}
            />
          ) : (
            <>
              <ProgressBar maxSteps={numSteps + 1} step={step + 1} />
              <form id="stepper-form" className="flex flex-1 flex-col">
                <div className="mb-10">{showCurrentStep()}</div>
              </form>
            </>
          )}
        </div>
        {step > 0 && !story && (
          <div className="flex flex-col-reverse md:flex-row justify-center mt-8 gap-2 md:gap-6">
            {step > 0 && (
              <button
                onClick={prevStep}
                className={`px-4 py-3 rounded-full w-full md:w-52 font-semibold text-sp-black dark:text-sp-white border-sp-lighter border-3 hover:bg-sp-white hover:text-sp-black ${
                  pending && "hidden"
                }`}
                disabled={pending}
              >
                {t("back")}
              </button>
            )}
            {step !== numSteps ? (
              <button
                onClick={nextStep}
                disabled={!storyText}
                className={`px-4 py-3 rounded-full w-full md:w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-day-200 dark:border-sp-medium dark:border-opacity-80 text-sp-black ${
                  storyText || "opacity-30"
                }`}
              >
                {t("next")}
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  createStory();
                }}
                disabled={pending}
                className="px-4 py-3 rounded-full w-full md:w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-day-200 dark:border-sp-medium dark:border-opacity-80 text-sp-black"
              >
                {pending ? (
                  <Spinner text={t("creating")} />
                ) : (
                  <span>{t("create")}</span>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </LayoutNoFooter>
  );
}

function Success({ storyId, name, surname, shortLink }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center my-4 gap-1 w-1/2 mx-auto sm:w-full md:w-1/2 mt-24 text-sp-black dark:text-sp-white">
      <div className="bg-sp-fawn bg-opacity-25 rounded-xl p-2 mb-2">
        <StoryIcon />
      </div>
      <h2 className="font-bold text-3xl">{t("story_success_title")}</h2>
      <div className="flex flex-col items-center gap-1">
        <p className="mt-1 text-center opacity-50 w-3/4 text">
          {t("story_success_subtitle")}{" "}
          <span>
            {name} {surname}
          </span>
        </p>
      </div>
      <div className="flex mx-auto items-center justify-center gap-4 mt-4">
        <CopyToClipboard text={shortLink || "#"}>
          <button className="flex flex-col items-center justify-center h-20 w-36 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown rounded-lg p-4">
            <UploadIcon className="w-6 h-6" />
            <p className="font-semibold text-center">{t("share")}</p>
          </button>
        </CopyToClipboard>
        <button
          className="flex flex-col items-center justify-center h-20 w-36 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown rounded-lg p-4"
          onClick={() => Router.reload()}
        >
          <OutlinePlusCircleIcon className="w-6 h-6" />
          <p className="font-semibold">{t("new_story")}</p>
        </button>
      </div>
    </div>
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
    return {
      props: {
        spiritus: data,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
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
