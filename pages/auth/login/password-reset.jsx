import { useState } from "react";

import Head from "next/head";
import Link from "next/link";

import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useForm } from "react-hook-form";

import { ShieldIcon } from "../../../components/Icons";
import { Spinner } from "../../../components/Status";
import LayoutNoNav from "../../../components/layout/LayoutNoNav";
import { SendPasswordResetEmail } from "../../../service/http/auth";

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
      await SendPasswordResetEmail(data.email);
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
        <section className="flex flex-col items-center justify-center text-sp-white">
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

          <div className="flex flex-col items-center justify-center gap-3 pb-8">
            <ShieldIcon width={12} height={12} />
            <h1 className="text-center font-bold text-3xl">
              {t("success_title")}
            </h1>
            <h2 className="text-center font-medium text-xl">
              {t("success_subtitle")}
            </h2>
          </div>
          <h2 className="mb-4 mt-8 text-center font-medium text-xl">
            {t("success_login_cta")}
          </h2>
          <Link
            href="/auth/login"
            className=" rounded-sp-40 border border-sp-lighter bg-sp-black px-3 py-2 font-semibold text-sp-white text-lg"
          >
            {t("success_login")}
          </Link>
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center text-sp-white">
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

          <div className="flex flex-col items-center justify-center gap-3 pb-8">
            <ShieldIcon width={12} height={12} />
            <h1 className="text-center font-bold text-3xl">
              {t("forgot_password")}
            </h1>
            <p className="text-center font-medium text-lg">
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
                className="form-control m-0 block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-white transition ease-in-out text-base focus:border-sp-white focus:bg-inherit focus:text-sp-white focus:outline-none"
                id="email"
              />
              {errors.email && (
                <p className="px-1 py-2 text-red-600 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mt-5 flex flex-col items-center justify-center text-center">
              {/* login button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-2/3 rounded-sp-40 border-5 border-sp-medium border-opacity-80 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn p-4 text-sp-black text-lg"
              >
                {submitting ? <Spinner text="" /> : t("send_reset_link")}
              </button>
              {err && <p className="px-1 py-2 text-red-600 text-sm">{err}</p>}
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
      ...(await serverSideTranslations(context.locale, ["auth", "cookies"])),
    },
  };
}
