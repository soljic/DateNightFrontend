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

export default function EmailRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
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
      setErr("Email or password are not correct.");
    } else {
      setErr(
        "Unable to log in at this time. Please try again later or contact support."
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: data.email,
        password: data.password,
      });

      if (!res.error) {
        await Router.push("/");
      }

      handleErr(res.error);
    } catch (error) {
      setErr("Unable to log in. Please try again later or contact support.");
    }
  };

  return (
    <LayoutNoNav>
      <section className="flex flex-col justify-center items-center text-sp-white subpixel-antialiased">
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}

        <div className="flex flex-col justify-center items-center gap-4 mb-10">
          <ShieldIcon width={12} height={12} />
          <h4 className="text-3xl text-center font-bold mt-5">
            Log in as Guardian
          </h4>
          <p className="text-center">
            By continuing, you agree to the{" "}
            <a className="underline underline-offset-4">Terms of Service</a>
            <span> and acknowledge our </span>
            <a className="underline underline-offset-4">Privacy Policy</a>.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="firstName">First name</label>
            <input
              {...register("firstName", {
                required: true,
                validate: (v) =>
                  !!v && v.length > 2 || "First name is required",
              })}
              type="text"
              className="form-control rounded p-4 block w-full text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-sp-lighter transition ease-in-out focus:text-sp-white focus:bg-inherit focus:border-sp-white focus:outline-none"
              id="firstName"
            />
            {errors.firstName && (
              <p className="text-sm text-red-600 py-2 px-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName">Last Name</label>
            <input
              {...register("lastName", {
                required: true,
                validate: (v) =>
                  !!v && v.length > 2 || "Last name is required",
              })}
              type="text"
              className="form-control rounded p-4 block w-full text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-sp-lighter transition ease-in-out focus:text-sp-white focus:bg-inherit focus:border-sp-white focus:outline-none"
              id="lastName"
            />
            {errors.lastName && (
              <p className="text-sm text-red-600 py-2 px-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email address</label>
            <input
              {...register("email", {
                required: true,
                validate: (v) =>
                  isEmailValid(v) || "A valid email address is required",
              })}
              type="text"
              className="form-control rounded p-4 block w-full text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-sp-lighter transition ease-in-out focus:text-sp-white focus:bg-inherit focus:border-sp-white focus:outline-none"
              id="email"
            />
            {errors.email && (
              <p className="text-sm text-red-600 py-2 px-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="phone">Phone number</label>
            <input
              {...register("phone", {
                required: true,
              })}
              placeholder="+385"
              type="text"
              className="form-control rounded p-4 block w-full text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-sp-lighter placeholder-sp-lighter transition ease-in-out focus:text-sp-white focus:bg-inherit focus:border-sp-white focus:outline-none"
              id="phone"
            />
          </div>
          <div className="relative">
            <label htmlFor="password">Password</label>
            <input
              {...register("password", {
                required: true,
                validate: (v) =>
                  (!!v && v.length > 8) ||
                  "Password must be at least 8 characters long",
              })}
              type={showPass ? "text" : "password"}
              className="form-control rounded p-4 block w-full text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-sp-lighter transition ease-in-out focus:text-sp-white focus:bg-inherit focus:border-sp-white focus:outline-none"
              id="password"
            />
            {errors.password && (
              <p className="text-sm text-red-600 py-2 px-1">
                {errors.password.message}
              </p>
            )}
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

          <div className="flex flex-col justify-center items-center text-center mt-10">
            {/* login button */}
            <button
              type="submit"
              className="w-2/3 bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 rounded-sp-40 p-4 text-sp-black text-lg"
            >
              {submitting ? (
                <Spinner text="Creating..." />
              ) : (
                "Create an account"
              )}
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
      session,
    },
  };
}
