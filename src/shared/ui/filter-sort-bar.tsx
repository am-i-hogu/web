"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import XIcon from "@/assets/icons/x.svg";
import { Button } from "@/shared/ui/button";
import { SortSelect, type SortSelectOption } from "@/shared/ui/sort-select";
import { cn } from "@/shared/utils";

export type FilterSortBarProps = {
  options?: readonly string[];
  selectedOptions?: string[];
  onToggleOption?: (option: string) => void;
  onResetOptions?: () => void;
  sortValue?: string;
  sortOptions?: readonly SortSelectOption<string>[];
  onSortChange?: (sort: string) => void;
  totalCount?: number;
  allLabel?: string;
  className?: string;
};

export function FilterSortBar(props: FilterSortBarProps) {
  const {
    options = [],
    selectedOptions = [],
    onToggleOption,
    onResetOptions,
    sortValue,
    sortOptions = [],
    onSortChange,
    totalCount = 0,
    allLabel = "전체",
    className,
  } = props;

  const hasSelectedOptions = selectedOptions.length > 0;
  const [isSelectedCategoryExpanded, setIsSelectedCategoryExpanded] = useState(false);
  const visibleSelectedOptions = isSelectedCategoryExpanded ? selectedOptions : selectedOptions.slice(0, 2);
  const hiddenSelectedCount = Math.max(0, selectedOptions.length - visibleSelectedOptions.length);
  const categoryScrollRef = useRef<HTMLUListElement>(null);
  const selectedScrollRef = useRef<HTMLUListElement>(null);
  const isPointerDownRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const [showCategoryFade, setShowCategoryFade] = useState(true);

  const updateCategoryFade = useCallback(() => {
    const element = categoryScrollRef.current;
    if (!element) {
      return;
    }

    const canScroll = element.scrollWidth > element.clientWidth;
    const reachedEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
    setShowCategoryFade(canScroll && !reachedEnd);
  }, []);

  useEffect(() => {
    updateCategoryFade();
    window.addEventListener("resize", updateCategoryFade);

    return () => {
      window.removeEventListener("resize", updateCategoryFade);
    };
  }, [updateCategoryFade]);

  useEffect(() => {
    if (selectedOptions.length <= 2) {
      setIsSelectedCategoryExpanded(false);
    }
  }, [selectedOptions.length]);

  const handleCategoryPointerDown = (event: React.PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    const element = categoryScrollRef.current;
    if (!element) {
      return;
    }

    const canSlide = element.scrollWidth > element.clientWidth;
    if (!canSlide) {
      return;
    }

    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    activePointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = element.scrollLeft;
  };

  const handleCategoryPointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    if (!isPointerDownRef.current || activePointerIdRef.current !== event.pointerId) {
      return;
    }

    const element = categoryScrollRef.current;
    if (!element) {
      return;
    }

    const canSlide = element.scrollWidth > element.clientWidth;
    if (!canSlide) {
      return;
    }

    const deltaX = event.clientX - startXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasDraggedRef.current = true;
    }

    if (!hasDraggedRef.current) {
      return;
    }

    element.scrollLeft = startScrollLeftRef.current - deltaX;
    updateCategoryFade();
  };

  const handleCategoryPointerUp = (_event: React.PointerEvent<HTMLUListElement>) => {
    isPointerDownRef.current = false;
    activePointerIdRef.current = null;
    hasDraggedRef.current = false;
  };

  const handleSelectedPointerDown = (event: React.PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    const element = selectedScrollRef.current;
    if (!element) {
      return;
    }

    const canSlide = element.scrollWidth > element.clientWidth;
    if (!canSlide) {
      return;
    }

    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    activePointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = element.scrollLeft;
  };

  const handleSelectedPointerMove = (event: React.PointerEvent<HTMLUListElement>) => {
    if (!isPointerDownRef.current || activePointerIdRef.current !== event.pointerId) {
      return;
    }

    const element = selectedScrollRef.current;
    if (!element) {
      return;
    }

    const canSlide = element.scrollWidth > element.clientWidth;
    if (!canSlide) {
      return;
    }

    const deltaX = event.clientX - startXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasDraggedRef.current = true;
    }

    if (!hasDraggedRef.current) {
      return;
    }

    element.scrollLeft = startScrollLeftRef.current - deltaX;
  };

  const guardClickWhenDragged = <T extends HTMLElement>(event: React.MouseEvent<T>) => {
    if (!hasDraggedRef.current) {
      return false;
    }

    event.preventDefault();
    event.stopPropagation();
    hasDraggedRef.current = false;
    return true;
  };

  return (
    <section className={cn("flex w-full flex-col gap-5", className)}>
      <div className="relative">
        <ul
          ref={categoryScrollRef}
          onScroll={updateCategoryFade}
          onPointerDown={handleCategoryPointerDown}
          onPointerMove={handleCategoryPointerMove}
          onPointerUp={handleCategoryPointerUp}
          onPointerCancel={handleCategoryPointerUp}
          onPointerLeave={handleCategoryPointerUp}
          className={cn(
            "flex gap-2 overflow-x-auto",
            showCategoryFade ? "pr-10" : "",
            showCategoryFade ? "cursor-grab active:cursor-grabbing" : "",
          )}
          style={{ touchAction: "pan-x" }}
        >
          <li>
            <Button
              type="button"
              variant="chip"
              size="chip"
              onClick={(event) => {
                if (guardClickWhenDragged(event)) {
                  return;
                }
                onResetOptions?.();
              }}
              className={cn(
                "h-9 shrink-0 px-4 text-caption-m",
                hasSelectedOptions ? "bg-bg-02 text-text-03" : "bg-primary-default text-text-01",
              )}
            >
              {allLabel}
            </Button>
          </li>

          {options.map((option) => {
            const isActive = selectedOptions.includes(option);

            return (
              <li key={option}>
                <Button
                  type="button"
                  variant="chip"
                  size="chip"
                  onClick={(event) => {
                    if (guardClickWhenDragged(event)) {
                      return;
                    }
                    onToggleOption?.(option);
                  }}
                  className={cn(
                    "h-9 shrink-0 px-4 text-caption-m",
                    isActive ? "bg-primary-default text-text-01" : "bg-bg-02 text-text-03",
                  )}
                >
                  {option}
                </Button>
              </li>
            );
          })}
        </ul>
        {showCategoryFade ? (
          <div className="pointer-events-none absolute right-0 top-0 h-9 w-14 bg-gradient-to-l from-bg-01 to-transparent" />
        ) : null}
      </div>

      <div className="flex min-h-9 items-center justify-between gap-2">
        <ul
          ref={selectedScrollRef}
          onPointerDown={handleSelectedPointerDown}
          onPointerMove={handleSelectedPointerMove}
          onPointerUp={handleCategoryPointerUp}
          onPointerCancel={handleCategoryPointerUp}
          onPointerLeave={handleCategoryPointerUp}
          className="flex items-center gap-2 overflow-x-auto"
          style={{ touchAction: "pan-x" }}
        >
          {visibleSelectedOptions.map((option) => (
            <li key={option}>
              <Button
                type="button"
                variant="chip"
                size="chip"
                onClick={() => onToggleOption?.(option)}
                className="shrink-0 gap-1 font-medium"
              >
                {option}
                <XIcon aria-hidden className="size-4 text-text-03" strokeWidth={20} />
              </Button>
            </li>
          ))}
          {hiddenSelectedCount > 0 ? (
            <li>
              <Button
                type="button"
                variant="chip"
                size="chip"
                onClick={() => setIsSelectedCategoryExpanded(true)}
                className="shrink-0 font-medium"
                aria-label={`숨겨진 카테고리 ${hiddenSelectedCount}개 보기`}
              >
                +{hiddenSelectedCount}
              </Button>
            </li>
          ) : null}

          {hasSelectedOptions ? <li className="shrink-0 text-caption-sb text-text-03">{totalCount}개</li> : null}
        </ul>

        {sortOptions.length > 0 && sortValue !== undefined ? (
          <SortSelect value={sortValue} options={sortOptions} onChange={(nextSort) => onSortChange?.(nextSort)} />
        ) : null}
      </div>
    </section>
  );
}
