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

export default function EmailLogin() {
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

      setSubmitting(false);
      if (!res.error) {
        await Router.push("/");
      }

      handleErr(res.error);
    } catch (error) {
      setSubmitting(false);v
      setErr("Unable to log in. Please try again later or contact support.");
    }
  };

  return (
    <LayoutNoNav>
      <section className="flex flex-col justify-center items-center text-sp-white">
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

        <div className="flex flex-col justify-center items-center gap-8">
          <ShieldIcon width={12} height={12} />
          <h4 className="text-3xl text-center font-bold mb-10">
            Log in as Guardian
          </h4>
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
          <div className="relative">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: true,
              })}
              type={showPass ? "text" : "password"}
              className="form-control rounded p-4 block w-full text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-sp-lighter transition ease-in-out m-0 focus:text-sp-white focus:bg-inherit focus:border-sp-white focus:outline-none"
              id="password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 items-center text-sm leading-5 mt-5"
              onClick={(e) => {
                e.preventDefault();
                setShowPass((prev) => !prev);
              }}
            >
              {showPass ? (
                <EyeOffIcon className="w-6 h-6 text-sp-lighter" />
              ) : (
                <EyeIcon className="w-6 h-6 text-sp-lighter" />
              )}
            </button>
          </div>
          {err && <p className="text-sm text-red-600 py-2 px-1">{err}</p>}

          <div className="flex flex-col justify-center items-center text-center mt-5">
            {/* login button */}
            <button
              type="submit"
              className="w-2/3 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 rounded-sp-40 p-4 text-sp-black text-lg"
            >
              {submitting ? <Spinner text="Logging in..." /> : "Log in"}
            </button>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <a className="text-sp-lighter hover:text-sp-fawn mt-7" href="#!">
              Forgot password?
            </a>
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
      session,
    },
  };
}
