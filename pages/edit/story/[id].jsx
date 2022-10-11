import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { getSession, useSession } from "next-auth/react";
import { CheckIcon, TrashIcon } from "@heroicons/react/outline";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getISOLocalDate } from "@wojtekmaj/date-utils";

import { GetStoryById } from "../../../service/http/story";
import { GetSpiritusById } from "../../../service/http/spiritus";

import LayoutNoFooter from "../../../components/layout/LayoutNoFooter";
import { Spinner } from "../../../components/Status";
import {
  StoryDate,
  StorySummary,
  StoryTextEditor,
  StoryTitle,
} from "../../../components/forms/EditStory";

import {
  AddStoryImage,
  DeleteStory,
  DeleteStoryImage,
  EditStory,
} from "../../../service/http/story_crud";
import {
  ImageEditor,
  IMG_ACTION_ADD,
  IMG_ACTION_KEEP,
  IMG_ACTION_REMOVE,
} from "../../../components/ImageEditor";

export default function EditStoryPage({ story }) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();
  const router = useRouter();

  // form fields
  const [isPrivate, setIsPrivate] = useState(!story.flags.includes("PUBLIC"));
  const [title, setTitle] = useState(story.title);
  const [tags, setTags] = useState(story.tags);
  const [storyText, setStoryText] = useState(story.storyText);
  const [date, setDate] = useState(story.date ? new Date(story.date) : null);
  const [summary, setSummary] = useState(story.description);

  const [images, setImages] = useState(() => {
    return story.images.map((img) => {
      img.file = null; // only images with IMG_ACTION_ADD have file populated
      img.action = IMG_ACTION_KEEP;
      return img;
    });
  });

  const [deletedImages, setDeletedImages] = useState([]);

  const saveImages = async () => {
    try {
      // user can add AT MOST 1 image
      const addImage = images.filter(
        (img) => img.action === IMG_ACTION_ADD && !img.id
      );
      if (addImage.length) {
        const form = new FormData();
        form.append("file", addImage[0].file, addImage[0].file.name);
        await AddStoryImage(session.user.accessToken, story.id, form);
      }
    } catch (err) {
      console.log("ERROR ADDING IMAGE", err);
    }

    try {
      for (const img of deletedImages) {
        if (img.action === IMG_ACTION_REMOVE && img.id) {
          await DeleteStoryImage(session.user.accessToken, img.id);
        }
      }
    } catch (err) {
      console.log("ERROR DELETING IMAGES", err);
    }
  };

  // true if view is waiting for BE response
  const [pending, setPending] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);

  const setParagraphs = (story) => {
    return story
      .trim()
      .split("\n\n")
      .map((para, idx) => {
        return { index: idx, text: para.trim() };
      });
    // return { index: 0, text: story.trim() };
  };

  // update story FLOW:
  // 1. update story content
  // 2. try to add new images
  // 3. tryo to delete images
  // 4. refresh page to load new image data
  const updateStory = async () => {
    try {
      setPending(true);
      const body = {
        title,
        description: summary,
        date: date ? getISOLocalDate(date) : null,
        paragraphs: setParagraphs(storyText),
        tags: tags.map((t) => t.id),
        private: isPrivate,
      };
      await EditStory(session.user.accessToken, story.id, body);
      await saveImages();
      setPending(false);

      // refresh page
      router.reload(window.location.pathname);
    } catch (err) {
      console.log("ERROR UPDATING", err);
      setPending(false);
    }
  };

  // delete and redirect to spiritus page
  const deleteStory = async () => {
    try {
      setPendingDelete(true);
      await DeleteStory(session.user.accessToken, story.id);
      setPendingDelete(false);
      router.push(`/spiritus/${story.spiritus.slug}`);
    } catch (err) {
      console.log("ERROR DELETING", err);
      setPendingDelete(false);
    }
  };

  return (
    <LayoutNoFooter>
      <Head>
        <title>{t("edit_story_meta_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("edit_story_meta_desc")} />
      </Head>

      <div className="py-5 min-h-screen mx-auto mb-64">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              updateStory();
            }}
            disabled={pending}
            className="flex items-center justify-center rounded-full p-2 border-2 border-sp-medium"
          >
            {pending ? (
              <Spinner text={""} />
            ) : (
              <CheckIcon className="w-6 h-6 text-green-800" />
            )}
          </button>
          <button
            onClick={() => {
              deleteStory();
            }}
            disabled={pendingDelete}
            className="flex items-center justify-center rounded-full p-2 border-2 border-sp-medium"
          >
            {pendingDelete ? (
              <Spinner text={""} />
            ) : (
              <TrashIcon className="w-6 h-6 text-red-800" />
            )}
          </button>
        </div>
        <form
          id="editor-form"
          className="flex flex-1 flex-col mb-10 mx-4 lg:mx-20 space-y-10 sm:space-y-10 md:space-y-8 lg:space-y-12"
        >
          <StoryTitle
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
          />
          <StoryDate date={date} setDate={setDate} />
          <StorySummary summary={summary} setSummary={setSummary} />
          <StoryTextEditor storyText={storyText} setStoryText={setStoryText} />
          <ImageEditor
            images={images}
            setImages={setImages}
            setDeletedImages={setDeletedImages}
          />
          <div>
            <h2 className="font-bold text-sp-black dark:text-sp-white text-2xl pb-3">
              {t("edit_story_visibility")}
            </h2>
            <div className="flex items-center">
              <input
                id="private-checkbox"
                type="checkbox"
                checked={isPrivate}
                onChange={() => setIsPrivate((prev) => !prev)}
                className="w-5 h-5 text-blue-600 bg-gray-100 rounded-full border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="private-checkbox"
                className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
              >
                {t("create_story_private_text")}
              </label>
            </div>
          </div>
        </form>

        <div className="mt-16 lg:mx-20">
          <button
            onClick={() => {
              updateStory();
            }}
            disabled={pending}
            className="inline-flex items-center justify-center w-full md:w-52 py-4 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn rounded-sp-40 text-sp-white dark:text-sp-black"
          >
            {pending ? (
              <Spinner text={"Saving..."} />
            ) : (
              <span className="font-semibold tracking-wider">{t("save")}</span>
            )}
          </button>
        </div>
      </div>
    </LayoutNoFooter>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const { data: story } = await GetStoryById(id);
    const { data: spiritus } = await GetSpiritusById(story.spiritus.id);

    if (!spiritus || !spiritus?.users) {
      throw "missing spiritus data";
    }

    let isOwner = false;
    for (const su of spiritus.users) {
      if (su.email === session.user.email && su.code === session.user.code) {
        isOwner = true;
      }
    }

    if (!isOwner) {
      throw "edit not permitted";
    }

    const initText = story.paragraphs
      .sort((p1, p2) => {
        if (p1.index < p2.index) {
          return -1;
        }
        if (p1.index > p2.index) {
          return 1;
        }
        // if equal
        return 0;
      })
      .reduce((prev, cur) => prev + `${cur.text}\n\n`, "");
    return {
      props: {
        story: { ...story, storyText: initText },
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
        ])),
      },
    };
  } catch (err) {
    console.log("error fetching story\n", err);
    // redirect to home in case of err
    // known errs: 404 Not Found Spiritus
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
