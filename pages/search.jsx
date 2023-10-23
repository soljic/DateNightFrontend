import { useEffect, useState } from "react";

import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";

import { ClockIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Spinner } from "@/components/Status";
import FullWidthLayout from "@/components/layout/LayoutV2";

import { GlobalSearch } from "@/service/http/search";

import {
  FILTER_PLACE,
  FILTER_SPIRITUS,
  FILTER_STORY,
} from "../service/constants";

export default function Search({ defaultFilter, defaultName }) {
  const { t } = useTranslation("common");

  const [searchFilter, setSearchFilter] = useState(
    defaultFilter || FILTER_SPIRITUS
  );
  const [searchTerm, setSearchTerm] = useState(defaultName || "");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isLast, setIsLast] = useState(true);
  const [total, setTotal] = useState(0);
  const [placeholder, setPlaceholder] = useState("search_placeholder")

  const clear = () => {
    setResults([]);
    setSearching(false);
    setNotFound(false);
    setSearchTerm("");
    setCurrent(0);
    setIsLast(true);
    setTotal(0);
  };

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (!searchTerm) {
        clear();
        return;
      }
      setSearching(true);
      setNotFound(false);

      const res = await GlobalSearch(searchFilter, searchTerm);
      setSearching(false);
      setIsLast(res.data.last);
      if (!res.data.content.length) {
        setNotFound(true);
        setResults([]);
      } else {
        setNotFound(false);
        setResults(res.data.content);
        setTotal(res.data.totalElements);
      }
    }, 400);

    return () => {
      clearTimeout(debounce);
    };
  }, [searchTerm]);

  const loadMore = async () => {
    try {
      setSearching(true);
      setNotFound(false);

      const res = await GlobalSearch(searchFilter, searchTerm, current + 1);
      setSearching(false);
      setIsLast(res.data.last);
      if (res.data.content.length) {
        setCurrent((prev) => prev + 1);
        setResults([...results, ...res.data.content]);
      }
    } catch (err) {
      setSearching(false);
    }
  };

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_search_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_search_description")} />
      </Head>
      <div className="mx-auto my-5 min-h-screen w-11/12 md:my-20 md:w-2/3 lg:w-1/3 xl:w-1/4">
        <div
          className={`flex items-center gap-x-2 rounded-sp-14 border border-sp-lighter py-2 ${
            results.length && !searching ? "bg-none" : "dark:bg-sp-medium"
          } dark:border-sp-medium`}
        >
          <div className="ml-3">
            {searching ? (
              <Spinner />
            ) : (
              <SearchIcon className="h-6 w-6 text-sp-lighter" />
            )}
          </div>
          <div className="inline-flex w-full">
            <input
              id="search-term"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
              className="mr-2 w-full bg-inherit p-1.5 text-sp-black placeholder-sp-lighter caret-sp-fawn outline-none text-lg dark:text-sp-white"
              type="text"
              placeholder={t(placeholder)}
              autoFocus
            />
            {!!searchTerm && (
              <button onClick={() => clear()} className="mr-3">
                <XIcon className="h-5 w-5 text-sp-lighter dark:text-sp-white" />
              </button>
            )}
          </div>
        </div>
        <Filter
          filter={searchFilter}
          setFilter={setSearchFilter}
          clear={clear}
          setPlaceholder={setPlaceholder}
        />
        {!!results.length && !searching && (
          <GlobalSearchResults results={results} total={total} />
        )}
        {searching && <SearchContentPlacaholder />}
        {notFound && <NotFound searchTerm={searchTerm} filter={searchFilter} />}
        {!isLast && (
          <div className="flex justify-center">
            <button
              onClick={() => {
                loadMore();
              }}
              disabled={isLast}
              className="cursor-pointer rounded-full border border-sp-lighter from-sp-day-300 to-sp-day-100 px-8 py-3 font-semibold hover:bg-gradient-to-r focus:outline-none dark:border-sp-medium dark:bg-sp-medlight dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
            >
              {searching ? (
                <Spinner text={t("loading")} />
              ) : (
                t("action_load_more")
              )}
            </button>
          </div>
        )}
      </div>
    </FullWidthLayout>
  );
}

