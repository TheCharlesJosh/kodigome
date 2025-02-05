"use client";
import Footer from "@/components/footer";
import { SidebarRedux } from "@/components/sidebar/sidebar";
import { UpperHeader } from "@/components/upper-header";
import { useRef, RefObject } from "react";
import { useIntersection } from "react-use";

export default function NotFound() {
  const mainLogoRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
  const mainLogoIntersection = useIntersection(mainLogoRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const mainLogoVisible = Boolean(
    mainLogoIntersection && mainLogoIntersection.intersectionRatio === 1
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-8xl px-4 py-4 sm:px-6 xl:flex xl:gap-x-8 xl:px-8 xl:py-0">
        <div className="hidden pt-4 xl:sticky xl:top-0 xl:flex xl:h-screen xl:basis-3/12 xl:flex-col xl:overflow-auto">
          <SidebarRedux
            mainLogoVisible={mainLogoVisible}
            pageType="not-found"
          />
        </div>
        <div className="border-dashed border-gray-400 xl:basis-9/12 xl:border-l-8 xl:border-r-8">
          <UpperHeader
            mainLogoRef={mainLogoRef}
            sharePage={false}
          />
          <NotFound />
          <Footer />
        </div>
      </div>
    </div>
  );
}
