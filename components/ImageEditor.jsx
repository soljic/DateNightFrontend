import { useRef } from "react";
import { useTranslation } from "next-i18next";

import { PlusCircleIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";

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
        deleted.push(img)
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
          className="inline-flex bg-opacity-40 dark:bg-sp-white border border-sp-lighter rounded-3xl py-2 px-6 text-sp-black mt-3"
          onClick={onOpenFileDialog}
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className="font-semibold ml-1">{t("add_image")}</span>
        </button>
      ) : (
        <div className="flex flex-row items-start justify-start gap-4 py-2">
          <button
            onClick={onOpenFileDialog}
            className="flex items-center justify-center selection w-32 h-32 mt-1 border border-sp-day-200 bg-sp-fawn bg-opacity-20 dark:bg-sp-medium dark:border-none rounded-lg dark:text-sp-white focus:outline-none"
          >
            <PlusCircleIcon className="h-8 w-8" />
          </button>
          <div className="grid grid-flow-row grid-cols-2 md:grid-cols-4 sm:grid-cols-2 gap-4">
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
    <div className="relative h-32 w-32" id={index}>
      <div className="mx-1 mt-1 rounded-lg overflow-clip">
        <img
          src={imageUrl}
          alt={`story-image-${index}`}
          className="h-32 w-32 border-gray-400 dark:border-none"
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(index);
        }}
        className="absolute top-0 right-0 text-opacity-60 text-black overflow-visible rounded-full bg-red-400 p-1"
      >
        <XIcon className="h-3 w-3" />
      </button>
    </div>
  );
}
