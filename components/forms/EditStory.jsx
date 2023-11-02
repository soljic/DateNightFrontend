import { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon, XIcon } from "@heroicons/react/outline";
import { getISOLocalDate } from "@wojtekmaj/date-utils";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import DatePicker from "react-date-picker";
import { useForm } from "react-hook-form";

import { Spinner } from "@/components/Status";
import {
  SUPPORTED_IMAGES,
  SpiritusProfileImageUploader,
} from "@/components/Uploaders";

import {
  AddStoryImage,
  DeleteStory,
  DeleteStoryImage,
  EditStory,
  GetStoryInOriginalLang,
} from "@/service/http/story_crud";

import { HashFilename } from "@/utils/filenames";

import { MultiSelectInput } from "../Dropdowns";

export function EditStoryForm({ story, tagChoices, onSuccess, onError }) {
  const { t } = useTranslation("common");

  const { data: session, status } = useSession();

  const [pending, setPending] = useState(false);

  const [isPrivate, setIsPrivate] = useState(!story.flags.includes("PUBLIC"));
  const [title, setTitle] = useState(story.title);
  const [tags, setTags] = useState(story.tags);
  const [storyText, setStoryText] = useState(story.storyText);
  const [date, setDate] = useState(story.date ? new Date(story.date) : null);
  const [summary, setSummary] = useState(story.description);

  const [dpLoaded, setDpLooaded] = useState(false);

  const [savedImages, setSavedImages] = useState(
    story?.images && story.images.length > 0 ? story.images : []
  );

  const [images, setImages] = useState([...savedImages]);

  useEffect(() => {
    setDpLooaded(true);
  }, []);

  const setParagraphs = (story) => {
    return story
      .trim()
      .split("\n\n")
      .map((para, idx) => {
        return { index: idx, text: para.trim() };
      });
  };

  const update = async () => {
    try {
      setPending(true);
      const body = {
        title,
        description: summary,
        date: date ? getISOLocalDate(date) : null,
        paragraphs: setParagraphs(storyText),
        tags: tags.map((t) => t.id),
        private: isPrivate,
      };
      if (!validateImages()) {
        onError(t("INVALID_FORMAT"));
        setPending(false);
        return;
      }
      await EditStory(session.user.accessToken, story.id, body);
      await updateImages();
      setPending(false);
      onSuccess();
    } catch (err) {
      console.log(err);
      const msg = err?.response?.data?.errors?.[0]?.message?.[0] || "";
      onError(msg ? msg : t("message_save_failed"));
      setPending(false);
    }
  };

  const updateImages = async () => {
    const rmImages = [];
    let newImage = null;
    savedImages.forEach((img) => {
      if (!images.find((i) => i.url === img.url)) {
        rmImages.push(img.id);
      }
    });
    for (const img of images) {
      if (!img.id && !img.url) {
        newImage = img;
        break;
      }
    }

    for (const id of rmImages) {
      await DeleteStoryImage(session.user.accessToken, id);
    }

    if (newImage) {
      console.log("new image", newImage);
      const form = new FormData();
      const fileName = await HashFilename(images[0].file.name);
      form.append("file", images[0].file, fileName);
      await AddStoryImage(session.user.accessToken, story.id, form);
    }

    const currentStoryData = await GetStoryInOriginalLang(
      session.user.accessToken,
      story.id
    );

    setImages(currentStoryData?.data?.images || []);
    setSavedImages(currentStoryData?.data?.images || []);
  };

  const validateImages = () => {
    let newImage = null;

    for (const img of images) {
      if (!img.id && !img.url) {
        newImage = img;
        break;
      }
    }
    // check new image format is correct
    if (newImage && !SUPPORTED_IMAGES.includes(newImage.file.type)) {
      return false;
    }
    return true;
  };

  const cancel = () => {
    setIsPrivate(!story.flags.includes("PUBLIC"));
    setTitle(story.title);
    setIsPrivate(story.isPrivate);
    setTags(story.tags);
    setStoryText(story.storyText);
    setDate(story.date ? new Date(story.date) : null);
    setSummary(story.description);
  };

  return (
    <form id="edit-form" className="mx-auto space-y-3 px-4 pb-96">
      <h2 className="px-1.5 font-bold text-sp-black text-2xl dark:text-sp-white">
        {t("edit_story_meta_desc")}
      </h2>

      <div className="mx-auto mt-2 pb-8">
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsPrivate(false);
            }}
            className={`flex w-full appearance-none items-center gap-4 rounded-xl border-2 p-4 text-sp-black outline-none dark:text-sp-white md:w-1/2 ${
              !isPrivate ? "border-sp-fawn" : "border-sp-day-400/40"
            }`}
          >
            <div className="rounded-sp-10 bg-sp-fawn bg-opacity-40 p-2 align-middle">
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                className="fill-sp-cotta dark:fill-sp-fawn"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.754 7C13.7205 7 14.504 7.7835 14.504 8.75V13.499C14.504 15.9848 12.4888 18 10.003 18C7.51712 18 5.50193 15.9848 5.50193 13.499V8.75C5.50193 7.7835 6.28543 7 7.25193 7L12.754 7ZM12.754 8.5H7.25193C7.11386 8.5 7.00193 8.61193 7.00193 8.75V13.499C7.00193 15.1564 8.34554 16.5 10.003 16.5C11.6604 16.5 13.004 15.1564 13.004 13.499V8.75C13.004 8.61193 12.8921 8.5 12.754 8.5ZM1.75 7L5.13128 6.99906C4.78791 7.41447 4.56424 7.93246 4.51312 8.50019L1.75 8.5C1.61193 8.5 1.5 8.61193 1.5 8.75L1.5 11.9988C1.5 13.3802 2.61984 14.5 4.00124 14.5C4.20123 14.5 4.39574 14.4765 4.58216 14.4322C4.66687 14.9361 4.82156 15.4167 5.03487 15.864C4.70577 15.953 4.35899 16 4.00124 16C1.79142 16 0 14.2086 0 11.9988L0 8.75C0 7.7835 0.783502 7 1.75 7ZM14.8747 6.99906L18.25 7C19.2165 7 20 7.7835 20 8.75L20 12C20 14.2091 18.2091 16 16 16C15.6436 16 15.298 15.9534 14.9691 15.8659C15.184 15.4177 15.3388 14.9371 15.425 14.4331C15.6092 14.477 15.8019 14.5 16 14.5C17.3807 14.5 18.5 13.3807 18.5 12L18.5 8.75C18.5 8.61193 18.3881 8.5 18.25 8.5L15.4928 8.50019C15.4417 7.93246 15.218 7.41447 14.8747 6.99906ZM10 0C11.6569 0 13 1.34315 13 3C13 4.65685 11.6569 6 10 6C8.34315 6 7 4.65685 7 3C7 1.34315 8.34315 0 10 0ZM16.5 1C17.8807 1 19 2.11929 19 3.5C19 4.88071 17.8807 6 16.5 6C15.1193 6 14 4.88071 14 3.5C14 2.11929 15.1193 1 16.5 1ZM3.5 1C4.88071 1 6 2.11929 6 3.5C6 4.88071 4.88071 6 3.5 6C2.11929 6 1 4.88071 1 3.5C1 2.11929 2.11929 1 3.5 1ZM10 1.5C9.17157 1.5 8.5 2.17157 8.5 3C8.5 3.82843 9.17157 4.5 10 4.5C10.8284 4.5 11.5 3.82843 11.5 3C11.5 2.17157 10.8284 1.5 10 1.5ZM16.5 2.5C15.9477 2.5 15.5 2.94772 15.5 3.5C15.5 4.05228 15.9477 4.5 16.5 4.5C17.0523 4.5 17.5 4.05228 17.5 3.5C17.5 2.94772 17.0523 2.5 16.5 2.5ZM3.5 2.5C2.94772 2.5 2.5 2.94772 2.5 3.5C2.5 4.05228 2.94772 4.5 3.5 4.5C4.05228 4.5 4.5 4.05228 4.5 3.5C4.5 2.94772 4.05228 2.5 3.5 2.5Z" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <p className="font-semibold">{t("public")}</p>
              <p className="text-left font-normal text-sp-day-400 text-sm">
                {t("create_story_public_text")}
              </p>
            </div>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsPrivate(true);
            }}
            className={`flex w-full appearance-none items-center gap-4 rounded-xl border-2 p-4 text-sp-black outline-none dark:text-sp-white md:w-1/2 ${
              isPrivate ? "border-sp-fawn" : "border-sp-day-400/40"
            }`}
          >
            <div className="rounded-sp-10 bg-sp-fawn bg-opacity-40 p-2 align-middle">
              <svg
                width="18"
                height="20"
                className="fill-sp-cotta dark:fill-sp-fawn"
                viewBox="0 0 16 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C10.2091 0 12 1.79086 12 4L12 6H13.75C14.9926 6 16 7.00736 16 8.25L16 17.75C16 18.9926 14.9926 20 13.75 20L2.25 20C1.00736 20 0 18.9926 0 17.75L0 8.25C0 7.00736 1.00736 6 2.25 6L4 6V4C4 1.79086 5.79086 0 8 0ZM13.75 7.5L2.25 7.5C1.83579 7.5 1.5 7.83579 1.5 8.25L1.5 17.75C1.5 18.1642 1.83579 18.5 2.25 18.5L13.75 18.5C14.1642 18.5 14.5 18.1642 14.5 17.75L14.5 8.25C14.5 7.83579 14.1642 7.5 13.75 7.5ZM8.00012 11.5C8.82855 11.5 9.50012 12.1716 9.50012 13C9.50012 13.8284 8.82855 14.5 8.00012 14.5C7.1717 14.5 6.50012 13.8284 6.50012 13C6.50012 12.1716 7.1717 11.5 8.00012 11.5ZM8 1.5C6.61929 1.5 5.5 2.61929 5.5 4V6L10.5 6L10.5 4C10.5 2.61929 9.38071 1.5 8 1.5Z" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <p className="font-semibold">{t("private")}</p>
              <p className="text-left font-normal text-sp-day-400 text-sm">
                {t("create_story_private_text")}
              </p>
            </div>
          </button>
        </div>
      </div>

      <div className="mx-auto flex flex-1 flex-col space-y-6 font-medium">
        <div>
          <h2 className="text-sp-black dark:text-sp-white">
            <span className="text-red-500">*</span>
            {t("edit_story_title")}
          </h2>
          <div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full flex-1">
                <div className="my-1 rounded-sp-10">
                  <input
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    placeholder={t("create_story_title_placeholder")}
                    className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sp-black dark:text-sp-white">
            <span className="text-red-500">*</span>

            {t("edit_story_text")}
          </h2>
          <div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full flex-1">
                <div className="my-1 rounded">
                  <textarea
                    value={storyText}
                    onChange={(e) => {
                      setStoryText(e.target.value);
                    }}
                    placeholder={t("create_story_text_placeholder")}
                    rows="20"
                    className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sp-black dark:text-sp-white">
            <span className="text-red-500">*</span>
            {t("story_tags_label")}
          </h2>
          <div>
            <div className="my-1 flex flex-col md:flex-row">
              <div className="w-full flex-1">
                <div className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                  <MultiSelectInput
                    items={tagChoices}
                    selected={tags}
                    setSelected={setTags}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sp-black dark:text-sp-white">
            <span className="text-red-500">*</span>

            {t("edit_story_summary")}
          </h2>
          <div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full flex-1">
                <div className="my-1 rounded">
                  <textarea
                    value={summary}
                    onChange={(e) => {
                      setSummary(e.target.value);
                    }}
                    placeholder={t("create_story_summary_placeholder")}
                    rows="6"
                    className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* dates */}
        {dpLoaded && (
          <div className="mt-4">
            <h2 className="text-sp-black dark:text-sp-white">
              {t("create_story_date_placeholder")}
            </h2>
            <div className="my-1 flex flex-col gap-2 md:flex-row">
              <div className="w-full flex-1">
                <div className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                  <DatePicker
                    id="date"
                    onChange={setDate}
                    value={date}
                    clearIcon={!date ? null : <XIcon className="h-6 w-6" />}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    showLeadingZeros
                    calendarIcon={
                      <CalendarIcon className="mx-3 h-6 w-6 text-sp-lighter" />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4">
          <h2 className="text-sp-black dark:text-sp-white">
            {t("term_images")}
          </h2>
          <div className="my-1 flex flex-col gap-2 md:flex-row">
            <div className="w-full flex-1">
              <SpiritusProfileImageUploader
                name={"story-image"}
                images={images}
                setImages={setImages}
              />
            </div>
          </div>
        </div>

        <div className="inline-flex space-x-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              update();
            }}
            disabled={pending}
            className="flex w-32 justify-center rounded-sp-10 border bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-5 py-1.5 text-sp-white dark:border-sp-medium dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
          >
            {pending ? (
              <Spinner text={""} />
            ) : (
              <span className="ml-1 font-semibold">{t("save")}</span>
            )}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              cancel();
            }}
            disabled={pending}
            className="inline-flex w-20 justify-center rounded-sp-10 border border-sp-day-400 px-5 py-1.5 text-sp-day-400"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </form>
  );
}

