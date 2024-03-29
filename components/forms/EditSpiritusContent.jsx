import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { CalendarIcon, XIcon } from "@heroicons/react/outline";
import { getISOLocalDate } from "@wojtekmaj/date-utils";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import DatePicker from "react-date-picker";

import { Spinner } from "@/components/Status";
import {
  SUPPORTED_IMAGES,
  SpiritusProfileCropper,
} from "@/components/Uploaders";
import { SpiritusLocationInput } from "@/components/forms/SpiritusLocation";

import {
  AddSpiritusProfileImage,
  EditSpiritus,
} from "@/service/http/spiritus_crud";

import { HashFilename } from "@/utils/filenames";

export function EditContent({ spiritus, onSuccess, onError }) {
  const { t } = useTranslation("common");

  const router = useRouter();
  const { data: session, status } = useSession();

  const [pending, setPending] = useState(false);

  const [name, setName] = useState(spiritus.name);
  const [surname, setSurname] = useState(spiritus.surname);
  const [maidenName, setMaidenName] = useState(spiritus.maidenName || "");
  const [birth, setBirth] = useState();
  const [death, setDeath] = useState();
  const [dpLoaded, setDpLooaded] = useState(false);

  const [description, setDescription] = useState(spiritus.description || "");
  const [quote, setQuote] = useState(spiritus.quote || "");
  const [location, setLocation] = useState(spiritus.location);
  const [images, setImages] = useState(
    spiritus.profileImage ? [spiritus.profileImage] : []
  );

  // DatePicker gives hydration errs, this solves them
  // dynamic import was used but component behaviour was unpredictable
  // sometimes the year fielf would not get populated
  // const DatePicker = dynamic(() =>
  //   import("react-date-picker/dist/entry.nostyle").then((dp) => dp)
  // );
  useEffect(() => {
    setBirth(spiritus.birth ? new Date(spiritus.birth) : null);
    setDeath(spiritus.death ? new Date(spiritus.death) : null);
    setDpLooaded(true);
  }, []);

  const update = async () => {
    let hasImageSaveErrors = false;
    let msg = t("message_save_failed");

    try {
      setPending(true);

      // if location does not change use the one from spiritus
      const newLocation = location
        ? {
            // must re-parse, location from BE uses "id" field
            // which would break the edit request if present
            longitude: location.longitude,
            latitude: location.latitude,
            address: location.address,
            country: location.country,
          }
        : {
            longitude: spiritus.location.longitude,
            latitude: spiritus.location.latitude,
            address: spiritus.location.address,
            country: spiritus.location.country,
          };

      const body = {
        id: spiritus.id, // id required for BE
        name,
        surname,
        maidenName,
        description: description || null,
        birth: birth ? getISOLocalDate(birth) : null,
        death: death ? getISOLocalDate(death) : null,
        location: newLocation,
        quote,
      };

      await EditSpiritus(session.user.accessToken, body, router.locale);
      if (images.length === 0 || (images.length === 1 && images[0].id)) {
        onSuccess();
        setPending(false);
        return;
      }

      const form = new FormData();
      if (images.length > 0) {
        if (!SUPPORTED_IMAGES.includes(images[0].file.type)) {
          setPending(false);
          onError(t("INVALID_FORMAT"));
          return;
        }

        const fileName = await HashFilename(images[0].file.name);
        form.append("file", images[0].file, fileName);
        if (images[0].cropped) {
          const data = await fetch(images[0].previewURL);
          const croppedBlob = await data.blob();
          const croppedFile = new File([croppedBlob], fileName, {
            type: croppedBlob.type,
          });
          const coppedFilename = "C_" + fileName;
          form.append("cropped", croppedFile, coppedFilename);
        }

        try {
          await AddSpiritusProfileImage(
            session.user.accessToken,
            spiritus.id,
            form
          );
        } catch (error) {
          if (error?.response?.data?.errors) {
            // Possible error messages:
            // INVALID_FORMAT
            // INVALID_FILENAME
            // INVALID_FILE
            // UNKNOWN_ERR
            if (error.response.data.errors[0]?.messages) {
              msg = `${msg} ${t(error.response.data.errors[0].messages[0])}`;
            }
          }
          hasImageSaveErrors = true;
          throw error;
        }
      }

      setPending(false);
      if (!hasImageSaveErrors) {
        onSuccess();
      }
    } catch (err) {
      if (hasImageSaveErrors) {
        // Reset spiritus image on error
        setImages(spiritus.profileImage ? [spiritus.profileImage] : []);
      }
      setPending(false);
      onError(msg);
    }
  };

  const cancel = () => {
    setName(spiritus.name);
    setSurname(spiritus.surname);
    setMaidenName(spiritus.maidenName);
    setBirth(spiritus.birth ? new Date(spiritus.birth) : null);
    setDeath(spiritus.death ? new Date(spiritus.death) : null);
    setDescription(spiritus.description);
    setQuote(spiritus.quote);
    setLocation(spiritus.location);
    setImages(spiritus.profileImage ? [spiritus.profileImage] : []);
  };

  return (
    <form id="create-form" className="space-y-3 px-4 pb-96">
      <h2 className="px-1.5 font-bold text-sp-black text-2xl dark:text-sp-white">
        {t("edit_spiritus_menu_title")}
      </h2>

      <div className="mx-auto flex flex-1 flex-col space-y-6 font-medium">
        <div className="mx-2">
          <h2 className="text-sp-black dark:text-sp-white">
            <span className="text-red-500">*</span>
            {t("edit_spiritus_names_title")}
          </h2>
          <div className="">
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="w-full flex-1">
                <div className="my-1 rounded-sp-10">
                  <input
                    maxLength={50}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder={t("create_spiritus_firstname_placeholder")}
                    className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                  />
                </div>
              </div>
              <div className="w-full flex-1">
                <div className="my-1 rounded-sp-10">
                  <input
                    maxLength={50}
                    value={surname}
                    onChange={(e) => {
                      setSurname(e.target.value);
                    }}
                    placeholder={t("create_spiritus_lastname_placeholder")}
                    className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                  />
                </div>
              </div>
              <div className="w-full flex-1">
                <div className="my-1 rounded-sp-10">
                  <input
                    maxLength={50}
                    value={maidenName}
                    onChange={(e) => {
                      setMaidenName(e.target.value);
                    }}
                    placeholder={t("create_spiritus_maidenname_placeholder")}
                    className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* dates */}
        {dpLoaded && (
          <div className="mx-2 mt-4">
            <h2 className="text-sp-black dark:text-sp-white">
              {t("edit_spiritus_dates_title_p1")}{" "}
              <span> {name ? name : "Spiritus"} </span>{" "}
              <span> {surname ? surname : "Spiritus"} </span>{" "}
              {t("edit_spiritus_dates_title_p2")}
            </h2>
            <div className="my-1 flex flex-col gap-2 md:flex-row">
              <div className="w-full flex-1">
                <div className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                  <DatePicker
                    id="birth"
                    onChange={setBirth}
                    value={birth}
                    clearIcon={!birth ? null : <XIcon className="h-6 w-6" />}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    showLeadingZeros
                    calendarIcon={
                      <CalendarIcon className="mx-3 h-6 w-6 text-sp-lighter" />
                    }
                  />
                </div>
              </div>
              <div className="w-full flex-1">
                <div className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                  <DatePicker
                    id="death"
                    onChange={setDeath}
                    value={death}
                    dayPlaceholder="dd"
                    monthPlaceholder="mm"
                    yearPlaceholder="yyyy"
                    showLeadingZeros
                    clearIcon={!death ? null : <XIcon className="h-6 w-6" />}
                    calendarIcon={
                      <CalendarIcon className="mx-3 h-6 w-6 text-sp-lighter" />
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* image */}
        <div className="mx-2 mt-4">
          <h2 className="text-sp-black dark:text-sp-white">
            {t("term_images")}
          </h2>
          <div className="my-1 flex flex-col gap-2 md:flex-row">
            <div className="w-full flex-1">
              <SpiritusProfileCropper images={images} setImages={setImages} />
            </div>
          </div>
        </div>

        {/* location */}
        <SpiritusLocationInput
          name={name ? name : "Spiritus"}
          location={location}
          setLocation={setLocation}
        />

        {/* quote */}
        <div className="mx-2">
          <h2 className="text-sp-black dark:text-sp-white">
            {t("create_spiritus_quote_title")}
          </h2>
          <div className="">
            <div className="flex flex-col md:flex-row">
              <div className="w-full flex-1">
                <div className="my-1 rounded">
                  <textarea
                    value={quote}
                    onChange={(e) => {
                      setQuote(e.target.value);
                    }}
                    placeholder={t("create_spiritus_quote_placeholder")}
                    rows="4"
                    className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                  />
                  <p className="text-sp-day-400 text-sm">
                    {t("create_spiritus_description_char_limit")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-2">
          <h2 className="text-sp-black dark:text-sp-white">
            {t("create_spiritus_description_title")}
            <span> {name ? name : "Spiritus"}? </span>
          </h2>
          <div className="">
            <div className="flex flex-col md:flex-row">
              <div className="w-full flex-1">
                <div className="my-1 rounded">
                  <textarea
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    placeholder={t("create_spiritus_description_placeholder")}
                    rows="4"
                    className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                  />
                  <p className="text-sp-day-400 text-sm">
                    {t("create_spiritus_description_char_limit")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-2 inline-flex space-x-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              update();
            }}
            disabled={pending}
            className="flex w-32 justify-center rounded-sp-10 border bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-5 py-1.5 text-sp-white dark:border-sp-medium dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
          >
            {pending ? (
              <Spinner text={""} />
            ) : (
              <span className="ml-1 font-semibold">{t("save")}</span>
            )}
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              cancel();
            }}
            disabled={pending}
            className="inline-flex w-20 justify-center rounded-sp-10 border border-sp-day-400 px-5 py-1.5 text-sp-day-400"
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </form>
  );
}
