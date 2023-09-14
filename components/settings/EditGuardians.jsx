import { Fragment, useState } from "react";

import { useRouter } from "next/router";

import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon, XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";

import { Spinner } from "@/components/Status";

import {
  AddSpiritusGuardian,
  DeleteSpiritusGuardian,
} from "@/service/http/guardian";

// loggedInUserGuardianCode is the code of the guardian that is logged in
export function Guardian({
  idx,
  guardian,
  loggedInUserGuardianCode,
  onDelete,
}) {
  return (
    <div
      key={guardian.code}
      className={"flex flex-row items-center justify-between px-4 py-3.5"}
    >
      <p>
        {guardian.name} {guardian.surname}
      </p>
      {loggedInUserGuardianCode !== `${guardian.code}` ? (
        <button onClick={() => onDelete(idx)}>
          <TrashIcon className="h-6 w-6 text-[#DB6D56]" />
        </button>
      ) : null}
    </div>
  );
}

export function AddGuardianModal({
  spiritusId,
  spiritusFullName,
  isOpen,
  closeModal,
}) {
  const { t } = useTranslation(["common", "settings"]);
  const { data: session } = useSession();

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
      await AddSpiritusGuardian(
        session.user.accessToken,
        spiritusId,
        data.guardianId
      );
      onClose();
      router.reload();
    } catch (error) {
      setErr(t("settings:add_guardian_modal_error"));
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
                        width="65"
                        height="64"
                        viewBox="0 0 65 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.4996 30.3988C36.0342 30.3988 38.8996 27.5334 38.8996 23.9988C38.8996 20.4642 36.0342 17.5988 32.4996 17.5988C28.965 17.5988 26.0996 20.4642 26.0996 23.9988C26.0996 27.5334 28.965 30.3988 32.4996 30.3988ZM32.4996 46.3988C40.4996 46.3988 43.6996 42.3835 43.6996 38.3988C43.6996 35.7479 41.5506 33.5988 38.8996 33.5988H26.0996C23.4486 33.5988 21.2996 35.7479 21.2996 38.3988C21.2996 42.3985 24.4996 46.3989 32.4996 46.3988ZM33.3871 6.66911C32.8497 6.31082 32.1495 6.31082 31.6121 6.66911C25.4099 10.8039 18.7023 13.3838 11.4733 14.4165C10.6851 14.5291 10.0996 15.2042 10.0996 16.0004V30.4004C10.0996 42.8526 17.482 51.9386 31.9252 57.4937C32.295 57.6359 32.7043 57.6359 33.074 57.4937C47.5172 51.9386 54.8996 42.8526 54.8996 30.4004V16.0004C54.8996 15.2042 54.3141 14.5291 53.5259 14.4165C46.2969 13.3838 39.5893 10.8039 33.3871 6.66911ZM13.2996 17.3696C19.6529 16.2901 25.6284 14.0678 31.2168 10.707L32.4996 9.91126L33.7824 10.707C39.3708 14.0678 45.3463 16.2901 51.6996 17.3696V30.4004C51.6996 41.2549 45.4022 49.1632 32.4996 54.2827C19.597 49.1632 13.2996 41.2549 13.2996 30.4004V17.3696Z"
                          fill="url(#paint0_linear_6779_45543)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_6779_45543"
                            x1="10.0996"
                            y1="32.0004"
                            x2="54.8996"
                            y2="32.0004"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#ED9A4C" />
                            <stop offset="1" stop-color="#E3AA6D" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <h1 className="mb-2.5 mt-8 font-bold text-3xl">
                        {t("settings:add_guardian_modal_title")}
                      </h1>
                      <p className="text-center font-medium">
                        {t("settings:add_guardian_modal_subtitle_1")}{" "}
                        <span>{spiritusFullName}</span>. <br />
                        {t("settings:add_guardian_modal_subtitle_2")}
                      </p>
                      <p className="non-italic pt-2 font-medium leading-4 text-[#999795] text-xs">
                        {t(
                          "settings:add_guardian_modal_guardian_code_explanation"
                        )}
                      </p>
                    </div>
                    <form
                      className="flex flex-col"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <label htmlFor="confirm" className="pb-0.5 text-start">
                        {t("settings:add_guardian_modal_guardian_id_label")}
                      </label>
                      <input
                        {...register("guardianId", {
                          required: true,
                        })}
                        type="text"
                        className="form-control m-0 block w-full rounded border border-solid border-sp-lighter bg-inherit bg-clip-padding p-4 font-normal text-sp-black transition ease-in-out text-base focus:bg-inherit focus:outline-none dark:focus:border-sp-white dark:focus:text-sp-white"
                        id="guardianId"
                      />
                      {errors.guardianId && (
                        <p className="px-1 py-2 text-red-600 text-sm">
                          {errors.guardianId.message}
                        </p>
                      )}

                      <div className="mt-8 flex flex-col items-center justify-center text-center">
                        {/* add guardian button */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex w-full items-center justify-center gap-1 whitespace-nowrap rounded-sp-40 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-5 py-3.5 font-semibold text-sp-black dark:border-sp-medium dark:from-sp-dark-fawn dark:to-sp-fawn md:w-3/4"
                        >
                          {submitting ? (
                            <Spinner text="" />
                          ) : (
                            t("settings:add_guardian_modal_confirm")
                          )}
                        </button>
                        {err && (
                          <p className="px-1 py-2 text-red-600 text-sm">
                            {err}
                          </p>
                        )}
                        <div className="mb-10 mt-4 flex flex-col items-center justify-center gap-3 text-lg">
                          <button
                            onClick={onClose}
                            className="rounded-sp-40 border border-sp-lighter px-3 py-2 text-sm dark:text-sp-white"
                          >
                            {t("settings:add_guardian_modal_cancel")}
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

export function DeleteGuardianModal({
  spiritusId,
  spiritusFullName,
  guardianFullName,
  guardianId,
  isOpen,
  closeModal,
}) {
  const { t } = useTranslation(["common", "settings"]);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [err, setErr] = useState("");
  let [submitting, setSubmitting] = useState(false);

  const onClose = () => {
    setErr("");
    closeModal();
  };

  const deleteGuardian = async () => {
    try {
      setSubmitting(true);
      await DeleteSpiritusGuardian(
        session.user.accessToken,
        spiritusId,
        guardianId
      );
      router.reload();
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
                        width="65"
                        height="64"
                        viewBox="0 0 65 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M28.5007 13.334C28.5007 17.7523 24.9189 21.334 20.5007 21.334C16.0824 21.334 12.5007 17.7523 12.5007 13.334C12.5007 8.91571 16.0824 5.33398 20.5007 5.33398C24.9189 5.33398 28.5007 8.91571 28.5007 13.334ZM24.5007 13.334C24.5007 11.1248 22.7098 9.33398 20.5007 9.33398C18.2915 9.33398 16.5007 11.1248 16.5007 13.334C16.5007 15.5431 18.2915 17.334 20.5007 17.334C22.7098 17.334 24.5007 15.5431 24.5007 13.334ZM51.1673 20.0007C51.1673 23.6825 48.1825 26.6673 44.5007 26.6673C40.8188 26.6673 37.834 23.6825 37.834 20.0007C37.834 16.3188 40.8188 13.334 44.5007 13.334C48.1825 13.334 51.1673 16.3188 51.1673 20.0007ZM47.1673 20.0007C47.1673 18.5279 45.9734 17.334 44.5007 17.334C43.0279 17.334 41.834 18.5279 41.834 20.0007C41.834 21.4734 43.0279 22.6673 44.5007 22.6673C45.9734 22.6673 47.1673 21.4734 47.1673 20.0007ZM36.2246 28.6673C35.354 25.5893 32.5241 23.334 29.1673 23.334H13.1673C9.11723 23.334 5.83398 26.6172 5.83398 30.6673V38.6673C5.83398 41.6128 8.2218 44.0007 11.1673 44.0007C11.6277 44.0007 12.0745 43.9423 12.5007 43.8326V53.334C12.5007 56.2795 14.8885 58.6673 17.834 58.6673C19.0952 58.6673 20.2543 58.2295 21.1673 57.4976C22.0804 58.2295 23.2394 58.6673 24.5007 58.6673C27.4462 58.6673 29.834 56.2795 29.834 53.334V43.8326C30.2601 43.9423 30.7069 44.0007 31.1673 44.0007C33.6524 44.0007 35.7406 42.301 36.3326 40.0007H36.5007V53.334C36.5007 56.2795 38.8885 58.6673 41.834 58.6673C43.0952 58.6673 44.2543 58.2295 45.1673 57.4976C46.0804 58.2295 47.2394 58.6673 48.5007 58.6673C51.4462 58.6673 53.834 56.2795 53.834 53.334V45.8326C54.2601 45.9423 54.7069 46.0007 55.1673 46.0007C58.1128 46.0007 60.5007 43.6128 60.5007 40.6673V36.0007C60.5007 31.9506 57.2174 28.6673 53.1673 28.6673H36.2246ZM29.834 38.6673V32.0007C29.834 30.8961 28.9386 30.0007 27.834 30.0007C26.7294 30.0007 25.834 30.8961 25.834 32.0007V53.334C25.834 54.0704 25.237 54.6673 24.5007 54.6673C23.7643 54.6673 23.1673 54.0704 23.1673 53.334V44.0007C23.1673 42.8961 22.2719 42.0007 21.1673 42.0007C20.0627 42.0007 19.1673 42.8961 19.1673 44.0007V53.334C19.1673 54.0704 18.5704 54.6673 17.834 54.6673C17.0976 54.6673 16.5007 54.0704 16.5007 53.334V32.0007C16.5007 30.8961 15.6052 30.0007 14.5007 30.0007C13.3961 30.0007 12.5007 30.8961 12.5007 32.0007V38.6673C12.5007 39.4037 11.9037 40.0007 11.1673 40.0007C10.4309 40.0007 9.83398 39.4037 9.83398 38.6673V30.6673C9.83398 28.8264 11.3264 27.334 13.1673 27.334H29.1673C31.0083 27.334 32.5007 28.8264 32.5007 30.6673V38.6673C32.5007 39.4037 31.9037 40.0007 31.1673 40.0007C30.4309 40.0007 29.834 39.4037 29.834 38.6673ZM36.5007 32.6673H53.1673C55.0083 32.6673 56.5007 34.1597 56.5007 36.0007V40.6673C56.5007 41.4037 55.9037 42.0007 55.1673 42.0007C54.4309 42.0007 53.834 41.4037 53.834 40.6673V37.334C53.834 36.2294 52.9386 35.334 51.834 35.334C50.7294 35.334 49.834 36.2294 49.834 37.334V53.334C49.834 54.0704 49.237 54.6673 48.5007 54.6673C47.7643 54.6673 47.1673 54.0704 47.1673 53.334V46.6673C47.1673 45.5628 46.2719 44.6673 45.1673 44.6673C44.0628 44.6673 43.1673 45.5628 43.1673 46.6673V53.334C43.1673 54.0704 42.5704 54.6673 41.834 54.6673C41.0976 54.6673 40.5007 54.0704 40.5007 53.334V38.0007C40.5007 36.8961 39.6052 36.0007 38.5007 36.0007H36.5007V32.6673Z"
                          fill="#DB6D56"
                        />
                      </svg>
                      <h1 className="mb-2.5 mt-8 font-bold text-3xl">
                        {t("settings:delete_guardian_modal_title")}
                      </h1>
                      <p className="text-center font-medium">
                        <span>
                          {t("settings:delete_guardian_modal_subtitle_1")}
                          <br />
                        </span>
                        <span>{guardianFullName} </span>
                        <span>
                          {t("settings:delete_guardian_modal_subtitle_2")}{" "}
                        </span>
                        <span>{spiritusFullName}?</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center">
                      <button
                        onClick={deleteGuardian}
                        disabled={submitting}
                        className="flex w-full items-center justify-center gap-1 rounded-sp-40 bg-[#DB6D56] px-5 py-3.5 font-semibold text-sp-black md:w-3/4"
                      >
                        {submitting ? (
                          <Spinner text="" />
                        ) : (
                          t("settings:delete_guardian_modal_confirm")
                        )}
                      </button>
                      {err && (
                        <p className="px-1 py-2 text-red-600 text-sm">{err}</p>
                      )}
                      <div className="mb-10 mt-4 flex flex-col items-center justify-center gap-3 text-lg">
                        <button
                          onClick={onClose}
                          className="rounded-sp-40 border border-sp-lighter px-3 py-2 text-sm dark:text-sp-white"
                        >
                          {t("settings:delete_guardian_modal_cancel")}
                        </button>
                      </div>
                    </div>
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
