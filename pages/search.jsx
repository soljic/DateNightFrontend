import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Navbar } from "../components/layout/NavBar";
import { Footer } from "../components/layout/Footer";

import { PlusCircleIcon } from "@heroicons/react/solid";

import { ProxySearchSpiritus } from "../service/http/proxy";

export default function Search() {
  const { t } = useTranslation("common");

  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (!searchTerm) {
        setSearching(false);
        setNotFound(false);
        setResults([]);
        return;
      }
      setSearching(true);
      setNotFound(false);
      const res = await ProxySearchSpiritus(searchTerm);
      if (!res.data.content.length) {
        setSearching(false);
        setNotFound(true);
        setResults([]);
      } else {
        setSearching(false);
        setNotFound(false);
        setResults(res.data.content);
      }
    }, 600);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <div className="common-bg p-2 min-w-full">
      <Head>
        <title>{t("meta_search_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_search_description")} />
      </Head>
      <Navbar />
      <div className="h-screen container mx-auto mt-20 lg:w-1/3 md:w-full sm:w-full">
        <div className="mx-auto flex items-center rounded-xl p-2 border border-sp-lighter dark:bg-sp-medium dark:border-none">
          <button>
            <span className="flex w-auto items-center justify-end px-3 py-2 text-sp-lighter">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 -scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
          </button>
          <input
            id="search-spiritus"
            onChange={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
            }}
            className="mr-2 w-full bg-inherit outline-none placeholder-sp-lighter text-lg text-sp-lighter caret-sp-fawn caret"
            type="text"
            placeholder={t("search_placeholder")}
          />
        </div>
        {!!results.length && !searching && <SearchResults results={results} />}
        {searching && <SearchContentPlacaholder />}
        {notFound && <NotFound searchTerm={searchTerm} />}
      </div>
      <Footer />
    </div>
  );
}

function NotFound({ searchTerm }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col mx-auto text-sp-lighter items-center mt-10">
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
      <p className="text-center w-full lg:w-2/3 md:w-2/3 sm:w-2/3 p-2 mb-4">
        {`Sorry, we found no results for “${searchTerm}”. Would you like to
        create new Spiritus for him/her?`}
      </p>
      <a
        href="/create"
        className="inline-flex bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-5 border-sp-fawn dark:border-sp-medium dark:border-opacity-80 rounded-full py-3 px-7 text-sp-white dark:text-sp-black"
      >
        <PlusCircleIcon className="h-6 w-6" />
        <span className="font-semibold ml-1">{t("create_spiritus")}</span>
      </a>
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
    <div className="container flex flex-col mx-auto rounded-xl p-2">
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
        className="animate-pulse relative mr-2 h-16 w-16 overflow-hidden rounded-lg bg-sp-day-200 dark:bg-sp-medium"
      ></div>
      <div className="flex w-full flex-col justify-between py-2">
        <div
          // data-placeholder
          className="animate-pulse rounded-lg relative h-5 w-full overflow-hidden bg-sp-day-200 dark:bg-sp-medium"
        ></div>
        <div
          // data-placeholder
          className="animate-pulse rounded-lg relative h-5 w-3/4 overflow-hidden bg-sp-day-200 dark:bg-sp-medium"
        ></div>
      </div>
    </div>
  );
}

function SearchResults({ results }) {
  const { t } = useTranslation("common");

  return (
    <div className="container flex flex-col mx-auto rounded-xl p-2">
      <p className="p-2 text-sp-lighter text-center">
        {results.length} <span> {t("search_results")}</span>
      </p>
      <div className="flex flex-col items-start">
        {results.map((res) => {
          return <Row key={`${res.name}-${res.surname}-${res.id}`} {...res} />;
        })}
      </div>
    </div>
  );
}

function Row({ name, surname, images, birth, death, slug }) {
  return (
    <Link href={`/spiritus/${slug}`}>
      <a className="flex w-full p-2 hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-lg text-sp-medlight dark:text-sp-white">
        <div className="relative mr-2 h-16 w-16 overflow-hidden rounded-lg bg-sp-fawn bg-opacity-50 dark:bg-sp-medium">
          {images.length ? (
            <Image
              src={images[0].url}
              alt={"Search result thumbnail"}
              width={64}
              height={64}
              layout="fill"
            />
          ) : <></>}
        </div>
        <div className="flex w-full flex-col justify-between py-2 px-2">
          <p className="break-words pr-4">{`${name} ${surname}`}</p>
          <p className="text-opacity-40">
            {birth ? new Date(birth).getFullYear() : "?"}
            {death && ` — ${new Date(death).getFullYear()}`}
          </p>
        </div>
      </a>
    </Link>
  );
}

// needed to load translations - next-18next only works serverside
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const mock = [
  {
    id: 68419,
    birth: 1926,
    death: 1998,
    name: "Ronald",
    surname: "Richardsssssssssssssssssssssssssssssssssssss",
    city: "Chigago",
    country: "USA",
    text1: "He could have left me",
    url: "/slider/slider-1.jpeg",
    images: [],
  },
  {
    id: 98769,
    birth: 1949,
    death: 2013,
    name: "Ankica",
    surname: "Modrić",
    city: "Zagreb",
    country: "Croatia",
    text1: "How she and her husband saved me",
    url: "/slider/slider-3.jpeg",
    images: [],
  },
  {
    id: 88764,
    birth: 1938,
    death: 2008,
    name: "Andrija",
    surname: "Čordaš",
    city: "Županja",
    country: "Croatia",
    text1: "He lived his life by his own rules",
    url: "/slider/slider-2.jpeg",
    images: [],
  },
];
