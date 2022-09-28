import { Fragment } from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";


import Link from "next/link";

import { useTranslation } from "next-i18next";

import { Popover, Transition } from "@headlessui/react";

import { BookmarkIcon } from "@heroicons/react/outline";
import { GuardianIcon } from "../Icons";
// import { ProxyLogout } from "../../service/http/proxy";

export function ProfileMenu({ token, profileName }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const logoutUser = async () => {
    // await ProxyLogout(token);
    await signOut({redirect: false});
    router.push("/")
  };

  return (
    <div className="z-10">
      <Popover>
        {({ open }) => (
          <>
            <Popover.Button
              className={`
				${open ? "" : "text-opacity-90"}
				border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex justify-center rounded-sp-40 py-2 px-5 font-semibold`}
            >
              {profileName}
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
              <Popover.Panel className="absolute -translate-x-1/2 z-100 mt-2">
                <div className="overflow-hidden rounded-sp-14 shadow-lg bg-sp-day-300 border-sp-fawn dark:bg-sp-black border-2 dark:border-sp-medium text-sp-black dark:text-sp-white">
                  <div className="flex flex-col justify-evenly gap-y-1 p-3">
                    <Link href="/">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3  dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <SpiritusIcon width={5} height={5} />
                        <div className="ml-4">
                          <p className="text-sm font-medium">My Spiritus</p>
                        </div>
                      </a>
                    </Link>
                    <Link href="/">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <AccountIcon width={5} height={5} />
                        <div className="ml-4">
                          <p className="text-sm font-medium">My Account</p>
                        </div>
                      </a>
                    </Link>
                    <Link href="/">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <BookmarkIcon className="w-5 h-5 text-sp-fawn dark:text-sp-white" />
                        <div className="ml-4">
                          <p className="text-sm font-medium">Saved</p>
                        </div>
                      </a>
                    </Link>
                    <Link href="/">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <SuggestionsIcon width={5} height={5} />
                        <div className="ml-4">
                          <p className="text-sm font-medium">Suggestions</p>
                        </div>
                      </a>
                    </Link>
                    <Link href="/">
                      <a className="flex w-52 justify-start items-center rounded-sp-14 px-4 py-3 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none">
                        <GuardianIcon width={5} height={5} alterFill />
                        <div className="ml-4">
                          <p className="text-sm font-medium">
                            My Guardian ID
                          </p>
                        </div>
                      </a>
                    </Link>
                    <button
                      href="/contact"
                      onClick={() => logoutUser()}
                      className="flex w-52 justify-start items-center rounded-sp-14 p-4 dark:hover:bg-gradient-to-r hover:bg-sp-day-50 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none"
                    >
                      <div>
                        <SignOutIcon />
                      </div>
                      <div className="flex justify-between w-full ml-3">
                        <p className="text-sm text-sp-cotta font-semibold">
                          Sign Out
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
    </div>
  );
}

function SignOutIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      width="15"
      height="15"
      className={`${w} ${h} fill-sp-cotta`}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.5 8.25C5.91421 8.25 6.25 7.91422 6.25 7.5C6.25 7.08579 5.91421 6.75 5.5 6.75C5.08579 6.75 4.75 7.08579 4.75 7.5C4.75 7.91422 5.08579 8.25 5.5 8.25ZM8 0.500004C8 0.354204 7.93636 0.215666 7.82575 0.120678C7.71514 0.0256898 7.56857 -0.0162863 7.42445 0.00574443L0.424449 1.07574C0.180316 1.11306 0 1.32303 0 1.57V12.43C0 12.6769 0.180277 12.8869 0.424378 12.9243L7.42438 13.9953C7.56851 14.0173 7.71509 13.9754 7.82572 13.8804C7.93635 13.7854 8 13.6468 8 13.501V7.00002L13.1722 7.00002L12.1753 7.87372C11.9679 8.05556 11.9468 8.37144 12.1284 8.57926C12.3099 8.78708 12.6253 8.80814 12.8328 8.6263L14.8295 6.8763C14.9379 6.78135 15 6.64419 15 6.50001C15 6.35583 14.9379 6.21867 14.8295 6.12372L12.8328 4.37372C12.6253 4.19188 12.3099 4.21294 12.1284 4.42076C11.9468 4.62858 11.9679 4.94446 12.1753 5.1263L13.1723 6.00002L8 6.00002V0.500004ZM7 1.08224V12.9187L1 12.0007V1.99938L7 1.08224ZM9.5 13H9V8H10V12.5C10 12.7761 9.77614 13 9.5 13ZM9 5V1H9.5C9.77614 1 10 1.22386 10 1.5V5H9Z" />
    </svg>
  );
}

function SpiritusIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-white`}
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 7.49951C8.10457 7.49951 9 6.60408 9 5.49951C9 4.39494 8.10457 3.49951 7 3.49951C5.89543 3.49951 5 4.39494 5 5.49951C5 6.60408 5.89543 7.49951 7 7.49951ZM7 12.4995C9.5 12.4995 10.5 11.2447 10.5 9.99951C10.5 9.17108 9.82843 8.49951 9 8.49951H5C4.17157 8.49951 3.5 9.17108 3.5 9.99951C3.5 11.2494 4.5 12.4995 7 12.4995ZM7.27735 0.0839749C7.1094 -0.0279916 6.8906 -0.0279916 6.72265 0.0839749C4.78446 1.3761 2.68833 2.1823 0.429289 2.50503C0.182965 2.54021 0 2.75117 0 3V7.5C0 11.3913 2.30699 14.2307 6.82051 15.9667C6.93605 16.0111 7.06395 16.0111 7.17949 15.9667C11.693 14.2307 14 11.3913 14 7.5V3C14 2.75117 13.817 2.54021 13.5707 2.50503C11.3117 2.1823 9.21554 1.3761 7.27735 0.0839749ZM1 3.42787C2.98541 3.09055 4.85275 2.39606 6.59914 1.34583L7 1.09715L7.40086 1.34583C9.14725 2.39606 11.0146 3.09055 13 3.42787V7.5C13 10.892 11.0321 13.3634 7 14.9632C2.96795 13.3634 1 10.892 1 7.5V3.42787Z" />
    </svg>
  );
}

function SuggestionsIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-white`}
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.5 7C8.5 7.65311 8.0826 8.20873 7.5 8.41465V10.5C7.5 10.7761 7.27614 11 7 11C6.72386 11 6.5 10.7761 6.5 10.5V8.41465C5.9174 8.20873 5.5 7.65311 5.5 7C5.5 6.17157 6.17157 5.5 7 5.5C7.82843 5.5 8.5 6.17157 8.5 7ZM7.27735 0.0839749C7.1094 -0.0279916 6.8906 -0.0279916 6.72265 0.0839749C4.78446 1.3761 2.68833 2.1823 0.429289 2.50503C0.182965 2.54021 0 2.75117 0 3V7.5C0 11.3913 2.30699 14.2307 6.82051 15.9667C6.93605 16.0111 7.06395 16.0111 7.17949 15.9667C11.693 14.2307 14 11.3913 14 7.5V3C14 2.75117 13.817 2.54021 13.5707 2.50503C11.3117 2.1823 9.21554 1.3761 7.27735 0.0839749ZM1 3.42787C2.98541 3.09055 4.85275 2.39606 6.59914 1.34583L7 1.09715L7.40086 1.34583C9.14725 2.39606 11.0146 3.09055 13 3.42787V7.5C13 10.892 11.0321 13.3634 7 14.9632C2.96795 13.3634 1 10.892 1 7.5V3.42787Z" />
    </svg>
  );
}

function AccountIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h} fill-sp-dark-fawn dark:fill-sp-white`}
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 0C4.79086 0 3 1.79086 3 4C3 6.20914 4.79086 8 7 8C9.20914 8 11 6.20914 11 4C11 1.79086 9.20914 0 7 0ZM4 4C4 2.34315 5.34315 1 7 1C8.65685 1 10 2.34315 10 4C10 5.65685 8.65685 7 7 7C5.34315 7 4 5.65685 4 4ZM2.00873 9C0.903151 9 0 9.88687 0 11C0 12.6912 0.83281 13.9663 2.13499 14.7966C3.41697 15.614 5.14526 16 7 16C8.85474 16 10.583 15.614 11.865 14.7966C13.1672 13.9663 14 12.6912 14 11C14 9.89557 13.1045 9.00001 12 9.00001L2.00873 9ZM1 11C1 10.4467 1.44786 10 2.00873 10L12 10C12.5522 10 13 10.4478 13 11C13 12.3088 12.3777 13.2837 11.3274 13.9534C10.2568 14.636 8.73511 15 7 15C5.26489 15 3.74318 14.636 2.67262 13.9534C1.62226 13.2837 1 12.3088 1 11Z" />
    </svg>
  );
}
