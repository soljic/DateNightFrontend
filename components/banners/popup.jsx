import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { XIcon } from "@heroicons/react/solid";

export function PopupModal({ isOpen, closeModal, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="z-100 relative" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 z-40 bg-black bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-1000"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full transform content-center transition-all md:w-3/4 xl:w-1/2">
                <div className="flex h-full flex-col items-end">
                  <button
                    onClick={closeModal}
                    className="rounded-full focus:outline-gray-500"
                  >
                    <XIcon className="h-7 w-7 rounded-full bg-sp-lighter p-1 font-bold text-sp-white" />
                  </button>
                  <div className="my-4 md:mx-8">{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
