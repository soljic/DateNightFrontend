import { useState } from "react";

import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { getSession, useSession } from "next-auth/react";
import { CheckIcon, TrashIcon } from "@heroicons/react/outline";
import { CalendarIcon, XIcon } from "@heroicons/react/outline";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getISOLocalDate } from "@wojtekmaj/date-utils";

import LayoutNoFooter from "../../../components/layout/LayoutNoFooter";
import { Spinner } from "../../../components/Status";

import {
  ProxyAddSpiritusImage,
  ProxyDeleteSpiritus,
  ProxyDeleteSpiritusImage,
  ProxyEditSpiritus,
} from "../../../service/http/proxy";
import {
  ImageEditor,
  IMG_ACTION_ADD,
  IMG_ACTION_KEEP,
  IMG_ACTION_REMOVE,
} from "../../../components/ImageEditor";
import { GetSpiritusById } from "../../../service/http/spiritus";
import {
  SpiritusDescription,
  SpiritusName,
  SpiritusLocation,
} from "../../../components/forms/EditSpiritus";

export default function EditSpiritusPage({ spiritus }) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();
  const router = useRouter();

  // form fields
  const [name, setName] = useState(spiritus.name);
  const [surname, setSurname] = useState(spiritus.surname);
  const [birth, setBirth] = useState(
    spiritus.birth ? new Date(spiritus.birth) : null
  );
  const [death, setDeath] = useState(
    spiritus.death ? new Date(spiritus.death) : null
  );
  const [description, setDescription] = useState(spiritus.description);
  const [location, setLocation] = useState(spiritus.location);

  const [images, setImages] = useState(() => {
    return spiritus.images.map((img) => {
      img.id = parseInt(img.url.split("/images/")[1].split("/")[0], 10);
      img.file = null; // only images with IMG_ACTION_ADD have file populated
      img.action = IMG_ACTION_KEEP;
      return img;
    });
  });

  const [deletedImages, setDeletedImages] = useState([]);

  // true if view is waiting for BE response
  const [pending, setPending] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);

  // update spiritus FLOW:
  // 1. update spiritus content
  // 2. try to add new images
  // 3. tryo to delete images
  // 4. refresh page to load new image data
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

      await ProxyEditSpiritus(session.user.accessToken, body);
      await saveImages();
      setPending(false);

      // refresh page
      router.reload(window.location.pathname);
    } catch (err) {
      setPending(false);
      console.log("ERROR UPDATING SPIRITUS", err);
    }
  };

  // delete and redirect to homepage
  const deleteSpiritus = async () => {
    try {
      setPendingDelete(true);
      await ProxyDeleteSpiritus(session.user.accessToken, spiritus.id);
      setPendingDelete(false);

      // Redirect to homepage
      router.push(`/`);
    } catch (err) {
      setPendingDelete(false);
      console.log("ERROR DELETING SPIRITUS", err);
    }
  };

  const saveImages = async () => {
    try {
      const form = new FormData();
      let doAdd = false;
      for (const img of images) {
        if (img.action === IMG_ACTION_ADD && !img.id) {
          form.append("files", img.file, img.file.name);
          doAdd = true;
        }
      }
      if (doAdd) {
        await ProxyAddSpiritusImage(
          session.user.accessToken,
          spiritus.id,
          form
        );
      }
    } catch (err) {
      console.log("ERROR ADDING IMAGES", err);
    }

    try {
      for (const img of deletedImages) {
        if (img.action === IMG_ACTION_REMOVE && img.id) {
          await ProxyDeleteSpiritusImage(
            session.user.accessToken,
            spiritus.id,
            img.id
          );
        }
      }
    } catch (err) {
      console.log("ERROR DELETING IMAGES", err);
    }
  };

  return (
    <LayoutNoFooter>
      <Head>
        <title>Spiritus | Editor</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={"Story Editor"} />
      </Head>

      <div className="py-5 min-h-screen mx-auto mb-64">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              update();
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
              deleteSpiritus();
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
          <SpiritusName
            name={name}
            setName={setName}
            surname={surname}
            setSurname={setSurname}
          />
          <SpiritusDates
            birth={birth}
            setBirth={setBirth}
            death={death}
            setDeath={setDeath}
          />

          <SpiritusDescription
            description={description}
            setDescription={setDescription}
          />
          <SpiritusLocation location={location} setLocation={setLocation} />
          <ImageEditor
            images={images}
            setImages={setImages}
            setDeletedImages={setDeletedImages}
          />
        </form>
        <div className="mt-16 lg:mx-20">
          <button
            onClick={() => {
              update();
            }}
            disabled={pending}
            className="inline-flex items-center justify-center w-full sm:w-52 py-4 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn rounded-full text-sp-white dark:text-sp-black"
          >
            {pending ? (
              <Spinner text={"Saving..."} />
            ) : (
              <span className="font-semibold tracking-wider">Save</span>
            )}
          </button>
        </div>
      </div>
    </LayoutNoFooter>
  );
}

function SpiritusDates({ birth, setBirth, death, setDeath }) {
  const DatePicker = dynamic(() =>
    import("react-date-picker/dist/entry.nostyle").then((dp) => dp)
  );

  // I guess Suspense reduces the
  return (
    <div>
      <p className="font-bold text-2xl">Važni datumi</p>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="w-full flex-1">
          <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
            <DatePicker
              onChange={setBirth}
              value={birth}
              clearIcon={!birth ? null : <XIcon className="h-6 w-6" />}
              dayPlaceholder={"Datum rođenja"}
              monthPlaceholder=""
              yearPlaceholder=""
              calendarIcon={
                <CalendarIcon className="h-6 w-6 text-sp-lighter mx-3" />
              }
            />
          </div>
        </div>
        <div className="w-full flex-1">
          <div className="my-2 rounded flex items-center border-2 border-sp-medium py-2.5">
            <DatePicker
              onChange={setDeath}
              value={death}
              dayPlaceholder={"Datum smrti"}
              monthPlaceholder=""
              yearPlaceholder=""
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
    const res = await GetSpiritusById(id);
    return {
      props: {
        spiritus: { ...res.data },
        ...(await serverSideTranslations(context.locale, ["common"])),
      },
    };
  } catch (err) {
    console.log("error fetching spiritus\n", err);
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
