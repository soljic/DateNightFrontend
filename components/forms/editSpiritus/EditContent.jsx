import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import DatePicker from "react-date-picker/dist/entry.nostyle";

import { useTranslation } from "next-i18next";
import { getISOLocalDate } from "@wojtekmaj/date-utils";
import { CalendarIcon, XIcon } from "@heroicons/react/outline";

import { EditSpiritus } from "../../../service/http/spiritus_crud";
import {
  SpiritusDescription,
  SpiritusName,
  SpiritusLocation,
} from "../../../components/forms/editSpiritus/EditSpiritus";
import { Spinner } from "../../../components/Status";

export function EditContent({ spiritus, onSuccess, onError }) {
  const { t } = useTranslation("common");

  const router = useRouter();
  const { data: session, status } = useSession();

  const [pending, setPending] = useState(false);

  const [name, setName] = useState(spiritus.name);
  const [surname, setSurname] = useState(spiritus.surname);
  const [birth, setBirth] = useState();
  const [death, setDeath] = useState();
  const [dpLoaded, setDpLooaded] = useState(false);

  const [description, setDescription] = useState(spiritus.description);
  const [location, setLocation] = useState(spiritus.location);

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
    try {
      setPending(true);

      const body = {
        id: spiritus.id, // id required for BE
        name,
        surname,
        description,
        birth: birth ? getISOLocalDate(birth) : null,
        death: death ? getISOLocalDate(death) : null,
        location: {
          // must re-parse, location from BE uses "id" field
          // which would break the edit request if present
          longitude: location.longitude,
          latitude: location.latitude,
          address: location.address,
          country: location.country,
        },
      };

      await EditSpiritus(session.user.accessToken, body, router.locale);
      onSuccess();
      setPending(false);
    } catch (err) {
      setPending(false);
      const msg = err?.response?.data;
      onError(msg ? msg : t("message_save_failed"));
    }
  };

  return (
    <div className="flex flex-col">
      <form id="editor-form" className="flex flex-1 flex-col mx-5 space-y-10">
        <SpiritusName
          name={name}
          setName={setName}
          surname={surname}
          setSurname={setSurname}
        />

        {dpLoaded && (
          <SpiritusDates
            birth={birth}
            setBirth={setBirth}
            death={death}
            setDeath={setDeath}
          />
        )}
        <SpiritusDescription
          description={description}
          setDescription={setDescription}
        />
        <SpiritusLocation location={location} setLocation={setLocation} />
      </form>
      <div className="mt-12 mx-5">
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

function SpiritusDates({ birth, setBirth, death, setDeath }) {
  const { t } = useTranslation("common");

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-2 mt-3">
        <div className="w-full flex-1">
          <label
            htmlFor="birth"
            className="font-bold text-sp-black dark:text-sp-white text-xl mb-2"
          >
            {t("create_spiritus_birth_placeholder")}
          </label>
          <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
            <DatePicker
              id="birth"
              onChange={setBirth}
              value={birth}
              clearIcon={!birth ? null : <XIcon className="h-6 w-6" />}
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
              calendarIcon={
                <CalendarIcon className="h-6 w-6 text-sp-lighter mx-3" />
              }
            />
          </div>
        </div>
        <div className="w-full flex-1">
          <label
            htmlFor="death"
            className="font-bold text-sp-black dark:text-sp-white text-xl mb-2"
          >
            {t("create_spiritus_death_placeholder")}
          </label>
          <div className="my-2 rounded flex flex-col items-center border-2 border-sp-medium py-2.5">
            <DatePicker
              id="death"
              onChange={setDeath}
              value={death}
              dayPlaceholder="dd"
              monthPlaceholder="mm"
              yearPlaceholder="yyyy"
              clearIcon={!death ? null : <XIcon className="h-6 w-6" />}
              calendarIcon={
                <CalendarIcon className="h-6 w-6 text-sp-lighter mx-3" />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
