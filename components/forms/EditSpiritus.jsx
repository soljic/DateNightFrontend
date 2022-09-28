import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

import { MapboxSearch, SessionToken } from "@mapbox/search-js-core";

export function SpiritusName({ name, setName, surname, setSurname }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <h2 className="font-bold text-sp-black dark:text-sp-white text-2xl mb-2">
        Ime i prezime
      </h2>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full flex-1">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder={t("create_spiritus_firstname_placeholder")}
            className="p-3 placeholder-gray-500 bg-sp-day-50 dark:bg-sp-black border-2 border-sp-lighter dark:border-sp-medium appearance-none outline-none w-full rounded dark:text-sp-white"
          />
        </div>
        <div className="w-full flex-1">
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
  );
}
export function SpiritusDescription({ name, description, setDescription }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <h2 className="font-bold text-sp-black dark:text-sp-white text-2xl mb-2">
        Citat ili opis spiritusa
      </h2>
      <div className="flex flex-col md:flex-row">
        <div className="w-full flex-1">
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
  );
}

export function SpiritusLocation({ location, setLocation }) {
  const { t } = useTranslation("common");

  const [search, setSearch] = useState();
  const [session, setSession] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const [inputLocation, setInputLocation] = useState(() =>
    location?.address ? location.address : ""
  );
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
      // TODO: CHANGE
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
    <div>
      <h2 className="font-bold text-sp-black dark:text-sp-white text-2xl mb-2">
        Lokacija
      </h2>
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
