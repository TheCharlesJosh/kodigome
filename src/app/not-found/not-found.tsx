"use client";
import Footer from "@/components/footer";
import { SidebarRedux } from "@/components/sidebar/sidebar";
import NotFoundContents from "./contents";
import { UpperFoldRedux } from "@/components/upper-fold";

export default function NotFound() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-8xl px-4 py-4 sm:px-6 xl:flex xl:gap-x-8 xl:px-8 xl:py-0">
        <div className="hidden pt-4 xl:sticky xl:top-0 xl:flex xl:h-screen xl:basis-3/12 xl:flex-col xl:overflow-auto">
          <SidebarRedux
            mainLogoVisible={true}
            pageType="not-found"
          />
        </div>
        <div className="border-dashed border-gray-400 xl:basis-9/12 xl:border-l-8 xl:border-r-8">
          <UpperFoldRedux sharePage={false} />
          <NotFoundContents />
          <Footer />
        </div>
      </div>
    </div>
  );
}
