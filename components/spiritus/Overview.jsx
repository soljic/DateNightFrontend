import Link from "next/link";
import { useRouter } from "next/router";

import { countryCodeEmoji } from "country-code-emoji";
import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/hr.json"));

import { localFormatDate } from "../../service/util";

export function SpiritusOverview({
  id,
  slug,
  name,
  surname,
  birth,
  death,
  description,
  location,
}) {
  const router = useRouter();
  // MK changed their country name recently....
  const madeconia = [
    "Macedonia",
    "Makedonija",
    "Sjeverna Makedonija",
    "North Madeconia",
  ];

  let countryFlag = "";
  if (location && location?.country) {
    let code = countries.getAlpha2Code(location.country, "en");
    if (!code) {
      // fallback to croatian
      code = countries.getAlpha2Code(location.country, "hr");
    }
    countryFlag = code ? countryCodeEmoji(code) : "";
    if (!countryFlag && madeconia.includes(location.country)) {
      countryFlag = "🇲🇰";
    }
  }

  const dates = `${
    birth ? localFormatDate(birth, router.locale) : "\uE132"
  } — ${death ? localFormatDate(death, router.locale) : "\uE132"}`;

  return (
    <div className="w-full md:w-3/4 flex flex-col justify-between items-center py-4 mb-4">
      <div className="flex flex-col tracking-sp-tighten text-sp-black dark:text-sp-white">
        <Link href={`/spiritus/${slug}`}>
          <a className="flex flex-col items-center">
            {location && location?.address ? (
              <button className="px-5 py-1 items-center bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown rounded-full">
                <span className="text-lg">{countryFlag}</span>{" "}
                <span className="ml-2 text-sm font-semibold">
                  {location.address}
                </span>
              </button>
            ) : (
              <></>
            )}
            <p className="py-4 capitalize">{dates}</p>
            <h2 className="font-bold text-left md:text-center text-cta pb-4">
              {name} {surname}
            </h2>
          </a>
        </Link>
        {!!description && (
          <p className="border-l-4 pl-2 border-sp-day-900 dark:border-sp-fawn">
            {`"${description}"`}
          </p>
        )}
      </div>
    </div>
  );
}
