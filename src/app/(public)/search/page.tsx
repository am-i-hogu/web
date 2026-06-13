import { Suspense } from "react";
import { LoadingState } from "@/shared/ui";
import SearchPageClient from "./_components/search-page.client";

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SearchPageClient />
    </Suspense>
  );
}
