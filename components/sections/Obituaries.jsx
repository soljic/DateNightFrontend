import Link from "next/link";
import Image from "next/legacy/image";

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
    import("react-date-picker").then((dp) => dp)
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
    <div className="mb-8 mt-16 flex flex-col items-center lg:mb-24 lg:mt-12">
      <div className="mb-20 flex flex-col items-center">
        <h1 className="font-bold tracking-tight text-sp-black subpixel-antialiased text-cta dark:text-sp-white">
          {t("menu_funeral_notices_title")}
        </h1>
        <p className="mt-2 text-sp-lighter dark:text-sp-lighter">
          {t("funeral_notices_subtitle")}
        </p>

        <div className="mt-3 inline-flex items-center gap-3">
          <div className="inline-flex items-center gap-1 gap-x-4 rounded-full border border-sp-lighter from-sp-day-300 to-sp-day-100 px-4 py-1.5 font-medium text-base hover:bg-gradient-to-r focus:outline-none dark:border-sp-medium dark:bg-sp-medlight dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
            <a
              href={`/notices/date/${getPrevDate()}`}
              className="text-sp-gray hover:text-sp-white"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </a>
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
            <a
              href={`/notices/date/${getNextDate()}`}
              disabled={true}
              className="text-sp-gray hover:text-sp-white"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </a>
          </div>
          <div className="h-5 w-1 rounded-sm border-r-3 border-sp-brown"></div>
          <Link
            href="/partners"
            className="inline-flex items-center gap-1 rounded-full border border-sp-lighter from-sp-day-300 to-sp-day-100 px-4 py-2 font-medium text-base hover:bg-gradient-to-r focus:outline-none dark:border-sp-medium dark:bg-sp-medlight dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
          >
            {t("funeral_notices_partners")}
          </Link>
        </div>
      </div>

      <div className="mb-14 grid w-full grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 md:gap-x-7">
        {items.map((item, index) => (
          <ObituaryShort ob={item} key={index} />
        ))}
      </div>

      {!isLast && (
        <div className="mt-16 flex w-full justify-center">
          <button
            onClick={() => {
              loadMore();
            }}
            disabled={isLast}
            className="w-full cursor-pointer rounded-full border border-sp-lighter from-sp-day-300 to-sp-day-100 px-8 py-3 font-semibold hover:bg-gradient-to-r focus:outline-none dark:border-sp-medium dark:bg-sp-medlight dark:hover:from-sp-dark-brown dark:hover:to-sp-brown sm:w-1/3"
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
    <div className="mx-auto mb-8 w-full items-center justify-center rounded-sp-14 border-4 border-[#948B84] bg-sp-day-50 p-[60px] font-fancy text-sp-burgundy dark:border-sp-medium dark:bg-sp-black dark:text-sp-white md:w-[720px]">
      <div className="flex flex-col items-center justify-between gap-10 pb-10 font-normal text-base tracking-sp-tighten md:flex-row md:items-start">
        <div
          className={`flex w-full flex-col items-center justify-start space-y-1 break-words text-center font-medium ${
            spiritus?.images && spiritus?.images.length > 0 ? "md:w-3/5" : ""
          }`}
        >
          <div className="flex items-center justify-center">
            {obituary?.religiousImage?.url ? (
              <Image
                alt="Religious Symbol"
                src={obituary?.religiousImage?.url || ""}
                className="object-contain"
                width={obituary?.religiousImage?.width || 30}
                height={obituary?.religiousImage?.height || 50}
              />
            ) : (
              <ObImageIcon width={8} height={8} />
            )}
          </div>
          <p className="text-[14px]">{content.TOP?.text || ""}</p>
          <h2 className="py-2 text-[48px] font-medium leading-none tracking-sp-tighten">
            {!!spiritus.maidenName
              ? `${spiritus.name || ""} ${spiritus.surname || ""} rođ. ${
                  spiritus.maidenName || ""
                }`
              : `${spiritus.name || ""} ${spiritus.surname || ""}`}
          </h2>
          <p className="pb-1.5 text-[18px] leading-normal">
            {spiritus?.birth
              ? new Date(spiritus.birth).toLocaleDateString("hr-HR")
              : ""}{" "}
            –{" "}
            {spiritus?.death
              ? new Date(spiritus.death).toLocaleDateString("hr-HR")
              : ""}
          </p>
          <p className="pb-1.5 text-[14px]">{content.MIDDLE?.text || ""}</p>
          <p className="text-[18px] font-medium">
            {content.BOLD_TEXT?.text || ""}
          </p>
        </div>
        {spiritus?.images && spiritus?.images.length > 0 ? (
          <div className="relative h-[240px] w-[180px] overflow-hidden rounded-lg border-4 border-sp-day-200 dark:border-sp-medium">
            <div className="overflow-hidden">
              {/* <div className="ribbon"></div> */}
              <img
                src={spiritus?.images[0]?.url || ""}
                alt={"Spiritus obituary image"}
                className="h-[240px] w-[180px] object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-center justify-center gap-10 text-[14px] font-medium tracking-sp-tighten md:flex-row md:items-start">
        <div className="order-2 md:order-1 md:w-1/2 md:px-4">
          <h3 className="text-center text-[20px]">{t("obituary_farewell")}</h3>
          <p className="text-center text-[14px]">
            {content.FAREWELL?.text || ""}
          </p>
        </div>
        <div className="order-1 flex flex-1 items-center md:order-2">
          <div className="relative inset-0 top-3 md:top-8">
            <ObOliveIcon width={10} height={10} />
          </div>
        </div>
        <div className="order-3 md:w-1/2 md:px-4">
          <h3 className="text-center text-[20px]">{t("obituary_bereaved")}</h3>
          <p className="text-center text-[14px]">
            {content.BEREAVED?.text || ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ObituaryShort({ ob }) {
  const { t } = useTranslation("common");

  return (
    <Link href={`/notices/spiritus/${ob.id}`}>
      {ob?.image?.url ? (
        <div className="w-full rounded-sp-14 border-4 border-sp-day-200 bg-sp-day-50 p-3 text-sp-burgundy hover:border-sp-dark-fawn/70 dark:border-sp-gray dark:bg-sp-black dark:text-sp-white hover:dark:border-sp-fawn lg:p-5">
          <div className="flex items-center justify-between gap-3 font-normal text-base tracking-sp-tighten lg:gap-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-1 break-words text-center font-fancy font-medium">
              <div className="pb-1.5">
                <ObImageIcon width={10} height={10} />
              </div>
              <h2 className="font-medium leading-4 text-2xl tracking-normal md:text-[20px] lg:text-3xl">
                {`${ob.name || ""} ${ob.surname || ""}`}
              </h2>
              <p className="px-2 text-[14px] md:text-lg">
                {ob?.birth
                  ? new Date(ob.birth).toLocaleDateString("hr-HR")
                  : ""}{" "}
                –{" "}
                {ob?.death
                  ? new Date(ob.death).toLocaleDateString("hr-HR")
                  : ""}
              </p>
            </div>
            <div className="relative h-[14vh] w-[11vh] overflow-hidden rounded-2xl border-4 border-sp-day-200 dark:border-sp-medium">
              <div className="overflow-hidden">
                {/* <div className="mini-ribbon"></div> */}
                <img
                  src={ob?.image?.url}
                  alt={"ob-image"}
                  className="h-[14vh] object-center"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center rounded-sp-14 border-4 border-sp-day-200 bg-sp-day-50 p-3 text-sp-burgundy hover:border-sp-dark-fawn/70 dark:border-sp-gray dark:bg-sp-black dark:text-sp-white hover:dark:border-sp-fawn lg:p-5">
          <div className="flex items-center justify-between gap-3 font-normal text-base tracking-sp-tighten lg:gap-6">
            <div className="mx-auto flex flex-col items-center justify-center space-y-1 break-words text-center font-fancy font-medium">
              <div className="pb-1.5">
                <ObImageIcon width={10} height={10} />
              </div>
              <h2 className="font-medium leading-4 text-lg tracking-normal lg:text-2xl">
                {`${ob.name || ""} ${ob.surname || ""}`}
              </h2>
              <p className="px-2 text-sm lg:text-lg">
                {ob?.birth
                  ? new Date(ob.birth).toLocaleDateString("hr-HR")
                  : ""}{" "}
                –{" "}
                {ob?.death
                  ? new Date(ob.death).toLocaleDateString("hr-HR")
                  : ""}
              </p>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}
