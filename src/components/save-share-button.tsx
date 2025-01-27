import { HiSave } from "react-icons/hi";
import { BaseSyntheticEvent, MouseEvent, useState } from "react";
import { ShareDialog } from "./ShareDialog";

export const SaveShareButton = ({
  onSubmit,
  saveKey,
}: {
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  saveKey: string | null;
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  async function handleOpenModal(event: MouseEvent) {
    setOpenModal(true);
    try {
      await onSubmit(event);
    } catch (error: unknown) {
      console.error(error);
    }
  }
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={handleOpenModal}
      >
        <HiSave
          className="-ml-1 mr-2 h-5 w-5"
          aria-hidden="true"
        />
        Save/Share
      </button>
      <ShareDialog {...{ openModal, setOpenModal, saveKey }} />
    </>
  );
};
