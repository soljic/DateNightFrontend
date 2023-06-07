import { useRef } from "react";

import { XIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

import { ImageIcon } from "./Icons";

// Image uploader for stories.
// There are subtle differences between this uploader
// and the one for spiritus, they are not interchangeable.
export function StoryImageUploader({ images, setImages }) {
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
    if (idx === 0) {
      setImages((prev) => prev.slice(1));
    } else if (idx === images.length) {
      setImages((prev) => prev.slice(0, idx));
    } else {
      setImages((prev) => prev.slice(0, idx).concat(prev.slice(idx + 1)));
    }
  };

  const onAdd = (files) => {
    const addFiles = Array.from(files).map((f) => {
      return {
        file: f,
        // TODO: previewURL must be destroyed on unmount
        // check if this is leaking memory and refactor
        previewURL: URL.createObjectURL(f),
      };
    });

    setImages((prev) => prev.concat(addFiles));
  };

  return (
    <div className="mx-2 mt-12 lg:mx-12">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sp-fawn bg-opacity-20 text-sp-black dark:text-sp-white">
        <ImageIcon fill />
      </div>
      <p className="font-bold text-2xl">{t("create_story_image_title")}</p>
      <p className="text-sp-lighter text-sm">*{t("optional")}</p>
      <input
        type="file"
        id="file"
        ref={inputFile}
        className="text-white"
        style={{ display: "none" }}
        accept="image/*"
        onChange={onChangeFile}
      />

      {!images.length ? (
        <button
          className="mt-3 inline-flex rounded-3xl bg-sp-white px-6 py-2 text-sp-black"
          onClick={onOpenFileDialog}
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className="ml-1 font-semibold">{t("add_image")}</span>
        </button>
      ) : (
        <div className="mb-8 mt-4 flex flex-row items-center justify-center">
          {images.map((f, i) => {
            return (
              <Preview
                title={f.file.name}
                previewURL={f.previewURL}
                key={i}
                index={i}
                onRemove={onRemove}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export function SpiritusImageUploader({ name, images, setImages }) {
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
    if (idx === 0) {
      setImages((prev) => prev.slice(1));
    } else if (idx === images.length) {
      setImages((prev) => prev.slice(0, idx));
    } else {
      setImages((prev) => prev.slice(0, idx).concat(prev.slice(idx + 1)));
    }
  };

  const onAdd = (files) => {
    const addFiles = Array.from(files).map((f) => {
      return {
        file: f,
        // TODO: previewURL must be destroyed on unmount
        // check if this is leaking memory and refactor
        previewURL: URL.createObjectURL(f),
      };
    });

    setImages((prev) => prev.concat(addFiles));
  };

  return (
    <div className="mx-2 mt-12 lg:mx-12">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sp-fawn bg-opacity-20 text-sp-black dark:text-sp-white">
        <ImageIcon fill />
      </div>
      <p className="font-bold text-2xl">
        {t("create_spiritus_image_title1")}
        <span> {name} </span>
        {t("create_spiritus_image_title2")}
      </p>
      <p className="text-sp-lighter text-sm">*{t("optional")}</p>
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
        <div className="flex flex-row items-start justify-start gap-4 p-4">
          <button
            onClick={onOpenFileDialog}
            className="selection mt-1 flex h-24 w-24 items-center justify-center rounded-lg border border-sp-day-200 bg-sp-fawn bg-opacity-20 focus:outline-none dark:border-none dark:bg-sp-medium dark:text-sp-white"
          >
            <PlusCircleIcon className="h-8 w-8" />
          </button>
          <div className="grid grid-flow-row grid-cols-2 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {images.map((f, i) => {
              return (
                <Thumbnail
                  title={f.file.name}
                  previewURL={f.previewURL}
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

export function SpiritusProfileImageUploader({ name, images, setImages }) {
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
    if (idx === 0) {
      setImages((prev) => prev.slice(1));
    } else if (idx === images.length) {
      setImages((prev) => prev.slice(0, idx));
    } else {
      setImages((prev) => prev.slice(0, idx).concat(prev.slice(idx + 1)));
    }
  };

  const onAdd = (files) => {
    const addFiles = Array.from(files).map((f) => {
      return {
        file: f,
        previewURL: URL.createObjectURL(f),
      };
    });

    setImages((prev) => prev.concat(addFiles));
  };

  return (
    <div className="pb-2">
      {images.length ? (
        <div className="flex gap-2">
          {images.map((f, i) => {
            return (
              <ProfileImagePreview
                title={f?.file?.name || "profile-image-spiritus"}
                previewURL={f?.previewURL || f.url}
                key={i}
                index={i}
                onRemove={onRemove}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex h-48 w-full justify-center rounded-sp-10 border border-dashed border-sp-day-400 bg-sp-day-50 p-12 font-medium text-sp-day-400 text-sm dark:bg-sp-black">
          <button
            onClick={onOpenFileDialog}
            className="relative cursor-pointer rounded-sp-10 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
          >
            <ImageIcon
              className="mx-auto h-7 w-7 fill-sp-day-400"
              aria-hidden="true"
            />
            <p className="mt-1">{t("create_spiritus_profile_image_button")}</p>
          </button>
          <input
            type="file"
            id="file"
            className="sr-only"
            accept="image/*"
            ref={inputFile}
            onChange={onChangeFile}
          />
        </div>
      )}
    </div>
  );
}

export function ProfileImagePreview({ previewURL, title, onRemove, index }) {
  return (
    <div className="relative h-48 max-w-fit" id={index}>
      <div className="h-full w-full overflow-hidden rounded-sp-10">
        <img
          src={previewURL}
          alt={title}
          className="h-full w-full border-sp-day-400 dark:border-none"
        />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(index);
        }}
        className="absolute right-0 top-0 -mr-1 -mt-2 overflow-visible rounded-full bg-red-400 p-1 text-black text-opacity-60"
      >
        <XIcon className="h-3 w-3" />
      </button>
    </div>
  );
}

export function Thumbnail({ previewURL, title, onRemove, index }) {
  return (
    <div className="relative h-24 w-24" id={index}>
      <div className="mx-1 mt-1 overflow-clip rounded-lg">
        <img
          src={previewURL}
          alt={title}
          className="h-24 w-24 border-gray-400 dark:border-none"
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

export function Preview({ previewURL, title, onRemove, index }) {
  return (
    <div className="relative h-72 w-72" id={index}>
      <div className="mx-2 mt-2 overflow-clip rounded-2xl">
        <img src={previewURL} alt={title} className="h-72 w-72" />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(index);
        }}
        className="absolute right-0 top-0 overflow-visible rounded-full bg-red-400 p-2 text-black text-opacity-60"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
