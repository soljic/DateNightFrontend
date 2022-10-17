import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { PlusCircleIcon } from "@heroicons/react/solid";
import { SearchIcon, XIcon, ClockIcon } from "@heroicons/react/outline";

import LayoutNoFooter from "../components/layout/LayoutNoFooter";
import { Spinner } from "../components/Status";

import {
  FILTER_SPIRITUS,
  FILTER_PLACE,
  FILTER_STORY,
} from "../service/constants";
import { GlobalSearch } from "../service/http/search";

export default function Search({ defaultFilter }) {
  const { t } = useTranslation("common");

  const [searchFilter, setSearchFilter] = useState(
    defaultFilter || FILTER_SPIRITUS
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const clear = () => {
    setResults([]);
    setSearching(false);
    setNotFound(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (!searchTerm) {
        setResults([]);
        setSearching(false);
        setNotFound(false);
        return;
      }
      setSearching(true);
      setNotFound(false);

      const res = await GlobalSearch(searchFilter, searchTerm);
      setSearching(false);
      if (!res.data.content.length) {
        setNotFound(true);
        setResults([]);
      } else {
        setNotFound(false);
        setResults(res.data.content);
      }
    }, 600);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <LayoutNoFooter>
      <Head>
        <title>{t("meta_search_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_search_description")} />
      </Head>
      <div className="h-screen mx-auto mt-20 w-full lg:w-1/2 md:w-2/3 sm:w-full">
        <div
          className={`flex gap-x-2 items-center rounded-sp-14 py-2 border border-sp-lighter ${
            results.length && !searching ? "bg-none" : "dark:bg-sp-medium"
          } dark:border-sp-medium`}
        >
          <div className="ml-3">
            {searching ? (
              <Spinner />
            ) : (
              <SearchIcon className="w-6 h-6 text-sp-lighter" />
            )}
          </div>
          <div className="inline-flex w-full">
            <input
              id="search-term"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
              className="mr-2 p-1.5 w-full bg-inherit outline-none placeholder-sp-lighter text-lg text-sp-black dark:text-sp-white caret-sp-fawn"
              type="text"
              placeholder={t("search_placeholder")}
              autoFocus
            />
            {!!searchTerm && (
              <button onClick={() => clear()} className="mr-3">
                <XIcon className="w-5 h-5 text-sp-lighter dark:text-sp-white" />
              </button>
            )}
          </div>
        </div>
        <Filter
          filter={searchFilter}
          setFilter={setSearchFilter}
          clear={clear}
        />
        {!!results.length && !searching && (
          <GlobalSearchResults results={results} />
        )}
        {searching && <SearchContentPlacaholder />}
        {notFound && <NotFound searchTerm={searchTerm} filter={searchFilter} />}
      </div>
    </LayoutNoFooter>
  );
}

function Filter({ filter, setFilter, clear }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex justify-between w-3/4 mx-auto mt-6">
      <button
        onClick={() => {
          clear();
          setFilter(FILTER_SPIRITUS);
        }}
        className={`font-semibold pb-1.5 px-0.5 text-sm tracking-sp-tighten ${
          filter === FILTER_SPIRITUS
            ? "border-b-3 text-sp-cotta border-sp-cotta dark:text-sp-fawn dark:border-sp-fawn"
            : ""
        }`}
      >
        Spiritus
      </button>
      <button
        onClick={() => {
          clear();
          setFilter(FILTER_PLACE);
        }}
        className={`font-semibold pb-1.5 px-0.5 text-sm tracking-sp-tighten ${
          filter === FILTER_PLACE
            ? "border-b-3 text-sp-cotta border-sp-cotta dark:text-sp-fawn dark:border-sp-fawn"
            : ""
        }`}
      >
        {t("term_place")}
      </button>
      <button
        onClick={() => {
          clear();
          setFilter(FILTER_STORY);
        }}
        className={`font-semibold pb-1.5 px-0.5 text-sm tracking-sp-tighten ${
          filter === FILTER_STORY
            ? "border-b-3 text-sp-cotta border-sp-cotta dark:text-sp-fawn dark:border-sp-fawn"
            : ""
        }`}
      >
        {t("term_story")}
      </button>
    </div>
  );
}

