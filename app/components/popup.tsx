import { DialogPanel, DialogTitle, TransitionChild } from "@headlessui/react";

import { Dialog } from "@headlessui/react";

import { Transition } from "@headlessui/react";
import { X } from "lucide-react";
import { Fragment } from "react";

export default function Popup({ children, isOpen, setIsOpen, title }: { children: React.ReactNode, isOpen: boolean, setIsOpen: (isOpen: boolean) => void, title: string }) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md relative transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  {children}

                  <div className="mt-4 absolute top-1 right-3">
                   
                    <X className="w-6 h-6 text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => setIsOpen(false)} />
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
}