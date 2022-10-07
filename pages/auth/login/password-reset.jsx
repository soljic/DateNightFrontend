import Head from "next/head";
import Link from "next/link";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getSession } from "next-auth/react";

import { ShieldIcon } from "../../../components/Icons";
import LayoutNoNav from "../../../components/layout/LayoutNoNav";
import { Spinner } from "../../../components/Status";
import { ProxySendPasswordResetEmail } from "../../../service/http/auth";

function isEmailValid(email) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

export default function ForgotPassword() {
  const { t } = useTranslation("auth");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      await ProxySendPasswordResetEmail(data.email);
      setSubmitting(false);
      setSent(true);
    } catch (error) {
      setSubmitting(false);
      setErr(t("send_reset_link_err"));
    }
  };

  return (
    <LayoutNoNav>
      <Head>
        <title>{`Spiritus | ${t("reset_password")}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Spiritus Email Login" />
      </Head>
      {sent ? (
        <section className="flex flex-col justify-center items-center text-sp-white">
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

          <div className="flex flex-col justify-center items-center gap-3 pb-8">
            <ShieldIcon width={12} height={12} />
            <h1 className="text-3xl text-center font-bold">
              {t("success_title")}
            </h1>
            <h2 className="text-center text-xl font-medium">
              {t("success_subtitle")}
            </h2>
          </div>
          <h2 className="text-center text-xl font-medium mt-8 mb-4">
            {t("success_login_cta")}
          </h2>
          <Link href="/auth/login">
            <a className=" bg-sp-black border border-sp-lighter rounded-sp-40 py-2 px-3 text-lg font-semibold text-sp-white">
              {t("success_login")}
            </a>
          </Link>
        </section>
      ) : (
        <section className="flex flex-col justify-center items-center text-sp-white">
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

          <div className="flex flex-col justify-center items-center gap-3 pb-8">
            <ShieldIcon width={12} height={12} />
            <h1 className="text-3xl text-center font-bold">
              {t("forgot_password")}
            </h1>
            <p className="text-center text-lg font-medium">
              {t("forgot_password_subtitle")}
            </p>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email">{t("email_address")}</label>
              <input
                {...register("email", {
                  required: true,
                  validate: (v) => isEmailValid(v) || t("email_address_err"),
                })}
                type="text"
                className="form-control rounded p-4 block w-full text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-sp-lighter transition ease-in-out m-0 focus:text-sp-white focus:bg-inherit focus:border-sp-white focus:outline-none"
                id="email"
              />
              {errors.email && (
                <p className="text-sm text-red-600 py-2 px-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col justify-center items-center text-center mt-5">
              {/* login button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-2/3 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 rounded-sp-40 p-4 text-sp-black text-lg"
              >
                {submitting ? <Spinner text="" /> : t("send_reset_link")}
              </button>
              {err && <p className="text-sm text-red-600 py-2 px-1">{err}</p>}
            </div>
          </form>
        </section>
      )}
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
      ...(await serverSideTranslations(context.locale, ["auth"])),
    },
  };
}