function NotFound({ searchTerm, filter }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col text-sp-lighter items-center justify-center mt-12">
      <svg
        className="w-10 h-10"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1988 7.1998C11.1988 7.47378 11.1713 7.74132 11.1188 7.9998H15.9988C16.8825 7.9998 17.5988 8.71615 17.5988 9.5998V12.7998H15.9988C14.2315 12.7998 12.7988 14.2325 12.7988 15.9998V17.5998H9.59883C8.71517 17.5998 7.99883 16.8835 7.99883 15.9998V11.1198C7.74034 11.1723 7.4728 11.1998 7.19883 11.1998C6.92486 11.1998 6.65732 11.1723 6.39883 11.1198V15.9998C6.39883 17.7671 7.83152 19.1998 9.59883 19.1998H12.7988V22.3998C12.7988 24.1671 14.2315 25.5998 15.9988 25.5998H20.8788C20.8264 25.3413 20.7988 25.0738 20.7988 24.7998C20.7988 24.5258 20.8264 24.2583 20.8788 23.9998H15.9988C15.1152 23.9998 14.3988 23.2835 14.3988 22.3998V19.1998H15.9988C17.7661 19.1998 19.1988 17.7671 19.1988 15.9998V14.3998H22.3988C23.2825 14.3998 23.9988 15.1161 23.9988 15.9998V20.8798C24.2573 20.8274 24.5249 20.7998 24.7988 20.7998C25.0728 20.7998 25.3403 20.8274 25.5988 20.8798V15.9998C25.5988 14.2325 24.1661 12.7998 22.3988 12.7998H19.1988V9.5998C19.1988 7.83249 17.7661 6.3998 15.9988 6.3998H11.1188C11.1713 6.65829 11.1988 6.92583 11.1988 7.1998ZM17.5988 14.3998V15.9998C17.5988 16.8835 16.8825 17.5998 15.9988 17.5998H14.3988V15.9998C14.3988 15.1161 15.1152 14.3998 15.9988 14.3998H17.5988ZM9.59883 7.1998C9.59883 8.52529 8.52431 9.5998 7.19883 9.5998C5.87334 9.5998 4.79883 8.52529 4.79883 7.1998C4.79883 5.87432 5.87334 4.7998 7.19883 4.7998C8.52431 4.7998 9.59883 5.87432 9.59883 7.1998ZM27.1988 24.7998C27.1988 26.1253 26.1243 27.1998 24.7988 27.1998C23.4733 27.1998 22.3988 26.1253 22.3988 24.7998C22.3988 23.4743 23.4733 22.3998 24.7988 22.3998C26.1243 22.3998 27.1988 23.4743 27.1988 24.7998ZM27.1988 7.1998C27.1988 8.52529 26.1243 9.5998 24.7988 9.5998C23.4733 9.5998 22.3988 8.52529 22.3988 7.1998C22.3988 5.87432 23.4733 4.7998 24.7988 4.7998C26.1243 4.7998 27.1988 5.87432 27.1988 7.1998ZM9.59883 24.7998C9.59883 26.1253 8.52431 27.1998 7.19883 27.1998C5.87334 27.1998 4.79883 26.1253 4.79883 24.7998C4.79883 23.4743 5.87334 22.3998 7.19883 22.3998C8.52431 22.3998 9.59883 23.4743 9.59883 24.7998Z"
          fill="currentColor"
        />
      </svg>
      <p className="text-center w-full lg:w-2/3 p-2 mb-4">
        {t("search_not_found_part_1")} <span>“{searchTerm}”.</span>{" "}
        {filter === FILTER_SPIRITUS ? t("search_not_found_part_2") : ""}
      </p>
      {filter === FILTER_SPIRITUS && (
        <a
          href="/create/spiritus"
          className="inline-flex bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-5 border-sp-fawn dark:border-sp-medium dark:border-opacity-80 rounded-full py-3 px-7 text-sp-white dark:text-sp-black"
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className="font-semibold ml-1">{t("create_spiritus")}</span>
        </a>
      )}
    </div>
  );
}

