import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { useState } from "react";
import { getSession } from "next-auth/react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useRouter } from "next/router";
import { getISOLocalDate } from "@wojtekmaj/date-utils";

import { LinkIcon, UploadIcon } from "@heroicons/react/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";

import LayoutNoFooter from "../../components/layout/LayoutNoFooter";
import { HorizontalDivider, Logo } from "../../components/layout/Common";
import { ProgressBar, Spinner } from "../../components/Status";
import {
  SpiritusDates,
  SpiritusDescription,
  SpiritusLocation,
  SpiritusName,
} from "../../components/forms/CreateSpiritus";
import { SpiritusImageUploader } from "../../components/Uploaders";

import { CreateSpiritus } from "../../service/http/spiritus_crud";
import { ImagePath, localFormatDate } from "../../service/util";

// TODO: save stuff to local storage
// TODO: add err handling and error toasts
export default function CreateSpiritusPage({ user }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  // stepper is 0 indexed!
  const numSteps = 4;
  const [step, setStep] = useState(0);

  // form fields
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birth, setBirth] = useState();
  const [death, setDeath] = useState();
  const [description, setDescription] = useState("");

  const [pending, setPending] = useState(false);
  const [spiritus, setSpiritus] = useState();
  //   {
  //   id: 1,
  //   name: "Tester",
  //   surname: "Surname",
  // }

  const [location, setLocation] = useState(null);

  // looks like this:
  // [{"file": <file wrapper>, "previewUrl": blob}]
  const [images, setImages] = useState([]);

  const createSpiritus = async () => {
    try {
      setPending(true);
      const body = {
        name,
        surname,
        birth: birth ? getISOLocalDate(birth) : null,
        death: birth ? getISOLocalDate(death) : null,
        description,
        location,
        // NOTE: location example
        // location: {
        //   longitude: 15.977177,
        //   latitude: 45.813185,
        //   address: "Zagreb, Zagreb, Hrvatska",
        //   country: "Croatia",
        // },
      };
      const form = new FormData();
      const blob = new Blob([JSON.stringify(body)], {
        type: "application/json",
      });

      form.append("request", blob);
      images.forEach((img) => {
        form.append("files", img.file, img.file.name);
      });

      const res = await CreateSpiritus(user.accessToken, form);
      setSpiritus(res.data);
      setPending(false);
    } catch (err) {
      // console.log("GREŠKA", err);
      setPending(false);
    }
  };

  const nextStep = () => {
    if (step < numSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const showCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <SpiritusDates
            name={name}
            birth={birth}
            setBirth={setBirth}
            death={death}
            setDeath={setDeath}
          />
        );
      case 2:
        return (
          <SpiritusImageUploader
            name={name}
            images={images}
            setImages={setImages}
          />
        );
      case 3:
        return (
          <SpiritusDescription
            name={name}
            description={description}
            setDescription={setDescription}
          />
        );
      case 4:
        return (
          <SpiritusLocation
            name={name}
            location={location}
            setLocation={setLocation}
          />
        );
      default:
        return (
          <SpiritusName
            name={name}
            setName={setName}
            surname={surname}
            setSurname={setSurname}
          />
        );
    }
  };

  return (
    <LayoutNoFooter>
      <Head>
        <title>{t("meta_create_spiritus_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={t("meta_create_spiritus_description")}
        />
      </Head>
      <div className="py-5 h-screen">
        {/* <p className="text-sp-black dark:text-sp-white">
          {JSON.stringify({
            birth,
            death,
            name,
            surname,
            description,
            location,
          })}
        </p> */}
        <div>
          {spiritus ? (
            <Success spiritus={spiritus} locale={router.locale} />
          ) : (
            <>
              <ProgressBar maxSteps={numSteps + 1} step={step + 1} />
              <form id="stepper-form" className="flex flex-1 flex-col">
                <div className="mb-10">{showCurrentStep()}</div>

                <div className="flex flex-col-reverse md:flex-row justify-center mt-8 gap-2 md:gap-6">
                  {step > 0 && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        prevStep();
                      }}
                      className={`px-4 py-3 rounded-full w-full md:w-52 font-semibold text-sp-black dark:text-sp-white border-sp-lighter border-3 hover:bg-sp-white dark:hover:text-sp-black hover:text-sp-black ${
                        pending && "hidden"
                      }`}
                      disabled={pending}
                    >
                      {t("back")}
                    </button>
                  )}
                  {step !== numSteps ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        nextStep();
                      }}
                      disabled={!name || !surname}
                      className={`px-4 py-3 rounded-full w-full md:w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-day-200 dark:border-sp-medium dark:border-opacity-80 text-sp-black ${
                        (name && surname) || "opacity-30"
                      }`}
                    >
                      {t("next")}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        createSpiritus();
                      }}
                      disabled={pending || !location?.address}
                      className={`px-4 py-3 rounded-full w-full md:w-52 font-semibold bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-day-200 dark:border-sp-medium dark:border-opacity-80 text-sp-black ${
                        pending || !location?.address ? "opacity-30" : ""
                      }`}
                    >
                      {pending ? (
                        <Spinner text={t("creating")} />
                      ) : (
                        <span>{t("create")}</span>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </LayoutNoFooter>
  );
}

