import { useState } from "react";

import Link from "next/link";
import Head from "next/head";

import { getSession, useSession } from "next-auth/react";

import { getISOLocalDate } from "@wojtekmaj/date-utils";

import {
  PlusCircleIcon as OutlinePlusCircleIcon,
  UploadIcon,
} from "@heroicons/react/outline";

import { GetSpiritusById } from "../../service/http/spiritus";
import { ProxyCreateStory } from "../../service/http/proxy";

import Layout from "../../components/layout/Layout";
import {
  StoryDate,
  StoryLocation,
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
  const { data: session, status } = useSession();

  // stepper is 0 indexed!
  const numSteps = 6;
  const [step, setStep] = useState(0);

  // form fields
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [storyText, setStoryText] = useState("");
  const [date, setDate] = useState();
  const [location, setLocation] = useState("");

  const [images, setImages] = useState([]);
  const [summary, setSummary] = useState("");

  const [story, setStory] = useState();

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
      // const res = await ProxyCreateStory(
      //   {
      //     spiritusId: spiritus.id,
      //     title,
      //     tags: tags.map((t) => t.id),
      //     paragraphs: setParagrapghs(storyText),
      //     description: summary,
      //     date: getISOLocalDate(date),
      //   },
      //   session.user.accessToken
      // );
      const res = {
        data: {
          spiritusId: spiritus.id,
          title,
          tags: tags.map((t) => t.id),
          paragraphs: setParagrapghs(storyText),
          description: summary,
          date: getISOLocalDate(date),
        },
      };
      setStory(res.data);
      setPending(false);
    } catch (err) {
      setPending(false);
    }
  };

  // TODO: remove spliting into paras if we change to .md or .rtf
  const setParagrapghs = (story) => {
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
        return <StoryLocation location={location} setLocation={setLocation} />;
      case 4:
        return (
          <StoryTitle
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
          />
        );
      case 5:
        return <StoryImageUploader images={images} setImages={setImages} />;
      case 6:
        return <StorySummary summary={summary} setSummary={setSummary} />;

      default:
        return <StoryType setType={setType} nextStep={nextStep} />;
    }
  };
  return (
    <Layout>
      <Head>
        <title>Spiritus | Create Story </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Add or suggest a story for Spiritus and keep it safe forver."
        />
      </Head>
      <div className="py-5 h-screen">
        <div className="container mx-auto lg:px-12 lg:w-4/5">
          {story ? (
            <Success
              id={spiritus.id}
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
          <div className="flex justify-center gap-8">
            {step > 0 && (
              <button
                onClick={prevStep}
                className={`px-4 py-3 rounded-full w-52 font-semibold text-sp-black dark:text-sp-white border-sp-lighter border-3 hover:bg-sp-white hover:text-sp-black ${
                  pending && "hidden"
                }`}
                disabled={pending}
              >
                Back
              </button>
            )}
            {step !== numSteps ? (
              <button
                onClick={nextStep}
                disabled={!storyText}
                className={`px-4 py-3 rounded-full w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-day-200 dark:border-sp-medium dark:border-opacity-80 text-sp-black ${
                  storyText || "opacity-30"
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  createStory();
                }}
                disabled={pending}
                className="px-4 py-3 rounded-full w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-day-200 dark:border-sp-medium dark:border-opacity-80 text-sp-black"
              >
                {pending ? <Spinner text="Creating..." /> : "Create"}
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

function Success({ id, name, surname }) {
  return (
    <div className="flex flex-col items-center my-4 gap-1 w-1/2 mx-auto sm:w-full md:w-1/2 mt-24 text-sp-black dark:text-sp-white">
      <div className="bg-sp-fawn bg-opacity-25 rounded-xl p-2 mb-2">
        <StoryIcon />
      </div>
      <h2 className="font-bold text-3xl">Nice work!</h2>
      <div className="flex flex-col items-center gap-1">
        <p className="mt-1 text-center opacity-50 w-3/4 text">
          You’ve just created a Story for{" "}
          <span>
            {name} {surname}
          </span>
        </p>
      </div>
      <div className="flex mx-auto items-center justify-center gap-4 mt-4">
        <button className="flex flex-col items-center justify-center h-20 w-36 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown rounded-lg p-4">
          <UploadIcon className="w-6 h-6" />
          <p className="font-semibold text-center">Share</p>
        </button>
        <Link href={`/create/story?spiritus=${id}`}>
          <a className="flex flex-col items-center justify-center h-20 w-36 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown rounded-lg p-4">
            <OutlinePlusCircleIcon className="w-6 h-6" />
            <p className="font-semibold">New story</p>
          </a>
        </Link>
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
      },
    };
  } catch (err) {
    console.log(err);
    // redirect to home in case of err
    // know errs: 404 Not Found Spiritus
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