function SearchContentPlacaholder() {
  const { t } = useTranslation("common");

  const count = 5;
  const ph = [];

  for (let i = 0; i < count; i++) {
    ph.push(<Placeholder key={`placeholder-render-${i}`} />);
  }
  return (
    <div className="flex flex-col rounded-sp-14 py-2">
      <p className="p-2 text-sp-lighter text-center">{t("searching")}</p>
      <div className="flex w-full flex-col items-start">{ph}</div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="flex w-3/4 p-2">
      <div
        // data-placeholder
        className="animate-pulse relative mr-2 h-20 w-20 overflow-hidden rounded-sp-14 bg-sp-day-200 dark:bg-sp-medium"
      ></div>
      <div className="flex w-full flex-col justify-center gap-2">
        <div
          // data-placeholder
          className="animate-pulse rounded-sp-14 relative h-5 w-full overflow-hidden bg-sp-day-200 dark:bg-sp-medium"
        ></div>
        <div
          // data-placeholder
          className="animate-pulse rounded-sp-14 relative h-5 w-3/4 overflow-hidden bg-sp-day-200 dark:bg-sp-medium"
        ></div>
      </div>
    </div>
  );
}

// Global search returns in the following format:
// {
//    id: 68239
//    navigationType: "SPIRITUS_DETAILS" || "STORY DETAILS"
//    parentId: null
//    parentNavigationType: null
//    payload: ""
//    subtitle: "?—1980"
//    title: "ANKICA KONRAD"
// }
function GlobalSearchResults({ results }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col rounded-sp-14 py-2">
      <p className="p-2 text-sp-lighter text-center">
        {results.length} <span> {t("search_results")}</span>
      </p>
      <div className="flex flex-col items-start">
        {results.map((res) => {
          return <GlobalSearchRow key={res.id} {...res} />;
        })}
      </div>
    </div>
  );
}

function GlobalSearchRow({
  id,
  slug,
  title,
  subtitle,
  imageUrl,
  navigationType,
}) {
  const getURL = (navType) => {
    switch (navType) {
      case "PLACE_DETAILS":
        return `/spiritus/place/${id}?location=${title}`;
      case "STORY_DETAILS":
        return `/stories/${slug}`;
      default:
        return `/spiritus/${slug}`;
    }
  };
  return (
    <Link href={getURL(navigationType)}>
      <a className="flex w-full p-2 hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-14 text-sp-medlight dark:text-sp-white">
        {imageUrl ? (
          <div className="relative mr-2 h-20 w-20 overflow-hidden rounded-sp-14 bg-sp-fawn bg-opacity-50 dark:bg-sp-medium">
            <Image
              src={imageUrl}
              alt={"Search result thumbnail"}
              layout="fill"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-20 w-20">
            <ClockIcon className="w-7 h-7 text-sp-black text-opacity-60 dark:text-sp-white dark:text-opacity-60" />
          </div>
        )}
        <div className="flex w-full flex-col justify-center py-2 px-2 text-lg tracking-sp-tighten">
          <p className="break-words pr-4 capitalize">{title.toLowerCase()}</p>
          {!!subtitle && (
            <p className="text-opacity-60 dark:text-opacity-60 text-sp-black dark:text-sp-white tracking-sp-tighten capitalize">
              {subtitle.toLowerCase()}
            </p>
          )}
        </div>
      </a>
    </Link>
  );
}

// defaultFilter can be selected using ?query=place|spiritus|story
// if none is provided spiritus search is assumed
export async function getServerSideProps(context) {
  let defaultFilter = "";
  const { query } = context;
  if (query?.query) {
    switch (query?.query.toUpperCase()) {
      case FILTER_STORY:
        defaultFilter = FILTER_STORY;
        break;
      case FILTER_PLACE:
        defaultFilter = FILTER_PLACE;
        break;
      default:
        defaultFilter = FILTER_SPIRITUS;
    }
  }

  return {
    props: {
      defaultFilter,
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
      ])),
    },
  };
}
