import { useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { CalendarIcon, XIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { getISOLocalDate } from "@wojtekmaj/date-utils";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DatePicker from "react-date-picker";
import { HashFilename } from "utils/filenames";

import { Paywall } from "@/components/Paywall";
import { Alert, Spinner } from "@/components/Status";
import { SpiritusProfileCropper } from "@/components/Uploaders";
import { SpiritusLocationInput } from "@/components/forms/SpiritusLocation";
import FullWidthLayout from "@/components/layout/LayoutV2";
import { UnpaidSpiritusList } from "@/components/spiritus/Unpaid";

import { GetUnpaidSpiritusList } from "@/service/http/spiritus";
import { CreateSpiritus } from "@/service/http/spiritus_crud";

export default function CreateSpiritusPage({
  initialName,
  initialSurname,
  spiritusList,
}) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [paywallSeen, setPaywallSeen] = useState(false);

  // form fields
  const [name, setName] = useState(initialName || "");
  const [surname, setSurname] = useState(initialSurname || "");
  const [maidenName, setMaidenName] = useState("");
  const [birth, setBirth] = useState();
  const [death, setDeath] = useState();
  const [quote, setQuote] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // looks like this:
  // [{"file": <file wrapper>, "previewUrl": blob}]
  const [images, setImages] = useState([]);

  // create spiritus an redirect to checkout URL
  const createSpiritus = async () => {
    try {
      setPending(true);
      const body = {
        name,
        surname,
        maidenName: maidenName || null,
        birth: birth ? getISOLocalDate(birth) : null,
        death: birth ? getISOLocalDate(death) : null,
        description: description || null,
        quote: quote || null,
        location,
      };
      const form = new FormData();
      const blob = new Blob([JSON.stringify(body)], {
        type: "application/json",
      });
      form.append("request", blob);

      if (images.length > 0) {
        const fileName = await HashFilename(images[0].file.name);
        form.append("original_profile", images[0].file, fileName);
        if (images[0].cropped) {
          const data = await fetch(images[0].previewURL);
          const croppedBlob = await data.blob();
          const croppedFile = new File([croppedBlob], fileName, {
            type: croppedBlob.type,
          });
          const coppedFilename = "C_" + fileName;
          form.append("cropped_profile", croppedFile, coppedFilename);
        }
      }

      const res = await CreateSpiritus(
        session?.user?.accessToken,
        form,
        router.locale
      );

      // redirect user to checkout page
      await router.push(`/checkout/create/${res.data.id}`);
    } catch (err) {
      const errMsg = err?.response?.data || err;
      onError(errMsg);
      setPending(false);
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

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_create_spiritus_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={t("meta_create_spiritus_description")}
        />
      </Head>
      <div className="mx-auto min-h-screen max-w-7xl py-5">
        {!paywallSeen ? (
          <div className="min-h-screen space-y-36 py-12">
            <Paywall acceptPaywall={() => setPaywallSeen(true)} />
            <div className="mx-auto flex">
              <UnpaidSpiritusList spiritusList={spiritusList} />
            </div>
          </div>
        ) : (
          <div className="mx-auto">
            <form
              id="create-form"
              className="mx-3 space-y-4 pb-64 md:mx-0 md:pb-96"
            >
              {toastOpen && (
                <div className="relative right-0 z-50 mb-5">
                  <div className="mt-4 flex justify-end">
                    <Alert
                      isSuccess={false}
                      message={toastMessage}
                      onClick={clearToast}
                    />
                  </div>
                </div>
              )}
              <div className="my-8 space-y-2">
                <h1 className="text-center font-bold text-sp-black text-4xl dark:text-sp-white">
                  {t("create_spiritus")}
                </h1>
                <p className="text-center">{t("create_spiritus_subtitle")}</p>
              </div>

              {/* names */}
              <div className="mx-auto flex w-full flex-1 flex-col space-y-6 rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-2 py-10 font-medium dark:from-sp-dark-brown dark:to-sp-brown md:w-3/4 md:px-6">
                <div className="mx-2">
                  <h2 className="text-sp-black dark:text-sp-white">
                    <span className="text-red-500">*</span>
                    {t("create_spiritus_names_title")}
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
                            placeholder={t(
                              "create_spiritus_firstname_placeholder"
                            )}
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
                            placeholder={t(
                              "create_spiritus_lastname_placeholder"
                            )}
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
                            placeholder={t(
                              "create_spiritus_maidenname_placeholder"
                            )}
                            className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* dates */}
                <div className="mx-2 mt-4">
                  <h2 className="text-sp-black dark:text-sp-white">
                    {t("create_spiritus_dates_title1")}{" "}
                    <span> {name ? name : "Spiritus"} </span>{" "}
                    {t("create_spiritus_dates_title2")}
                  </h2>
                  <div className="my-1 flex flex-col gap-2 md:flex-row">
                    <div className="w-full flex-1">
                      <div className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white">
                        <DatePicker
                          id="birth"
                          onChange={setBirth}
                          value={birth}
                          clearIcon={
                            !birth ? null : <XIcon className="h-6 w-6" />
                          }
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
                          clearIcon={
                            !death ? null : <XIcon className="h-6 w-6" />
                          }
                          calendarIcon={
                            <CalendarIcon className="mx-3 h-6 w-6 text-sp-lighter" />
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* image */}

                <SpiritusProfileCropper images={images} setImages={setImages} />

                {/* location */}
                <SpiritusLocationInput
                  location={location}
                  setLocation={setLocation}
                />

                {/* quote */}
                <div className="mx-2">
                  <h2 className="text-sp-black dark:text-sp-white">
                    <span className="text-red-500">*</span>
                    {t("create_spiritus_quote_title")}
                  </h2>
                  <div className="">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full flex-1">
                        <div className="my-1 rounded">
                          <textarea
                            value={quote || ""}
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
                            placeholder={t(
                              "create_spiritus_description_placeholder"
                            )}
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
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    createSpiritus();
                  }}
                  disabled={
                    pending ||
                    ![name, surname, location?.address].every((elem) =>
                      Boolean(elem)
                    )
                  }
                  className={`inline-flex justify-center rounded-[16px] border-4
                      border-sp-fawn bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-7 py-3 text-sp-white dark:border-sp-medium dark:border-opacity-80 dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black
                      ${
                        pending ||
                        ![name, surname, location?.address].every((elem) =>
                          Boolean(elem)
                        )
                          ? "opacity-30"
                          : ""
                      }`}
                >
                  {pending ? (
                    <Spinner text={t("creating")} />
                  ) : (
                    <>
                      <PlusCircleIcon className="h-6 w-6" />
                      <span className="ml-1 font-semibold">
                        {t("create_spiritus")}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </FullWidthLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { name, surname } = context.query;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const res = await GetUnpaidSpiritusList(
      session.user.accessToken,
      context.locale
    );

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
          "paywall",
          "pricing",
          "cookies",
        ])),
        initialName: name || null,
        initialSurname: surname || null,
        spiritusList: res.data || [],
      },
    };
  } catch (err) {
    console.log("err loading create page", err);
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
}
