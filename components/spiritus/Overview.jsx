import Link from "next/link";
import { useRouter } from "next/router";

import { countryCodeEmoji } from "country-code-emoji";
import countries from "i18n-iso-countries";

import { localFormatDate } from "../../service/util";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/hr.json"));

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
    <div className="mb-4 flex w-full flex-col items-center justify-between py-4 md:w-3/4">
      <div className="flex flex-col text-sp-black tracking-sp-tighten dark:text-sp-white">
        <Link href={`/spiritus/${slug}`} className="flex flex-col items-center">
          {location && location?.address ? (
            <button className="items-center rounded-full bg-gradient-to-r from-sp-day-300 to-sp-day-100 px-5 py-1 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
              <span className="text-lg">{countryFlag}</span>{" "}
              <span className="ml-2 font-semibold text-sm">
                {location.address}
              </span>
            </button>
          ) : (
            <></>
          )}
          <p className="py-4 capitalize">{dates}</p>
          <h2 className="pb-4 text-left font-bold capitalize text-cta md:text-center">
            {`${name} ${surname}`.toLowerCase()}
          </h2>
        </Link>
        {description && description.length > 0 ? (
          <p className="border-l-4 border-sp-day-900 pl-2 dark:border-sp-fawn">
            {`"${description}"`}
          </p>
        ) : null}
      </div>
    </div>
  );
}
