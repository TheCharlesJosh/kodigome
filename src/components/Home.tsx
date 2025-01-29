"use client";
import Sidebar from "@/components/sidebar/sidebar";
import Main from "./Main";
import Footer from "./Footer";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { RefObject, useEffect, useRef, useState } from "react";
import { CandidateGroupValues } from "../lib/CandidateTypes";
// import { useBeforeunload } from 'react-beforeunload'
import { useBeforeUnload, useIntersection } from "react-use";
import { encodeForSharing } from "../lib/forSharing";
import { ToastContainer } from "react-toastify";

export const Home = ({
  initialValues = {},
  sharePage = false,
  initialSaveKey = null,
  pageType = "main",
}: {
  initialValues?: CandidateGroupValues;
  sharePage?: boolean;
  initialSaveKey: string | null;
  pageType?: string;
}) => {
  const methods = useForm({
    // defaultValues: initialValues,
  });
  const [saveKey, setSaveKey] = useState<string | null>(initialSaveKey);
  // const [mainLogoVisible, setMainLogoVisible] = useState(true)
  // const [ballotVisible, setBallotVisible] = useState(true)

  const onSubmit = async (data: CandidateGroupValues) => {
    const key = encodeForSharing(data);
    setSaveKey(key);
  };

  const { isDirty } = useFormState({ control: methods.control });
  useBeforeUnload(isDirty, "You have unsaved changes, are you sure?");

  const ballotRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const ballotIntersection = useIntersection(ballotRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const ballotVisible = Boolean(
    ballotIntersection && ballotIntersection.intersectionRatio < 1
  );

  const mainLogoRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const mainLogoIntersection = useIntersection(mainLogoRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const mainLogoVisible = Boolean(
    mainLogoIntersection && mainLogoIntersection.intersectionRatio < 1
  );

  // useBeforeunload((event: BeforeUnloadEvent) => {
  //   if (isDirty) {
  //     event.preventDefault()
  //   }
  // })

  useEffect(() => {
    Object.entries(initialValues).forEach(([key, value]) => {
      methods.setValue(key, value);
    });
  }, [initialValues, methods]);

  return (
    <div className="bg-white">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto max-w-8xl px-4 py-4 sm:px-6 xl:flex xl:gap-x-8 xl:px-8 xl:py-0"
          // className="mx-auto max-w-8xl py-4 px-4 sm:px-6 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:py-0 lg:px-8"
        >
          <div className="hidden pt-4 xl:sticky xl:top-0 xl:flex xl:h-screen xl:basis-3/12 xl:flex-col xl:overflow-auto">
            <Sidebar
              peek={methods.watch()}
              reset={methods.reset}
              onSubmit={methods.handleSubmit(onSubmit)}
              saveKey={saveKey}
              mainLogoVisible={mainLogoVisible}
              // setMainLogoVisible={setMainLogoVisible}
              ballotVisible={ballotVisible}
              // setBallotVisible={setBallotVisible}
              pageType={pageType}
            />
          </div>
          <div className="border-dashed border-gray-400 xl:basis-9/12 xl:border-l-8 xl:border-r-8">
            {(pageType === "main" || pageType === "share") && (
              <Main
                onSubmit={methods.handleSubmit(onSubmit)}
                saveKey={saveKey}
                reset={methods.reset}
                // mainLogoVisible={mainLogoVisible}
                // setMainLogoVisible={setMainLogoVisible}
                sharePage={sharePage}
                ballotRef={ballotRef}
                mainLogoRef={mainLogoRef}
                // ballotVisible={ballotVisible}
                // setBallotVisible={setBallotVisible}
              />
            )}
            <Footer />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
