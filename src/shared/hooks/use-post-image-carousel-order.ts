"use client";

import { useEffect, useState } from "react";

/**
 * PostImageCarousel의 아이템 순서 상태를 관리하는 훅
 *
 * @description
 * 전달받은 아이템 목록의 순서 변경/삭제 액션을 제공합니다.
 * `items`가 변경되면 내부 정렬 상태도 최신 입력 기준으로 동기화됩니다.
 *
 * @param items - 캐러셀에 렌더링할 아이템 목록입니다.
 *
 * @returns orderedItems - 현재 캐러셀 렌더링 순서의 아이템 목록입니다.
 * @returns moveToRepresentative - 특정 인덱스 아이템을 대표 이미지(0번)로 이동하는 액션입니다.
 * @returns removeAt - 특정 인덱스 아이템을 제거하는 액션입니다.
 */

type OrderedItem = {
  id: string;
};

export function usePostImageCarouselOrder<T extends OrderedItem>(items: T[]) {
  const [orderedItems, setOrderedItems] = useState<T[]>(items);

  useEffect(() => {
    setOrderedItems(items);
  }, [items]);

  const moveToRepresentative = (indexToPromote: number) => {
    setOrderedItems((prev) => {
      if (indexToPromote <= 0 || indexToPromote >= prev.length) {
        return prev;
      }

      const next = [...prev];
      const [picked] = next.splice(indexToPromote, 1);
      next.unshift(picked);
      return next;
    });
  };

  const removeAt = (indexToRemove: number) => {
    setOrderedItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return {
    orderedItems,
    moveToRepresentative,
    removeAt,
  };
}
