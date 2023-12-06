import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRouter as useNavigationRouter } from "next/router";

import { ReceiptCube24Filled } from "@fluentui/react-icons";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { CheckCircleIcon, PencilIcon } from "@heroicons/react/solid";
import { countryCodeEmoji } from "country-code-emoji";
import countries from "i18n-iso-countries";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Spinner } from "@/components/Status";

import { SendRose } from "@/service/http/rose";
import { SaveSpiritus, UnSaveSpiritus } from "@/service/http/save";

import { cn } from "@/utils/cn";

import { SettingsCreateStorySolidIcon } from "../SettingsIcons";
import { LoginModal } from "../auth/Login";
import { ArrowUpRightIcon } from "../layout/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AgeIcon,
  CalendarIcon,
  FuneralOrgIcon,
  LinkIcon,
  MemoryGuardianAlterIcon,
  MemoryGuardianIcon,
  MiniBioIcon,
  PlaceIcon,
  QuoteIcon,
  RemindMeIcon,
  RoseIcon,
  ShareIcon,
} from "./Icons";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/hr.json"));

const dateOptions = { year: "numeric", month: "short", day: "numeric" };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProfileHeader({
  spiritus,
  coverImages,
  age,
  birthDate,
  deathDate,
  isGuardian,
  claimable,
  setOpenModal,
}) {
  const { t } = useTranslation("common");
  const router = useNavigationRouter();
  const { data: session, status } = useSession();

  let profileImage = null;
  if (spiritus.profileImage && spiritus.profileImage?.url) {
    profileImage = (
      <Image
        src={spiritus.profileImage.url}
        alt="profile-image"
        fill
        className="block"
      />
    );
  } else if (spiritus.images && spiritus.images.length > 0) {
    profileImage = (
      <Image
        src={spiritus.images[0].url}
        alt="profile-image"
        fill
        className="block"
      />
    );
  }

  return (
    <header className="h-[50vh] w-full sm:h-[60vh] md:h-[384px] xl:h-[448px]">
      <script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/hr_HR/sdk.js#xfbml=1&version=v18.0"
        nonce="JCJ1x1wt"
      ></script>
      <div className="relative h-full w-full overflow-hidden py-10">
        {spiritus.coverImage ? (
          <Image
            src={spiritus.coverImage.url}
            alt="bg-image"
            fill
            className="block"
          />
        ) : (
          coverImages &&
          coverImages.length > 0 && (
            <Image
              src={coverImages[0].url}
              alt="bg-image"
              fill
              className="object-center"
            />
          )
        )}
        <div className="mx-auto flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-4">
            {profileImage && (
              <div className="relative h-[28vh] w-[58vw] overflow-hidden rounded-sp-10 border-2 border-white sm:h-[220px] sm:w-[192px]">
                {profileImage}
              </div>
            )}
            <div className="z-10 flex flex-col items-center justify-center text-center drop-shadow-3xl">
              <div>
                <p className="text-center font-bold leading-6 text-white text-2xl lg:leading-8 lg:text-3xl xl:text-4xl">{`${spiritus.name} ${spiritus.surname}`}</p>
                {!!spiritus.maidenName && (
                  <p className="text-center font-bold leading-6 text-white text-2xl lg:leading-8 lg:text-3xl xl:text-4xl">
                    {`(${t("term_born")} ${spiritus.maidenName})`}
                  </p>
                )}
              </div>

              <p className="text-center font-bold leading-6 text-white text-base lg:text-lg">
                {`${
                  birthDate
                    ? new Intl.DateTimeFormat(
                        router.locale || "en",
                        dateOptions
                      ).format(birthDate)
                    : "?"
                } - ${
                  deathDate
                    ? new Intl.DateTimeFormat(
                        router.locale || "en",
                        dateOptions
                      ).format(deathDate)
                    : "?"
                }`}
                {age && <span className="ml-0.5">({age})</span>}
              </p>
              <div className="flex space-x-4">
                {isGuardian && (
                  <Link href={`/edit/spiritus/${spiritus.id}`} className="mt-2">
                    <button className="w-50 flex items-center justify-center gap-1 rounded-sp-10 bg-sp-white p-1.5 pr-3 font-semibold text-black text-sm">
                      <PencilIcon className="h-6 w-6" />
                      {t("edit_spiritus_menu_title")}
                    </button>
                  </Link>
                )}
                {claimable ? (
                  session?.user ? (
                    <Link
                      href={`/claim/spiritus/${spiritus.slug}`}
                      className="mt-2 flex items-center justify-center rounded-sp-10 bg-sp-white px-3 py-1.5 font-semibold text-black text-sm"
                    >
                      <MemoryGuardianIcon className="h-5 w-5 pr-1" />
                      {t("claim_spiritus_button")}
                    </Link>
                  ) : (
                    <button
                      className="mt-2 flex items-center justify-center rounded-sp-10 bg-sp-white px-3 py-1.5 font-semibold text-black text-sm"
                      onClick={() => {
                        !session?.user.name ? setOpenModal() : () => {};
                      }}
                    >
                      <MemoryGuardianIcon className="h-5 w-5 pr-1" />
                      {t("claim_spiritus_button")}
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Tabs({ tabs }) {
  const router = useRouter();
  const activeTab = tabs.find((tab) => tab.current)?.href;

  return (
    <div className="mt-4 w-full">
      <div className="mx-4 sm:hidden">
        <Select
          onValueChange={(value) => {
            router.push(value);
          }}
          value={activeTab}
        >
          <SelectTrigger className="w-full rounded-2xl border-6 border-sp-fawn/30 bg-opacity-100 px-4 py-5 font-medium text-black text-base dark:text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="w-inherit border-2 border-sp-fawn/30 bg-sp-day-50 bg-opacity-100 dark:bg-sp-black">
            {tabs.map((tab) => (
              <SelectItem
                key={tab.name}
                value={tab.href}
                selected={tab.current}
                className="p-4 text-base"
              >
                {tab.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-300">
          <nav className=" -mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                href={tab.href}
                className={classNames(
                  tab.current
                    ? "border-black dark:border-white"
                    : "border-transparent",
                  "whitespace-nowrap border-b-2 py-3"
                )}
                aria-current={tab.current ? "page" : "hr"}
              >
                <span
                  className={cn(
                    "from-day-gradient-start to-day-gradient-stop p-2 font-medium text-black hover:rounded-sp-10 hover:bg-gradient-to-r focus:outline-none dark:text-sp-white dark:hover:from-sp-dark-brown dark:hover:to-sp-brown",
                    tab.current
                      ? "rounded-sp-10 bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown"
                      : "bg-transparent"
                  )}
                >
                  {tab.name}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export function About({ age, birth, death, quote, description, location }) {
  const { t } = useTranslation("common");
  const router = useNavigationRouter();

  const madeconia = [
    "Macedonia",
    "Makedonija",
    "Sjeverna Makedonija",
    "North Madeconia",
  ];

  let countryFlag = "";
  let displayCountry = location?.country || "";
  if (location && location?.country) {
    let code = countries.getAlpha2Code(location.country, "hr");
    if (!code) {
      // fallback to en
      code = countries.getAlpha2Code(location.country, "en");
    }
    if (router.locale === "hr") {
      displayCountry = countries.getName(code, "hr");
    } else {
      displayCountry = countries.getName(code, "en");
    }

    countryFlag = code ? countryCodeEmoji(code) : "";
    if (!countryFlag && madeconia.includes(location.country)) {
      countryFlag = "🇲🇰";
    }
  }

  return (
    <div className="overflow-hidden">
      {
        !!quote && <Quote quote={quote} />
        // <Quote quote={quote || description} />
      }
      <div className="pb-1.5">
        <h3 className="font-semibold leading-7 text-gray-900 text-lg dark:text-white">
          {t("spiritus_about")}
        </h3>
      </div>
      <dl>
        {!!age && (
          <div className="grid grid-cols-2 py-1.5 sm:grid-cols-3 sm:gap-4">
            <dt className="flex gap-x-2 text-sp-day-400">
              <AgeIcon className="h-5 w-5 fill-sp-day-400" />
              {t("term_age")}
            </dt>
            <dd className="leading-normal text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
              {age}
            </dd>
          </div>
        )}
        <div className="grid grid-cols-2 py-1.5 sm:grid-cols-3 sm:gap-4">
          <dt className="flex gap-x-2 text-sp-day-400">
            <CalendarIcon className="h-5 w-5 fill-sp-day-400" />
            {t("create_spiritus_birth_placeholder")}
          </dt>
          <dd className="leading-normal text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            {birth
              ? new Intl.DateTimeFormat(
                  router.locale || "en",
                  dateOptions
                ).format(birth)
              : "?"}
          </dd>
        </div>
        <div className="grid grid-cols-2 py-1.5 sm:grid-cols-3 sm:gap-4">
          <dt className="flex gap-x-2 text-sp-day-400">
            <CalendarIcon className="h-5 w-5 fill-sp-day-400" />
            {t("create_spiritus_death_placeholder")}
          </dt>
          <dd className="leading-normal text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            {death
              ? new Intl.DateTimeFormat(
                  router.locale || "en",
                  dateOptions
                ).format(death)
              : "?"}
          </dd>
        </div>
        <div className="grid grid-cols-2 py-1.5 sm:grid-cols-3 sm:gap-4">
          <dt className="flex gap-x-2 text-sp-day-400">
            <PlaceIcon className="h-5 w-5 fill-sp-day-400" />
            {t("term_place")}
          </dt>
          <dd className="leading-normal text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
            <span>
              {location ? `${location.address}, ${displayCountry}` : ""}
            </span>
            <span className="ml-1 text-lg">{countryFlag}</span>{" "}
          </dd>
        </div>
        <div className="grid grid-cols-2 py-1.5 sm:grid-cols-3 sm:gap-4">
          <dt className="flex gap-x-2 text-sp-day-400">
            <MiniBioIcon className="h-5 w-5 fill-sp-day-400" />
            {t("mini_bio")}
          </dt>
          <dd className="col-span-2 mt-2 space-y-2 leading-normal text-gray-700 dark:text-white sm:mt-0">
            <p>{description}</p>
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function Tributes({ spiritusId, tributes, isLastPage }) {
  const { t } = useTranslation("common");
  const [displayTributes, setDisplayTributes] = useState(tributes || []);

  const onAddTribute = (tribute) => {
    setDisplayTributes([tribute, ...displayTributes]);
  };

  return (
    <div className="mt-6 w-full">
      <div className="pb-2">
        <h3 className="font-semibold leading-7 text-gray-900 text-lg dark:text-white">
          {t("tributes_title")}
        </h3>
      </div>
      <WriteTribute spiritusId={spiritusId} onAddTribute={onAddTribute} />
      {tributes && tributes.length > 0 && (
        <div className="mt-6 rounded-sp-10 border border-sp-day-200">
          <dl className="divide-y divide-sp-day-200">
            {displayTributes.map((msg, index) => {
              return (
                <div
                  className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  key={`tribute-${index}`}
                >
                  <dt className="font-medium leading-6 text-sp-day-400">
                    <div className="flex items-center gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.4 0.300049C14.1574 0.300049 15.594 1.67386 15.6944 3.40615L15.7 3.60005V8.00005H11.3L11.1061 8.00565C9.43796 8.10231 8.10225 9.43802 8.00559 11.1062L7.99999 11.3001V15.7001H3.59999C1.84254 15.7001 0.405961 14.3262 0.30559 12.594L0.299988 12.4001V3.60005C0.299988 1.8426 1.6738 0.406022 3.40609 0.305651L3.59999 0.300049H12.4ZM15.5908 9.10114C15.5056 9.36142 15.372 9.60492 15.1958 9.81818L15.0556 9.97223L9.97217 15.0557C9.72556 15.3023 9.42644 15.4843 9.10108 15.5908L9.09999 11.3001L9.10602 11.1359C9.18581 10.0544 10.0473 9.1904 11.1277 9.1067L11.3 9.10005L15.5908 9.10114Z"
                          fill="#948B84"
                        />
                      </svg>

                      {msg.sender}
                    </div>
                  </dt>
                  <dd className="mt-1leading-6 space-y-1 text-gray-700 dark:text-white sm:col-span-2 sm:mt-0">
                    <p>{msg.tribute}</p>
                    <p className="text-sp-lighter/60 dark:text-sp-day-300/60">
                      {msg.date}
                    </p>
                  </dd>
                </div>
              );
            })}
            {!isLastPage && (
              <button className="flex w-full cursor-pointer flex-row items-center space-x-2 p-2 text-sp-day-400 focus:outline-none">
                <ChevronDownIcon className="h-5 w-5" />
                <span>{t("show_more")}</span>
              </button>
            )}
          </dl>
        </div>
      )}
    </div>
  );
}

export function WriteTribute({ spiritusId, onAddTribute }) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [text, setText] = useState("");

  const send = async () => {
    try {
      setPending(true);
      await SendRose(spiritusId, text, session?.user?.accessToken || null);
      setSent(true);
      const username =
        session?.user?.name + session?.user?.surname || "Anonymous";
      onAddTribute({
        sender: username,
        tribute: text,
        date: new Date().toISOString().slice(0, 10),
      });
      setText("");
    } catch (err) {
      setPending(false);
      setSent(false);
    }
  };

  return (
    <div className="w-full rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop p-6 dark:from-sp-dark-brown dark:to-sp-brown">
      <form className="relative text-black dark:text-sp-white">
        {sent ? (
          <div className="flex w-full items-center justify-center">
            <div className="inline-flex w-1/3 justify-center">
              <RoseIcon className="h-6 w-6" />
              <span className="ml-1 font-semibold text-sp-lighter text-lg dark:text-sp-white">
                {t("term_thanks")}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-4 dark:bg-sp-black">
              <label htmlFor="tribute" className="pt-2.5 font-semibold">
                {t("write_tribute")}
              </label>
              <textarea
                rows="2"
                name="tribute"
                id="tribute"
                disabled={pending}
                onChange={(event) => setText(event.target.value)}
                className="mb-20 w-full resize-none border-0 bg-inherit py-0 font-normal text-gray-600 placeholder:text-gray-400 focus:outline-none focus:ring-0 dark:text-gray-200 sm:mb-12"
                placeholder={t("write_tribute_placeholder")}
              ></textarea>
            </div>
            <div className="absolute inset-x-px bottom-0">
              <div className="flex items-center justify-between space-x-3 px-2 py-3 sm:px-3">
                <div className="flex w-full flex-row justify-end space-x-2">
                  {/* <button type="button" className="border border-sp-day-400 rounded-sp-10 flex justify-center items-center px-3 py-1.5 text-gray-900 dark:text-white">
                <AttachmentIcon className="h-5 w-5 fill-black dark:fill-white" aria-hidden="true" />
                <span>
                Attach a file
                
                </span>
              </button> */}
                  <button
                    disabled={pending || text.length === 0}
                    onClick={() => send()}
                    className={`${
                      pending || text.length === 0 ? "opacity-50" : ""
                    } w-full items-center rounded-sp-10 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-3 py-1.5 text-center text-sp-white dark:from-sp-dark-fawn dark:to-sp-fawn md:w-40`}
                  >
                    {pending ? (
                      <Spinner text={""} />
                    ) : (
                      <span>{t("send_tribute")}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export function Quote({ quote }) {
  return (
    <div className="mb-6 flex items-center justify-center rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop p-2.5 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
      <div className="flex justify-center gap-2 p-6">
        <QuoteIcon className="h-6 w-6" />
        <p className="font-bold italic leading-6 text-black subpixel-antialiased dark:text-white xl:text-lg">
          {quote}
        </p>
      </div>
    </div>
  );
}

function SpiritusActions({
  shortLink,
  spiritusId,
  spiritusSlug,
  memoryGuardians,
  isGuardian,
  saved,
  claimable,
  upgradeable,
  hideBacklink,
  setOpenModal,
}) {
  const { t } = useTranslation("common");
  const router = useNavigationRouter();
  const [fbShareUrl, setFbShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(saved || false);
  const { data: session } = useSession();

  useEffect(() => {
    setFbShareUrl(
      window && window?.location
        ? encodeURIComponent(`${window.location.origin}${router.asPath}`)
        : ""
    );
  }, []);

  const saveSpiritus = async () => {
    await SaveSpiritus(session.user.accessToken, spiritusId);
    setIsSaved(true);
  };

  const unSaveSpiritus = async () => {
    await UnSaveSpiritus(session.user.accessToken, spiritusId);
    setIsSaved(false);
  };

  return (
    <div className="divide-y divide-sp-day-200 text-sm">
      {/* share links */}
      <div className="flex w-full flex-col items-center justify-center gap-2 p-6">
        <div className="flex items-center space-x-2.5">
          <ShareIcon className="fill-black dark:fill-white" />
          <h3 className=" font-semibold ">{t("share_spiritus")}</h3>
        </div>

        {!!spiritusSlug && !hideBacklink && (
          <Link
            href={`/spiritus/${spiritusSlug}`}
            className="flex w-full items-center justify-center rounded-sp-10 border border-sp-day-400  p-1.5 text-center md:p-2 "
          >
            {t("spiritus_view_spiritus")}{" "}
            <ArrowUpRightIcon className="ml-3 fill-black dark:fill-white" />
          </Link>
        )}

        <CopyToClipboard text={shortLink} onCopy={() => setCopied(true)}>
          <button className="w-full rounded-sp-10 border border-sp-day-400  p-1.5 text-center md:p-2 ">
            {copied ? (
              <div className="flex items-center justify-center">
                <LinkIcon className="mr-2 h-4 w-4 fill-black dark:fill-white" />
                {t("copied")}
              </div>
            ) : (
              t("copy_link")
            )}
          </button>
        </CopyToClipboard>
        {!!fbShareUrl && (
          <div
            className="w-full rounded-sp-10 border border-sp-day-400 p-1.5 text-center md:p-2"
            data-href={fbShareUrl}
            data-layout=""
            data-size=""
          >
            <a
              className="fb-xfbml-parse-ignore"
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=${fbShareUrl}&amp;src=sdkpreparse`}
            >
              {t("share_facebook")}
            </a>
          </div>
        )}
        <a
          href={`mailto:?subject=In loving memory of our dearest&body=The loving memory of our dearest lives on: ${shortLink}`}
          className="w-full rounded-sp-10 border border-sp-day-400  p-1.5 text-center md:p-2 "
        >
          {t("share_email")}
        </a>
      </div>

      {/* stories */}
      <div className="flex w-full flex-col items-center justify-center gap-2 p-6">
        <div className="flex items-center space-x-2.5">
          <SettingsCreateStorySolidIcon className="h-5 w-5 fill-black dark:fill-white" />
          <h3 className=" font-semibold ">{t("new_story_title")}</h3>
        </div>
        <p className=" text-center font-normal text-sp-day-400">
          {t("new_story_subtitle")}
        </p>
        {session?.user.name ? (
          <Link
            href={`/create/story?spiritus=${spiritusId}`}
            className="flex w-full items-center justify-center gap-2 rounded-sp-10 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn p-1.5  text-center font-semibold leading-5 text-sp-white tracking-wide dark:from-sp-dark-fawn dark:to-sp-fawn md:p-2"
          >
            {isGuardian ? t("create_story_spiritus_view") : t("send_story")}
          </Link>
        ) : (
          <button
            onClick={setOpenModal}
            className="flex w-full items-center justify-center gap-2 rounded-sp-10 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn p-1.5  text-center font-semibold leading-5 text-sp-white tracking-wide dark:from-sp-dark-fawn dark:to-sp-fawn md:p-2"
          >
            {t("send_story")}
          </button>
        )}
      </div>

      {/* upgrade to lifetime */}
      {session?.user.name && upgradeable && (
        <div className="flex w-full flex-col items-center justify-center gap-2 p-6">
          <div className="flex items-center space-x-2.5">
            <ReceiptCube24Filled className="h-7 w-7 fill-black dark:fill-white" />
            <h3 className=" font-semibold ">
              {t("upgrade_subscription_title")}
            </h3>
          </div>
          <p className=" text-center font-normal text-sp-day-400">
            {t("upgrade_subscription_subtitle")}
          </p>
          <Link
            href={`/checkout/upgrade/${spiritusId}`}
            className="flex w-full items-center justify-center rounded-sp-10 border border-sp-day-400  p-1.5 text-center md:p-2 "
          >
            {t("upgrade_subscription_button")}
          </Link>
        </div>
      )}

      {/* guardians */}
      <div className="flex w-full flex-col items-center justify-center gap-2 p-6">
        <div className="flex items-center space-x-2.5">
          <MemoryGuardianAlterIcon className="h-5 w-5 fill-black dark:fill-white" />
          <h3 className="font-semibold ">{t("memory_guardian")}</h3>
        </div>
        {claimable ? (
          <>
            <p className="text-center font-normal text-sp-day-400">
              {t("no_memory_guardian")}
            </p>
            <Link
              href={`/claim/spiritus/${spiritusSlug}`}
              className="flex w-full items-center justify-center rounded-sp-10 border border-sp-day-400  p-1.5 text-center md:p-2 "
            >
              {t("claim_spiritus_button")}
            </Link>
          </>
        ) : (
          <p className="text-center font-normal text-sp-day-400">
            {memoryGuardians}
          </p>
        )}
      </div>

      {/* notifications */}
      {!isGuardian && (
        <div className="flex w-full flex-col items-center justify-center gap-2 p-6">
          <div className="flex items-center space-x-2.5">
            <RemindMeIcon className="fill-black dark:fill-white" />
            <h3 className="font-semibold ">{t("remind_me")}</h3>
          </div>
          <p className=" text-center font-normal text-sp-day-400">
            {t("remind_me_subtitle")}
          </p>
          <button
            onClick={() => {
              !session?.user.name
                ? setOpenModal()
                : isSaved
                ? unSaveSpiritus()
                : saveSpiritus();
            }}
            className="flex w-full items-center justify-center rounded-sp-10 border border-sp-day-400  p-1.5 text-center md:p-2 "
          >
            {isSaved ? (
              <>
                <CheckCircleIcon className="mr-2 h-5 w-5 fill-sp-fawn" />
                {t("remind_me_activated")}
              </>
            ) : (
              <>{t("remind_me_button")}</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export function Links({
  shortLink,
  funeralOrg,
  spiritusId,
  spiritusSlug,
  memoryGuardians,
  isGuardian,
  saved,
  claimable,
  upgradeable,
  hideBacklink, // hide link leading back to spiritus
  setOpenModal,
}) {
  const { t } = useTranslation("common");
  const organization = funeralOrg || null;

  return (
    <div className="sticky top-4 divide-y divide-sp-day-200 rounded-sp-10 border border-sp-day-200 font-semibold text-black dark:text-white">
      {organization && (
        <div className="flex w-full items-center justify-center py-6 text-sp-black dark:text-sp-white">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center space-x-2.5">
              <FuneralOrgIcon className="fill-black dark:fill-white" />
              <h3 className="text-center font-semibold">
                {t("funeral_partner_org")}
              </h3>
            </div>
            {organization.image && organization.image?.url ? (
              <div className="relative items-center justify-center overflow-hidden rounded-sp-5 px-2">
                <Image
                  src={organization.image.url || ""}
                  width={organization.image.width}
                  height={organization.image.height}
                  alt="funeral organizer logo"
                  className="object-fit"
                />
              </div>
            ) : null}
            <div className="flex flex-col justify-center">
              <h5 className="text-center font-semibold text-xl">
                {organization.name}
              </h5>
              <ul className="text-center">
                {!!organization.address && (
                  <li className="text-sm">{organization.address}</li>
                )}
                {!!organization.phoneNumber && (
                  <li className="text-sm">{organization.phoneNumber}</li>
                )}
                {!!organization.webpage && (
                  <li>
                    <a
                      className="text-sp-cotta text-sm dark:text-sp-fawn"
                      href={`${
                        organization.webpage.startsWith("http")
                          ? organization.webpage
                          : "https://" + organization.webpage
                      }`}
                    >
                      {organization.webpage}
                    </a>
                  </li>
                )}
                {!!organization.email && (
                  <li>
                    <a
                      href={`mailto:${organization.email}?subject=Contact - Spiritus Partner`}
                      className="text-sp-cotta text-sm dark:text-sp-fawn"
                    >
                      {organization.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      <SpiritusActions
        shortLink={shortLink}
        spiritusId={spiritusId}
        spiritusSlug={spiritusSlug}
        memoryGuardians={memoryGuardians}
        isGuardian={isGuardian}
        saved={saved}
        claimable={claimable}
        upgradeable={upgradeable}
        hideBacklink={hideBacklink}
        setOpenModal={setOpenModal}
      />
    </div>
  );
}
