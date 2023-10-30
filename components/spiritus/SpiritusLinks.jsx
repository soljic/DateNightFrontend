import { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Dialog, Popover, Transition } from "@headlessui/react";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { set, useForm } from "react-hook-form";

import { AddLink, DeleteLink, EditLink } from "@/service/http/links";

import { Spinner } from "../Status";

function LinkIcon({ className }) {
  return (
    <svg
      width="55"
      height="28"
      viewBox="0 0 55 28"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.1667 0.666504C21.2712 0.666504 22.1667 1.56193 22.1667 2.6665C22.1667 3.67066 21.4266 4.50197 20.4622 4.64482L20.1667 4.6665H14.1667C9.01201 4.6665 4.83333 8.84518 4.83333 13.9998C4.83333 18.9704 8.71886 23.0334 13.6183 23.3173L14.1667 23.3332H20.1667C21.2712 23.3332 22.1667 24.2286 22.1667 25.3332C22.1667 26.3373 21.4266 27.1686 20.4622 27.3115L20.1667 27.3332H14.1667C6.80287 27.3332 0.833332 21.3636 0.833332 13.9998C0.833332 6.85919 6.44656 1.02957 13.5012 0.682822L14.1667 0.666504H20.1667ZM40.8333 0.666504C48.1971 0.666504 54.1667 6.63604 54.1667 13.9998C54.1667 21.1405 48.5534 26.9701 41.4988 27.3169L40.8333 27.3332H34.8333C33.7288 27.3332 32.8333 26.4377 32.8333 25.3332C32.8333 24.329 33.5734 23.4977 34.5378 23.3549L34.8333 23.3332H40.8333C45.988 23.3332 50.1667 19.1545 50.1667 13.9998C50.1667 9.02927 46.2811 4.96623 41.3817 4.68235L40.8333 4.6665H34.8333C33.7288 4.6665 32.8333 3.77107 32.8333 2.6665C32.8333 1.66235 33.5734 0.831038 34.5378 0.688189L34.8333 0.666504H40.8333ZM14.1667 11.9998H40.8333C41.9379 11.9998 42.8333 12.8953 42.8333 13.9998C42.8333 15.0124 42.0809 15.8491 41.1047 15.9816L40.8333 15.9998H14.1667C13.0621 15.9998 12.1667 15.1044 12.1667 13.9998C12.1667 12.9873 12.9191 12.1505 13.8953 12.0181L14.1667 11.9998H40.8333H14.1667Z"
        fill="url(#paint0_linear_11292_325)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_11292_325"
          x1="0.833332"
          y1="13.9998"
          x2="54.1667"
          y2="13.9998"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D67915" />
          <stop offset="1" stopColor="#ED9A4C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const mocks = [
  {
    id: 0,
    text: "LINK 1 - CLICK TO OPEN",
    link: "https://www.spiritus.app/about",
  },
  {
    id: 1,
    text: "LINK 2 - CLICK TO OPEN",
    link: "https://www.spiritus.app/our-tech",
  },
  {
    id: 2,
    text: "LINK 3 - CLICK TO OPEN",
    link: "https://www.spiritus.app/why-us",
  },
];

export function SpiritusLinks({ links, spiritus_id, isGuardian }) {
  const { t } = useTranslation("common");

  const { data: session, status } = useSession();
  const router = useRouter();

  const [editLink, setEditLink] = useState(null);

  const [displayLinks, setDiplayLinks] = useState(links || []);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setEditLink(null);
    setIsOpen(false);
  };

  const onDelete = async (idx) => {
    try {
      if (!session?.user?.accessToken) {
        return;
      }
      await DeleteLink(session.user.accessToken, displayLinks[idx].id);

      setDiplayLinks((prev) => prev.filter((_, i) => i !== idx));
    } catch (e) {}
  };

  const onAdd = async (link) => {
    try {
      if (!session?.user?.accessToken) {
        return;
      }
      await AddLink(session.user.accessToken, spiritus_id, link, router.locale);
      setDiplayLinks((prev) => [...prev, link]);
    } catch (e) {}
  };

  const onEdit = async (data) => {
    try {
      if (!session?.user?.accessToken) {
        return;
      }
      await EditLink(session.user.accessToken, data, router.locale);
      setDiplayLinks((prev) => {
        const newLinks = prev.map((link) =>
          link.id !== data.id ? link : data
        );
        return newLinks;
      });
    } catch (e) {}
  };

  const onPrepareEdit = (link) => {
    setEditLink(link);
    openModal();
  };

  return (
    <div className="flex flex-col space-y-3 overflow-hidden ">
      <Modal
        editLink={editLink}
        spiritus_id={spiritus_id}
        isOpen={isOpen}
        closeModal={closeModal}
        onAdd={onAdd}
        onEdit={onEdit}
      />
      {displayLinks?.map((link, idx) => (
        <EditableLink
          key={`link-edit-${idx}`}
          link={link}
          idx={idx}
          onDelete={() => onDelete(idx)}
          onPrepareEdit={() => onPrepareEdit(link)}
          isGuardian={isGuardian}

          // onDelete={onDelete}
        />
      ))}
      {isGuardian && (
        <button
          className="max-w-48 flex w-full items-center justify-center rounded-sp-10 border border-sp-day-200 p-1.5 font-medium text-sp-lighter dark:text-sp-day-50 md:w-1/3"
          onClick={() => openModal()}
        >
          <PlusIcon className="mr-1 h-5 w-5" />
          {t("add_link")}
        </button>
      )}
    </div>
  );
}

