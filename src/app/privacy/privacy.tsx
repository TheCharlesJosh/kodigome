"use client";
import { UpperHeader } from "@/components/UpperHeader";
import Footer from "@components/Footer";
import PrivacyMain from "@/app/privacy/contents";
import { SidebarRedux } from "@components/Sidebar";
import { RefObject, useEffect, useRef } from "react";
import { useIntersection } from "react-use";

export default function Privacy() {
  const mainLogoRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const mainLogoIntersection = useIntersection(mainLogoRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const mainLogoVisible = Boolean(
    mainLogoIntersection && mainLogoIntersection.intersectionRatio === 1
  );

  useEffect(() => {
    if (mainLogoIntersection)
      console.log(
        mainLogoIntersection,
        mainLogoIntersection.intersectionRatio,
        mainLogoVisible
      );
  }, [mainLogoIntersection, mainLogoVisible]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-8xl px-4 py-4 sm:px-6 xl:flex xl:gap-x-8 xl:px-8 xl:py-0">
        <div className="hidden pt-4 xl:sticky xl:top-0 xl:flex xl:h-screen xl:basis-3/12 xl:flex-col xl:overflow-auto">
          <SidebarRedux
            mainLogoVisible={mainLogoVisible}
            pageType="faq"
          />
        </div>
        <div className="border-dashed border-gray-400 xl:basis-9/12 xl:border-l-8 xl:border-r-8">
          <UpperHeader
            mainLogoRef={mainLogoRef}
            sharePage={false}
          />
          <PrivacyMain />
          <Footer />
        </div>
      </div>
    </div>
  );
}
