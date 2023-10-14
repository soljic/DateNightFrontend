import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { getSession, signIn } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useForm } from "react-hook-form";

import { ShieldIcon } from "../../../components/Icons";
import { Spinner } from "../../../components/Status";
import LayoutNoNav from "../../../components/layout/LayoutNoNav";

function isEmailValid(email) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

export default function EmailLogin() {
  const { t } = useTranslation("auth");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleErr = (errString) => {
    if (!errString) {
      return;
    }

    if (
      errString.includes("status code 400") ||
      errString.includes("status code 401")
    ) {
      setErr("Email or password are not correct.");
    } else {
      setErr(
        "Unable to log in at this time. Please try again later or contact support."
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const res = await signIn("credentials", {
        redirect: false,
        username: data.email,
        password: data.password,
      });

      if (!res.error) {
        Router.back();
      }

      handleErr(res.error);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      setErr("Unable to log in. Please try again later or contact support.");
    }
  };

  return (
    <LayoutNoNav>
      <Head>
        <title>Spiritus | Login - Email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Spiritus Email Login" />
      </Head>
      <section className="flex flex-col items-center justify-center text-sp-white">
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
        <div className="flex flex-col items-center justify-center gap-8">
          <ShieldIcon width={12} height={12} />
          <h4 className="mb-10 text-center font-bold text-3xl">
            {t("login_title")}
          </h4>
        </div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4" key="email">
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
          <div className="relative" key="password">
            <label htmlFor="password"> {t("password")}</label>
            <input
              {...register("password", {
                required: true,
              })}
              type={showPass ? "text" : "password"}
              className="form-control m-0 block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-white transition ease-in-out text-base focus:border-sp-white focus:bg-inherit focus:text-sp-white focus:outline-none"
              id="password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 mt-5 items-center pr-3 leading-5 text-sm"
              onClick={(e) => {
                e.preventDefault();
                setShowPass((prev) => !prev);
              }}
            >
              {showPass ? (
                <EyeOffIcon className="h-6 w-6 text-sp-lighter" />
              ) : (
                <EyeIcon className="h-6 w-6 text-sp-lighter" />
              )}
            </button>
          </div>
          {err && <p className="px-1 py-2 text-red-600 text-sm">{err}</p>}

          <div
            className="mt-5 flex flex-col items-center justify-center text-center"
            key="submit"
          >
            {/* login button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-2/3 rounded-sp-40 border-5 border-sp-medium border-opacity-80 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn p-4 text-sp-black text-lg"
            >
              {submitting ? <Spinner text="" /> : "Log in"}
            </button>
            <Link
              href="/auth/login/password-reset"
              className="mt-7 text-sp-lighter hover:text-sp-fawn"
            >
              {t("forgot_password")}
            </Link>
          </div>
        </form>
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
      ...(await serverSideTranslations(context.locale, [
        "auth",
        "common",
        "cookies",
      ])),
    },
  };
}
