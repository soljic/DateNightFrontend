import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ShieldIcon } from "../../../components/Icons";
import LayoutNoNav from "../../../components/layout/LayoutNoNav";
import Auth0Logo from "../../../public/images/logo/auth0.svg";
import { API_URL } from "../../../service/constants";

export default function LoginComponent() {
  const { t } = useTranslation("auth");

  return (
    <LayoutNoNav>
      <Head>
        <title>{`Spiritus | ${t("register")}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Spiritus - Register" />
      </Head>
      <section className="flex flex-col items-center justify-center text-sp-white">
        <div className="flex flex-col items-center justify-center gap-8">
          <ShieldIcon width={12} height={12} />
          <h1 className="mb-10 text-center font-bold text-3xl">
            {t("register_title")}
          </h1>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3 text-center">
          <p className="text-center text-xs">
            {t("register_disclaimer_1")}{" "}
            <Link
              href="https://spiritus-memoria-privacy-doc.s3.eu-central-1.amazonaws.com/spiritus_terms.pdf"
              key="terms"
              className="underline underline-offset-4"
            >
              {t("register_disclaimer_terms")}
            </Link>
            <span> {t("register_disclaimer_2")} </span>
            <Link
              href="/privacy-policy"
              key="priv"
              className="underline underline-offset-4"
            >
              {t("register_disclaimer_privacy")}
            </Link>
            .
          </p>
          <a
            href={`${API_URL}/v2/authentication/social/login`}
            className="inline-flex w-full items-center justify-start rounded-sp-40 border-sp-medium border-opacity-80 bg-sp-white p-4 font-semibold text-sp-black text-lg"
          >
            <div className="w-1/5 p-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.12651 7.21782V10.7822C9.12651 10.7822 12.6329 10.7775 14.0606 10.7775C13.2875 13.0882 12.0853 14.3465 9.12651 14.3465C6.1322 14.3465 3.79518 11.9528 3.79518 9C3.79518 6.0472 6.1322 3.65347 9.12651 3.65347C10.7096 3.65347 11.7321 4.20221 12.67 4.96703C13.4207 4.22671 13.358 4.12119 15.2679 2.34249C13.6466 0.88716 11.4916 0 9.12651 0C4.08606 0 0 4.02942 0 9C0 13.9705 4.08606 18 9.12651 18C16.6606 18 18.5021 11.5307 17.8916 7.21782H9.12651Z"
                  fill="#171411"
                />
              </svg>
            </div>
            <p className="w-4/6">{t("login_google")}</p>
          </a>
          <a
            href={`${API_URL}/v2/authentication/social/login?type=facebook`}
            className="inline-flex w-full items-center justify-start rounded-sp-40 border-sp-medium border-opacity-80 bg-sp-white p-4 font-semibold text-sp-black text-lg"
          >
            <div className="w-1/5 p-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 9.05493C18 4.08468 13.9703 0.0549316 9 0.0549316C4.02975 0.0549316 0 4.08468 0 9.05493C0 13.5474 3.291 17.2704 7.59375 17.9454V11.6567H5.3085V9.05418H7.59375V7.07268C7.59375 4.81743 8.93775 3.57093 10.9935 3.57093C11.9775 3.57093 13.008 3.74718 13.008 3.74718V5.96193H11.8725C10.7542 5.96193 10.4055 6.65568 10.4055 7.36743V9.05493H12.9015L12.5025 11.6574H10.4055V17.9462C14.709 17.2704 18 13.5467 18 9.05493Z"
                  fill="#171411"
                />
              </svg>
            </div>
            <p className="w-4/6">{t("login_facebook")}</p>
          </a>
          <Link
            href="/auth/register/email"
            className="inline-flex w-full items-center justify-start rounded-sp-40 border  border-sp-lighter bg-sp-black p-4 font-semibold text-sp-white text-lg"
          >
            <div className="w-1/5 p-2">
              <svg
                width="16"
                height="13"
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.0001 3.373V10.5C16.0001 11.8807 14.8808 13 13.5001 13H2.50008C1.11937 13 0 11.8807 0 10.5V3.373L7.74657 7.93097C7.90304 8.02301 8.09711 8.02301 8.25359 7.93097L16.0001 3.373ZM13.5001 0C14.7871 0 15.847 0.972604 15.9849 2.22293L8.00008 6.91991L0.0152595 2.22293C0.153116 0.972604 1.21302 0 2.50008 0H13.5001Z"
                  fill="#F0EFED"
                />
              </svg>
            </div>
            <p className="w-4/6">{t("register_email")}</p>
          </Link>
        </div>
        <div className="mt-4 flex w-44 items-center  justify-center overflow-hidden">
          <Image src={Auth0Logo} alt="Supported by Auth0" />
        </div>
        <div className="mt-24 flex flex-col items-center justify-center gap-3 text-lg">
          <p>{t("register_redirect_login")}</p>
          <Link
            href="/auth/login"
            className=" rounded-sp-40 border border-sp-lighter bg-sp-black px-3 py-2 font-semibold text-sp-white text-lg"
          >
            {t("login_title")}
          </Link>
        </div>
      </section>
    </LayoutNoNav>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["auth", "common"])),
    },
  };
}
