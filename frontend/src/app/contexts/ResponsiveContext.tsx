"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ScreenSize = "mobile" | "tablet" | "desktop";

interface ResponsiveContextType {
  screenSize: ScreenSize;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  isSSR: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(
  undefined
);

export function ResponsiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    // Mark SSR as false after hydration
    setIsSSR(false);

    const checkScreenSize = () => {
      if (typeof window === "undefined") return;

      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize("mobile");
      } else if (width < 1024) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    // Initial check
    checkScreenSize();

    // Listen for resize events
    const handleResize = () => {
      checkScreenSize();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isMobile = screenSize === "mobile";
  const isTablet = screenSize === "tablet";
  const isDesktop = screenSize === "desktop";

  return (
    <ResponsiveContext.Provider
      value={{
        screenSize,
        isMobile,
        isTablet,
        isDesktop,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        isSSR,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
}

export function useResponsive() {
  const context = useContext(ResponsiveContext);
  if (context === undefined) {
    throw new Error("useResponsive must be used within a ResponsiveProvider");
  }
  return context;
}
