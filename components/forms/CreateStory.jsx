import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

import DatePicker from "react-date-picker/dist/entry.nostyle";

import { CalendarIcon, XIcon, SearchIcon } from "@heroicons/react/outline";

import { ProxyGetTags } from "../../service/http/proxy";
import { CommentIcon, LocationIcon, RangeIcon, SpiritusIcon } from "../Icons";
import { MultiSelectInput } from "../Dropdowns";

export function StoryType({ setIsPrivate, nextStep }) {
  const { t } = useTranslation("common");

  return (
    <div className="mx-2 mt-12 lg:mx-8">
      <h2 className="text-2xl font-bold text-sp-black dark:text-sp-white">
        {t("create_story_type_title")}
      </h2>
      <div className="mt-4 mx-auto">
        <div className="flex flex-col gap-2 md:flex-row">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsPrivate(false);
              nextStep();
            }}
            className="flex appearance-none items-center gap-4 rounded-xl dark:border-2 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:border-sp-medium dark:from-sp-medlight dark:to-sp-medlight p-4 text-sp-black dark:text-sp-white outline-none"
          >
            <div className="rounded-lg bg-sp-fawn bg-opacity-20 p-2 align-middle">
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
              <p className="text-sp-lighter text-left">
                {t("create_story_public_text")}
              </p>
            </div>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsPrivate(true);
              nextStep();
            }}
            className="flex appearance-none items-center gap-4 rounded-xl dark:border-2 bg-sp-medlight bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:border-sp-medium dark:from-sp-medlight dark:to-sp-medlight p-4 text-sp-black dark:text-sp-white outline-none"
          >
            <div className="rounded-lg bg-sp-fawn bg-opacity-20 p-2 align-middle">
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
              <p className="text-sp-lighter text-left">
                {t("create_story_private_text")}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export function StoryDate({ date, setDate }) {
  const { t } = useTranslation("common");

  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <RangeIcon fill />
      </div>
      <p className="font-bold text-sp-black dark:text-sp-white text-2xl">
        {t("create_story_date_title")}
      </p>
      <p className="text-sp-lighter text-sm mt-2">*{t("optional")}</p>
      <div className="mt-6">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full flex-1">
            <label
              htmlFor="birth"
              className="dark:text-sp-white dark:text-opacity-75"
            >
              {t("create_story_date_placeholder")}
            </label>
            <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
              <DatePicker
                onChange={setDate}
                value={date}
                clearIcon={!date ? null : <XIcon className="h-6 w-6" />}
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
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

export function StoryLocation({ location, setLocation }) {
  const { t } = useTranslation("common");

  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <LocationIcon fill />
      </div>
      <p className="font-bold text-sp-black dark:text-sp-white text-2xl">
        {t("create_story_location_title")}
      </p>
      <p className="text-sp-lighter text-sm mt-2">*{t("optional")}</p>

      <div className="mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex-1">
            <div className="my-2 rounded flex flex-row items-center border-2 border-sp-medium">
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                placeholder={t("create_story_location_placeholder")}
                className="p-3 bg-sp-day-50 placeholder-gray-500 dark:bg-sp-black appearance-none outline-none w-full rounded"
              />
              <SearchIcon className="h-6 w-6 text-sp-lighter mx-3" />
            </div>
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
        <SpiritusIcon fill />
      </div>
      <p className="font-bold text-sp-black dark:text-sp-white text-2xl">
        {t("create_story_title_title")}
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
                placeholder={t("create_story_title_placeholder")}
                className="p-3 bg-sp-day-50 placeholder-gray-500 dark:bg-sp-black border-2 border-sp-medium appearance-none outline-none w-full rounded"
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

export function StorySummary({ summary, setSummary }) {
  const { t } = useTranslation("common");

  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <CommentIcon fill />
      </div>
      <p className="font-bold text-sp-black dark:text-sp-white text-2xl">
        {t("create_story_summary_title")}
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
      </div>
    </div>
  );
}

export function StoryTextEditor({ storyText, setStoryText }) {
  const { t } = useTranslation("common");

  return (
    <div className="mx-2 mt-12 lg:mx-8">
      <h2 className="text-2xl font-bold text-sp-black dark:text-sp-white">
        {t("create_story_text_title")}
      </h2>
      <div className="mt-4">
        <textarea
          value={storyText}
          onChange={(e) => {
            setStoryText(e.target.value);
          }}
          className="w-full text-lg py-3 px-4 text-bottom rounded-md border  bg-sp-day-50 placeholder-gray-500 dark:bg-sp-black border-sp-medium "
          placeholder={t("create_story_text_placeholder")}
          rows="10"
        ></textarea>
      </div>
    </div>
  );
}
