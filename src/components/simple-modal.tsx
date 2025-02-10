"use client";
import {
  Dispatch,
  Fragment,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useRef,
} from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  HiOutlineExclamation,
  HiOutlineInformationCircle,
} from "react-icons/hi";

interface SimpleModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setChecked: (userInput: boolean) => void;
  modalHeader?: string;
  modalType?: string;
  negativeMessage?: string;
  positiveMessage?: string;
  children: ReactNode;
}

const SimpleModal: FunctionComponent<SimpleModalProps> = (props) => {
  const cancelButtonRef = useRef(null);
  const {
    openModal,
    setOpenModal,
    setChecked,
    modalHeader = "",
    modalType = "",
    negativeMessage,
    positiveMessage,
    children,
  } = props;

  function handleNegative() {
    setChecked(false);
    setOpenModal(false);
  }

  function handlePositive() {
    setChecked(true);
    setOpenModal(false);
  }

  return (
    <Transition
      show={openModal}
      as={Fragment}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpenModal}
      >
        <div className="flex min-h-screen items-end justify-center p-0 text-center sm:block sm:p-0 md:p-4 md:pb-20">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </TransitionChild>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform overflow-hidden bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:rounded-lg sm:align-middle">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <IconChanger modalType={modalType} />
                  <div className="mt-3 text-left sm:ml-4 sm:mt-0">
                    {/* <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"> */}
                    <DialogTitle
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {modalHeader}
                    </DialogTitle>
                    {children}
                  </div>
                </div>
              </div>
              <div className="border-t bg-slate-50 px-4 py-3 sm:flex sm:flex-row sm:px-6">
                {/* <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-2 sm:px-6"> */}
                {negativeMessage && (
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:flex-grow sm:text-sm"
                    onClick={handleNegative}
                  >
                    {/* bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 */}
                    {negativeMessage}
                  </button>
                )}
                {positiveMessage && (
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-primary-300 bg-primary-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:flex-grow sm:text-sm"
                    onClick={handlePositive}
                    ref={cancelButtonRef}
                  >
                    {positiveMessage}
                  </button>
                )}
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

const IconChanger = ({ modalType }: { modalType: string }) => {
  switch (modalType) {
    case "information":
      return (
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
          <HiOutlineInformationCircle
            className="h-6 w-6 text-gray-600"
            aria-hidden="true"
          />
        </div>
      );
    case "warning":
      return (
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
          <HiOutlineExclamation
            className="h-6 w-6 text-yellow-600"
            aria-hidden="true"
          />
        </div>
      );
    case "error":
      return (
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <HiOutlineExclamation
            className="h-6 w-6 text-red-600"
            aria-hidden="true"
          />
        </div>
      );
    default:
      return <div></div>;
  }
};

export default SimpleModal;
