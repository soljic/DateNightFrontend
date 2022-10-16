import Link from "next/link";
import Image from "next/image";
import { useState, Fragment, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { CopyToClipboard } from "react-copy-to-clipboard";
import { Dialog, Transition } from "@headlessui/react";
import Lottie from "lottie-react";

import giveRose from "../giveRose.json";
import confetti from "../confetti.json";

import {
  BookmarkIcon,
  UploadIcon,
  ReplyIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { LockIcon, RoseIcon, StoryHookIcon } from "../../components/Icons";
import { Spinner } from "../../components/Status";
import { LoginModal } from "../../components/auth/Login";

import {
  SaveStory,
  UnSaveStory,
  SaveSpiritus,
  UnSaveSpiritus,
} from "../../service/http/save";
import { GetSpiritusStoriesBySlug } from "../../service/http/story";
import { SendRose } from "../../service/http/rose";

export function Tags({ tags }) {
  return (
    <div className="flex flex-row gap-3">
      {tags.map((t) => {
        return (
          <Link href={`/section/id/${t.id}`} key={`tag-${t.id}`}>
            <a className="py-2 px-3 rounded-xl bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown text-sp-black dark:text-sp-white font-semibold text-sm lg:text-base">
              {t.value}
            </a>
          </Link>
        );
      })}
    </div>
  );
}

// Uses lotti animation when displaying rose.
export function Tribute({ id }) {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  const sendRose = async () => {
    try {
      await SendRose(id, text);
      setSent(true);
      setIsOpen(true);
    } catch (err) {
      setSent(false);
      setIsOpen(false);
      // console.log(err);
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-100" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-1000"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70 z-10" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto z-10">
            <div className="flex items-center justify-center min-w-full h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-1000"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  onClick={closeModal}
                  className="absolute overflow-hidden content-center transition-all transform"
                >
                  <div className="flex items-center justify-center min-w-full h-full p-4 text-center">
                    <div className="relative mx-auto w-3/4 h-3/4 md:w-1/2 md:h-1/2">
                      <Lottie animationData={confetti} loop={false} />
                    </div>
                    <div className="absolute mx-auto w-full h-full md:w-1/2 md:h-1/2">
                      <Lottie animationData={giveRose} loop={false} />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {sent ? (
        <div className="w-full flex items-center justify-center">
          <div className="inline-flex w-1/3 justify-center rounded-sp-40 border-2 border-sp-lighter border-opacity-30 dark:border-sp-medium p-4">
            <svg
              width="16"
              height="22"
              viewBox="0 0 16 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_7274_21790)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.39077 0.650978L8.49107 0.695654C8.56929 0.730274 9.95164 1.36163 10.9938 2.85766C11.2942 3.28885 11.1166 3.86459 10.6749 4.14927C10.4832 4.27288 10.2906 4.40097 10.0972 4.53359C9.89567 4.67184 9.69257 4.81463 9.48946 4.96274C9.41578 5.01514 9.3428 5.06906 9.26912 5.12374C9.06028 5.2783 8.85627 5.43402 8.65725 5.59092C8.2727 5.89406 7.72733 5.89472 7.34289 5.59146C7.14335 5.43405 6.93909 5.27776 6.73067 5.12298C6.65778 5.06906 6.58566 5.0159 6.51269 4.9635C6.32297 4.82525 6.13396 4.69163 5.94494 4.56248C5.74974 4.42826 5.55519 4.29848 5.36138 4.17308C4.91134 3.8819 4.7406 3.29088 5.05852 2.85932C5.55122 2.19048 6.28365 1.44288 7.36513 0.771641L7.45583 0.715244C7.73753 0.540079 8.08775 0.516005 8.39077 0.650978ZM3.18586 16.3521C2.85567 14.3948 3.23448 12.3182 4.25315 10.506C4.6303 9.83463 5.08569 9.17356 5.6177 8.52496C5.98176 8.08111 5.94405 7.41917 5.48646 7.07254C5.42532 7.02623 5.36372 6.98003 5.30165 6.93395C4.33334 6.21736 3.39552 5.62303 2.49061 5.15199C1.84273 4.81474 1.13767 5.48789 1.25117 6.20942C1.54209 8.07835 1.07959 9.79701 0.632633 11.4579L0.63245 11.4586C0.238763 12.9207 -0.132139 14.3015 0.0458341 15.6657C0.36271 18.0854 2.08463 20.2351 4.5 20.4356C4.76652 20.4584 4.91781 20.0854 4.75081 19.8764C4.59088 19.6763 4.44132 19.4685 4.30256 19.2536C3.74499 18.3869 3.36305 17.4064 3.18586 16.3521ZM15.3676 11.4593C14.9199 9.7974 14.458 8.07853 14.7489 6.2101C14.8617 5.48756 14.157 4.81454 13.5083 5.15226C12.6035 5.62333 11.6658 6.21777 10.6977 6.93471C9.6523 7.70944 8.75123 8.50692 7.99995 9.32116C7.31218 10.0662 6.74991 10.8258 6.31856 11.5945C4.9376 14.0539 4.99406 17.6936 7.82034 19.5932C7.87992 19.6327 7.93951 19.6714 7.99995 19.7086C8.06267 19.7473 8.12617 19.7838 8.18975 19.8195C8.50576 19.9942 8.83595 20.1332 9.17632 20.2342C9.75902 20.4066 10.373 20.4697 10.998 20.418C13.4142 20.2168 15.6375 18.0847 15.9535 15.6648C16.1322 14.3023 15.7611 12.9223 15.3684 11.462L15.3676 11.4593Z"
                  fill="#E3AA6D"
                />
              </g>
              <defs>
                <clipPath id="clip0_7274_21790">
                  <rect width="16" height="22" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-lg font-semibold ml-1 text-sp-lighter dark:text-sp-white">
              {t("term_thanks")}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full text-sp-black dark:text-sp-white">
          <div className="flex flex-col justify-center gap-3">
            {status === "authenticated" && (
              <>
                <label htmlFor="tribute" className="hidden">
                  {t("write_tribute")}
                </label>
                <textarea
                  id="tribute"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-16 text-xl py-3.5 px-8 font-medium align-text-bottom bg-sp-day-50 dark:bg-sp-black rounded-sp-40 border-3 border-sp-day-200 dark:border-sp-lighter placeholder-sp-lighter transition-all duration-500 focus:h-36"
                  placeholder={t("write_tribute")}
                ></textarea>
              </>
            )}
            <button
              disabled={sent}
              onClick={() => {
                sendRose();
              }}
              className={`${
                sent ? "opacity-30" : ""
              } flex justify-center w-full bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-4 border-sp-day-200 dark:border-sp-medium border-opacity-80 rounded-sp-40 py-4 px-7`}
            >
              <RoseIcon />
              <span className="text-lg font-semibold ml-1 text-sp-white dark:text-sp-black">
                {t("give_rose")}
              </span>
              {!!text && (
                <span
                  className={`text-lg font-semibold ml-1 text-sp-white dark:text-sp-black`}
                >
                  {t("with_tribute")}
                </span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function PageActions({
  type,
  id,
  saved,
  shareLink,
  nextStorySlug,
  userIsOwner,
}) {
  const [isSaved, setIsSaved] = useState(saved);
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  const saveStory = async () => {
    const res = await SaveStory(session.user.accessToken, id);
    setIsSaved(true);
  };

  const unSaveStory = async () => {
    const res = await UnSaveStory(session.user.accessToken, id);
    setIsSaved(false);
  };

  const saveSpiritus = async () => {
    const res = await SaveSpiritus(session.user.accessToken, id);
    setIsSaved(true);
  };

  const unSaveSpiritus = async () => {
    const res = await UnSaveSpiritus(session.user.accessToken, id);
    setIsSaved(false);
  };

  const toggleSave = async () => {
    try {
      if (status === "unauthenticated") {
        return;
      }

      if (type === "STORY") {
        if (isSaved) {
          await unSaveStory(id);
        } else {
          await saveStory(id);
        }
        return;
      }

      if (isSaved) {
        await unSaveSpiritus(id);
      } else {
        await saveSpiritus(id);
      }
      return;
    } catch (err) {
      console.log("### ERR SAVING", err);
    }
  };

  return (
    <div className="w-full mx-auto items-center mt-4">
      <div className="flex mx-auto justify-evenly space-x-3 lg:space-x-4 text-sp-lighter dark:text-sp-white">
        {!userIsOwner && (
          <button
            onClick={() => toggleSave()}
            className={`${
              status !== "authenticated" ? "opacity-30" : ""
            } flex flex-col w-1/3 items-center font-medium tracking-sp-tighten hover:from-sp-day-300 hover:to-sp-day-100 hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-10 p-4`}
            disabled={status !== "authenticated"}
          >
            <BookmarkIcon
              className={`w-6 h-6 ${
                isSaved ? "text-sp-fawn fill-sp-fawn dark:text-opacity-0" : ""
              }`}
            />
            {t("save")}
          </button>
        )}
        <CopyToClipboard
          text={shareLink || ""}
          className="flex flex-col w-1/3 items-center font-medium tracking-sp-tighten hover:from-sp-day-300 hover:to-sp-day-100 hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-10 p-4"
        >
          <button>
            <UploadIcon className="w-6 h-6" />
            {t("share")}
          </button>
        </CopyToClipboard>
        {/* TODO: refactor nested ternaries*/}
        {type === "STORY" ? (
          nextStorySlug ? (
            <Link href={`/stories/${nextStorySlug ? nextStorySlug : ""}`}>
              <a className="flex flex-col w-1/3 items-center font-medium tracking-sp-tighten hover:from-sp-day-300 hover:to-sp-day-100 hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-10 p-4">
                <ReplyIcon className="w-6 h-6 -scale-x-100" />
                {t("next")}
              </a>
            </Link>
          ) : (
            <button
              disabled
              className={`${
                !nextStorySlug ? "opacity-30" : ""
              } flex flex-col w-1/3 items-center font-medium tracking-sp-tighten hover:from-sp-day-300 hover:to-sp-day-100 hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-10 p-4`}
            >
              <ReplyIcon className="w-6 h-6 -scale-x-100" />
              {t("next")}
            </button>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export function MoreStories({ stories, spiritus, userIsOwner, isLastPage }) {
  const { t } = useTranslation("common");
  const [current, setCurrent] = useState(0);
  const [isLast, setIsLast] = useState(isLastPage);
  const [items, setItems] = useState(stories);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const res = await GetSpiritusStoriesBySlug(spiritus.slug, current + 1);
      const newItems = res.data.content.filter((s) => {
        if (userIsOwner) {
          return true;
        } else {
          return s.flags.includes("PUBLIC");
        }
      });
      setItems((prev) => [...prev, ...newItems]);
      setCurrent((current) => current + 1);
      setIsLast(res.data.last);
      setIsLoading(false);
    } catch (err) {
      // TODO: handle this
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <section key={"stories-showcase"}>
      <div className="w-full my-10 text-sp-black dark:text-sp-white">
        <div className="flex w-full justify-between mb-2 items-center">
          <h1 className="font-semibold text-2xl">{t("stories")}</h1>
          {userIsOwner && (
            <Link href={`/create/story?spiritus=${spiritus.id}`}>
              <a className="inline-flex bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn rounded-full py-2 px-3 text-sp-white dark:text-sp-black">
                <PlusCircleIcon className="h-6 w-6" />
                <span className="font-semibold ml-1">
                  {t("cta_add_story_button")}
                </span>
              </a>
            </Link>
          )}
        </div>
        {items && items.length ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 md:gap-x-4 md:gap-y-4 mt-3">
            {items.map((s) => (
              <StoryHook {...s} key={s.title} />
            ))}
          </div>
        ) : (
          <p className="text-sp-lighter dark:text-sp-lighter">
            {t("no_stories")}
          </p>
        )}
        {!isLast && (
          <div className="flex justify-center items-center mt-8">
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
    </section>
  );
}

export function StoryHook({ slug, title, subtitle, description, date, flags }) {
  let titleStr = title.length < 29 ? title : `${title.substring(0, 26)}...`;

  let descPara = "";
  if (subtitle && subtitle.length) {
    descPara =
      subtitle.length < 64 ? subtitle : `${subtitle.substring(0, 64)}...`;
  } else {
    descPara =
      description.length < 64
        ? description
        : `${description.substring(0, 64)}...`;
  }

  return (
    <Link href={`/stories/${slug}`}>
      <a className="flex flex-col justify-between h-72 rounded-sp-14 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown p-4 text-sp-black dark:text-sp-white">
        <div className="flex flex-col tracking-sp-tighten">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center rounded-full bg-sp-day-900 bg-opacity-10 dark:bg-sp-fawn dark:bg-opacity-10 p-2">
              <StoryHookIcon />
            </div>
            {flags.includes("PRIVATE") && (
              <div className="flex justify-center items-center rounded-full bg-sp-day-900 bg-opacity-10 dark:bg-sp-fawn dark:bg-opacity-10 p-2">
                <LockIcon />
              </div>
            )}
          </div>

          <h3 className="text-lg py-2 font-medium tracking-sp-tighten leading-5">
            {titleStr}
          </h3>
          <p className="text-sm tracking-sp-tighten leading-5">{descPara}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-sp-lighter text-sm">{date || ""}</p>
        </div>
      </a>
    </Link>
  );
}

export function CTAAddMemory({ sessionStatus, spiritusId, name }) {
  const { t } = useTranslation("common");

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="w-full flex flex-row justify-between overflow-clip rounded-sp-14 border-3 border-sp-day-200 dark:border-sp-medium text-sp-black dark:text-sp-white">
      <LoginModal isOpen={isOpen} closeModal={closeModal} />

      <div className="flex h-full flex-col py-3 pl-4">
        <h2 className="title-font py-1 text-xl font-medium">
          {t("cta_add_memory")}
          <span> {name}</span>?
        </h2>
        <p className="text-sp-lighter">{t("cta_add_memory_subtitle")}</p>
        {sessionStatus === "authenticated" ? (
          <a
            href={`/create/story?spiritus=${spiritusId}`}
            className="mt-6 inline-flex items-center font-bold text-sp-day-900 dark:text-sp-fawn"
          >
            {t("cta_add_memory_button")}
            <ChevronRightIcon className="w-4 h-4 text-sp-day-900 dark:text-sp-fawn" />
          </a>
        ) : (
          <button
            onClick={openModal}
            className="mt-6 inline-flex items-center font-bold text-sp-day-900 dark:text-sp-fawn"
          >
            {t("cta_add_memory_button")}
            <ChevronRightIcon className="w-4 h-4 text-sp-day-900 dark:text-sp-fawn" />
          </button>
        )}
      </div>
      <Image
        src={"/images/memory_cta_bg.png"}
        alt={"Add Memories Img"}
        width={130}
        height={130}
        layout="fixed"
      />
    </div>
  );
}