export function DeleteStoryModal({ deleteId, isOpen, closeModal }) {
  const { t } = useTranslation(["common", "settings"]);
  const { data: session, status } = useSession();

  const router = useRouter();
  let [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClose = () => {
    setErr("");
    reset();
    closeModal();
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      await DeleteStory(session.user.accessToken, deleteId);
      router.reload();
    } catch (error) {
      console.log(error);
      setErr(t("settings:delete_err"));
      setSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex transform items-center justify-center transition-all">
                <div className="w-96 rounded-sp-14 border border-sp-lighter bg-sp-day-100 dark:bg-sp-black">
                  <div className="flex flex-col justify-center gap-y-4 px-4 md:px-8">
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={onClose}
                        className="mx-1 rounded-full border border-sp-lighter p-1"
                      >
                        <XIcon className="h-6 w-6 text-sp-lighter" />
                      </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        width="49"
                        height="54"
                        viewBox="0 0 49 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.5 10.334C0.5 9.22941 1.39543 8.33398 2.5 8.33398C9.60242 8.33398 16.5213 5.81805 23.3 0.733984C24.0111 0.200651 24.9889 0.200651 25.7 0.733984C32.4788 5.81805 39.3976 8.33398 46.5 8.33398C47.6046 8.33398 48.5 9.22941 48.5 10.334V24.334C48.5 37.6705 40.6132 47.4693 25.2331 53.5281C24.762 53.7137 24.238 53.7137 23.767 53.5281C8.38684 47.4693 0.5 37.6705 0.5 24.334V10.334ZM4.5 12.2751V24.334C4.5 35.6822 11.0423 44.0111 24.5 49.5123C37.9577 44.0111 44.5 35.6822 44.5 24.334V12.2751C37.6271 11.8696 30.9511 9.36941 24.5 4.80816C18.0489 9.36941 11.3729 11.8696 4.5 12.2751Z"
                          fill="#DB6D56"
                        />
                      </svg>
                      <h1 className="mb-2.5 mt-8 font-bold text-3xl">
                        {t("settings:delete_story_modal_title")}
                      </h1>
                      <p className="text-center font-medium">
                        {t("settings:delete_story_modal_subtitle")}
                      </p>
                    </div>
                    <form
                      className="flex flex-col gap-2"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <label htmlFor="confirm">
                        {t("settings:delete_modal_confirm")}
                      </label>
                      <input
                        {...register("confirm", {
                          required: true,
                          validate: (v) =>
                            v.toLowerCase() === "delete" ||
                            t("settings:delete_modal_confirm_err"),
                        })}
                        type="text"
                        className="form-control m-0 block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-black transition ease-in-out text-base focus:border-sp-white focus:bg-inherit focus:outline-none dark:text-sp-white"
                        id="confirm"
                      />
                      {errors.confirm && (
                        <p className="px-1 py-2 text-red-600 text-sm">
                          {errors.confirm.message}
                        </p>
                      )}

                      <div className="mt-20 flex flex-col items-center justify-center text-center">
                        {/* login button */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-2/3 rounded-sp-40 bg-sp-cotta p-4 text-sp-black"
                        >
                          {submitting ? <Spinner text="" /> : "Delete"}
                        </button>
                        {err && (
                          <p className="px-1 py-2 text-red-600 text-sm">
                            {err}
                          </p>
                        )}
                        <div className="mb-10 mt-5 flex flex-col items-center justify-center gap-3 text-lg">
                          <button
                            onClick={onClose}
                            className="rounded-sp-40 border border-sp-lighter px-3 py-2 text-sm dark:text-sp-white"
                          >
                            {t("settings:delete_story_modal_cancel")}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
