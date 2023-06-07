import { Fragment, useState } from "react";

import { useRouter } from "next/router";

import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { DeleteSpiritus } from "@/service/http/spiritus_crud";

import { Spinner } from "../Status";

export function DeleteSpiritusModal({ deleteId, isOpen, closeModal }) {
  const { t } = useTranslation(["common", "settings"]);
  const { data: session, status } = useSession();

  const router = useRouter();
  let [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClose = () => {
    setErr("");
    reset();
    closeModal();
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      await DeleteSpiritus(session.user.accessToken, deleteId);
      router.push(`/`);
    } catch (error) {
      setErr(t("settings:delete_err"));
      setSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="z-100 relative" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex h-1/2 transform items-center justify-center transition-all">
                <div className="w-full rounded-sp-14 border border-sp-lighter bg-sp-day-100 dark:bg-sp-black md:max-w-lg">
                  <div className="flex flex-col justify-center gap-y-4 px-4 md:px-8">
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={onClose}
                        className="mx-1 rounded-full border border-sp-lighter p-1"
                      >
                        <XIcon className="h-6 w-6 text-sp-lighter" />
                      </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        width="49"
                        height="54"
                        viewBox="0 0 49 54"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.5 10.334C0.5 9.22941 1.39543 8.33398 2.5 8.33398C9.60242 8.33398 16.5213 5.81805 23.3 0.733984C24.0111 0.200651 24.9889 0.200651 25.7 0.733984C32.4788 5.81805 39.3976 8.33398 46.5 8.33398C47.6046 8.33398 48.5 9.22941 48.5 10.334V24.334C48.5 37.6705 40.6132 47.4693 25.2331 53.5281C24.762 53.7137 24.238 53.7137 23.767 53.5281C8.38684 47.4693 0.5 37.6705 0.5 24.334V10.334ZM4.5 12.2751V24.334C4.5 35.6822 11.0423 44.0111 24.5 49.5123C37.9577 44.0111 44.5 35.6822 44.5 24.334V12.2751C37.6271 11.8696 30.9511 9.36941 24.5 4.80816C18.0489 9.36941 11.3729 11.8696 4.5 12.2751Z"
                          fill="#DB6D56"
                        />
                      </svg>
                      <h1 className="mb-2.5 mt-8 font-bold text-3xl">
                        {t("settings:delete_modal_title")}
                      </h1>
                      <p className="text-center font-medium">
                        {t("settings:delete_modal_subtitle")}
                      </p>
                    </div>
                    <form
                      className="flex flex-col"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <label htmlFor="confirm">
                        {t("settings:delete_modal_confirm")}
                      </label>
                      <input
                        {...register("confirm", {
                          required: true,
                          validate: (v) =>
                            v.toLowerCase() === "delete" ||
                            t("settings:delete_modal_confirm_err"),
                        })}
                        type="text"
                        className="form-control m-0 block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-white transition ease-in-out text-base focus:border-sp-white focus:bg-inherit focus:text-sp-white focus:outline-none"
                        id="confirm"
                      />
                      {errors.confirm && (
                        <p className="px-1 py-2 text-red-600 text-sm">
                          {errors.confirm.message}
                        </p>
                      )}

                      <div className="mt-8 flex flex-col items-center justify-center text-center">
                        {/* login button */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-2/3 rounded-sp-40 bg-sp-cotta p-4 font-semibold text-sp-black"
                        >
                          {submitting ? <Spinner text="" /> : "Delete"}
                        </button>
                        {err && (
                          <p className="px-1 py-2 text-red-600 text-sm">
                            {err}
                          </p>
                        )}
                        <div className="mb-10 mt-2 flex flex-col items-center justify-center gap-3 text-lg">
                          <button
                            onClick={onClose}
                            className="rounded-sp-40 border border-sp-lighter px-3 py-2 text-sm dark:text-sp-white"
                          >
                            {t("settings:delete_modal_cancel")}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
