import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { getISOLocalDate } from "@wojtekmaj/date-utils";

import {
  PlusCircleIcon as OutlinePlusCircleIcon,
  UploadIcon,
} from "@heroicons/react/outline";

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
export default function CreateStoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { spiritus } = router.query;

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

  useEffect(() => {
    // redirect users that are not logged in
    // the API method requires authentication to create spiritus
    if (status !== "authenticated" && status !== "loading") {
      router.push("/");
    }
  }, [status]);

  // stepper is 0 indexed!
  const numSteps = 6;
  const [step, setStep] = useState(0);

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
      const res = await ProxyCreateStory(
        {
          spiritusId: spiritus,
          title,
          tags: tags.map((t) => t.id),
          paragraphs: setParagrapghs(storyText),
          description: summary,
          date: getISOLocalDate(date),
        },
        session.user.accessToken
      );
      setStory(res.data);
      setPending(false);
    } catch (err) {
      setPending(false);
    }
  };

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
      <div className="py-5 h-screen">
        <div className="container mx-auto lg:px-12 lg:w-4/5">
          {story ? (
            <Success />
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
                className={`px-4 py-3 rounded-full w-52 font-semibold text-sp-white border-sp-lighter border-3 hover:bg-sp-white hover:text-sp-dark ${
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
                className={`px-4 py-3 rounded-full w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 text-sp-dark ${
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
                className="px-4 py-3 rounded-full w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 text-sp-dark"
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

function Success() {
  return (
    <div className="flex flex-col items-center my-4 gap-1 w-1/2 mx-auto sm:w-full md:w-1/2 mt-24">
      <div className="bg-sp-fawn bg-opacity-25 rounded-xl p-2 mb-2">
        <StoryIcon />
      </div>
      <h2 className="font-bold text-3xl text-sp-white">Nice work!</h2>
      <div className="flex flex-col items-center gap-1">
        <p className="mt-1 text-center text-sp-white opacity-50 w-3/4 text">
          You’ve just created a Story for your Spiritus.
        </p>
      </div>
      <div className="flex mx-auto items-center justify-center gap-4 text-sp-white mt-4">
        <button className="flex flex-col items-center justify-center h-20 w-36 bg-gradient-to-r from-sp-dark-brown to-sp-brown rounded-lg p-4">
          <UploadIcon className="w-6 h-6" />
          <p className="font-semibold text-center">Share</p>
        </button>
        <Link href={`/create/story`}>
          <a className="flex flex-col items-center justify-center h-20 w-36 bg-gradient-to-r from-sp-dark-brown to-sp-brown rounded-lg p-4">
            <OutlinePlusCircleIcon className="w-6 h-6" />
            <p className="font-semibold">New story</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
