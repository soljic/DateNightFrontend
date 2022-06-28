import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import { getISOLocalDate } from "@wojtekmaj/date-utils";

import { PlusCircleIcon } from "@heroicons/react/solid";
import {
  PlusCircleIcon as OutlinePlusCircleIcon,
  CalendarIcon,
  XIcon,
  SearchIcon,
  UploadIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";

import Layout from "../../components/layout/Layout";

import { ProxyCreateStory, ProxyGetTags } from "../../service/http/proxy";

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
      console.log(err)
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
        return <ChooseDates date={date} setDate={setDate} />;
      case 3:
        return <Location location={location} setLocation={setLocation} />;
      case 4:
        return (
          <Title
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
          />
        );
      case 5:
        return <ImageUploader images={images} setImages={setImages} />;
      case 6:
        return <Summary summary={summary} setSummary={setSummary} />;

      default:
        return <ChooseType setType={setType} nextStep={nextStep} />;
    }
  };
  return (
    <Layout>
      <div className="py-5 h-screen">
        <div className="container mx-auto lg:px-12 lg:w-4/5">
          {story ? (
            <CreateSuccess />
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
                {pending ? <CreateSpinner /> : "Create"}
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

function StoryTextEditor({ storyText, setStoryText }) {
  return (
    <div className="mx-2 mt-12 lg:mx-8">
      <h2 className="text-2xl font-bold text-sp-white">Write new story</h2>
      <div className="mt-4">
        <textarea
          value={storyText}
          onChange={(e) => {
            setStoryText(e.target.value);
          }}
          className="w-full text-lg py-3 px-4 text-bottom bg-sp-dark text-sp-white rounded-md border border-sp-lighter placeholder-sp-lighter"
          placeholder="Enter story text"
          rows="10"
        ></textarea>
      </div>
    </div>
  );
}

function AddImageIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.75 3C19.5449 3 21 4.45507 21 6.25L21 17.75C21 19.5449 19.5449 21 17.75 21L6.25 21C4.45507 21 3 19.5449 3 17.75L3 11.5019C3.47425 11.6996 3.97687 11.8428 4.50009 11.9236L4.5 17.75C4.5 17.9584 4.53643 18.1583 4.60326 18.3437L10.4258 12.643C11.2589 11.8273 12.5675 11.7885 13.4458 12.5266L13.5742 12.6431L19.3964 18.3447C19.4634 18.159 19.5 17.9588 19.5 17.75L19.5 6.25C19.5 5.2835 18.7165 4.5 17.75 4.5L11.9236 4.50009C11.8428 3.97687 11.6996 3.47425 11.5019 3L17.75 3ZM11.5588 13.644L11.4752 13.7148L5.66845 19.4011C5.8504 19.4651 6.04613 19.5 6.25 19.5L17.75 19.5C17.9535 19.5 18.1489 19.4653 18.3305 19.4014L12.5247 13.7148C12.2596 13.4553 11.8501 13.4316 11.5588 13.644ZM15.2521 6.5C16.4959 6.5 17.5042 7.50831 17.5042 8.75212C17.5042 9.99592 16.4959 11.0042 15.2521 11.0042C14.0083 11.0042 13 9.99592 13 8.75212C13 7.50831 14.0083 6.5 15.2521 6.5ZM5.5 0C8.53757 0 11 2.46243 11 5.5C11 8.53757 8.53757 11 5.5 11C2.46243 11 0 8.53757 0 5.5C0 2.46243 2.46243 0 5.5 0ZM15.2521 8C14.8367 8 14.5 8.33673 14.5 8.75212C14.5 9.1675 14.8367 9.50423 15.2521 9.50423C15.6675 9.50423 16.0042 9.1675 16.0042 8.75212C16.0042 8.33673 15.6675 8 15.2521 8ZM5.5 1.99923L5.41012 2.00729C5.20603 2.04433 5.0451 2.20527 5.00806 2.40936L5 2.49923L4.99965 4.99923L2.49765 5L2.40777 5.00806C2.20368 5.0451 2.04275 5.20603 2.00571 5.41012L1.99765 5.5L2.00571 5.58988C2.04275 5.79397 2.20368 5.9549 2.40777 5.99194L2.49765 6L5.00065 5.99923L5.00111 8.50348L5.00916 8.59336C5.04621 8.79745 5.20714 8.95839 5.41123 8.99543L5.50111 9.00348L5.59098 8.99543C5.79508 8.95839 5.95601 8.79745 5.99305 8.59336L6.00111 8.50348L6.00065 5.99923L8.50457 6L8.59444 5.99194C8.79853 5.9549 8.95947 5.79397 8.99651 5.58988L9.00457 5.5L8.99651 5.41012C8.95947 5.20603 8.79853 5.0451 8.59444 5.00806L8.50457 5L5.99965 4.99923L6 2.49923L5.99194 2.40936C5.9549 2.20527 5.79397 2.04433 5.58988 2.00729L5.5 1.99923Z"
        fill={`${fill ? "#E3AA6D" : "#F0EFED"}`}
      />
    </svg>
  );
}

// Image uploader for stories.
// There are subtle differences between this uploader
// and the one for spiritus, they are not interchangeable.
function ImageUploader({ images, setImages }) {
  const inputFile = useRef(null);

  const onOpenFileDialog = (event) => {
    event.preventDefault();
    inputFile.current.click();
  };

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.target.files;
    onAdd(files);
  };

  const onRemove = (idx) => {
    if (idx === 0) {
      setImages((prev) => prev.slice(1));
    } else if (idx === images.length) {
      setImages((prev) => prev.slice(0, idx));
    } else {
      setImages((prev) => prev.slice(0, idx).concat(prev.slice(idx + 1)));
    }
  };

  const onAdd = (files) => {
    const addFiles = Array.from(files).map((f) => {
      return {
        file: f,
        // NOTE: previewURL must be destroyed on unmount
        // -> check if this is leaking memory and refactor
        previewURL: URL.createObjectURL(f),
      };
    });

    setImages((prev) => prev.concat(addFiles));
  };

  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <AddImageIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        Do you have an image for this story? If yes, please add it here.
      </p>
      <p className="text-sp-lighter text-sm mt-2">*Optional</p>
      <input
        type="file"
        id="file"
        ref={inputFile}
        className="text-white"
        style={{ display: "none" }}
        accept="image/*"
        onChange={onChangeFile}
      />

      {!images.length ? (
        <button
          className="inline-flex bg-sp-white rounded-3xl py-2 px-6 text-sp-dark mt-3"
          onClick={onOpenFileDialog}
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className="font-semibold ml-1">Add Image</span>
        </button>
      ) : (
        <div className="flex flex-row items-center justify-center mt-4 mb-8">
          {images.map((f, i) => {
            return (
              <Preview
                title={f.file.name}
                previewURL={f.previewURL}
                key={i}
                index={i}
                onRemove={onRemove}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Preview({ previewURL, title, onRemove, index }) {
  return (
    <div className="relative h-72 w-72" id={index}>
      <div className="mx-2 mt-2 rounded-2xl overflow-clip">
        <img src={previewURL} alt={title} className="h-72 w-72" />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(index);
        }}
        className="absolute top-0 right-0 text-opacity-60 text-black overflow-visible rounded-full bg-red-400 p-2"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

function Title({ title, setTitle, tags, setTags }) {
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await ProxyGetTags();
        if (res?.data.length) {
          setItemsList(res.data);
        }
      } catch {}
    }
    fetchData();
  }, []);

  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <AddSpiritusIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        Enter title of the Story.
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Enter story title"
                className="p-3 bg-sp-dark border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-white"
              />
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <div className="border-2 rounded border-sp-medium p-2.5">
                <MultiSelectInput
                  items={itemsList}
                  selected={tags}
                  setSelected={setTags}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChooseType({ setType, nextStep }) {
  return (
    <div className="mx-2 mt-12 lg:mx-8">
      <h2 className="text-2xl font-bold text-sp-white">
        What type of Story do you want to create?
      </h2>
      <div className="mt-4 mx-auto">
        <div className="flex flex-col gap-2 md:flex-row">
          <button
            onClick={(e) => {
              e.preventDefault();
              setType("public");
              nextStep();
            }}
            className="flex appearance-none items-center gap-4 rounded-xl border-2 border-sp-medium bg-sp-medlight p-4 text-sp-white outline-none"
          >
            <div className="rounded-lg bg-sp-fawn bg-opacity-20 p-2 align-middle">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.754 7C13.7205 7 14.504 7.7835 14.504 8.75V13.499C14.504 15.9848 12.4888 18 10.003 18C7.51712 18 5.50193 15.9848 5.50193 13.499V8.75C5.50193 7.7835 6.28543 7 7.25193 7L12.754 7ZM12.754 8.5H7.25193C7.11386 8.5 7.00193 8.61193 7.00193 8.75V13.499C7.00193 15.1564 8.34554 16.5 10.003 16.5C11.6604 16.5 13.004 15.1564 13.004 13.499V8.75C13.004 8.61193 12.8921 8.5 12.754 8.5ZM1.75 7L5.13128 6.99906C4.78791 7.41447 4.56424 7.93246 4.51312 8.50019L1.75 8.5C1.61193 8.5 1.5 8.61193 1.5 8.75L1.5 11.9988C1.5 13.3802 2.61984 14.5 4.00124 14.5C4.20123 14.5 4.39574 14.4765 4.58216 14.4322C4.66687 14.9361 4.82156 15.4167 5.03487 15.864C4.70577 15.953 4.35899 16 4.00124 16C1.79142 16 0 14.2086 0 11.9988L0 8.75C0 7.7835 0.783502 7 1.75 7ZM14.8747 6.99906L18.25 7C19.2165 7 20 7.7835 20 8.75L20 12C20 14.2091 18.2091 16 16 16C15.6436 16 15.298 15.9534 14.9691 15.8659C15.184 15.4177 15.3388 14.9371 15.425 14.4331C15.6092 14.477 15.8019 14.5 16 14.5C17.3807 14.5 18.5 13.3807 18.5 12L18.5 8.75C18.5 8.61193 18.3881 8.5 18.25 8.5L15.4928 8.50019C15.4417 7.93246 15.218 7.41447 14.8747 6.99906ZM10 0C11.6569 0 13 1.34315 13 3C13 4.65685 11.6569 6 10 6C8.34315 6 7 4.65685 7 3C7 1.34315 8.34315 0 10 0ZM16.5 1C17.8807 1 19 2.11929 19 3.5C19 4.88071 17.8807 6 16.5 6C15.1193 6 14 4.88071 14 3.5C14 2.11929 15.1193 1 16.5 1ZM3.5 1C4.88071 1 6 2.11929 6 3.5C6 4.88071 4.88071 6 3.5 6C2.11929 6 1 4.88071 1 3.5C1 2.11929 2.11929 1 3.5 1ZM10 1.5C9.17157 1.5 8.5 2.17157 8.5 3C8.5 3.82843 9.17157 4.5 10 4.5C10.8284 4.5 11.5 3.82843 11.5 3C11.5 2.17157 10.8284 1.5 10 1.5ZM16.5 2.5C15.9477 2.5 15.5 2.94772 15.5 3.5C15.5 4.05228 15.9477 4.5 16.5 4.5C17.0523 4.5 17.5 4.05228 17.5 3.5C17.5 2.94772 17.0523 2.5 16.5 2.5ZM3.5 2.5C2.94772 2.5 2.5 2.94772 2.5 3.5C2.5 4.05228 2.94772 4.5 3.5 4.5C4.05228 4.5 4.5 4.05228 4.5 3.5C4.5 2.94772 4.05228 2.5 3.5 2.5Z"
                  fill="#E3AA6D"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <p className="font-semibold">Public</p>
              <p className="text-sp-lighter text-left">
                Everybody can read this story.
              </p>
            </div>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setType("private");
              nextStep();
            }}
            className="flex appearance-none items-center gap-4 rounded-xl border-2 bg-sp-medlight border-sp-medium p-4 text-sp-white outline-none"
          >
            <div className="rounded-lg bg-sp-fawn bg-opacity-20 p-2 align-middle">
              <svg
                width="18"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C10.2091 0 12 1.79086 12 4L12 6H13.75C14.9926 6 16 7.00736 16 8.25L16 17.75C16 18.9926 14.9926 20 13.75 20L2.25 20C1.00736 20 0 18.9926 0 17.75L0 8.25C0 7.00736 1.00736 6 2.25 6L4 6V4C4 1.79086 5.79086 0 8 0ZM13.75 7.5L2.25 7.5C1.83579 7.5 1.5 7.83579 1.5 8.25L1.5 17.75C1.5 18.1642 1.83579 18.5 2.25 18.5L13.75 18.5C14.1642 18.5 14.5 18.1642 14.5 17.75L14.5 8.25C14.5 7.83579 14.1642 7.5 13.75 7.5ZM8.00012 11.5C8.82855 11.5 9.50012 12.1716 9.50012 13C9.50012 13.8284 8.82855 14.5 8.00012 14.5C7.1717 14.5 6.50012 13.8284 6.50012 13C6.50012 12.1716 7.1717 11.5 8.00012 11.5ZM8 1.5C6.61929 1.5 5.5 2.61929 5.5 4V6L10.5 6L10.5 4C10.5 2.61929 9.38071 1.5 8 1.5Z"
                  fill="#E3AA6D"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <p className="font-semibold">Private</p>
              <p className="text-sp-lighter text-left">
                Only you can read this story.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function AddRangeIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.7509 11.9972C14.7314 11.9972 15.5654 12.6248 15.8731 13.5002H13.8176C13.7956 13.4982 13.7734 13.4972 13.7509 13.4972L2.24912 13.4972C1.83553 13.4972 1.50024 13.8325 1.50024 14.2461L1.50024 14.8238C1.50024 15.3595 1.69135 15.8776 2.03921 16.2849C3.29252 17.7526 5.2584 18.4984 7.9967 18.4984C8.05287 18.4984 8.10871 18.4981 8.16423 18.4975C8.24986 18.6809 8.36747 18.8499 8.5135 18.9957L9.44804 19.9288C8.98384 19.9752 8.49998 19.9984 7.9967 19.9984C4.85084 19.9984 2.46483 19.0932 0.898524 17.259C0.318763 16.5801 0.000244141 15.7166 0.000244141 14.8238L0.000244141 14.2461C0.000244141 13.0041 1.0071 11.9972 2.24912 11.9972L13.7509 11.9972ZM7.9967 0.00195312C10.7581 0.00195312 12.9967 2.24053 12.9967 5.00195C12.9967 7.76338 10.7581 10.002 7.9967 10.002C5.23528 10.002 2.9967 7.76338 2.9967 5.00195C2.9967 2.24053 5.23528 0.00195312 7.9967 0.00195312ZM7.9967 1.50195C6.06371 1.50195 4.4967 3.06896 4.4967 5.00195C4.4967 6.93495 6.06371 8.50195 7.9967 8.50195C9.9297 8.50195 11.4967 6.93495 11.4967 5.00195C11.4967 3.06896 9.9297 1.50195 7.9967 1.50195ZM12.7804 15.7835C13.0733 15.4906 13.0732 15.0157 12.7802 14.7229C12.4873 14.4301 12.0124 14.4302 11.7196 14.7231L9.21955 17.2242C9.07893 17.3649 8.99996 17.5557 9 17.7546C9.00004 17.9535 9.0791 18.1442 9.21978 18.2849L11.7198 20.7838C12.0127 21.0766 12.4876 21.0765 12.7804 20.7835C13.0733 20.4906 13.0732 20.0157 12.7802 19.7229L11.5601 18.5033H18.4401L17.2198 19.7228C16.9269 20.0156 16.9267 20.4905 17.2195 20.7835C17.5123 21.0765 17.9872 21.0766 18.2802 20.7838L20.7802 18.2854C20.9209 18.1448 20.9999 17.9541 21 17.7552C21.0001 17.5563 20.9211 17.3655 20.7805 17.2248L18.2805 14.7232C17.9877 14.4302 17.5128 14.43 17.2198 14.7228C16.9269 15.0156 16.9267 15.4905 17.2195 15.7835L18.4386 17.0033H11.5612L12.7804 15.7835Z"
        fill={`${fill ? "#E3AA6D" : "#F0EFED"}`}
      />
    </svg>
  );
}

function ChooseDates({ date, setDate }) {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <AddRangeIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        Do you know the date when the story happened? If yes, please enter it
        here.
      </p>
      <p className="text-sp-lighter text-sm mt-2">*Optional</p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full flex-1">
            <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
              <DatePicker
                onChange={setDate}
                value={date}
                clearIcon={!date ? null : <XIcon className="h-6 w-6" />}
                dayPlaceholder="Date of the story"
                monthPlaceholder=""
                yearPlaceholder=""
                showLeadingZeros
                calendarIcon={
                  <CalendarIcon className="h-6 w-6 text-sp-lighter mx-3" />
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Location({ location, setLocation }) {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <AddLocationIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        Does this story remind you of a certain place? Please select that place.
      </p>
      <p className="text-sp-lighter text-sm mt-2">*Optional</p>

      <div className="mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex-1">
            <div className="my-2 rounded flex flex-row items-center border-2 border-sp-medium">
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                placeholder="Enter place"
                className="p-3 bg-sp-dark appearance-none outline-none w-full rounded text-sp-white"
              />
              <SearchIcon className="h-6 w-6 text-sp-lighter mx-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Summary({ summary, setSummary }) {
  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <AddCommentIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        Please summarize your story in one or two sentences.
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <textarea
                value={summary}
                onChange={(e) => {
                  if (!(e.target.value.length > 150))
                    setSummary(e.target.value);
                }}
                maxLength="150"
                placeholder="Enter sentence"
                rows="3"
                className="p-3 bg-sp-dark border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-white"
              />
              <p className="text-sp-lighter text-sm mt-2">
                <span>{summary.length}</span>/150
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddCommentIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C8.38171 20 6.81782 19.6146 5.41286 18.888L1.58704 19.9553C0.922123 20.141 0.232581 19.7525 0.0469058 19.0876C-0.0145358 18.8676 -0.014506 18.6349 0.046948 18.4151L1.11461 14.5922C0.386366 13.186 0 11.6203 0 10C0 4.47715 4.47715 0 10 0ZM10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 11.4696 1.87277 12.8834 2.57303 14.1375L2.72368 14.4072L1.61096 18.3914L5.59755 17.2792L5.86709 17.4295C7.12006 18.1281 8.53218 18.5 10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5ZM6.75 11H11.2483C11.6625 11 11.9983 11.3358 11.9983 11.75C11.9983 12.1297 11.7161 12.4435 11.35 12.4932L11.2483 12.5H6.75C6.33579 12.5 6 12.1642 6 11.75C6 11.3703 6.28215 11.0565 6.64823 11.0068L6.75 11H11.2483H6.75ZM6.75 7.5L13.2545 7.5C13.6687 7.5 14.0045 7.83579 14.0045 8.25C14.0045 8.6297 13.7223 8.94349 13.3563 8.99315L13.2545 9H6.75C6.33579 9 6 8.66421 6 8.25C6 7.8703 6.28215 7.55651 6.64823 7.50685L6.75 7.5L13.2545 7.5L6.75 7.5Z"
        fill={`${fill ? "#E3AA6D" : "#F0EFED"}`}
      />
    </svg>
  );
}

function AddLocationIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.9999 19.5999C10.8265 19.5999 11.6287 19.4954 12.394 19.299C11.9593 18.8094 11.5836 18.3126 11.2753 17.8081C10.8456 18.2102 10.4078 18.3999 9.9999 18.3999C9.21169 18.3999 8.31178 17.6916 7.57376 16.1101C7.31278 15.5509 7.08597 14.9082 6.90314 14.1999H10.3152C10.3447 13.7872 10.4164 13.3856 10.5262 12.9999H6.6473C6.48804 12.0702 6.3999 11.0599 6.3999 9.9999C6.3999 8.93993 6.48804 7.92957 6.6473 6.9999L13.3525 6.9999C13.4786 7.73593 13.5601 8.52252 13.5886 9.34428C13.962 9.16581 14.3581 9.02747 14.7717 8.93491C14.7361 8.26791 14.6674 7.62031 14.5687 6.9999H17.8483C18.1282 7.73172 18.3087 8.5127 18.3733 9.32632C18.8159 9.53379 19.2274 9.79744 19.5993 10.108C19.5997 10.072 19.5999 10.036 19.5999 9.9999C19.5999 4.69797 15.3018 0.399902 9.9999 0.399902C4.69797 0.399902 0.399902 4.69797 0.399902 9.9999C0.399902 15.3018 4.69797 19.5999 9.9999 19.5999ZM9.9999 1.5999C10.7881 1.5999 11.688 2.3082 12.426 3.88967C12.687 4.44893 12.9138 5.09164 13.0967 5.7999L6.90314 5.7999C7.08597 5.09164 7.31278 4.44893 7.57376 3.88967C8.31178 2.3082 9.21169 1.5999 9.9999 1.5999ZM6.48634 3.38221C6.15467 4.09294 5.87788 4.90825 5.66708 5.7999L2.72367 5.7999C3.72744 4.06469 5.33409 2.72187 7.2572 2.05786C6.96746 2.45456 6.70984 2.9033 6.48634 3.38221ZM5.43108 6.9999C5.28058 7.94589 5.1999 8.95511 5.1999 9.9999C5.1999 11.0447 5.28058 12.0539 5.43108 12.9999H2.15146C1.79512 12.0682 1.5999 11.0569 1.5999 9.9999C1.5999 8.94295 1.79512 7.93158 2.15146 6.9999L5.43108 6.9999ZM5.66708 14.1999C5.87788 15.0916 6.15467 15.9069 6.48634 16.6176C6.70984 17.0965 6.96746 17.5452 7.2572 17.9419C5.33409 17.2779 3.72744 15.9351 2.72367 14.1999H5.66708ZM12.7426 2.05786C14.6657 2.72187 16.2724 4.06469 17.2761 5.7999H14.3327C14.1219 4.90825 13.8451 4.09294 13.5135 3.38221C13.29 2.9033 13.0323 2.45456 12.7426 2.05786ZM15.9999 9.9999C18.4852 9.9999 20.4999 12.0722 20.4999 14.6285C20.4999 16.5443 19.0801 18.5523 16.2999 20.697C16.1221 20.8342 15.8777 20.8342 15.6999 20.697C12.9197 18.5523 11.4999 16.5443 11.4999 14.6285C11.4999 12.0722 13.5146 9.9999 15.9999 9.9999ZM15.9999 13.0856C15.1715 13.0856 14.4999 13.7764 14.4999 14.6285C14.4999 15.4806 15.1715 16.1713 15.9999 16.1713C16.8283 16.1713 17.4999 15.4806 17.4999 14.6285C17.4999 13.7764 16.8283 13.0856 15.9999 13.0856Z"
        fill={`${fill ? "#E3AA6D" : "#F0EFED"}`}
      />
    </svg>
  );
}

function ProgressBar({ step, maxSteps }) {
  return (
    <div className="flex-auto mx-auto mt-12">
      <div className="w-full bg-sp-lighter h-1">
        <div
          className="bg-sp-fawn h-1"
          style={{ width: `${Math.floor((step * 100) / maxSteps)}%` }}
        ></div>
      </div>
    </div>
  );
}

function CreateSpinner() {
  return (
    <div className="inline-flex items-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-sp-dark"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span>Creating...</span>
    </div>
  );
}

function CreateSuccess() {
  return (
    <div className="flex flex-col items-center my-4 gap-1 w-1/2 mx-auto sm:w-full md:w-1/2 mt-24">
      <div className="bg-sp-fawn bg-opacity-25 rounded-xl p-2 mb-2">
        <AddStoryIcon />
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

function AddSpiritusIcon({ width, height, fill }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5004 10.0003C18.5379 10.0003 21.0004 12.4627 21.0004 15.5003C21.0004 18.5378 18.5379 21.0003 15.5004 21.0003C12.4628 21.0003 10.0004 18.5378 10.0004 15.5003C10.0004 12.4627 12.4628 10.0003 15.5004 10.0003ZM10.0226 11.9996C9.72593 12.4629 9.48639 12.9663 9.31398 13.4999L2.25278 13.5002C1.83919 13.5002 1.50391 13.8355 1.50391 14.2491L1.50391 14.8267C1.50391 15.3624 1.69502 15.8805 2.04287 16.2878C3.29618 17.7555 5.26206 18.5013 8.00036 18.5013C8.5968 18.5013 9.15667 18.4659 9.6806 18.3954C9.92579 18.8903 10.2333 19.3489 10.5921 19.7618C9.79661 19.922 8.93173 20.0013 8.00036 20.0013C4.8545 20.0013 2.46849 19.0962 0.902186 17.2619C0.322425 16.583 0.00390625 15.7195 0.00390625 14.8267L0.00390625 14.2491C0.00390625 13.007 1.01076 12.0002 2.25278 12.0002L10.0226 11.9996ZM15.5004 12.0002L15.4105 12.0083C15.2064 12.0453 15.0455 12.2063 15.0084 12.4104L15.0004 12.5002L14.9994 15.0003H12.5043L12.4144 15.0083C12.2103 15.0454 12.0494 15.2063 12.0123 15.4104L12.0043 15.5003L12.0123 15.5901C12.0494 15.7942 12.2103 15.9552 12.4144 15.9922L12.5043 16.0003H14.9994L15.0004 18.5002L15.0084 18.5901C15.0455 18.7942 15.2064 18.9551 15.4105 18.9922L15.5004 19.0002L15.5902 18.9922C15.7943 18.9551 15.9553 18.7942 15.9923 18.5901L16.0004 18.5002L15.9994 16.0003L18.5043 16.0003L18.5941 15.9922C18.7982 15.9552 18.9592 15.7942 18.9962 15.5901L19.0043 15.5003L18.9962 15.4104C18.9592 15.2063 18.7982 15.0454 18.5941 15.0083L18.5043 15.0003L15.9994 15.0003L16.0004 12.5002L15.9923 12.4104C15.9553 12.2063 15.7943 12.0453 15.5902 12.0083L15.5004 12.0002ZM8.00036 0.00488281C10.7618 0.00488281 13.0004 2.24346 13.0004 5.00488C13.0004 7.76631 10.7618 10.0049 8.00036 10.0049C5.23894 10.0049 3.00036 7.76631 3.00036 5.00488C3.00036 2.24346 5.23894 0.00488281 8.00036 0.00488281ZM8.00036 1.50488C6.06737 1.50488 4.50036 3.07189 4.50036 5.00488C4.50036 6.93788 6.06737 8.50488 8.00036 8.50488C9.93336 8.50488 11.5004 6.93788 11.5004 5.00488C11.5004 3.07189 9.93336 1.50488 8.00036 1.50488Z"
        fill={`${fill ? "#E3AA6D" : "#F0EFED"}`}
      />
    </svg>
  );
}

function AddStoryIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;
  return (
    <svg
      className={`${w} ${h}`}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.75 0C16.5449 0 18 1.45507 18 3.25V10H13.25C11.4551 10 10 11.4551 10 13.25V18H3.25C1.45507 18 0 16.5449 0 14.75V3.25C0 1.45507 1.45507 0 3.25 0H14.75ZM17.56 11.5L11.5 17.56V13.25C11.5 12.2835 12.2835 11.5 13.25 11.5H17.56Z"
        fill="url(#paint0_linear_5122_27655)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_5122_27655"
          x1="2.33663e-08"
          y1="8.99999"
          x2="18"
          y2="8.99999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Dropdown({ items, addItem }) {
  return (
    <div
      id="dropdown"
      className="absolute top-10 right-0 w-full bg-sp-dark text-sp-white z-40 rounded-lg border-2 border-sp-medium max-h-select"
    >
      <div className="flex flex-col w-full">
        {items.map((item, key) => {
          return (
            <div
              key={key}
              className="cursor-pointer hover:bg-sp-fawn hover:text-sp-dark rounded-lg"
              onClick={(e) => {
                e.preventDefault();
                addItem(item);
              }}
            >
              <div className="flex w-full items-center p-2">
                <div className="w-full items-center flex">
                  <div className="mx-2 leading-6">{item.value}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MultiSelectInput({ items, selected, setSelected }) {
  // state showing if dropdown is open or closed
  const [dropdown, setDropdown] = useState(false);

  const toogleDropdown = () => {
    setDropdown(!dropdown);
  };
  // adds new item to multiselect
  const addItem = (item) => {
    setSelected(selected.concat(item));
    setDropdown(false);
  };
  // removes item from multiselect
  const removeTag = (item) => {
    const filtered = selected.filter((e) => e !== item);
    setSelected(filtered);
  };

  return (
    <div className="w-full flex flex-col items-center mx-auto">
      <div className="w-full">
        <div className="flex flex-col items-center relative">
          <div className="w-full">
            <div className="flex appearance-none outline-none text-sp-white">
              <div className="flex flex-auto flex-wrap gap-1 items-center">
                {!selected.length ? (
                  <p className="text-gray-400">Choose categories</p>
                ) : (
                  selected.map((tag, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-center items-center font-medium px-2 py-1 rounded-2xl border border-sp-light"
                      >
                        <div className="text-sm leading-none">{tag.value}</div>
                        <XIcon
                          className="w-4 h-4 ml-1"
                          onClick={() => removeTag(tag)}
                        />
                      </div>
                    );
                  })
                )}
              </div>
              <div
                className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l-2 flex items-center border-sp-medium"
                onClick={(e) => {
                  e.preventDefault();
                  toogleDropdown();
                }}
              >
                <button className="cursor-pointer text-gray-600 outline-none focus:outline-none">
                  <ChevronDownIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          {dropdown ? (
            <Dropdown
              items={items.filter((item) => !selected.includes(item))}
              addItem={addItem}
            ></Dropdown>
          ) : null}
        </div>
      </div>
    </div>
  );
}
