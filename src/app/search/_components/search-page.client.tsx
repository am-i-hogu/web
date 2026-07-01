"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSearchPageState } from "@/features/search/hooks";
import { RecentSearchSection, SearchHeader, SearchResultSection } from "@/features/search/ui";
import { FooterWidget } from "@/widgets/footer/ui";

export default function SearchPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchPageState = useSearchPageState({
    pathname,
    searchParams,
    push: router.push,
  });

  return (
    <div className="flex min-h-full flex-col bg-bg-01">
      <main className="flex flex-1 flex-col">
        <SearchHeader
          keywordDraft={searchPageState.keywordDraft}
          onKeywordDraftChange={searchPageState.setKeywordDraft}
          onSearchSubmit={() => searchPageState.handleSearchSubmit(searchPageState.keywordDraft)}
          onBack={() => router.back()}
        />

        {searchPageState.hasSearchCondition ? (
          <SearchResultSection
            keyword={searchPageState.keyword}
            selectedCategoryParams={searchPageState.selectedCategoryParams}
            selectedCategories={searchPageState.selectedCategories}
            sortValue={searchPageState.sortValue}
            pageSize={searchPageState.pageSize}
            onCategoryChange={searchPageState.handleCategoryChange}
            onSortChange={searchPageState.handleSortChange}
          />
        ) : (
          <RecentSearchSection
            recentSearches={searchPageState.recentSearches}
            onClearAll={searchPageState.handleRecentSearchesClear}
            onSelectTerm={searchPageState.handleSearchSubmit}
            onRemoveTerm={searchPageState.handleRecentSearchRemove}
          />
        )}
      </main>

      <footer className="sticky bottom-0 z-20 px-common-padding">
        <FooterWidget activeTab="search" />
      </footer>
    </div>
  );
}
