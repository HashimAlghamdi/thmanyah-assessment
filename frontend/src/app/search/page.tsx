"use client";

import { Suspense } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { LayoutProvider } from "../contexts/LayoutContext";
import { ResponsiveProvider } from "../contexts/ResponsiveContext";
import { SearchProvider } from "../contexts/SearchContext";
import HomeContent from "../components/HomeContent";

export default function SearchPage() {
  return (
    <ResponsiveProvider>
      <SearchProvider>
        <LayoutProvider>
          <div className="min-h-screen bg-gray-900 text-white flex">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
              <Header />

              <main className="flex-1 px-3 md:px-6 py-4 md:py-8 overflow-x-hidden">
                <Suspense fallback={<div>Loading...</div>}>
                  <HomeContent />
                </Suspense>
              </main>
            </div>
          </div>
        </LayoutProvider>
      </SearchProvider>
    </ResponsiveProvider>
  );
} 