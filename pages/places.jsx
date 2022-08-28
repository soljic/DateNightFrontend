// import SearchBox from "@seanhouli/react-mapbox-search";
import { MapboxSearch, SessionToken } from "@mapbox/search-js-core";
import Layout from "../components/layout/Layout";

import Head from "next/head";
import { useState } from "react";
import { useEffect } from "react";

// dynamic clientside import
// const SearchBox = dynamic(
//   () => import("@mapbox/search-js-react").then((module) => module.SearchBox),
//   { ssr: false }
// );

export default function Places() {
  const [search, setSearch] = useState();
  const [session, setSession] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [location, setLocation] = useState(null);

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
          address: features[0].properties.place_name,
          // geometry.coordinates order [longitude, latitude]
          longitude: features[0].geometry.coordinates[0],
          latitude: features[0].geometry.coordinates[1],
          // take country from first matching result
          country: features[0].properties.context.filter((elem) =>
            elem.layer.startsWith("country")
          )[0].name,
        });
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
      // language: "hr",
    });
    setSearch(s);
    console.log("USING S", s);
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
    <Layout>
      <Head>
        <title>{"PLACES"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={"Places description"} />
      </Head>
      <div className="w-full md:w-96 md:max-w-full mx-auto">
        <p>{JSON.stringify(location)}</p>
        <div className="p-6 border border-gray-300 sm:rounded-md">
          <form>
            <input
              id="search-place"
              onChange={(e) => {
                e.preventDefault();
                setSearchTerm(e.target.value);
              }}
              className="mr-2 w-full bg-inherit outline-none placeholder-sp-lighter text-lg text-sp-lighter caret-sp-fawn caret"
              type="text"
              placeholder={"Search"}
            />
          </form>
          {!!results.length && visible && (
            <SearchResults
              results={results}
              setLocation={getFeatureAndSetLocation}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

function SearchResults({ results, setLocation }) {
  return (
    <div className="flex flex-col mx-auto rounded-xl">
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
