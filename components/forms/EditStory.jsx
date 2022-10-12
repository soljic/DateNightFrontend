import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon, XIcon } from "@heroicons/react/outline";

import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";


import { Spinner } from "../Status";
import { MultiSelectInput } from "../Dropdowns";
import { GetTags } from "../../service/http/spiritus";
import { DeleteStory } from "../../service/http/story_crud";

export function StoryDate({ date, setDate }) {
  const { t } = useTranslation("common");

  const DatePicker = dynamic(() =>
    import("react-date-picker/dist/entry.nostyle").then((dp) => dp)
  );

  return (
    <div>
      <h2 className="font-bold text-sp-black dark:text-sp-white text-2xl">
        {t("create_story_date_placeholder")}
      </h2>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full flex-1">
          <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
            <DatePicker
              onChange={setDate}
              value={date}
              dayPlaceholder="DD"
              monthPlaceholder="MM"
              yearPlaceholder="YYYY"
              clearIcon={!date ? null : <XIcon className="h-6 w-6" />}
              calendarIcon={
                <CalendarIcon className="h-6 w-6 text-sp-lighter mx-3" />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StoryTitle({ title, setTitle, tags, setTags }) {
  const { t } = useTranslation("common");

  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await GetTags();
        if (res?.data.length) {
          setItemsList(res.data);
        }
      } catch {}
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="font-bold text-sp-black dark:text-sp-white text-2xl mb-2">
        {t("edit_story_title")}
      </h2>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full flex-1">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder={t("create_story_title_placeholder")}
            className="p-3 bg-sp-day-50 placeholder-gray-500 dark:bg-sp-black border-2 border-sp-medium appearance-none outline-none w-full rounded"
          />
        </div>
        <div className="w-full flex-1">
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
  );
}

export function StorySummary({ summary, setSummary }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <h2 className="font-bold text-sp-black dark:text-sp-white text-2xl mb-2">
        {t("edit_story_summary")}
      </h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full flex-1">
          <textarea
            value={summary}
            onChange={(e) => {
              if (!(e.target.value.length > 150)) setSummary(e.target.value);
            }}
            maxLength="150"
            placeholder={t("create_story_summary_placeholder")}
            rows="3"
            className="p-3  bg-sp-day-50 placeholder-gray-500 dark:bg-sp-black border-2 border-sp-medium  appearance-none outline-none w-full rounded "
          />
          <p className="text-sp-lighter text-sm mt-2">
            <span>{summary.length}</span>/150
          </p>
        </div>
      </div>
    </div>
  );
}

export function StoryTextEditor({ storyText, setStoryText }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <h2 className="font-bold text-sp-black dark:text-sp-white text-2xl mb-2">
        {t("edit_story_text")}
      </h2>
      <textarea
        value={storyText}
        onChange={(e) => {
          setStoryText(e.target.value);
        }}
        className="w-full text-lg py-3 px-4 text-bottom rounded-md border  bg-sp-day-50 placeholder-gray-500 dark:bg-sp-black border-sp-medium "
        placeholder={t("create_story_text_placeholder")}
        rows="30"
      ></textarea>
    </div>
  );
}

export function DeleteStorysModal({ deleteId, spiritusSlug, isOpen, closeModal }) {
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
      router.push(`/spiritus/${spiritusSlug}`);
    } catch (error) {
      setErr(t("settings:delete_err"));
      setSubmitting(false);
      console.log("ERR DELETING", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex items-center h-full justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex justify-center h-1/2 items-center transition-all transform">
                <div className="w-full border-sp-lighter border rounded-sp-14 bg-sp-day-100 dark:bg-sp-black">
                  <div className="flex flex-col justify-center gap-y-10 px-4">
                    <div className="flex justify-end mt-8">
                      <button
                        onClick={onClose}
                        className="p-1 rounded-full mx-1 border border-sp-lighter"
                      >
                        <XIcon className="h-6 w-6 text-sp-lighter" />
                      </button>
                    </div>
                    <div className="flex flex-col justify-center items-center">
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
                      <h1 className="text-3xl font-bold mt-8 mb-2.5">
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
                        className="form-control rounded p-4 block w-full text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-sp-lighter transition ease-in-out m-0 focus:text-sp-white focus:bg-inherit focus:border-sp-white focus:outline-none"
                        id="confirm"
                      />
                      {errors.confirm && (
                        <p className="text-sm text-red-600 py-2 px-1">
                          {errors.confirm.message}
                        </p>
                      )}

                      <div className="flex flex-col justify-center items-center text-center mt-20">
                        {/* login button */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-2/3 bg-sp-cotta rounded-sp-40 p-4 text-sp-black"
                        >
                          {submitting ? <Spinner text="" /> : "Delete"}
                        </button>
                        {err && (
                          <p className="text-sm text-red-600 py-2 px-1">
                            {err}
                          </p>
                        )}
                        <div className="flex flex-col justify-center items-center mt-5 mb-10 text-lg gap-3">
                          <button
                            onClick={onClose}
                            className="border border-sp-lighter rounded-sp-40 py-2 px-3 text-sm dark:text-sp-white"
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
