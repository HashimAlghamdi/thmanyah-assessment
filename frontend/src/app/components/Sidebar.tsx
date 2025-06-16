"use client";

import Image from "next/image";
import { useResponsive } from "../contexts/ResponsiveContext";

export default function Sidebar() {
  const { isDesktop, isSidebarOpen, closeSidebar, isSSR } = useResponsive();

  // During SSR, render nothing to avoid hydration mismatches
  if (isSSR) {
    return null;
  }

  const handleClose = () => {
    closeSidebar();
  };

  // Desktop sidebar - always visible
  if (isDesktop) {
    return (
      <aside className="w-64 px-4 py-6 border-l border-gray-800 flex-shrink-0">
        <SidebarContent />
      </aside>
    );
  }

  // Mobile/Tablet - overlay sidebar
  return (
    <>
      {/* Mobile/Tablet Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 backdrop-blur-sm shadow-2xl"
            onClick={handleClose}
          />

          {/* Sidebar */}
          <aside className="fixed right-0 top-0 h-full w-64 bg-gray-900 border-l border-gray-800 z-50 transform transition-transform duration-200 ease-in-out">
            <div className="px-4 py-6">
              {/* Close button */}
              <div className="flex justify-between items-center mb-8">
                <img src="/favicon.svg" alt="Logo" width="40" height="44" />
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-800 rounded"
                  aria-label="Close menu"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <SidebarContent />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function SidebarContent() {
  return (
    <>
      {/* Logo - Only show on desktop since mobile has it in header */}
      <div className="mb-8 lg:block hidden">
        <img src="/favicon.svg" alt="Logo" width="40" height="44" />
      </div>

      <nav className="space-y-2">
        <a
          href="#"
          className="flex items-center space-x-3 p-3 md:p-2 hover:bg-gray-800 rounded text-sm md:text-base"
        >
          <Image
            src="https://podbay.fm/static/images/menu/home-line.svg"
            alt="Home"
            width={18}
            height={18}
            className="flex-shrink-0"
          />
          <span>الرئيسية</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-3 p-3 md:p-2 hover:bg-gray-800 rounded text-sm md:text-base"
        >
          <Image
            src="https://podbay.fm/static/images/menu/discover-line.svg"
            alt="Discover"
            width={18}
            height={18}
            className="flex-shrink-0"
          />
          <span>اكتشف</span>
        </a>
      </nav>

      <div className="mt-6 md:mt-8">
        <h3 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
          المحتوى الخاص بك
        </h3>
        <nav className="space-y-2">
          <a
            href="#"
            className="flex items-center space-x-3 p-3 md:p-2 hover:bg-gray-800 rounded text-sm md:text-base"
          >
            <Image
              src="https://podbay.fm/static/images/menu/my-queue-line.svg"
              alt="My Queue"
              width={18}
              height={18}
              className="flex-shrink-0"
            />
            <span>شاهد لاحقاً</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-3 md:p-2 hover:bg-gray-800 rounded text-sm md:text-base"
          >
            <Image
              src="https://podbay.fm/static/images/menu/my-podcasts-line.svg"
              alt="My Podcasts"
              width={18}
              height={18}
              className="flex-shrink-0"
            />
            <span>مكتبتي</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-3 md:p-2 hover:bg-gray-800 rounded text-sm md:text-base"
          >
            <Image
              src="https://podbay.fm/static/images/menu/recents-line.svg"
              alt="Recents"
              width={18}
              height={18}
              className="flex-shrink-0"
            />
            <span>الأحدث</span>
          </a>
        </nav>
      </div>
    </>
  );
}
