import { useRef } from "react";

import { TrashIcon, XIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

import { ImageIcon } from "./Icons";

export const IMG_ACTION_ADD = "add";
export const IMG_ACTION_KEEP = "keep";
export const IMG_ACTION_REMOVE = "remove";

// ImageEditor can add or remove images from story or spiritus.
export function ImageEditor({ images, setImages, setDeletedImages }) {
  const { t } = useTranslation("common");

  const inputFile = useRef(null);

  const onOpenFileDialog = (event) => {
    event.preventDefault();
    inputFile.current.click();
  };

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.target.files;
    onAdd(files);
  };

  const onRemove = (idx) => {
    const changed = [];
    const deleted = [];
    images.forEach((img, i) => {
      if (i !== idx) {
        changed.push(img);
      } else {
        img.action = IMG_ACTION_REMOVE;
        deleted.push(img);
      }
    });

    setImages(changed);
    setDeletedImages((prev) => prev.concat(deleted));
  };

  const onAdd = (files) => {
    const addFiles = Array.from(files).map((f) => {
      return {
        id: null,
        file: f,
        // TODO:
        // check if this is leaking memory and refactor
        url: URL.createObjectURL(f),
        action: IMG_ACTION_ADD,
      };
    });

    setImages((prev) => prev.concat(addFiles));
  };

  return (
    <div>
      <p className="font-bold text-2xl">Slike</p>
      <input
        type="file"
        id="file"
        ref={inputFile}
        className="text-white"
        style={{ display: "none" }}
        accept="image/*"
        onChange={onChangeFile}
        multiple
      />

      {!images.length ? (
        <button
          className="mt-3 inline-flex rounded-3xl border border-sp-lighter bg-opacity-40 px-6 py-2 text-sp-black dark:bg-sp-white"
          onClick={onOpenFileDialog}
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className="ml-1 font-semibold">{t("add_image")}</span>
        </button>
      ) : (
        <div className="gap-4 space-y-4 py-2">
          <button
            onClick={onOpenFileDialog}
            className="selection mt-1 flex h-40 w-36 items-center justify-center rounded-lg border border-sp-day-200 bg-sp-fawn bg-opacity-20 focus:outline-none dark:border-none dark:bg-sp-medium dark:text-sp-white"
          >
            <PlusCircleIcon className="h-8 w-8" />
          </button>
          <div className="grid grid-flow-row grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {images.map((f, i) => {
              return (
                <Thumbnail
                  imageUrl={f.url}
                  key={i}
                  index={i}
                  onRemove={onRemove}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Thumbnail({ imageUrl, onRemove, index }) {
  return (
    <div className="relative mr-4 h-40 w-36" id={index}>
      <div className="mx-2 mt-1 overflow-clip rounded-lg">
        <img
          src={imageUrl}
          alt={`story-image-${index}`}
          className="h-40 w-36 border-gray-400 object-cover dark:border-none"
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(index);
        }}
        className="absolute right-0 top-0 overflow-visible rounded-full bg-red-400 p-1 text-black text-opacity-60"
      >
        <XIcon className="h-3 w-3" />
      </button>
    </div>
  );
}

export function SpiritusImageEditor({ images, setImages, setDeletedImages }) {
  const { t } = useTranslation("common");

  const inputFile = useRef(null);

  const onOpenFileDialog = (event) => {
    event.preventDefault();
    inputFile.current.click();
  };

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.target.files;
    onAdd(files);
  };

  const onRemove = (idx) => {
    const changed = [];
    const deleted = [];
    images.forEach((img, i) => {
      if (i !== idx) {
        changed.push(img);
      } else {
        img.action = IMG_ACTION_REMOVE;
        deleted.push(img);
      }
    });

    setImages(changed);
    setDeletedImages((prev) => prev.concat(deleted));
  };

  const onAdd = (files) => {
    const addFiles = Array.from(files).map((f) => {
      return {
        id: null,
        file: f,
        // TODO:
        // check if this is leaking memory and refactor
        url: URL.createObjectURL(f),
        action: IMG_ACTION_ADD,
      };
    });

    setImages((prev) => prev.concat(addFiles));
  };

  return (
    <div>
      <input
        type="file"
        id="file"
        ref={inputFile}
        className="text-white"
        style={{ display: "none" }}
        accept="image/*"
        onChange={onChangeFile}
        multiple
      />

      {!images.length ? (
        <div className="flex h-48 justify-center rounded-sp-10 border border-dashed border-sp-day-400 bg-sp-day-50 p-12 font-medium text-sp-day-400 text-sm dark:bg-sp-black">
          <button
            onClick={onOpenFileDialog}
            className="relative cursor-pointer rounded-sp-10 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
          >
            <ImageIcon
              className="mx-auto h-7 w-7 fill-sp-day-400"
              aria-hidden="true"
            />
            <p className="mt-1">{t("upload_spiritus_images_button")}</p>
          </button>
        </div>
      ) : (
        <div className="gap-4 space-y-4 py-2">
          <div className="flex h-48 justify-center rounded-sp-10 border border-dashed border-sp-day-400 bg-sp-day-50 p-12 font-medium text-sp-day-400 text-sm dark:bg-sp-black">
            <button
              onClick={onOpenFileDialog}
              className="relative cursor-pointer rounded-sp-10 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
            >
              <ImageIcon
                className="mx-auto h-7 w-7 fill-sp-day-400"
                aria-hidden="true"
              />
              <p className="mt-1">{t("upload_spiritus_images_button")}</p>
            </button>
          </div>
          <div className="columns-1 space-y-4 sm:columns-2 md:columns-3">
            {images.map((f, i) => {
              return (
                <ThumbnailV2
                  imageUrl={f.url}
                  key={i}
                  index={i}
                  onRemove={onRemove}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ThumbnailV2({ imageUrl, onRemove, index }) {
  return (
    <div key={index} className="relative h-full w-full">
      <img
        src={imageUrl}
        alt={`story-image-${index}`}
        className="rounded-sp-10 border-gray-400 object-cover dark:border-none"
      />
      <div className="itemx-center absolute bottom-3 w-full rounded-sp-5">
        <div className="px-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove(index);
            }}
            className="flex w-full items-center justify-center rounded-sp-5 border border-sp-day-400 bg-white py-2 text-black drop-shadow-2xl text-sm"
          >
            <TrashIcon className="mr-1 inline-block h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
