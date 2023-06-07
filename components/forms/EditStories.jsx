import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { TrashIcon } from "@heroicons/react/outline";
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
        <div className="w-full columns-2 space-x-4 space-y-8 md:columns-3">
          {stories.map((s) => (
            <EditStoryCard spiritusId={spiritus.id} {...s} key={s.title} />
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
            href={`/edit/spiritus/${spiritusId}/story/${id}`}
            className="flex w-full items-center justify-center rounded-sp-10 border border-sp-day-400 p-1.5 font-semibold text-sm"
          >
            {t("edit_button_text")}
          </Link>
          <button
            onClick={() => {
              onDeleteStory(id);
            }}
            className="flex w-full items-center justify-center rounded-sp-10 border border-sp-day-400 p-1.5 font-semibold text-red-500 text-sm"
          >
            <TrashIcon className="mr-1 h-4 w-4" />
            {t("term_delete")}
          </button>
        </div>
      </div>
    </article>
  );
}
