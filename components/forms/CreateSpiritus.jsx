import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

import DatePicker from "react-date-picker/dist/entry.nostyle";
import { MapboxSearch, SessionToken } from "@mapbox/search-js-core";
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
      <div className="mt-6">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full flex-1">
            <label htmlFor="birth" className="dark:text-sp-white dark:text-opacity-75">
              {t("create_spiritus_birth_placeholder")}
            </label>
            <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
              <DatePicker
                id="birth"
                onChange={setBirth}
                value={birth}
                clearIcon={!birth ? null : <XIcon className="h-6 w-6" />}
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
          <div className="w-full flex-1">
            <label htmlFor="death" className="dark:text-sp-white dark:text-opacity-75">
              {t("create_spiritus_death_placeholder")}
            </label>
            <div className="my-2 rounded flex flex-col items-center border-2 border-sp-medium py-2.5">
              <DatePicker
                id="death"
                onChange={setDeath}
                value={death}
                dayPlaceholder="dd"
                monthPlaceholder="mm"
                yearPlaceholder="yyyy"
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

  const [search, setSearch] = useState();
  const [session, setSession] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const [inputLocation, setInputLocation] = useState([]);
  const [visible, setVisible] = useState(false);

  const getSuggestions = async (term, search, sessionToken) => {
    try {
      const result = await search.suggest(term, { sessionToken });
      if (result.suggestions.length === 0) {
        return [];
      } else {
        // feature_name, description
        return result.suggestions;
      }
    } catch (err) {
      console.log("ERR GETTING SUGGESTIONS", err);
      return [];
    }
  };

  const getFeatureAndSetLocation = async (suggestion) => {
    try {
      if (search.canRetrieve(suggestion)) {
        const { features } = await search.retrieve(suggestion, {
          sessionToken: session,
        });
        setLocation({
          address: features[0].properties.feature_name,
          // geometry.coordinates order [longitude, latitude]
          longitude: features[0].geometry.coordinates[0],
          latitude: features[0].geometry.coordinates[1],
          // take country from first matching result
          country: features[0].properties.context.filter((elem) =>
            elem.layer.startsWith("country")
          )[0].name,
        });
        setInputLocation(features[0].properties.feature_name);
      } else {
        setLocation(null);
      }
    } catch (err) {
      console.log("ERR GETTING LOCATION", err);
      setLocation(null);
    } finally {
      setVisible(false);
    }
  };

  useEffect(() => {
    const t = new SessionToken();
    setSession(t);
    const s = new MapboxSearch({
      accessToken:
        "pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ",
      language: "hr", // maybe change to use defaults ("en")
    });
    setSearch(s);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (!searchTerm) {
        setResults([]);
        setVisible(false);
        return;
      }

      setVisible(true);
      const res = await getSuggestions(searchTerm, search, session);
      if (!res.length) {
        setResults([]);
        setVisible(false);
      } else {
        setResults(res);
        setVisible(true);
      }
    }, 200);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

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
        <div className="w-full">
          <input
            id="search-place"
            onChange={(e) => {
              e.preventDefault();
              setInputLocation(e.target.value);
              setSearchTerm(e.target.value);
            }}
            value={inputLocation}
            className="p-3 placeholder-gray-500 bg-sp-day-50 dark:bg-sp-black border-2 border-sp-lighter dark:border-sp-medium appearance-none outline-none w-full rounded dark:text-sp-white"
            type="text"
            placeholder={"Pretraži lokacije"}
          />
          {!!results.length && visible && (
            <Suggestions
              results={results}
              setLocation={getFeatureAndSetLocation}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Suggestions({ results, setLocation, setInputLocation }) {
  return (
    <div className="flex flex-col mx-auto border-2 rounded-xl border-sp-lighter dark:border-sp-medium">
      <div className="flex flex-col items-start">
        {results.map((res, i) => {
          return (
            <Row
              key={`${i} ${res.feature_name}`}
              suggestion={res}
              setLocation={setLocation}
            />
          );
        })}
      </div>
    </div>
  );
}

function Row({ suggestion, setLocation }) {
  return (
    <div
      className="flex w-full p-1 cursor-pointer hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-lg text-sp-medlight dark:text-sp-white"
      onClick={() => setLocation(suggestion)}
    >
      <div className="flex w-full flex-col justify-between py-2 px-2">
        <p className="break-words">{`${suggestion.feature_name}`}</p>
        <p className="text-opacity-40 break-words text-sm text-gray-500">{`${suggestion.description}`}</p>
      </div>
    </div>
  );
}
