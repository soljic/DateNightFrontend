import { useEffect, useState } from "react";

import Link from "next/link";

import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { UpdateProfile } from "@/service/http/auth";
import { GetAccountSubscriptions } from "@/service/http/subscription";

import { cn } from "@/utils/cn";

import { Alert, Spinner } from "../Status";

export function AccountSubscriptions() {
  const { t } = useTranslation("account");

  const { data: session, status } = useSession();

  const [redirectUrl, setReditectUrl] = useState("");

  // TODO: connect to the toaster
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await GetAccountSubscriptions(session.user.accessToken);
        if (res?.data.redirectUrl) {
          setReditectUrl(res.data.redirectUrl);
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (session?.user && status === "authenticated") {
      getData();
    }
  }, [status, session]);

  return (
    <div className="space-y-4 px-2 md:px-8">
      <h1 className="mx-2 text-start font-bold text-sp-black text-2xl dark:text-sp-white">
        {t("subscriptions")}
      </h1>
      <Link
        href={redirectUrl}
        disabled={!redirectUrl}
        className={cn(
          "mx-2 inline-flex w-full justify-center rounded-sp-14 border border-sp-day-400 px-7 py-3 text-sp-black dark:text-sp-day-400 md:w-1/3",
          !redirectUrl ? "pointer-events-none opacity-20" : ""
        )}
      >
        {t("manage_subscriptions")}
      </Link>
    </div>
  );
}

export function AccountSettings({
  initialName,
  initialSurname,
  initialEmail,
  initialPhoneNumber,
}) {
  const { t } = useTranslation("account");

  const { data: session, status } = useSession();

  const [isSuccess, setIsSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  // form fields
  const [name, setName] = useState(initialName || "");
  const [surname, setSurname] = useState(initialSurname || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || "");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const save = async (e) => {
    try {
      setPending(true);
      const data = { name, phone: phoneNumber, lastName: surname };
      const res = await UpdateProfile(session.user.accessToken, data);
      onSuccess();
      setPending(false);
    } catch (err) {
      setPending(false);
      const errMsg = err?.response?.data || err;
      onError(errMsg);
    }
  };

  const cancel = () => {
    setName(initialName);
    setSurname(initialSurname);
    setEmail(initialEmail);
    setPhoneNumber(initialPhoneNumber);
  };

  const deactivate = async (e) => {
    setPending(true);
    // console.log({ name, surname, email, phone: phoneNumber });
    setPending(false);
  };

  function onSuccess() {
    setIsSuccess(true);
    setToastMessage(t("message_save_success"));
    setToastOpen(true);
  }

  function onError(message) {
    setIsSuccess(false);
    setToastMessage(message);
    setToastOpen(true);
  }

  const clearToast = () => {
    setToastOpen(false);
    setToastMessage("");
  };

  return (
    <div className="w-full space-y-16">
      <form
        id="account-settings-form"
        className="mx-auto w-full space-y-4 px-2 md:px-8"
      >
        {toastOpen && (
          <div className="relative right-0 z-50 mb-5">
            <div className="mt-4 flex justify-end">
              <Alert
                isSuccess={isSuccess}
                message={toastMessage}
                onClick={clearToast}
              />
            </div>
          </div>
        )}
        <div className="my-4">
          <h1 className="mx-2 text-start font-bold text-sp-black text-2xl dark:text-sp-white">
            {t("account")}
          </h1>
        </div>

        <div className="flex w-full flex-1 flex-col space-y-4 font-medium">
          <div className="mx-2">
            <h2 className="text-sp-black dark:text-sp-white">{t("name")}</h2>
            <div className="">
              <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1">
                  <div className="my-1 rounded">
                    <input
                      value={name || ""}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      placeholder={t("name")}
                      rows="4"
                      className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-2">
            <h2 className="text-sp-black dark:text-sp-white">{t("surname")}</h2>
            <div className="">
              <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1">
                  <div className="my-1 rounded">
                    <input
                      value={surname}
                      onChange={(e) => {
                        setSurname(e.target.value);
                      }}
                      placeholder={t("surname")}
                      className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-2">
            <h2 className="text-sp-black dark:text-sp-white">{t("email")}</h2>
            <div className="">
              <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1">
                  <div className="my-1 rounded">
                    <input
                      value={email}
                      disabled={true}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder={t("email")}
                      className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-100 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-2">
            <h2 className="text-sp-black dark:text-sp-white">{t("phone")}</h2>
            <div className="">
              <div className="flex flex-col md:flex-row">
                <div className="w-full flex-1">
                  <div className="my-1 rounded">
                    <input
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                      placeholder={t("phone")}
                      className="w-full appearance-none rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-3 placeholder-gray-500 outline-none dark:border-sp-medium dark:bg-sp-black dark:text-sp-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                save();
              }}
              className={`mx-2 inline-flex w-full justify-center rounded-[16px]  bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-7 py-3 text-sp-white dark:border-sp-medium dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black md:w-52
            ${pending ? "opacity-30" : ""}`}
            >
              {pending ? <Spinner text={""} /> : <>{t("save")}</>}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                cancel();
              }}
              disabled={pending}
              className="inline-flex w-40 justify-center rounded-sp-14 border border-sp-day-400 px-5 py-3 text-sp-day-400"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </form>
      <AccountSubscriptions />

      <div>
        <div className="my-4 space-y-4 px-2 md:px-8">
          <h1 className="mx-2 text-start font-bold text-sp-black text-2xl dark:text-sp-white">
            {t("deactivate_account")}
          </h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              deactivate();
            }}
            className="mx-2 inline-flex w-full justify-center rounded-sp-14 border border-sp-day-400 px-7 py-3 text-sp-black dark:text-sp-day-400 md:w-52"
          >
            {t("deactivate_account")}
          </button>
        </div>
      </div>
    </div>
  );
}
