import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { ProxyGetTags } from "../../service/http/proxy";
import { MultiSelectInput } from "../Dropdowns";
import { CalendarIcon, XIcon } from "@heroicons/react/outline";

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
        const res = await ProxyGetTags();
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
