"use client";

import { useMemo, useState } from "react";

/**
 * PostImageCarousel의 아이템 순서 상태를 관리하는 훅
 *
 * @description
 * 전달받은 아이템 목록을 기준으로 대표 이미지 순서/삭제 액션을 제공합니다.
 * `items` 전체를 state로 복사하지 않고 순서/대표/삭제 식별자만 관리합니다.
 *
 * @param items - 캐러셀에 렌더링할 아이템 목록입니다.
 *
 * @returns orderedItems - 현재 캐러셀 렌더링 순서의 아이템 목록입니다.
 * @returns moveToRepresentative - 특정 아이템을 대표 이미지(0번)로 이동하는 액션입니다.
 * @returns remove - 특정 아이템을 제거하는 액션입니다.
 */

type OrderedItem = {
  id: string;
  imageUrl?: string;
  isThumbnail?: boolean;
};

const getIncomingThumbnailId = (items: OrderedItem[]) => items.find((item) => item.isThumbnail)?.id;

const getThumbnailFirstIds = (items: OrderedItem[]) => {
  const ids = items.map((item) => item.id);
  const thumbnailId = getIncomingThumbnailId(items);

  if (!thumbnailId) {
    return ids;
  }

  return [thumbnailId, ...ids.filter((id) => id !== thumbnailId)];
};

export function usePostImageCarouselOrder<T extends OrderedItem>(items: T[]) {
  const [orderedIds, setOrderedIds] = useState(() => getThumbnailFirstIds(items));
  const [thumbnailId, setThumbnailId] = useState(() => getIncomingThumbnailId(items));
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  const orderedItems = useMemo<Array<T & { isThumbnail: boolean }>>(() => {
    const removedIdSet = new Set(removedIds);
    const itemById = new Map(items.filter((item) => !removedIdSet.has(item.id)).map((item) => [item.id, item]));
    const orderedIdSet = new Set(orderedIds);
    const nextOrderedIds = [
      ...orderedIds.filter((id) => itemById.has(id)),
      ...items.map((item) => item.id).filter((id) => itemById.has(id) && !orderedIdSet.has(id)),
    ];

    return nextOrderedIds.reduce<Array<T & { isThumbnail: boolean }>>((acc, id) => {
      const item = itemById.get(id);
      if (item) {
        acc.push({
          ...item,
          isThumbnail: item.id === thumbnailId,
        });
      }

      return acc;
    }, []);
  }, [items, orderedIds, removedIds, thumbnailId]);

  const moveToRepresentative = (idToPromote: string) => {
    setThumbnailId(idToPromote);
    setOrderedIds((prev) => [idToPromote, ...prev.filter((id) => id !== idToPromote)]);
  };

  const remove = (idToRemove: string) => {
    const nextThumbnailId = orderedItems.find((item) => item.id !== idToRemove && item.imageUrl)?.id;

    setRemovedIds((prev) => [...prev, idToRemove]);
    setOrderedIds((prev) => prev.filter((id) => id !== idToRemove));
    setThumbnailId((prev) => (prev === idToRemove ? nextThumbnailId : prev));
  };

  return {
    orderedItems,
    moveToRepresentative,
    remove,
  };
}
