import { Fragment, useState } from "react";

import Image from "next/legacy/image";
import Link from "next/link";

import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  BookmarkIcon,
  ChevronRightIcon,
  ReplyIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import Lottie from "lottie-react";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  InfoIcon,
  InfoIconColored,
  LockIcon,
  RoseIcon,
  StoryHookIcon,
} from "../../components/Icons";
import { Spinner } from "../../components/Status";
import { LoginModal } from "../../components/auth/Login";
import { SendRose } from "../../service/http/rose";
import {
  SaveSpiritus,
  SaveStory,
  UnSaveSpiritus,
  UnSaveStory,
} from "../../service/http/save";
import { GetSpiritusStoriesBySlug } from "../../service/http/story";
import { translateCategoryTitle } from "../../utils/translations";

export function Tags({ tags }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-row gap-3">
      {tags.map((tag) => {
        return (
          // NOTE: id of category section is hardcoded...
          <Link
            href={`/category/3/item/${tag.id}?title=${tag.value}`}
            key={`tag-${tag.id}`}
            className="rounded-xl bg-gradient-to-b from-day-gradient-start to-day-gradient-stop px-3 py-2 font-semibold text-sp-day-fawn text-sm dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-day-300"
          >
            {t(translateCategoryTitle(tag.value))}
          </Link>
        );
      })}
    </div>
  );
}

