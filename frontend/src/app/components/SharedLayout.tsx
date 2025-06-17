"use client";

import { Suspense } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { LayoutProvider } from "../contexts/LayoutContext";
import { ResponsiveProvider } from "../contexts/ResponsiveContext";
import { SearchProvider } from "../contexts/SearchContext";
import LoadingSpinner from "./LoadingSpinner";

interface SharedLayoutProps {
  children: React.ReactNode;
}

export default function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <ResponsiveProvider>
      <SearchProvider>
        <LayoutProvider>
          <Suspense fallback={<LoadingSpinner size="lg" />}>
            <div className="min-h-screen bg-gray-900 text-white flex">
              <Sidebar />

              <div className="flex-1 flex flex-col min-w-0">
                <Header />

                <main className="flex-1 px-3 md:px-6 py-4 md:py-8 overflow-x-hidden">
                  {children}
                </main>
              </div>
            </div>
          </Suspense>
        </LayoutProvider>
      </SearchProvider>
    </ResponsiveProvider>
  );
} 