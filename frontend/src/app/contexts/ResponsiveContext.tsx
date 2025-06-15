"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ResponsiveContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(
  undefined
);

export function ResponsiveProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        const mobile = width < 768;
        const tablet = width >= 768 && width < 1024;
        const desktop = width >= 1024;

        setIsMobile(mobile);
        setIsTablet(tablet);
        setIsDesktop(desktop);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isSidebarOpen]);

  const setSidebarOpen = (open: boolean) => {
    setIsSidebarOpen(open);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ResponsiveContext.Provider
      value={{
        isMobile,
        isTablet,
        isDesktop,
        isSidebarOpen,
        setSidebarOpen,
        toggleSidebar,
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
