import { Fragment, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "next-i18next";

import { InfoIcon, InfoIconColored, LockIcon } from "@/components/Icons";
import { Spinner } from "@/components/Status";

import { GetSpiritusStoriesBySlug } from "@/service/http/story";

import { PaperPlaneIcon } from "./Icons";

export function StoryList({ stories, spiritus, isGuardian, isLastPage }) {
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
    }
  };

  return (
    <div className="mx-auto mt-5 w-11/12 text-sp-black dark:text-sp-white md:w-full lg:mt-2">
      {items && items.length ? (
        <div className="w-full columns-2 space-y-8 md:columns-3 md:space-y-12 xl:columns-3">
          {items.map((s) => (
            <StoryCard spiritusSlug={spiritus.slug} {...s} key={s.title} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sp-lighter dark:text-sp-lighter">
          {t("more_stories_no_stories")}
        </p>
      )}
      {!isLast && (
        <div className="mt-5 flex items-center justify-center">
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

export function StoryCard({
  slug,
  spiritusSlug,
  title,
  subtitle,
  images,
  tags,
  description,
  flags,
}) {
  const { t } = useTranslation("common");

  return (
    <article className="break-inside-avoid-column text-sp-black dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-white">
      {images && images.length > 0 && (
        <div className="relative mb-2">
          <Image
            src={images[0].url}
            alt={`story-image-${slug}`}
            height={images[0].height}
            width={images[0].width}
            className="w-full rounded-sp-10 object-cover"
          />
        </div>
      )}
      <div className="flex flex-col space-y-2 overflow-hidden text-ellipsis tracking-sp-tighten">
        <div className="flex justify-between">
          <div className="font-semibold text-sp-day-fawn text-sm dark:text-sp-fawn">
            {tags && tags.length > 0 && tags.map((tag) => tag.value).join(", ")}
          </div>
          <div className="flex items-center justify-between">
            {flags.includes("PRIVATE") && (
              <div className="flex items-center justify-center">
                <LockIcon className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-ellipsis font-bold leading-5 text-lg tracking-sp-tighten">
            {title}
          </h3>
          <p className="line-clamp-3 text-ellipsis leading-5 text-xs tracking-sp-tighten sm:text-sm">
            {description || subtitle || ""}
          </p>
        </div>
        <Link
          href={`/spiritus/${spiritusSlug}/story/${slug}`}
          className="w-full rounded-sp-10 border border-sp-day-400 p-1.5 text-center font-semibold text-sm"
        >
          {t("read_story")}
        </Link>
      </div>
    </article>
  );
}

export function CreateStoryCTA({ spiritusId }) {
  const { t } = useTranslation("common");

  return (
    <div className="mb-6 flex w-full items-center justify-between rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop p-4 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
      <div className="leading-6 text-black subpixel-antialiased text-base dark:text-white">
        <h3 className="font-semibold">{t("send_story_title")}</h3>
        <p className="text-sm">{t("send_story_subtitle")}</p>
      </div>
      <Link
        href={`/create/story?spiritus=${spiritusId}`}
        className="flex items-center justify-center rounded-2xl border-4 border-sp-fawn-subtle bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-4 py-2.5 text-center font-medium leading-5 text-sp-white dark:border-none dark:from-sp-dark-fawn dark:to-sp-fawn"
      >
        <PaperPlaneIcon className="mr-2 h-5 w-5 fill-white" />
        {t("send_story")}
      </Link>
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
