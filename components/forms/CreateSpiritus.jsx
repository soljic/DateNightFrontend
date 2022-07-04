import DatePicker from "react-date-picker/dist/entry.nostyle";

import { useTranslation } from "next-i18next";
import { CalendarIcon, XIcon } from "@heroicons/react/outline";

import { CommentIcon, LocationIcon, RangeIcon, SpiritusIcon } from "../Icons";

export function SpiritusName({ name, setName, surname, setSurname }) {
  const { t } = useTranslation("common");

  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <SpiritusIcon />
      </div>
      <p className="font-bold text-sp-black dark:text-sp-white text-2xl">
        {t("create_spiritus_names_title")}
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder={t("create_spiritus_firstname_placeholder")}
                className="p-3 placeholder-gray-500 bg-sp-day-50 dark:bg-sp-black border-2 border-sp-lighter dark:border-sp-medium appearance-none outline-none w-full rounded dark:text-sp-white"
              />
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <input
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                }}
                placeholder={t("create_spiritus_lastname_placeholder")}
                className="p-3 placeholder-gray-500 bg-sp-day-50 dark:bg-sp-black border-2 border-sp-lighter dark:border-sp-medium appearance-none outline-none w-full rounded dark:text-sp-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpiritusDates({ name, birth, setBirth, death, setDeath }) {
  const { t } = useTranslation("common");

  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6 text-sp-black dark:text-sp-white">
        <RangeIcon />
      </div>
      <p className="font-bold text-2xl">
        {t("create_spiritus_dates_title1")} <span> {name} </span>{" "}
        {t("create_spiritus_dates_title2")}
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full flex-1">
            <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
              <DatePicker
                onChange={setBirth}
                value={birth}
                clearIcon={!birth ? null : <XIcon className="h-6 w-6" />}
                dayPlaceholder={t("create_spiritus_birth_placeholder")}
                monthPlaceholder=""
                yearPlaceholder=""
                showLeadingZeros
                calendarIcon={
                  <CalendarIcon className="h-6 w-6 text-sp-lighter mx-3" />
                }
              />
            </div>
          </div>
          <div className="w-full flex-1">
            <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
              <DatePicker
                onChange={setDeath}
                value={death}
                dayPlaceholder={t("create_spiritus_death_placeholder")}
                monthPlaceholder=""
                yearPlaceholder=""
                showLeadingZeros
                clearIcon={!death ? null : <XIcon className="h-6 w-6" />}
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

export function SpiritusDescription({ name, description, setDescription }) {
  const { t } = useTranslation("common");

  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6 text-sp-black dark:text-sp-white">
        <CommentIcon />
      </div>
      <p className="font-bold text-2xl">
        {t("create_spiritus_description_title1")}
        <span> {name} </span>
        {t("create_spiritus_description_title2")}
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex-1">
            <div className="my-2 rounded">
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder={t("create_spiritus_description_placeholder")}
                rows="3"
                className="p-3 bg-sp-day-50 placeholder-gray-500 dark:bg-sp-black border-2 border-sp-medium appearance-none outline-none w-full rounded text-sp-black dark:text-sp-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpiritusLocation({ name, location, setLocation }) {
  const { t } = useTranslation("common");

  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6 text-sp-black dark:text-sp-white">
        <LocationIcon fill />
      </div>
      <p className="font-bold text-2xl">
        <span> {name} </span>
        {t("create_spiritus_location_title")}
      </p>
      <p className="text-sp-lighter text-sm">
        {t("create_spiritus_location_subtitle")}
      </p>
      <div className="mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="w-full flex-1">
            <div className="my-2 rounded flex flex-row items-center border-2 border-sp-medium">
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                placeholder={t("create_spiritus_location_placeholder")}
                className="p-3 bg-sp-day-50 placeholder-gray-500 dark:bg-sp-black appearance-none outline-none w-full rounded text-sp-black dark:text-sp-white"
              />
              {/* <SearchIcon className="h-6 w-6 text-sp-lighter mx-3" /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