function Filter({ filter, setFilter, clear , setPlaceholder}) {
  const { t } = useTranslation("common");

  return (
    <div className="mx-auto mt-6 flex w-3/4 justify-between">
      <button
        onClick={() => {
          clear();
          setFilter(FILTER_SPIRITUS);
          setPlaceholder("search_placeholder");
        }}
        className={`px-0.5 pb-1.5 font-semibold text-sm tracking-sp-tighten ${
          filter === FILTER_SPIRITUS
            ? "border-b-3 border-sp-cotta text-sp-cotta dark:border-sp-fawn dark:text-sp-fawn"
            : ""
        }`}
      >
        {t("term_memorial")}
      </button>
      <button
        onClick={() => {
          clear();
          setFilter(FILTER_PLACE);
          setPlaceholder("search_place_placeholder");
        }}
        className={`px-0.5 pb-1.5 font-semibold text-sm tracking-sp-tighten ${
          filter === FILTER_PLACE
            ? "border-b-3 border-sp-cotta text-sp-cotta dark:border-sp-fawn dark:text-sp-fawn"
            : ""
        }`}
      >
        {t("term_place")}
      </button>
      <button
        onClick={() => {
          clear();
          setFilter(FILTER_STORY);
          setPlaceholder("search_story_placeholder");
        }}
        className={`px-0.5 pb-1.5 font-semibold text-sm tracking-sp-tighten ${
          filter === FILTER_STORY
            ? "border-b-3 border-sp-cotta text-sp-cotta dark:border-sp-fawn dark:text-sp-fawn"
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
    <div className="mt-12 flex flex-col items-center justify-center text-sp-lighter">
      <svg
        className="h-10 w-10"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1988 7.1998C11.1988 7.47378 11.1713 7.74132 11.1188 7.9998H15.9988C16.8825 7.9998 17.5988 8.71615 17.5988 9.5998V12.7998H15.9988C14.2315 12.7998 12.7988 14.2325 12.7988 15.9998V17.5998H9.59883C8.71517 17.5998 7.99883 16.8835 7.99883 15.9998V11.1198C7.74034 11.1723 7.4728 11.1998 7.19883 11.1998C6.92486 11.1998 6.65732 11.1723 6.39883 11.1198V15.9998C6.39883 17.7671 7.83152 19.1998 9.59883 19.1998H12.7988V22.3998C12.7988 24.1671 14.2315 25.5998 15.9988 25.5998H20.8788C20.8264 25.3413 20.7988 25.0738 20.7988 24.7998C20.7988 24.5258 20.8264 24.2583 20.8788 23.9998H15.9988C15.1152 23.9998 14.3988 23.2835 14.3988 22.3998V19.1998H15.9988C17.7661 19.1998 19.1988 17.7671 19.1988 15.9998V14.3998H22.3988C23.2825 14.3998 23.9988 15.1161 23.9988 15.9998V20.8798C24.2573 20.8274 24.5249 20.7998 24.7988 20.7998C25.0728 20.7998 25.3403 20.8274 25.5988 20.8798V15.9998C25.5988 14.2325 24.1661 12.7998 22.3988 12.7998H19.1988V9.5998C19.1988 7.83249 17.7661 6.3998 15.9988 6.3998H11.1188C11.1713 6.65829 11.1988 6.92583 11.1988 7.1998ZM17.5988 14.3998V15.9998C17.5988 16.8835 16.8825 17.5998 15.9988 17.5998H14.3988V15.9998C14.3988 15.1161 15.1152 14.3998 15.9988 14.3998H17.5988ZM9.59883 7.1998C9.59883 8.52529 8.52431 9.5998 7.19883 9.5998C5.87334 9.5998 4.79883 8.52529 4.79883 7.1998C4.79883 5.87432 5.87334 4.7998 7.19883 4.7998C8.52431 4.7998 9.59883 5.87432 9.59883 7.1998ZM27.1988 24.7998C27.1988 26.1253 26.1243 27.1998 24.7988 27.1998C23.4733 27.1998 22.3988 26.1253 22.3988 24.7998C22.3988 23.4743 23.4733 22.3998 24.7988 22.3998C26.1243 22.3998 27.1988 23.4743 27.1988 24.7998ZM27.1988 7.1998C27.1988 8.52529 26.1243 9.5998 24.7988 9.5998C23.4733 9.5998 22.3988 8.52529 22.3988 7.1998C22.3988 5.87432 23.4733 4.7998 24.7988 4.7998C26.1243 4.7998 27.1988 5.87432 27.1988 7.1998ZM9.59883 24.7998C9.59883 26.1253 8.52431 27.1998 7.19883 27.1998C5.87334 27.1998 4.79883 26.1253 4.79883 24.7998C4.79883 23.4743 5.87334 22.3998 7.19883 22.3998C8.52431 22.3998 9.59883 23.4743 9.59883 24.7998Z"
          fill="currentColor"
        />
      </svg>
      <p className="mb-4 w-full p-2 text-center lg:w-2/3">
        {t("search_not_found_part_1")} <span>“{searchTerm}”.</span>{" "}
        {filter === FILTER_SPIRITUS ? t("search_not_found_part_2") : ""}
      </p>
      {filter === FILTER_SPIRITUS && (
        <Link
          href="/create/spiritus"
          className="inline-flex rounded-full border-5 border-sp-fawn bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-7 py-3 text-sp-white dark:border-sp-medium dark:border-opacity-80 dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className="ml-1 font-semibold">{t("create_spiritus")}</span>
        </Link>
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
      <p className="p-2 text-center text-sp-lighter">{t("searching")}</p>
      <div className="flex w-full flex-col items-start">{ph}</div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="flex w-3/4 p-2">
      <div
        // data-placeholder
        className="relative mr-2 h-20 w-20 animate-pulse overflow-hidden rounded-sp-14 bg-sp-day-200 dark:bg-sp-medium"
      ></div>
      <div className="flex w-full flex-col justify-center gap-2">
        <div
          // data-placeholder
          className="relative h-5 w-full animate-pulse overflow-hidden rounded-sp-14 bg-sp-day-200 dark:bg-sp-medium"
        ></div>
        <div
          // data-placeholder
          className="relative h-5 w-3/4 animate-pulse overflow-hidden rounded-sp-14 bg-sp-day-200 dark:bg-sp-medium"
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
function GlobalSearchResults({ results, total }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col rounded-sp-14 py-2">
      <p className="p-2 text-center text-sp-lighter">
        {results.length}/{total} <span> {t("search_results")}</span>
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
    <Link
      href={getURL(navigationType)}
      className="flex w-full rounded-sp-14 p-2 text-sp-medlight hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:text-sp-white dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
    >
      {imageUrl ? (
        <div className="relative mr-2 h-20 w-20 overflow-hidden rounded-sp-14 bg-sp-fawn bg-opacity-50 dark:bg-sp-medium">
          <Image src={imageUrl} alt={"Search result thumbnail"} layout="fill" />
        </div>
      ) : (
        <div className="flex h-20 w-20 items-center justify-center">
          <ClockIcon className="h-7 w-7 text-sp-black text-opacity-60 dark:text-sp-white dark:text-opacity-60" />
        </div>
      )}
      <div className="flex w-full flex-col justify-center px-2 py-2 text-lg tracking-sp-tighten">
        <p className="break-words pr-4 capitalize">{title.toLowerCase()}</p>
        {!!subtitle && (
          <p className="capitalize text-sp-black text-opacity-60 tracking-sp-tighten dark:text-sp-white dark:text-opacity-60">
            {subtitle.toLowerCase()}
          </p>
        )}
      </div>
    </Link>
  );
}

// defaultFilter can be selected using ?filter=place|spiritus|story
// defaultName can be selected using ?name=string
// if none is provided spiritus search is assumed
export async function getServerSideProps(context) {
  let defaultFilter = "";
  const { filter, name } = context.query;

  if (filter) {
    switch (filter.toUpperCase()) {
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
      defaultFilter: filter || null,
      defaultName: name || null,
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
        "cookies",
      ])),
    },
  };
}
