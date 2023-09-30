import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";
import { useCookies } from "react-cookie";

export default function CookieConsent() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [cookies, setCookie] = useCookies(["cookieConsent"]);

  const giveCookieConsent = () => {
    setCookie("cookieConsent", true, { path: "/" });
    setShow(false);
  };

  useEffect(() => {
    if (!cookies || !cookies.cookieConsent) {
      setShow(true);
    }
  }, []);

  return (
    <>
      {show && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-6 pb-6">
          <div className="pointer-events-auto mx-auto max-w-2xl rounded-sp-14 bg-sp-day-50 p-6 shadow-lg ring-1 ring-gray-900/10">
            <div className="flex flex-col space-y-2">
              <p className="text-gray-900">{t("cookie_consent")}</p>
              <a
                href={
                  router.locale === "hr"
                    ? "/privacy-policy/hr/Spiritus_Privacy_Policy_HR.pdf"
                    : "/privacy-policy/en/Spiritus_Privacy_Policy_EN.pdf"
                }
                className=" text-indigo-600 text-sm"
              >
                {t("cookie_read_more")}
              </a>
            </div>
            <div className="mt-4 flex items-center gap-x-5">
              <button
                type="button"
                onClick={() => {
                  giveCookieConsent();
                }}
                className="rounded-md bg-gray-900 px-3 py-2 font-semibold text-white shadow-sm text-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
              >
                {t("cookie_accept_button")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
