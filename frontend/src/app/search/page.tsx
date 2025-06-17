import { Suspense } from "react";
import { Metadata } from "next";
import HomeContent from "../components/HomeContent";
import LoadingSpinner from "../components/LoadingSpinner";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { q: query } = await searchParams;

  if (query) {
    return {
      title: `البحث عن "${query}" - منصة البودكاست`,
      description: `نتائج البحث عن "${query}" في منصة البودكاست`,
    };
  }

  return {
    title: "البحث - منصة البودكاست",
    description: "ابحث واكتشف البودكاست",
  };
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" />}>
      <HomeContent />
    </Suspense>
  );
}
