import { useEffect, useState } from "react";

import Image from "next/image";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import {
  IMG_ACTION_ADD,
  IMG_ACTION_KEEP,
  IMG_ACTION_REMOVE,
  SpiritusImageEditor,
} from "@/components/ImageEditor";
import { Spinner } from "@/components/Status";

import {
  GetSpiritusCoverImages,
  GetSpiritusGalleryImages,
} from "@/service/http/spiritus";
import {
  AddSpiritusImage,
  DeleteSpiritusImage,
} from "@/service/http/spiritus_crud";
import { SetSpiritusCoverImage } from "@/service/http/spiritus_crud";

export function EditImages({ spiritus, onSuccess, onError }) {
  const { t } = useTranslation("common");

  const { data: session, status } = useSession();

  const [loaded, setLoaded] = useState(false);
  const [pending, setPending] = useState(false);

  const [images, setImages] = useState();
  const [selectedCoverId, setSelectedCoverId] = useState(
    spiritus?.coverImage?.id || 0
  );
  const [coverImages, setCoverImages] = useState();
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resCover = await GetSpiritusCoverImages();
      setCoverImages(resCover.data);
      const resGallery = await GetSpiritusGalleryImages(spiritus.id);
      setImages(
        resGallery.data.content.map((img) => {
          img.id = parseInt(img.url.split("/images/")[1].split("/")[0], 10);
          img.file = null; // only images with IMG_ACTION_ADD have file populated
          img.action = IMG_ACTION_KEEP;
          return img;
        })
      );
      setLoaded(true);
    }
    fetchData();
  }, []);

  const addNewImages = async () => {
    const form = new FormData();
    let doAdd = false;
    for (const img of images) {
      if (img.action === IMG_ACTION_ADD && !img.id) {
        const split = img.file.name.split(".");
        // sanitize filename, append extension
        const fname = `${split
          .join(0, split.length - 1)
          .replace(/[^a-z0-9]/gi, "_")
          .toLowerCase()}.${split[split.length - 1]}`;
        form.append("files", img.file, fname);
        doAdd = true;
      }
    }
    if (doAdd) {
      await AddSpiritusImage(session.user.accessToken, spiritus.id, form);
    }
  };

  const deleteImages = async () => {
    for (const img of deletedImages) {
      if (img.action === IMG_ACTION_REMOVE && img.id) {
        await DeleteSpiritusImage(
          session.user.accessToken,
          spiritus.id,
          img.id
        );
      }
    }
  };

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

  const update = async () => {
    try {
      setPending(true);
      await addNewImages();
      await deleteImages();
      onSuccess();
      setPending(false);
    } catch (err) {
      setPending(false);
      onError(translateErrors(err));
    }
  };

  const updateCoverImage = async () => {
    try {
      setPending(true);
      await SetSpiritusCoverImage(
        session.user.accessToken,
        spiritus.id,
        selectedCoverId
      );
      onSuccess();
      setPending(false);
    } catch (err) {
      setPending(false);
      onError(translateErrors(err));
    }
  };

  const cancel = () => {
    setSelectedCoverId(spiritus?.coverImage.id || 0);
  };

  return (
    <div className="mx-5 flex flex-col space-y-4">
      {loaded && (
        <>
          <div className="mb-4">
            <h2 className="font-bold text-2xl">{t("cover_image")}</h2>
            <EditCoverImage
              selectedId={selectedCoverId}
              coverImages={coverImages}
              setSelectedId={setSelectedCoverId}
            />
            <div className="-mt-2 flex space-x-2">
              <button
                onClick={() => {
                  updateCoverImage();
                }}
                disabled={pending}
                className="flex w-24 items-center justify-center rounded-sp-10 border bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn py-1 text-white dark:border-sp-medium dark:from-sp-dark-fawn dark:to-sp-fawn"
              >
                {pending ? <Spinner text={""} /> : <span>{t("save")}</span>}
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  cancel();
                }}
                disabled={pending}
                className="flex w-20 items-center justify-center rounded-sp-10 border border-sp-day-400 py-1 text-sp-day-400"
              >
                {t("cancel")}
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl">{t("spiritus_gallery")}</h2>
              <button
                onClick={() => {
                  update();
                }}
                disabled={pending}
                className="flex w-24 items-center justify-center rounded-sp-10 border bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn py-1 text-white dark:border-sp-medium dark:from-sp-dark-fawn dark:to-sp-fawn"
              >
                {pending ? <Spinner text={""} /> : <span>{t("save")}</span>}
              </button>
            </div>
            <SpiritusImageEditor
              images={images}
              setImages={setImages}
              setDeletedImages={setDeletedImages}
            />
          </div>
        </>
      )}
    </div>
  );
}

export function EditCoverImage({ selectedId, setSelectedId, coverImages }) {
  const initalIndex = coverImages.findIndex((c) => c.id === selectedId);
  const [index, setIndex] = useState(initalIndex > -1 ? initalIndex : 0);

  useEffect(() => {
    // change index when selectedId changes - doesn't work otherwise
    const newIndex = coverImages.findIndex((c) => c.id === selectedId);
    setIndex(newIndex > 0 ? newIndex : 0);
  }, [selectedId]);

  const next = () => {
    if (index === coverImages.length - 1) {
      setIndex(0);
      setSelectedId(coverImages[0].id);
    } else {
      setIndex(index + 1);
      setSelectedId(coverImages[index + 1].id);
    }
  };

  const prev = () => {
    if (index === 0) {
      setIndex(coverImages.length - 1);
      setSelectedId(coverImages[coverImages.length - 1].id);
    } else {
      setIndex(index - 1);
      setSelectedId(coverImages[index - 1].id);
    }
  };

  return (
    <div className="mt-2 flex flex-col overflow-hidden">
      <div className="h-64 overflow-hidden rounded-sp-10">
        <div className="relative h-full w-full">
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-sp-5 bg-sp-white bg-opacity-80 text-black"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>

          <Image alt="select-cover-image" src={coverImages[index].url} fill />

          <button
            onClick={next}
            className="absolute right-4 top-1/2 z-10 flex h-7 w-7 items-center justify-center rounded-sp-5 bg-sp-white bg-opacity-80 text-black"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      <p className="flex justify-end font-medium text-sp-day-400 text-sm">{`${
        index + 1
      }/${coverImages.length}`}</p>
    </div>
  );
}
