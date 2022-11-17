import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { XIcon } from "@heroicons/react/solid";

export function PopupModal({ isOpen, closeModal, children }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-90 z-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto z-40">
          <div className="flex items-center justify-center min-w-full min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-1000"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full md:w-3/4 xl:w-1/2 content-center transition-all transform">
                <div className="h-full flex flex-col items-end">
                  <button
                    onClick={closeModal}
                    className="rounded-full focus:outline-gray-500"
                  >
                    <XIcon className="font-bold text-sp-white w-7 h-7 p-1 bg-sp-lighter rounded-full" />
                  </button>
                  <div className="md:mx-8 my-4">{children}</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