export function PageActions({
  type,
  id,
  saved,
  shareLink,
  nextStorySlug,
  isGuardian,
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
      // console.log("### ERR SAVING", err);
    }
  };

  return (
    <div className="mx-auto mt-4 w-full items-center">
      <div className="mx-auto flex justify-evenly space-x-3 text-sp-lighter dark:text-sp-white lg:space-x-4">
        {!isGuardian && (
          <button
            onClick={() => toggleSave()}
            className={`${
              status !== "authenticated" ? "opacity-30" : ""
            } flex w-1/3 flex-col items-center rounded-sp-10 p-4 font-medium tracking-sp-tighten hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
            disabled={status !== "authenticated"}
          >
            <BookmarkIcon
              className={`h-6 w-6 ${
                isSaved ? "fill-sp-fawn text-sp-fawn dark:text-opacity-0" : ""
              }`}
            />
            {t("save")}
          </button>
        )}
        <CopyToClipboard
          text={shareLink || ""}
          className="flex w-1/3 flex-col items-center rounded-sp-10 p-4 font-medium tracking-sp-tighten hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
        >
          <button>
            <UploadIcon className="h-6 w-6" />
            {t("share")}
          </button>
        </CopyToClipboard>
        {/* TODO: refactor nested ternaries*/}
        {type === "STORY" ? (
          nextStorySlug ? (
            <Link
              href={`/stories/${nextStorySlug ? nextStorySlug : ""}`}
              className="flex w-1/3 flex-col items-center rounded-sp-10 p-4 font-medium tracking-sp-tighten hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
            >
              <ReplyIcon className="h-6 w-6 -scale-x-100" />
              {t("next")}
            </Link>
          ) : (
            <button
              disabled
              className={`${
                !nextStorySlug ? "opacity-30" : ""
              } flex w-1/3 flex-col items-center rounded-sp-10 p-4 font-medium tracking-sp-tighten hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
            >
              <ReplyIcon className="h-6 w-6 -scale-x-100" />
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

export function MoreStories({ stories, spiritus, isGuardian, isLastPage }) {
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
        if (isGuardian) {
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
      // console.log(err);
    }
  };

  return (
    <section key={"stories-showcase"}>
      <div className="my-10 w-full text-sp-black dark:text-sp-white">
        <div className="mb-2 flex w-full items-center justify-between">
          <h1 className="font-semibold text-2xl">{t("more_stories_text")}</h1>
          {isGuardian ? (
            <Link
              href={`/create/story?spiritus=${spiritus.id}`}
              className="inline-flex rounded-full bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-3 py-2 text-sp-white dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
            >
              <PlusCircleIcon className="h-6 w-6" />
              <span className="ml-1 font-semibold">
                {t("cta_add_story_button")}
              </span>
            </Link>
          ) : (
            <Sources sources={spiritus.sources ? spiritus.sources : []} />
          )}
        </div>
        {items && items.length ? (
          <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-6 xs:grid-cols-2 md:grid-cols-3 md:gap-x-4 md:gap-y-4">
            {items.map((s) => (
              <StoryHook {...s} key={s.title} />
            ))}
          </div>
        ) : (
          <p className="text-sp-lighter dark:text-sp-lighter">
            {t("more_stories_no_stories")}
          </p>
        )}
        {!isLast && (
          <div className="mt-8 flex items-center justify-center">
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
    </section>
  );
}

export function StoryHook({ slug, title, subtitle, description, date, flags }) {
  let titleStr = title.length <= 32 ? title : `${title.substring(0, 29)}...`;

  let descPara = "";
  if (subtitle && subtitle.length) {
    descPara =
      subtitle.length <= 150 ? subtitle : `${subtitle.substring(0, 147)}...`;
  } else {
    descPara =
      description.length <= 150
        ? description
        : `${description.substring(0, 147)}...`;
  }

  return (
    <Link
      href={`/stories/${slug}`}
      className="flex h-72 flex-col justify-between rounded-sp-14 bg-gradient-to-r from-sp-day-300 to-sp-day-100 p-4 text-sp-black dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-white"
    >
      <div className="flex flex-col overflow-hidden text-ellipsis tracking-sp-tighten">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center rounded-full bg-sp-day-900 bg-opacity-10 p-2 dark:bg-sp-fawn dark:bg-opacity-10">
            <StoryHookIcon />
          </div>
          {flags.includes("PRIVATE") && (
            <div className="flex items-center justify-center rounded-full bg-sp-day-900 bg-opacity-10 p-2 dark:bg-sp-fawn dark:bg-opacity-10">
              <LockIcon />
            </div>
          )}
        </div>

        <h3 className="text-ellipsis py-2 font-medium leading-5 text-lg tracking-sp-tighten">
          {titleStr}
        </h3>
        <p className="text-ellipsis leading-5 text-xs tracking-sp-tighten sm:text-sm">
          {descPara}
        </p>
      </div>
      <div className="flex flex-col items-start">
        <p className="text-sp-lighter text-sm">{date || ""}</p>
      </div>
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
    <div className="flex w-full flex-row justify-between overflow-clip rounded-sp-14 border-3 border-sp-day-200 text-sp-black dark:border-sp-medium dark:text-sp-white">
      <LoginModal isOpen={isOpen} closeModal={closeModal} />

      <div className="flex h-full flex-col py-3 pl-4">
        <h2 className="title-font py-1 font-medium text-xl">
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
            <ChevronRightIcon className="h-4 w-4 text-sp-day-900 dark:text-sp-fawn" />
          </a>
        ) : (
          <button
            onClick={openModal}
            className="mt-6 inline-flex items-center font-bold text-sp-day-900 dark:text-sp-fawn"
          >
            {t("cta_add_memory_button")}
            <ChevronRightIcon className="h-4 w-4 text-sp-day-900 dark:text-sp-fawn" />
          </button>
        )}
      </div>
      <Image
        src={"/images/memory_cta_alter.png"}
        alt={"Add Memories Img"}
        width={130}
        height={130}
        layout="fixed"
      />
    </div>
  );
}

function Sources({ sources }) {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  return sources && sources.length > 0 ? (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`
        ${open ? "" : "text-opacity-90"}
        z-10 inline-flex items-center gap-2 rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-5 py-2.5 hover:from-sp-day-300 hover:to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown dark:hover:from-sp-dark-brown dark:hover:to-sp-brown`}
      >
        <InfoIcon />
        <span className="font-semibold leading-tight text-sp-black tracking-sp-tighten dark:text-sp-white">
          Sources
        </span>
      </button>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="z-100 absolute inset-0"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 z-40 bg-black bg-opacity-90" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 overflow-y-auto">
            <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform transition-all md:w-3/5 lg:w-2/5">
                  <div className="overflow-hidden rounded-sp-10 bg-sp-day-300 text-sp-black shadow-lg dark:bg-sp-black dark:text-sp-white">
                    <div className="flex h-full w-full flex-col p-8">
                      <div className="mb-5 flex flex-col items-center justify-center">
                        <InfoIconColored width={8} height={8} />
                        <h3 className="font-bold text-sp-medlight text-lg dark:text-sp-white">
                          Sources
                        </h3>
                      </div>
                      <ul className="flex flex-col items-start justify-between gap-2 px-8">
                        {sources && sources.length > 0
                          ? sources.map((text, index) => (
                              <li
                                className="inline-flex items-center gap-2 text-sp-medlight dark:text-sp-white"
                                key={`sources-dialog-item-${index}`}
                              >
                                <div className="my-1">
                                  <InfoIconColored width={5} height={5} />
                                </div>
                                <p className="tracking-sp-tighter text-left font-medium leading-5">
                                  {text}
                                </p>
                              </li>
                            ))
                          : null}
                      </ul>
                      <div className="mt-5 flex items-center justify-center">
                        <button
                          onClick={closeModal}
                          className="w-28 items-center rounded-full bg-sp-fawn p-3  dark:bg-sp-medium"
                        >
                          <span className="font-semibold text-sp-black text-lg dark:text-sp-white">
                            OK
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  ) : null;
}
