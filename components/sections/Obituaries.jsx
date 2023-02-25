import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import dynamic from "next/dynamic";
import { getISOLocalDate } from "@wojtekmaj/date-utils";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

import { Spinner } from "../Status";
import { GetObituaries } from "../../service/http/obituary";
import { ObImageIcon, ObOliveIcon } from "../../components/Icons";

export function NoticesGrid({ date, isLastPage, initialItems }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [current, setCurrent] = useState(0);
  const [isLast, setIsLast] = useState(isLastPage);
  const [items, setItems] = useState(initialItems);
  const [isLoading, setIsLoading] = useState(false);
  const [switchDate, setSwitchDate] = useState(null);

  const DatePicker = dynamic(() =>
    import("react-date-picker/dist/entry.nostyle").then((dp) => dp)
  );

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const res = await GetObituaries(date, current + 1);
      setItems((prev) => [...prev, ...res.data.content]);
      setCurrent((current) => current + 1);
      setIsLast(res.data.last);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (switchDate) {
      router.replace(`/notices/date/${switchDate}`).then(() => router.reload());
    }
  }, [switchDate]);

  const getNextDate = () => {
    const now = new Date();
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    if (nextDate <= now) {
      return nextDate.toISOString().split("T")[0];
    }
    return now.toISOString().split("T")[0];
  };

  const getPrevDate = () => {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    return prevDate.toISOString().split("T")[0];
  };

  return (
    <div className="flex flex-col items-center mt-16 mb-8 lg:mb-24 lg:mt-12">
      <div className="flex flex-col items-center mb-20">
        <h1 className="text-cta font-bold subpixel-antialiased tracking-tight text-sp-black dark:text-sp-white">
          Funeral Notices
        </h1>
        <p className="text-sp-lighter dark:text-sp-lighter mt-2">
          See who has passed away recently.
        </p>

        <div className="inline-flex mt-3 items-center gap-3">
          <div className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-1.5 px-4 text-base font-medium gap-x-4">
            <Link href={`/notices/date/${getPrevDate()}`}>
              <a className="text-sp-gray hover:text-sp-white">
                <ChevronLeftIcon className="h-5 w-5" />
              </a>
            </Link>
            <DatePicker
              id="birth"
              onChange={(dt) => {
                const routeDate = getISOLocalDate(dt);
                setSwitchDate(routeDate);
              }}
              value={new Date(date)}
              clearIcon={null}
              calendarIcon={null}
              showLeadingZeros={true}
              format="dd.MM.yyyy"
            />
            <Link href={`/notices/date/${getNextDate()}`}>
              <a disabled={true} className="text-sp-gray hover:text-sp-white">
                <ChevronRightIcon className="h-5 w-5" />
              </a>
            </Link>
          </div>
          <div className="border-r-3 h-5 w-1 border-sp-brown rounded-sm"></div>
          <button className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-2 px-4 text-base font-medium">
            Our Partners
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-y-10 gap-x-5 sm:grid-cols-2 md:gap-x-7 mb-14">
        {items.map((item, index) => (
          <ObituaryShort ob={item} key={index} />
        ))}
      </div>

      {!isLast && (
        <div className="flex justify-center mt-16 w-full">
          <button
            onClick={() => {
              loadMore();
            }}
            disabled={isLast}
            className="dark:bg-sp-medlight w-full sm:w-1/3 border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none rounded-full py-3 px-8 font-semibold cursor-pointer"
          >
            {isLoading ? (
              <Spinner text={t("loading")} />
            ) : (
              t("action_load_more")
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export function ObituaryFull({ spiritus, obituary }) {
  const { t } = useTranslation("common");

  const content = {
    TOP: {},
    MIDDLE: {},
    FAREWELL: {},
    BEREAVED: {},
    BOLD_TEXT: {},
  };

  obituary.texts.forEach((txt) => {
    content[txt.type] = txt;
  });
  return (
    <div className="w-full font-fancy hover:dark:border-sp-fawn hover:border-sp-dark-fawn/70 items-center justify-center rounded-sp-14 border-4 border-sp-day-200 dark:border-sp-gray p-5 lg:p-6 bg-sp-day-50 dark:bg-sp-black">
      <div className="flex text-base font-normal tracking-sp-tighten justify-evenly gap-10">
        <div className="flex flex-col items-center justify-start space-y-1 font-medium text-center break-words w-1/2">
          <div className="pb-5">
            {obituary?.religiousImage?.url ? (
              <Image
                alt="Religious Symbol"
                src={obituary?.religiousImage?.url || ""}
                className="object-contain"
                width={65}
                height={105}
              />
            ) : (
              <ObImageIcon width={8} height={8} />
            )}
          </div>
          <p className="px-4">{content.TOP?.text || ""}</p>
          <h2 className="text-2xl font-medium py-1 tracking-normal">
            {!!spiritus.maidenName
              ? `${spiritus.name || ""} ${spiritus.surname || ""} rođ. ${
                  spiritus.maidenName || ""
                }`
              : `${spiritus.name || ""} ${spiritus.surname || ""}`}
          </h2>
          {/* <p>05.10.1939 – 29.01.2023</p> */}
          <p className="px-4">
            {spiritus?.birth
              ? new Date(spiritus.birth).toLocaleDateString()
              : ""}{" "}
            –{" "}
            {spiritus?.death
              ? new Date(spiritus.death).toLocaleDateString()
              : ""}
          </p>
          <p className="px-4">{content.MIDDLE?.text || ""}</p>
          <p className="text-xl font-medium">{content.BOLD_TEXT?.text || ""}</p>
        </div>
        {spiritus?.images && spiritus?.images.length > 0 ? (
          <div className="h-52 w-44 relative overflow-hidden border-3 border-sp-day-200 rounded-lg">
            <div className="overflow-hidden">
              <div className="ribbon"></div>
              <img
                src={spiritus?.images[0]?.url || ""}
                alt={title}
                className="object-center h-52 w-44"
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="mt-12 flex justify-center gap-6 text-[14px] tracking-sp-tighten font-medium">
        <div className="w-1/2 px-2 md:px-8">
          <h3 className="text-center text-xl">Ispraćaj</h3>
          <p className="text-center">{content.FAREWELL?.text || ""}</p>
        </div>
        <div className="flex items-center justify-center">
          <ObOliveIcon width={10} height={10} />
        </div>
        <div className="w-1/2 px-2 md:px-8">
          <h3 className="text-center text-xl">Ožalošćeni</h3>
          <p className="text-center">{content.BEREAVED?.text || ""}</p>
        </div>
      </div>
    </div>
  );
}

export function ObituaryShort({ ob }) {
  const { t } = useTranslation("common");

  return (
    <Link href={"/404"}>
      <a className="flex hover:dark:border-sp-fawn hover:border-sp-dark-fawn/70 items-center justify-center rounded-sp-14 border-4 border-sp-day-200 dark:border-sp-gray p-5 lg:p-6 bg-sp-day-50 dark:bg-sp-black">
        <div className="flex text-base font-normal tracking-sp-tighten justify-evenly gap-5 lg:gap-8 items-center min-w-[240px] min-h-[140px] ">
          <div className="flex flex-col items-center justify-center space-y-1 font-medium text-center break-words font-fancy">
            <div className="pb-1.5">
              <ObImageIcon width={8} height={8} />
            </div>
            <h2 className="text-lg lg:text-2xl font-medium tracking-normal leading-4">
              {`${ob.name || ""} ${ob.surname || ""}`}
            </h2>
            <p className="px-2 text-sm lg:text-lg">
              {ob?.birth ? new Date(ob.birth).toLocaleDateString() : ""} –{" "}
              {ob?.death ? new Date(ob.death).toLocaleDateString() : ""}
            </p>
          </div>
          {ob?.image?.url ? (
            <div className="h-32 w-28 lg:h-44 lg:w-36 relative overflow-hidden border-4 border-sp-day-200 dark:border-sp-medium rounded-2xl">
              <div className="overflow-hidden">
                <div className="mini-ribbon"></div>
                <img
                  src={ob?.image?.url}
                  alt={"ob-image"}
                  className="object-center h-32 w-28 lg:h-44 lg:w-36"
                />
              </div>
            </div>
          ) : null}
        </div>
      </a>
    </Link>
  );
}
