import { Fragment, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { LockIcon } from "@/components/Icons";
import { SettingsCreateStoryIcon } from "@/components/SettingsIcons";
import { DeleteStoryModal } from "@/components/forms/EditStory";

import { GetSpiritusStoriesBySlug } from "@/service/http/story";

export function EditStories({ spiritus, initialStories, onSuccess, onError }) {
  const { t } = useTranslation("common");

  const { data: session, status } = useSession();

  const [loaded, setLoaded] = useState(false);
  const [pending, setPending] = useState(false);
  const [stories, setStories] = useState(initialStories ? initialStories : []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await GetSpiritusStoriesBySlug(
  //       spiritus.slug,
  //       0,
  //       20,
  //       session.user.accessToken
  //     );
  //     setStories(res.data.content);
  //     setLoaded(true);
  //   }
  //   fetchData();
  // }, []);

  const translateErrors = (err) => {
    let msgs = t("UNKNOWN_ERR");
    if (err?.response?.data?.errors) {
      msgs = err.response.data.errors.map((elem) => {
        let msg = `${elem.filename}: `;
        elem.messages.forEach((e) => {
          msg += `${t(e)},`;
        });
        return `${msg.substring(0, msg.length - 1)}\n`;
      });
    } else if (err?.response?.data) {
      msgs = err.response.data;
    }
    return msgs;
  };

  return (
    <div className="mx-5 flex flex-col space-y-4">
      <h2 className="font-bold text-2xl">{t("stories")}</h2>
      <div className="flex h-48 justify-center rounded-sp-10 border border-dashed border-sp-day-400 bg-sp-day-50 p-12 font-medium text-sp-day-400 text-sm dark:bg-sp-black">
        <Link
          href={`/edit/spiritus/${spiritus.id}/story/new`}
          className="flex cursor-pointer flex-col items-center justify-center rounded-sp-10 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
        >
          <SettingsCreateStoryIcon
            className="mx-auto h-7 w-7 fill-sp-day-400"
            aria-hidden="true"
          />
          <p className="mt-1">{t("cta_add_story_button")}</p>
        </Link>
      </div>
      {stories && stories.length ? (
        <div className="w-full columns-2 space-y-8">
          {stories.map((s) => (
            <EditStoryCard
              spiritusId={spiritus.id}
              spiritusSlug={spiritus.slug}
              {...s}
              key={s.title}
            />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-sp-lighter dark:text-sp-lighter">
          {t("more_stories_no_stories")}
        </p>
      )}
    </div>
  );
}

function EditStoryCard({
  spiritusId,
  spiritusSlug,
  id,
  slug,
  title,
  subtitle,
  images,
  tags,
  description,
  flags,
}) {
  const { t } = useTranslation("common");
  let titleStr = title.length <= 64 ? title : `${title.substring(0, 63)}...`;

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

  const [isOpen, setIsOpen] = useState(false);
  const [deleteStoryId, setDeleteStoryId] = useState(null);

  function onDeleteStory(id) {
    setDeleteStoryId(id);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <article className="break-inside-avoid-column text-sp-black dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-white">
      {isOpen && deleteStoryId && (
        <DeleteStoryModal
          deleteId={deleteStoryId}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
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
          <div className="w-4/5 font-semibold text-sp-day-fawn text-sm dark:text-sp-fawn">
            {tags && tags.length > 0 && tags.map((tag) => tag.value).join(", ")}
          </div>
          {flags.includes("PRIVATE") && <LockIcon className="h-5 w-5" />}
        </div>
        <div>
          <h3 className="text-ellipsis font-bold leading-5 text-lg tracking-sp-tighten">
            {titleStr}
          </h3>
          <p className="text-ellipsis leading-5 text-xs tracking-sp-tighten sm:text-sm">
            {descPara}
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/spiritus/${spiritusSlug}/story/${slug}`}
            className="flex w-full items-center justify-center rounded-sp-10 border border-sp-day-400 p-1.5 font-semibold text-sm"
          >
            {t("term_view")}
          </Link>
          <Popover className="flex w-full">
            {({ open }) => (
              <>
                <Popover.Button className="flex w-full flex-1 items-center justify-center rounded-sp-10 border border-sp-day-400 p-1.5 font-semibold text-sm">
                  {t("term_options")}
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-50 mt-2 -translate-x-4 translate-y-7">
                    <div className="overflow-hidden rounded-sp-10 border-2 border-sp-fawn bg-sp-day-300 font-semibold text-gray-700 shadow-lg text-sm dark:border-sp-medium">
                      <Link
                        href={`/edit/spiritus/${spiritusId}/story/${id}`}
                        className="flex w-44 items-center justify-start p-4 text-center hover:bg-sp-day-50 focus:outline-none"
                      >
                        <PencilIcon className="mr-2 h-5 w-5 text-sp-day-400" />
                        {t("edit_button_text")}
                      </Link>
                      <button
                        onClick={() => {
                          onDeleteStory(id);
                        }}
                        className="flex w-44 items-center justify-start p-4 text-center hover:bg-sp-day-50 focus:outline-none"
                      >
                        <TrashIcon className="mr-2 h-6 w-6 text-sp-cotta" />
                        <p className="text-sp-cotta">{t("term_delete")}</p>
                      </button>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        </div>
      </div>
    </article>
  );
}