function EditableLink({ link, isGuardian, onPrepareEdit, onDelete }) {
  return (
    <div
      className={
        "flex min-h-[3rem] flex-row items-center justify-between rounded-sp-10 bg-day-gradient-start px-4 py-2 font-medium text-black dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-day-50"
      }
    >
      <a href={link.link} className="flex grow items-center">
        <LinkIcon className="mr-3.5 h-7 w-7" />
        {link.text}
      </a>

      {isGuardian && link?.id && (
        <div className="flex space-x-1 text-sp-gray dark:text-sp-day-50">
          <button
            className="rounded-full p-1.5 hover:bg-sp-day-200 hover:text-sp-black"
            onClick={() => {
              onPrepareEdit();
            }}
          >
            <PencilIcon className="h-6 w-6" />
          </button>
          <button
            className="rounded-full p-1.5 hover:bg-sp-day-200 hover:text-sp-black"
            onClick={() => {
              onDelete();
            }}
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}

function Modal({ editLink, isOpen, closeModal, onAdd, onEdit }) {
  const { t } = useTranslation("common");

  let [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // helpers to clear input field after async ops complete
  const [isSafeToReset, setIsSafeToReset] = useState(false);

  useEffect(() => {
    if (!editLink) return;
    setValue("id", editLink?.id || 0);
    setValue("text", editLink?.text || "");
    setValue("link", editLink?.link || "");
  }, [editLink]);

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
      if (editLink) {
        await onEdit({ id: data.id, text: data.text, link: data.link });
      } else {
        await onAdd({ text: data.text, link: data.link });
      }
      setSubmitting(false);
      setIsSafeToReset(true);
      closeModal();
    } catch (error) {
      setErr(t("message_error"));
      setSubmitting(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
          <div className="flex h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex h-96 w-96 transform items-center justify-center transition-all">
                <div className="w-full rounded-sp-14 border border-sp-day-400 bg-sp-day-50 shadow-sm shadow-sp-day-100 dark:bg-sp-black">
                  <div className="flex flex-col justify-center gap-y-10 px-4">
                    <div className="mt-8 flex justify-end">
                      <button
                        onClick={onClose}
                        className="mx-1 rounded-full border border-sp-lighter p-1"
                      >
                        <XIcon className="h-6 w-6 text-sp-lighter" />
                      </button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <LinkIcon className="h-12 w-12" />
                      <h1 className="mb-2.5 font-bold text-3xl">
                        {t("edit_link")}
                      </h1>
                    </div>
                    <form
                      className="flex flex-col items-start gap-2"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <label htmlFor="text" className="items-start">
                        {t("link")}
                      </label>
                      <input
                        {...register("text", {
                          required: true,
                        })}
                        type="text"
                        placeholder="Text"
                        className="form-control block w-full rounded-sp-10 border-2 border-sp-day-200 bg-inherit bg-clip-padding p-4 font-normal text-sp-black transition ease-in-out text-base focus:border-sp-gray focus:bg-inherit  focus:outline-none dark:border-sp-day-400 dark:text-sp-white dark:focus:border-sp-day-50"
                      />
                      {errors.text && (
                        <p className="px-1 py-2 text-red-600 text-sm">
                          {errors.text.message}
                        </p>
                      )}

                      <input
                        {...register("link", {
                          required: true,
                        })}
                        type="text"
                        placeholder="Link"
                        className="form-control block w-full rounded-sp-10 border-2 border-sp-day-200 bg-inherit bg-clip-padding p-4 font-normal text-sp-black transition ease-in-out text-base focus:border-sp-gray focus:bg-inherit  focus:outline-none dark:border-sp-day-400 dark:text-sp-white dark:focus:border-sp-day-50"
                      />
                      {errors.link && (
                        <p className="px-1 py-2 text-red-600 text-sm">
                          {errors.link.message}
                        </p>
                      )}

                      <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 pb-12 text-center">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full rounded-2xl border-sp-fawn bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn p-4 px-7 py-3 font-medium text-sp-white dark:border-sp-medium dark:border-opacity-80 dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black"
                        >
                          {submitting ? <Spinner text="" /> : "Save"}
                        </button>
                        {err && (
                          <p className="px-1 py-2 text-red-600 text-sm">
                            {err}
                          </p>
                        )}
                        <button
                          onClick={onClose}
                          className="px-3 py-2 font-medium text-sp-day-400 dark:text-sp-white"
                        >
                          {t("cancel")}
                        </button>
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
