"use client";

import { useResponsive } from "../contexts/ResponsiveContext";
import { useSearch } from "../contexts/SearchContext";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import Image from "next/image";

export default function Header() {
  const { isMobile, isTablet, toggleSidebar, isSSR } = useResponsive();
  const { canGoBack, canGoForward, goBackInHistory, goForwardInHistory } = useSearch();
  const router = useRouter();

  const handleGoBack = () => {
    const previousQuery = goBackInHistory();
    if (previousQuery) {
      router.push(`/search?q=${encodeURIComponent(previousQuery)}`);
    }
  };

  const handleGoForward = () => {
    const nextQuery = goForwardInHistory();
    if (nextQuery) {
      router.push(`/search?q=${encodeURIComponent(nextQuery)}`);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 space-x-2 md:space-x-4">
      <div className="flex items-center space-x-2 md:space-x-4 flex-1">
        {/* Burger Menu & Logo - Only show on mobile/tablet when not SSR */}
        {!isSSR && (isMobile || isTablet) && (
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-800 rounded"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
            <Image src="/favicon.svg" alt="Logo" width={32} height={36} className="flex-shrink-0" />
          </div>
        )}

        {/* Navigation arrows - Hide on mobile and during SSR */}
        {!isSSR && !isMobile && (
          <div className="flex space-x-2">
            <button 
              onClick={handleGoBack}
              disabled={!canGoBack}
              className={`p-2 rounded transition-colors ${
                canGoBack 
                  ? 'hover:bg-gray-800 text-white' 
                  : 'text-gray-600 cursor-not-allowed'
              }`}
              aria-label="البحث السابق"
              title={canGoBack ? "العودة للبحث السابق" : "لا يوجد بحث سابق"}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button 
              onClick={handleGoForward}
              disabled={!canGoForward}
              className={`p-2 rounded transition-colors ${
                canGoForward 
                  ? 'hover:bg-gray-800 text-white' 
                  : 'text-gray-600 cursor-not-allowed'
              }`}
              aria-label="البحث التالي"
              title={canGoForward ? "الانتقال للبحث التالي" : "لا يوجد بحث تالي"}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
        <SearchInput className="flex-1 max-w-2xl" />
      </div>
      <div className="flex space-x-2 md:space-x-3">
        {(!isSSR && !isMobile) && (
          <button className="px-3 md:px-4 py-2 text-sm md:text-base text-blue-400 hover:bg-gray-800 rounded">
            تسجيل الدخول
          </button>
                  )}
        {(!isSSR && !isMobile) && (
          <button className="px-3 md:px-4 py-2 text-sm md:text-base bg-blue-600 hover:bg-blue-700 rounded">
            إنشاء حساب
          </button>
        )}
      </div>
    </header>
  );
}
