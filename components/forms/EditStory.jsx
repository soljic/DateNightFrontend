import { useEffect, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon, XIcon } from "@heroicons/react/outline";
import { getISOLocalDate } from "@wojtekmaj/date-utils";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import DatePicker from "react-date-picker";

import { Spinner } from "@/components/Status";
import { SpiritusProfileImageUploader } from "@/components/Uploaders";

import { AddStoryImage, EditStory } from "@/service/http/story_crud";

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

  const [images, setImages] = useState(
    story?.images && story.images.length > 0 ? story.images : []
  );

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
      await EditStory(session.user.accessToken, story.id, body);

      // image removed or not changed
      if (images.length === 0 || (images.length === 1 && images[0].id)) {
        setPending(false);
        onSuccess();
        return;
      }

      const form = new FormData();
      if (images.length > 0) {
        const fileName = await HashFilename(images[0].file.name);
        form.append("file", images[0].file, fileName);
        await AddStoryImage(session.user.accessToken, story.id, form);
      }
      setPending(false);
      onSuccess();
    } catch (err) {
      const msg = err?.response?.data;
      onError(msg ? msg : t("message_save_failed"));
      setPending(false);
    }
  };
  const cancel = () => {
    setIsPrivate(!story.flags.includes("PUBLIC"));
    setTitlesetIsPrivate(story.title);
    setTagssetIsPrivate(story.tags);
    setStoryTextsetIsPrivate(story.storyText);
    setDatesetIsPrivate(story.date ? new Date(story.date) : null);
    setSummarysetIsPrivate(story.description);
  };

  return (
    <form id="edit-form" className="mx-auto space-y-3 px-4 pb-96">
      <h2 className="px-1.5 font-bold text-sp-black text-2xl dark:text-sp-white">
        {t("edit_story_meta_desc")}
      </h2>

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
      <Dialog as="div" className="z-100 relative" onClose={onClose}>
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
              <Dialog.Panel className="flex h-1/2 transform items-center justify-center transition-all">
                <div className="w-full rounded-sp-14 border border-sp-lighter bg-sp-day-100 dark:bg-sp-black md:max-w-lg">
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
                        className="form-control m-0 block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-white transition ease-in-out text-base focus:border-sp-white focus:bg-inherit focus:text-sp-white focus:outline-none"
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
