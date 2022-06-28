import { useRef } from "react";

import { PlusCircleIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";

import { ImageIcon } from "./Icons";

// Image uploader for stories.
// There are subtle differences between this uploader
// and the one for spiritus, they are not interchangeable.
export function StoryImageUploader({ images, setImages }) {
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
        // NOTE: previewURL must be destroyed on unmount
        // -> check if this is leaking memory and refactor
        previewURL: URL.createObjectURL(f),
      };
    });

    setImages((prev) => prev.concat(addFiles));
  };

  return (
    <div className="mt-12 mx-2 lg:mx-12">
      <div className="flex justify-center items-center rounded-xl bg-sp-fawn bg-opacity-20 h-12 w-12 mb-6">
        <ImageIcon fill />
      </div>
      <p className="font-bold text-sp-white text-2xl">
        Do you have an image for this story? If yes, please add it here.
      </p>
      <p className="text-sp-lighter text-sm mt-2">*Optional</p>
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
          className="inline-flex bg-sp-white rounded-3xl py-2 px-6 text-sp-dark mt-3"
          onClick={onOpenFileDialog}
        >
          <PlusCircleIcon className="h-6 w-6" />
          <span className="font-semibold ml-1">Add Image</span>
        </button>
      ) : (
        <div className="flex flex-row items-center justify-center mt-4 mb-8">
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

export function Preview({ previewURL, title, onRemove, index }) {
  return (
    <div className="relative h-72 w-72" id={index}>
      <div className="mx-2 mt-2 rounded-2xl overflow-clip">
        <img src={previewURL} alt={title} className="h-72 w-72" />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          onRemove(index);
        }}
        className="absolute top-0 right-0 text-opacity-60 text-black overflow-visible rounded-full bg-red-400 p-2"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
