"use client";

import { useResponsive } from "../contexts/ResponsiveContext";

export default function Header() {
  const { isMobile, isTablet, toggleSidebar } = useResponsive();

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 space-x-2 md:space-x-4">
      <div className="flex items-center space-x-2 md:space-x-4 flex-1">
        {/* Burger Menu & Logo - Only show on mobile/tablet */}
        {(isMobile || isTablet) && (
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
            <img src="/favicon.svg" alt="Logo" width="32" height="36" className="flex-shrink-0" />
          </div>
        )}

        {/* Navigation arrows - Hide on mobile */}
        {!isMobile && (
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-800 rounded">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-800 rounded">
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

        {/* Search Input - Responsive */}
        <div className="flex-1 max-w-2xl">
          <input
            type="text"
            placeholder={isMobile ? "بحث..." : "ابحث في أكثر من 70 مليون بودكاست وحلقة..."}
            className="w-full px-3 md:px-4 py-2 text-sm md:text-base bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Auth buttons - Responsive */}
      <div className="flex space-x-2 md:space-x-3">
        {!isMobile && (
          <button className="px-3 md:px-4 py-2 text-sm md:text-base text-blue-400 hover:bg-gray-800 rounded">
            تسجيل الدخول
          </button>
        )}
        {/* Hide signup button completely on mobile */}
        {!isMobile && (
          <button className="px-3 md:px-4 py-2 text-sm md:text-base bg-blue-600 hover:bg-blue-700 rounded">
            إنشاء حساب
          </button>
        )}
      </div>
    </header>
  );
}
