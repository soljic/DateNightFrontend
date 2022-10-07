import Image from "next/image";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";
import { PencilIcon } from "@heroicons/react/outline";

import { Spinner } from "../../components/Status";

import { ProxyProfileSpiritus } from "../../service/http/auth";
import { ProxyDeleteSpiritus } from "../../service/http/proxy";

import { Fragment } from "react";

import Link from "next/link";

import { Dialog, Popover, Transition } from "@headlessui/react";

import { XIcon, TrashIcon } from "@heroicons/react/outline";

import {
  SettingsGuardianIcon,
  SettingsSpiritusIcon,
  SettingsAccountIcon,
  SettingsEditSpiritusIcon,
  SettingsCreateStoryIcon,
  SettingsEditStoryIcon,
} from "../SettingsIcons";
// import { ProxyLogout } from "../../service/http/proxy";

export function MySpiritusGrid({ spiritus, isLastPage }) {
  const { t } = useTranslation(["common", "settings"]);
  const { data: session, status } = useSession();

  const [current, setCurrent] = useState(0);
  const [isLast, setIsLast] = useState(isLastPage);
  const [items, setItems] = useState(spiritus);
  const [isLoading, setIsLoading] = useState(false);

  // delete modal
  let [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteID] = useState();

  // call from child to set deleteId and open modal
  function openModal(deleteId) {
    setDeleteID(deleteId);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const res = await ProxyProfileSpiritus(
        session.user.accessToken,
        current + 1
      );
      setItems((prev) => [...prev, ...res.data.content]);
      setCurrent((prev) => prev + 1);
      setIsLast(res.data.last);
      setIsLoading(false);
    } catch (err) {
      // TODO: handle this
      setIsLoading(false);
      console.log("#### ERR", err.message);
    }
  };

  return (
    <div className="mx-4 mb-80">
      <DeleteModal
        deleteId={deleteId}
        setItems={setItems}
        isOpen={isOpen}
        closeModal={closeModal}
      />

      <h1 className="text-2xl font-bold subpixel-antialiased tracking-tight text-sp-black dark:text-sp-white">
        {t("settings:spiritus")}
      </h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 mb-12 place-items-center">
        {items.map((item) => {
          return (
            <div className="h-full w-full" key={item.id}>
              <Tile
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                image={item.image}
                openModal={openModal}
              />
            </div>
          );
        })}
      </div>

      {!isLast && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              loadMore();
            }}
            disabled={isLast}
            className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none rounded-full py-3 px-8 font-semibold cursor-pointer"
          >
            {isLoading ? (
              <Spinner text={t("loading")} />
            ) : (
              t("action_load_more")
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function DeleteModal({ deleteId, setItems, isOpen, closeModal }) {
  const { t } = useTranslation(["common", "settings"]);
  const { data: session, status } = useSession();

  let [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // helpers to clear input field after async ops complete
  const [isSafeToReset, setIsSafeToReset] = useState(false);

  useEffect(() => {
    if (!isSafeToReset) return;
    reset();
  }, [isSafeToReset]);

  const onClose = () => {
    setErr("");
    reset();
    closeModal();
  };

  // call DELETE on BE and remove from rendered items
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      await ProxyDeleteSpiritus(session.user.accessToken, deleteId);
      setItems((prev) => prev.filter((item) => item.id !== deleteId));
      setSubmitting(false);
      setIsSafeToReset(true);
      closeModal();
    } catch (error) {
      setErr(t("settings:delete_err"));
      setSubmitting(false);
      console.log("ERR DELETING", error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={onClose}>
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

        <div className="fixed inset-0 overflow-y-auto z-10">
          <div className="flex items-center h-full justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex justify-center h-1/2 items-center transition-all transform">
                <div className="w-full md:w-1/2 border-sp-lighter border rounded-sp-14 bg-sp-day-100 dark:bg-sp-black">
                  <div className="flex flex-col justify-center gap-y-10 px-4">
                    <div className="flex justify-end mt-8">
                      <button
                        onClick={onClose}
                        className="p-1 rounded-full mx-1 border border-sp-lighter"
                      >
                        <XIcon className="h-6 w-6 text-sp-lighter" />
                      </button>
                    </div>
                    <div className="flex flex-col justify-center items-center">
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
                      <h1 className="text-3xl font-bold mt-8 mb-2.5">
                        {t("settings:delete_modal_title")}
                      </h1>
                      <p className="text-center font-medium">
                        {t("settings:delete_modal_subtitle")}
                      </p>
                    </div>
                    <form
                      className="flex flex-col gap-2"
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
                        className="form-control rounded p-4 block w-full text-base font-normal text-sp-white bg-inherit bg-clip-padding border border-solid border-sp-lighter transition ease-in-out m-0 focus:text-sp-white focus:bg-inherit focus:border-sp-white focus:outline-none"
                        id="confirm"
                      />
                      {errors.confirm && (
                        <p className="text-sm text-red-600 py-2 px-1">
                          {errors.confirm.message}
                        </p>
                      )}

                      <div className="flex flex-col justify-center items-center text-center">
                        {/* login button */}
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-2/3 bg-sp-cotta rounded-sp-40 p-4 text-sp-black"
                        >
                          {submitting ? <Spinner text="" /> : "Delete"}
                        </button>
                        {err && (
                          <p className="text-sm text-red-600 py-2 px-1">
                            {err}
                          </p>
                        )}
                        <div className="flex flex-col justify-center items-center my-10 text-lg gap-3">
                          <button
                            onClick={onClose}
                            className="border border-sp-lighter rounded-sp-40 py-2 px-3 text-sm dark:text-sp-white"
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

// Passes setItems to DeleteModal
function Tile({ id, title, subtitle, image, openModal }) {
  return (
    <>
      <div className="flex flex-col">
        <Link href={`/spiritus/id/${id}`}>
          <a>
            {image?.url ? (
              <div className="w-full h-full">
                <Image
                  src={image.url}
                  className="rounded-sp-14"
                  width={192}
                  height={248}
                  layout="responsive"
                  objectFit="fill"
                />
              </div>
            ) : (
              <div className="flex justify-center items-center border rounded-sp-14 border-sp-medium min-h-[20vh] object-fill">
                <svg
                  className="h-16 w-16 text-sp-dark-fawn text-opacity-40"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1988 7.1998C11.1988 7.47378 11.1713 7.74132 11.1188 7.9998H15.9988C16.8825 7.9998 17.5988 8.71615 17.5988 9.5998V12.7998H15.9988C14.2315 12.7998 12.7988 14.2325 12.7988 15.9998V17.5998H9.59883C8.71517 17.5998 7.99883 16.8835 7.99883 15.9998V11.1198C7.74034 11.1723 7.4728 11.1998 7.19883 11.1998C6.92486 11.1998 6.65732 11.1723 6.39883 11.1198V15.9998C6.39883 17.7671 7.83152 19.1998 9.59883 19.1998H12.7988V22.3998C12.7988 24.1671 14.2315 25.5998 15.9988 25.5998H20.8788C20.8264 25.3413 20.7988 25.0738 20.7988 24.7998C20.7988 24.5258 20.8264 24.2583 20.8788 23.9998H15.9988C15.1152 23.9998 14.3988 23.2835 14.3988 22.3998V19.1998H15.9988C17.7661 19.1998 19.1988 17.7671 19.1988 15.9998V14.3998H22.3988C23.2825 14.3998 23.9988 15.1161 23.9988 15.9998V20.8798C24.2573 20.8274 24.5249 20.7998 24.7988 20.7998C25.0728 20.7998 25.3403 20.8274 25.5988 20.8798V15.9998C25.5988 14.2325 24.1661 12.7998 22.3988 12.7998H19.1988V9.5998C19.1988 7.83249 17.7661 6.3998 15.9988 6.3998H11.1188C11.1713 6.65829 11.1988 6.92583 11.1988 7.1998ZM17.5988 14.3998V15.9998C17.5988 16.8835 16.8825 17.5998 15.9988 17.5998H14.3988V15.9998C14.3988 15.1161 15.1152 14.3998 15.9988 14.3998H17.5988ZM9.59883 7.1998C9.59883 8.52529 8.52431 9.5998 7.19883 9.5998C5.87334 9.5998 4.79883 8.52529 4.79883 7.1998C4.79883 5.87432 5.87334 4.7998 7.19883 4.7998C8.52431 4.7998 9.59883 5.87432 9.59883 7.1998ZM27.1988 24.7998C27.1988 26.1253 26.1243 27.1998 24.7988 27.1998C23.4733 27.1998 22.3988 26.1253 22.3988 24.7998C22.3988 23.4743 23.4733 22.3998 24.7988 22.3998C26.1243 22.3998 27.1988 23.4743 27.1988 24.7998ZM27.1988 7.1998C27.1988 8.52529 26.1243 9.5998 24.7988 9.5998C23.4733 9.5998 22.3988 8.52529 22.3988 7.1998C22.3988 5.87432 23.4733 4.7998 24.7988 4.7998C26.1243 4.7998 27.1988 5.87432 27.1988 7.1998ZM9.59883 24.7998C9.59883 26.1253 8.52431 27.1998 7.19883 27.1998C5.87334 27.1998 4.79883 26.1253 4.79883 24.7998C4.79883 23.4743 5.87334 22.3998 7.19883 22.3998C8.52431 22.3998 9.59883 23.4743 9.59883 24.7998Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}

            <div className="mt-3">
              <h3 className="text-lg dark:text-sp-white">{title}</h3>
              <p className="text-sp-black text-opacity-60 dark:text-sp-white dark:text-opacity-60">
                {subtitle}
              </p>
            </div>
          </a>
        </Link>

        <EditBtn id={id} openModal={openModal} />
      </div>
    </>
  );
}

function EditBtn({ id, openModal }) {
  const { t } = useTranslation(["common", "settings"]);

  const menuItems = [
    {
      name: t("settings:edit_spiritus"),
      href: `/edit/spiritus/${id}`,
      icon: <SettingsEditSpiritusIcon width={5} height={5} />,
    },
    {
      name: t("settings:new_story"),
      href: `/create/story?spiritus=${id}`,
      icon: <SettingsCreateStoryIcon width={5} height={5} />,
    },
    // {
    //   name: t("settings:edit_guardians"),
    //   href: "/",
    //   icon: <SettingsGuardianIcon width={5} height={5} />,
    // },
    // {
    //   name: "Edit a Story",
    //   href: "/",
    //   icon: <SettingsEditStoryIcon width={5} height={5} />,
    // },
  ];

  return (
    <Popover className="z-10">
      {({ open }) => (
        <>
          <Popover.Button className="flex justify-center items-center mt-5 border border-sp-medium py-1.5 px-3 rounded-sp-40 w-full">
            <PencilIcon className="w-5 h-5 text-sp-black dark:text-sp-white" />
            <span className="text-sp-black dark:text-sp-white ml-2">
              {t("settings:edit")}
            </span>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-100 mt-2 max-w-md">
              <div className="overflow-hidden rounded-sp-14 shadow-lg bg-sp-day-300 border-sp-fawn dark:bg-sp-black border-2 dark:border-sp-medium text-sp-black dark:text-sp-white">
                <div className="flex flex-col justify-evenly gap-y-1 p-3">
                  {menuItems.map((item) => {
                    return (
                      <Link href={item.href} key={item.name}>
                        <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3  dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                          {item.icon}
                          <div className="ml-4">
                            <p className="text-sm font-medium">{item.name}</p>
                          </div>
                        </a>
                      </Link>
                    );
                  })}

                  <button
                    onClick={() => openModal(id)}
                    className="flex w-52 justify-start items-center rounded-sp-14 p-4 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
                  >
                    <TrashIcon className="w-6 h-6 text-sp-cotta" />
                    <div className="flex justify-between w-full ml-3">
                      <p className="text-sm text-sp-cotta font-semibold">
                        {t("settings:delete")}
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
