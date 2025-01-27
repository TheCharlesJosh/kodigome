import { HiRefresh } from "react-icons/hi";
// import { HiRefresh } from '@heroicons/react/solid'
import { MouseEvent, useState } from "react";
import { FieldValues, UseFormReset } from "react-hook-form";
import SimpleModal from "./SimpleModal";

export const StartOverButton = ({
  reset,
}: {
  reset: UseFormReset<FieldValues>;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  function handleResponse(userInput: boolean) {
    if (userInput === true) reset();
  }

  function handleOpenModal(_event: MouseEvent) {
    setOpenModal(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpenModal}
        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <HiRefresh
          className="-ml-1 mr-2 h-5 w-5"
          aria-hidden="true"
        />
        Start over
      </button>
      <SimpleModal
        openModal={openModal || false}
        setOpenModal={setOpenModal}
        setChecked={handleResponse}
        modalType="warning"
        modalHeader="Are you sure you want to start over?"
        negativeMessage={"Cancel"}
        positiveMessage={"Start over"}
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">This will reset your choices.</p>
        </div>
      </SimpleModal>
    </>
  );
};
