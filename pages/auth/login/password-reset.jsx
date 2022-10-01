import Head from "next/head";

import Router from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { getSession, signIn } from "next-auth/react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

import { ShieldIcon } from "../../../components/Icons";
import LayoutNoNav from "../../../components/layout/LayoutNoNav";
import { Spinner } from "../../../components/Status";

function isEmailValid(email) {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm();

  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);

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
      // const res = await signIn("credentials", {
      //   redirect: false,
      //   username: data.email,
      //   password: data.password,
      // });

      // if (!res.error) {
      //   return Router.push("/");
      // }

      // handleErr(res.error);
      setSubmitting(false);
      setSent(true);
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
      {sent ? (
        <section className="flex flex-col justify-center items-center text-sp-white">
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

          <div className="flex flex-col justify-center items-center gap-3 pb-8">
            <ShieldIcon width={12} height={12} />
            <h1 className="text-3xl text-center font-bold">Reset link sent</h1>
            <h2 className="text-center text-xl font-medium">
              Go to your email and visit a password reset link we’ve sent you.
            </h2>
          </div>
          <h2 className="text-center text-xl font-medium mt-8 mb-4">
            Already reset the password?
          </h2>
          <a
            href="/auth/login"
            className=" bg-sp-black border border-sp-lighter rounded-sp-40 py-2 px-3 text-lg font-semibold text-sp-white"
          >
            Go to Log in
          </a>
        </section>
      ) : (
        <section className="flex flex-col justify-center items-center text-sp-white">
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

          <div className="flex flex-col justify-center items-center gap-3 pb-8">
            <ShieldIcon width={12} height={12} />
            <h1 className="text-3xl text-center font-bold">Forgot password?</h1>
            <p className="text-center text-lg font-medium">
              Enter the email associated with this account and we’ll send you a
              password reset link.
            </p>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email">Email address</label>
              <input
                {...register("email", {
                  required: true,
                  validate: (v) =>
                    isEmailValid(v) || "A valid email address is required",
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
                className="w-2/3 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 rounded-sp-40 p-4 text-sp-black text-lg"
              >
                {submitting ? (
                  <Spinner text="Logging in..." />
                ) : (
                  "Send reset link"
                )}
              </button>
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
      session,
    },
  };
}
