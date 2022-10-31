import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import {
  AddSpiritusImage,
  DeleteSpiritusImage,
} from "../../../service/http/spiritus_crud";
import {
  ImageEditor,
  IMG_ACTION_ADD,
  IMG_ACTION_KEEP,
  IMG_ACTION_REMOVE,
} from "../../../components/ImageEditor";
import { Spinner } from "../../../components/Status";

export function EditImages({ spiritus, onSuccess, onError }) {
  const { t } = useTranslation("common");

  const { data: session, status } = useSession();

  const [loaded, setLoaded] = useState(false);
  const [pending, setPending] = useState(false);

  const [images, setImages] = useState();
  const [deletedImages, setDeletedImages] = useState([]);

  useEffect(() => {
    setImages(
      spiritus.images.map((img) => {
        img.id = parseInt(img.url.split("/images/")[1].split("/")[0], 10);
        img.file = null; // only images with IMG_ACTION_ADD have file populated
        img.action = IMG_ACTION_KEEP;
        return img;
      })
    );
    setLoaded(true);
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
        const msg = `${elem.filename}: `;
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

  return (
    <div className="flex flex-col mx-5">
      {loaded && (
        <ImageEditor
          images={images}
          setImages={setImages}
          setDeletedImages={setDeletedImages}
        />
      )}
      <div className="mt-12">
        <button
          onClick={() => {
            update();
          }}
          disabled={pending}
          className="inline-flex items-center justify-center w-full sm:w-52 py-4 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn rounded-full text-sp-white dark:text-sp-black"
        >
          {pending ? (
            <Spinner text={""} />
          ) : (
            <span className="font-semibold tracking-wider">{t("save")}</span>
          )}
        </button>
      </div>
    </div>
  );
}
