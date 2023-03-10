import Head from "next/head";
import Image from "next/image";

import { useState } from "react";
import { getSession } from "next-auth/react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getISOLocalDate } from "@wojtekmaj/date-utils";

import LayoutNoFooter from "../../components/layout/LayoutNoFooter";
import { Alert, ProgressBar, Spinner } from "../../components/Status";
import {
  SpiritusDates,
  SpiritusDescription,
  SpiritusLocation,
  SpiritusName,
} from "../../components/forms/CreateSpiritus";
import { SpiritusImageUploader } from "../../components/Uploaders";

import { CreateSpiritus } from "../../service/http/spiritus_crud";
import { GetDefaultProduct } from "../../service/http/payment";
import { Checkout, Paywall } from "../../components/Payment";

// TODO: save stuff to local storage
// TODO: add err handling and error toasts
// location example:
// {
//   longitude: 15.977177,
//   latitude: 45.813185,
//   address: "Zagreb, Zagreb, Hrvatska",
//   country: "Croatia",
// }
//
// product example:
// {
//   id: 1,
//   pkgServerId: 'prod_NBCX7827UTiGjU',
//   title: '€44.99',
//   subtitle: null,
//   description: 'Kreiranje i pohrana digitalne uspomene na voljenu osobu!',
//   originalPrice: 44.99,
//   price: 44.99,
//   currency: 'EUR'
// }

// const mockSpiritus = {
//   id: 1,
//   name: "Ivan",
//   surname: "Horvat",
//   description: "Spiritus Description",
//   location: {
//     address: "Zagreb, Zagreb, Hrvatska",
//     country: "Croatia",
//   },
//   images: [
//     {
//       url: "http://localhost:3000/_next/image?url=https%3A%2F%2Fwalk.spiritusapp.com%2Fimages%2F17%2Fspiritus&w=3840&q=75",
//     },
//   ],
// };

// const mockSpiritus = {
//   id: 647223,
//   name: "PETIPUT",
//   surname: "V2MOBILEAPI",
//   description: "Jos problema",
//   birth: "2023-01-01",
//   death: "2023-01-31",
//   location: {
//     id: 0,
//     latitude: 45.81318664550781,
//     longitude: 15.977176666259766,
//     address: "Zagreb",
//     country: "Croatia",
//   },
//   images: [],
// };

export default function CreateSpiritusPage({ user, product }) {
  const { t } = useTranslation("common");

  const [pending, setPending] = useState(false);

  // stepper starts at 0
  const numSteps = 5;
  const [step, setStep] = useState(0);

  // form fields
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birth, setBirth] = useState();
  const [death, setDeath] = useState();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // looks like this:
  // [{"file": <file wrapper>, "previewUrl": blob}]
  const [images, setImages] = useState([]);

  const [spiritus, setSpiritus] = useState();
  // const [spiritus, setSpiritus] = useState(mockSpiritus);

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
      const errMsg = err?.response?.data || err;
      onError(errMsg);
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

  function onError(message) {
    setToastMessage(message);
    setToastOpen(true);
  }

  const clearToast = () => {
    setToastOpen(false);
    setToastMessage("");
  };

  const showCurrentStep = () => {
    switch (step) {
      case 1:
        return (
          <SpiritusName
            name={name}
            setName={setName}
            surname={surname}
            setSurname={setSurname}
          />
        );
      case 2:
        return (
          <SpiritusDates
            name={name}
            birth={birth}
            setBirth={setBirth}
            death={death}
            setDeath={setDeath}
          />
        );
      case 3:
        return (
          <SpiritusImageUploader
            name={name}
            images={images}
            setImages={setImages}
          />
        );
      case 4:
        return (
          <SpiritusDescription
            name={name}
            description={description}
            setDescription={setDescription}
          />
        );
      case 5:
        return (
          <SpiritusLocation
            name={name}
            location={location}
            setLocation={setLocation}
          />
        );
      default:
        return (
          <Paywall
            price={product.price}
            currency={product.currency}
            acceptPaywall={nextStep}
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
        {spiritus ? (
          <Checkout
            spiritus={spiritus}
            productCurrency={product.currency}
            productPrice={product.price}
            productId={product.pkgServerId}
          />
        ) : (
          <>
            <ProgressBar maxSteps={numSteps + 1} step={step + 1} />
            <form id="stepper-form" className="flex flex-1 flex-col">
              {toastOpen && (
                <div className="z-50 relative right-0 mb-5">
                  <div className="flex justify-end mt-4">
                    <Alert
                      isSuccess={false}
                      message={toastMessage}
                      onClick={clearToast}
                    />
                  </div>
                </div>
              )}
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
        {/* </div> */}
      </div>
    </LayoutNoFooter>
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

  let productData;
  try {
    const res = await GetDefaultProduct(session?.user?.accessToken);
    productData = res.data;
  } catch {
    // TODO: handle errs and not just redirect to 400
    return {
      redirect: {
        destination: "/400",
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
        "paywall",
      ])),
      user: session.user,
      product: productData,
    },
  };
}
