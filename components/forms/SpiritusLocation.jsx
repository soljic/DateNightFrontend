import { useEffect, useState } from "react";

import { SearchBoxCore, SessionToken } from "@mapbox/search-js-core";
import { useTranslation } from "next-i18next";

export function SpiritusLocationInput({ name, location, setLocation }) {
  const { t } = useTranslation("common");

  const [search, setSearch] = useState("");
  const [session, setSession] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const [inputLocation, setInputLocation] = useState("");
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
      const { features } = await search.retrieve(suggestion, {
        sessionToken: session,
      });
      setLocation({
        address: features[0].properties.name,
        // geometry.coordinates order [longitude, latitude]
        longitude: features[0].geometry.coordinates[0],
        latitude: features[0].geometry.coordinates[1],
        // take country from first matching result
        country: features[0].properties.context.country.name,
      });
      setInputLocation(features[0].properties.name);
    } catch (err) {
      setLocation(null);
    } finally {
      setVisible(false);
    }
  };

  useEffect(() => {
    setInputLocation(location?.address ? location.address : "");
    const t = new SessionToken();
    setSession(t);
    const s = new SearchBoxCore({
      accessToken:
        "pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ",
      language: "en",
      types: ["place", "city", "neighborhood"],
    });
    setSearch(s);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (!searchTerm) {
        setResults([]);
        setVisible(false);
        setLocation(null);
        return;
      }

      setVisible(true);
      const res = await getSuggestions(searchTerm, search, session);
      if (!res.length) {
        setResults([]);
        setLocation(null);
        setVisible(false);
      } else {
        setResults(res);
        setVisible(true);
      }
    }, 200);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <div className="mx-2">
      <h2 className="text-sp-black dark:text-sp-white">
        <span className="text-red-500">*</span>
        <span>{name} </span>
        {t("create_spiritus_location_title")}
      </h2>
      <div className="mt-1 w-full">
        <input
          id="search-place"
          onChange={(e) => {
            e.preventDefault();
            setInputLocation(e.target.value);
            setSearchTerm(e.target.value);
          }}
          value={inputLocation}
          className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
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
  );
}

function Suggestions({ results, setLocation }) {
  return (
    <div className="mx-auto flex flex-col rounded-xl border-2 border-sp-lighter dark:border-sp-medium">
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
      className="flex w-full cursor-pointer rounded-lg p-1 text-sp-medlight hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:text-sp-white dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
      onClick={() => setLocation(suggestion)}
    >
      <div className="flex w-full flex-col justify-between px-2 py-2">
        <p className="break-words">{`${suggestion.name}`}</p>
        <p className="break-words text-gray-500 text-opacity-40 text-sm">{`${suggestion.place_formatted}`}</p>
      </div>
    </div>
  );
}