function Success({ spiritus, locale }) {
  const { t } = useTranslation("common");
  const dates = `${
    spiritus.birth ? localFormatDate(spiritus.birth, locale) : "\uE132"
  } — ${spiritus.death ? localFormatDate(spiritus.death, locale) : "\uE132"}`;

  return (
    <div className="flex flex-col items-center my-4 gap-1 w-1/2 mx-auto sm:w-full md:w-1/2 dark:text-sp-white">
      <div className="bg-sp-fawn bg-opacity-25 rounded-xl p-2 mb-2">
        <Logo width={8} height={8} />
      </div>
      <h2 className="font-bold text-3xl">
        {" "}
        <span>
          {" "}
          {spiritus.name} {spiritus.surname}
        </span>
      </h2>
      <p className="mt-1 text-center opacity-50 mb-5 capitalize">{dates}</p>

      {!!spiritus?.images.length && (
        <div className="rounded-sp-14 overflow-hidden px-4">
          <Image
            src={ImagePath(spiritus.images[0].url)}
            alt="Spiritus image"
            width={270}
            height={300}
            className="rounded-sp-14"
          />
        </div>
      )}
      <HorizontalDivider />
      <div className="flex flex-col items-center gap-1 mt-5">
        <h2 className="font-bold text-3xl">
          {t("spiritus_success_first_story")}
        </h2>
        <p className="mt-1 text-center opacity-50 mb-8 w-3/4 text">
          <span> {spiritus.name} </span> {t("spiritus_success_text")}
        </p>
      </div>
      <Link href={`/create/story?spiritus=${spiritus.id}`}>
        <a className="bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-5 border-sp-fawn dark:border-sp-medium dark:border-opacity-80 rounded-full py-3 px-7 text-sp-black font-medium">
          {t("create_story")}
        </a>
      </Link>
      <div className="flex mx-auto items-center justify-center gap-4 mt-8 text-sp-lighter dark:text-sp-white">
        <Link
          href={
            spiritus?.slug
              ? `/spiritus/${spiritus.slug}`
              : `/spiritus/id/${spiritus.id}`
          }
        >
          <a className="flex flex-col items-center justify-center h-24 hover:bg-sp-day-900 hover:bg-opacity-10 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-14 p-4 gap-2">
            <LinkIcon className="w-6 h-6" />
            <p className="font-semibold">
              {t("spiritus_success_link")} Spiritus
            </p>
          </a>
        </Link>
        {/* <CopyToClipboard text={spiritus.shortLink}> */}
        <CopyToClipboard
          text={spiritus.shortLink}
        >
          <button className="flex flex-col items-center justify-center h-24 hover:bg-sp-day-900 hover:bg-opacity-10 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-14 p-4 gap-2">
            <UploadIcon className="w-6 h-6" />
            <p className="font-semibold">{t("share")} Spiritus</p>
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
      ])),
      user: session.user,
    },
  };
}
