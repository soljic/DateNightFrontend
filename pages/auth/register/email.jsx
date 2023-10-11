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
import { Register } from "../../../service/http/auth";

function isEmailValid(email) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

export default function EmailRegister() {
  const { t } = useTranslation("auth");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

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
      setErr(t("register_invalid_credentials"));
    } else {
      setErr(t("register_err"));
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const register = await Register(
        data.firstName,
        data.lastName,
        data.email,
        data.password
      );

      if (register.status === 200) {
        const res = await signIn("credentials", {
          redirect: false,
          username: data.email,
          password: data.password,
        });
        if (!res.error) {
          return Router.push("/");
        }
      }

      setSubmitting(false);
      handleErr(res.error);
      throw "Error registering account.";
    } catch (error) {
      setSubmitting(false);
      setErr(t("register_err"));
    }
  };

  return (
    <LayoutNoNav>
      <Head>
        <title>{`Spiritus | ${t("register")} - Email`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Spiritus - Register - Email" />
      </Head>
      <section className="flex flex-col items-center justify-center text-sp-white subpixel-antialiased">
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

        <div className="mb-10 flex flex-col items-center justify-center gap-4">
          <ShieldIcon width={12} height={12} />
          <h4 className="mt-5 text-center font-bold text-3xl">
            {t("register_title")}
          </h4>
          <p className="text-center">
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
        </div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4" key="name">
            <label htmlFor="firstName">{t("first_name")}</label>
            <input
              {...register("firstName", {
                required: true,
                validate: (v) => (!!v && v.length > 2) || t("first_name_err"),
              })}
              type="text"
              className="form-control block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-white transition ease-in-out text-base focus:border-sp-white focus:bg-inherit focus:text-sp-white focus:outline-none"
              id="firstName"
            />
            {errors.firstName && (
              <p className="px-1 py-2 text-red-600 text-sm">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="mb-4" key="lastname">
            <label htmlFor="lastName">{t("last_name")}</label>
            <input
              {...register("lastName", {
                required: true,
                validate: (v) => (!!v && v.length > 2) || t("last_name_err"),
              })}
              type="text"
              className="form-control block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-white transition ease-in-out text-base focus:border-sp-white focus:bg-inherit focus:text-sp-white focus:outline-none"
              id="lastName"
            />
            {errors.lastName && (
              <p className="px-1 py-2 text-red-600 text-sm">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="mb-4" key="email">
            <label htmlFor="email">{t("email_address")}</label>
            <input
              {...register("email", {
                required: true,
                validate: (v) => isEmailValid(v) || t("email_address_err"),
              })}
              type="text"
              className="form-control block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-white transition ease-in-out text-base focus:border-sp-white focus:bg-inherit focus:text-sp-white focus:outline-none"
              id="email"
            />
            {errors.email && (
              <p className="px-1 py-2 text-red-600 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4" key="phone">
            <label htmlFor="phone">{t("phone")}</label>
            <input
              {...register("phone")}
              placeholder="+385"
              type="text"
              className="form-control block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-white placeholder-sp-lighter transition ease-in-out text-base focus:border-sp-white focus:bg-inherit focus:text-sp-white focus:outline-none"
              id="phone"
            />
          </div>
          <div className="relative" key="pass">
            <label htmlFor="password">{t("password")}</label>
            <input
              {...register("password", {
                required: true,
                validate: (v) => (!!v && v.length > 8) || t("password_len_err"),
              })}
              type={showPass ? "text" : "password"}
              className="form-control block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-white transition ease-in-out text-base focus:border-sp-white focus:bg-inherit focus:text-sp-white focus:outline-none"
              id="password"
            />
            {errors.password && (
              <p className="px-1 py-2 text-red-600 text-sm">
                {errors.password.message}
              </p>
            )}
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
            className="mt-10 flex flex-col items-center justify-center text-center"
            key="submit"
          >
            {/* login button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-2/3 rounded-sp-40 border-5 border-sp-medium border-opacity-80 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn p-4 text-sp-black text-lg"
            >
              {submitting ? <Spinner text="" /> : t("register_create_account")}
            </button>
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
      ...(await serverSideTranslations(context.locale, ["auth", "common"])),
    },
  };
}
