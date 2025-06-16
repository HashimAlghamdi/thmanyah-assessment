import { Suspense } from "react";
import { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import LoadingSpinner from "./components/LoadingSpinner";


type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q: query } = await searchParams;
  
  if (query) {
    return {
      title: `البحث عن "${query}" - منصة البودكاست`,
      description: `نتائج البحث عن "${query}" في منصة البودكاست`,
    };
  }
  
  return {
    title: "منصة البودكاست",
    description: "ابحث واكتشف البودكاست",
  };
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HomePageClient />
    </Suspense>
  );
}
