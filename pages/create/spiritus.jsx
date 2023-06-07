import { useState } from "react";

import Head from "next/head";

import { CalendarIcon, XIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { getISOLocalDate } from "@wojtekmaj/date-utils";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DatePicker from "react-date-picker";
import { HashFilename } from "utils/filenames";

import { Checkout, Paywall } from "@/components/Payment";
import { Alert, Spinner } from "@/components/Status";
import { SpiritusProfileImageUploader } from "@/components/Uploaders";
import { SpiritusLocationInput } from "@/components/forms/SpiritusLocation";
import Layout from "@/components/layout/Layout";

import { GetDefaultProduct } from "@/service/http/payment";
import { CreateSpiritus } from "@/service/http/spiritus_crud";

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
  const [paywallSeen, setPaywallSeen] = useState(false);

  // form fields
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
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
        form.append("files", images[0].file, fileName);
      }

      const res = await CreateSpiritus(user.accessToken, form);
      setSpiritus(res.data);
      setPending(false);
    } catch (err) {
      console.log(err);
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
    <Layout>
      <Head>
        <title>{t("meta_create_spiritus_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={t("meta_create_spiritus_description")}
        />
      </Head>
      <div className="min-h-screen py-5">
        {/* <p className="text-sp-black dark:text-sp-white">
          {JSON.stringify({
            birth,
            death,
            name,
            surname,
            description,
            location,
            images,
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
            {!paywallSeen ? (
              <Paywall
                price={product.price}
                currency={product.currency}
                acceptPaywall={() => setPaywallSeen(true)}
              />
            ) : (
              <form id="create-form" className="mx-auto space-y-4 pb-96">
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
                <div className="mb-8 space-y-2">
                  <h1 className="text-center font-bold text-sp-black text-4xl dark:text-sp-white">
                    {t("create_spiritus")}
                  </h1>
                  <p className="text-center">{t("create_spiritus_subtitle")}</p>
                </div>

                {/* names */}
                <div className="mx-auto flex w-3/4 flex-1 flex-col space-y-6 rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop px-6 py-10 font-medium dark:from-sp-dark-brown dark:to-sp-brown">
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

                  <SpiritusProfileImageUploader
                    name={name ? name : "Spiritus"}
                    images={images}
                    setImages={setImages}
                  />

                  {/* location */}
                  <SpiritusLocationInput
                    name={name ? name : "Spiritus"}
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
                              placeholder={t(
                                "create_spiritus_quote_placeholder"
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
            )}
          </>
        )}
      </div>
    </Layout>
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
