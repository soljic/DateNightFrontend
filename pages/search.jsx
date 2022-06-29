import { useState, useEffect } from "react";
import Head from "next/head";

import { Navbar } from "../components/layout/NavBar";
import { Footer } from "../components/layout/Footer";

import { PlusCircleIcon } from "@heroicons/react/solid";

import { ProxySearchSpiritus } from "../service/http/proxy";

export default function Search() {
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
        <title>Spiritus | Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Find your loved ones! Over 15 000 Spiritus loved ones from many families and notable institutions." />
      </Head>
      <Navbar />
      <div className="h-screen container mx-auto mt-20 lg:w-1/3 md:w-full sm:w-full">
        <div className="mx-auto flex items-center rounded-xl p-2 bg-sp-medium">
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
            placeholder="Search Spiritus"
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
      <p className="text-center lg:w-1/3 md:w-1/2 sm:w-1/2 p-2 mb-4">
        {`Sorry, we found no results for “${searchTerm}”. Would you like to
        create new Spiritus for him/her?`}
      </p>
      <a
        href="/create"
        className="inline-flex bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 text-sp-black border-sp-medium border-opacity-80 rounded-full py-3 px-7"
      >
        <PlusCircleIcon className="h-6 w-6 text-sp-black" />
        <span className="font-semibold ml-1">Create Spiritus</span>
      </a>
    </div>
  );
}

function SearchContentPlacaholder() {
  const count = 5;
  const ph = [];

  for (let i = 0; i < count; i++) {
    ph.push(<Placeholder key={`placeholder-render-${i}`} />);
  }
  return (
    <div className="container flex flex-col mx-auto rounded-xl p-2">
      <p className="p-2 text-sp-lighter text-center">Searching...</p>
      <div className="flex w-full flex-col items-start">{ph}</div>
    </div>
  );
}

function Placeholder() {
  return (
    <div className="flex w-3/4 p-2">
      <div
        // data-placeholder
        className="animate-pulse relative mr-2 h-16 w-16 overflow-hidden rounded-lg bg-sp-medium"
      ></div>
      <div className="flex w-full flex-col justify-between py-2">
        <div
          // data-placeholder
          className="animate-pulse rounded-lg relative h-5 w-full overflow-hidden bg-sp-medium"
        ></div>
        <div
          // data-placeholder
          className="animate-pulse rounded-lg relative h-5 w-3/4 overflow-hidden bg-sp-medium"
        ></div>
      </div>
    </div>
  );
}

function SearchResults({ results }) {
  return (
    <div className="container flex flex-col mx-auto rounded-xl p-2">
      <p className="p-2 text-sp-lighter text-center">
        {results.length} results
      </p>
      <div className="flex flex-col items-start">
        {results.map((res) => {
          return <Row key={`${res.name}-${res.surname}-${res.id}`} {...res} />;
        })}
      </div>
    </div>
  );
}

function Row({ name, surname, images, birth, death }) {
  return (
    <div className="flex w-full p-2 hover:bg-gradient-to-r hover:from-sp-dark-brown hover:to-sp-brown rounded-lg">
      <div className="relative mr-2 h-16 w-16 overflow-hidden rounded-lg bg-sp-medium"></div>
      <div className="flex w-full flex-col justify-between py-2 px-2">
        <p className="text-sp-white break-words pr-4">{`${name} ${surname}`}</p>
        <p className="text-sp-white text-opacity-40">
          {birth ? new Date(birth).getFullYear() : "?"}
          {death && ` — ${new Date(death).getFullYear()}`}
        </p>
      </div>
    </div>
  );
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
