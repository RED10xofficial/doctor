"use client";

import Modules from "@/app/components/modules";
import Popup from "@/app/components/popup";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { AlignRightIcon } from "lucide-react";
import { Fragment, useState } from "react";
import ExamList from "./components/examList";

export default function DetailsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [openModules, setOpenModules] = useState(false);
  const exams = [
    { id: 1, name: "Angular Fundamentals" },
    { id: 2, name: "React Hooks Deep Dive" },
    { id: 3, name: "State Management in React" },
  ];

  

  return (
    <div className="bg-gradient-to-r from-sky-100/50 to-pink-100/50 via-gray-50 w-full min-h-screen">
      <div className="flex gap-4 max-w-7xl mx-auto p-2 pt-4">
        <div className="hidden md:block">
        <Modules />
        </div>
        <div className="flex-1 bg-white rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-600">
                Angular Best Practices
              </h2>
              <div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                  <p className="ml-2 text-gray-500 text-sm">Section 1</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-sky-400 text-white px-4 py-2 ml-2 rounded-lg text-sm"
                onClick={() => setIsOpen(true)}
              >
                Exams
              </button>
              <button type="button" className="block md:hidden bg-sky-400 text-white px-3 py-2 ml-2 rounded-lg text-sm" onClick={() => setOpenModules(!openModules)} >
              <AlignRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4 border-b pb-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
            magni sed voluptatem a, inventore delectus at. Nulla perspiciatis
            autem modi atque maiores, quo nihil doloremque? Consectetur quo
            repudiandae ipsam quas!
          </p>
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-600">Description</h2>
            <p className="text-gray-500 text-sm mt-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
              magni sed voluptatem a, inventore delectus at. Nulla perspiciatis
              autem modi atque maiores, quo nihil doloremque? Consectetur quo
              repudiandae ipsam quas! Sample PDF This is a simple PDF file. Fun
              fun fun. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Phasellus facilisis odio sed mi. Curabitur suscipit. Nullam vel
              nisi. Etiam semper ipsum ut lectus. Proin aliquam, erat eget
              pharetra commodo, eros mi condimentum quam, sed commodo justo quam
              ut velit. Integer a erat. Cras laoreet ligula cursus enim. Aenean
              scelerisque velit et tellus. Vestibulum dictum aliquet sem. Nulla
              facilisi. Vestibulum accumsan ante vitae elit. Nulla erat dolor,
              blandit in, rutrum quis, semper pulvinar, enim. Nullam varius
              congue risus. Vivamus sollicitudin, metus ut interdum eleifend,
              nisi tellus pellentesque elit, tristique accumsan eros quam et
              risus. Suspendisse libero odio, mattis sit amet, aliquet eget,
              hendrerit vel, nulla. Sed vitae augue. Aliquam erat volutpat.
              Aliquam feugiat vulputate nisl. Suspendisse quis nulla pretium
              ante pretium mollis. Proin velit ligula, sagittis at, egestas a,
              pulvinar quis, nisl. Pellentesque sit amet lectus. Praesent
              pulvinar, nunc quis iaculis sagittis, justo quam lobortis tortor,
              sed vestibulum dui metus venenatis est. Nunc cursus ligula. Nulla
              facilisi. Phasellus ullamcorper consectetuer ante. Duis tincidunt,
              urna id condimentum luctus, nibh ante vulputate sapien, id
              sagittis massa orci ut enim. Pellentesque vestibulum convallis
              sem. Nulla consequat quam ut nisl. Nullam est. Curabitur tincidunt
              dapibus lorem. Proin velit turpis, scelerisque sit amet, iaculis
              nec, rhoncus ac, ipsum. Phasellus lorem arcu, feugiat eu, gravida
              eu, consequat molestie, ipsum. Nullam vel est ut ipsum volutpat
              feugiat. Aenean pellentesque. In mauris. Pellentesque dui nisi,
              iaculis eu, rhoncus in, venenatis ac, ante. Ut odio justo,
              scelerisque vel, facilisis non, commodo a, pede. Cras nec massa
              sit amet tortor volutpat varius. Donec lacinia, neque a luctus
              aliquet, pede massa imperdiet ante, at varius lorem pede sed
              sapien. Fusce erat nibh, aliquet in, eleifend eget, commodo eget,
              erat. Fusce consectetuer. Cras risus tortor, porttitor nec,
              tristique sed, convallis semper, eros. Fusce vulputate ipsum a
              mauris. Phasellus mollis. Curabitur sed urna. Aliquam nec sapien
              non nibh pulvinar convallis. Vivamus facilisis augue quis quam.
              Proin cursus aliquet metus. Suspendisse lacinia. Nulla at tellus
              ac turpis eleifend scelerisque. Maecenas a pede vitae enim commodo
              interdum. Donec odio. Sed sollicitudin dui vitae justo. Morbi elit
              nunc, facilisis a, mollis a, molestie at, lectus. Suspendisse eget
              mauris eu tellus molestie cursus. Duis ut magna at justo dignissim
              condimentum. Cum sociis natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Vivamus varius. Ut sit amet diam
              suscipit mauris ornare aliquam. Sed varius. Duis arcu. Etiam
              tristique massa eget dui. Phasellus congue. Aenean est erat,
              tincidunt eget, venenatis quis, commodo at, quam.
            </p>
          </div>
        </div>
      </div>

      <Popup isOpen={isOpen} setIsOpen={setIsOpen} title="All Exams">
        <ExamList exams={exams} />
      </Popup>
      <Transition appear show={openModules} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setOpenModules(false)}
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
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    
                  </DialogTitle>
                  <div className="mt-2">
                    <Modules />
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                      onClick={() => setOpenModules(false)}
                    >
                      Close
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
