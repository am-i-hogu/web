import { type MouseEvent, type PointerEvent, useCallback, useRef } from "react";

// 가로 스크롤 영역을 "마우스 드래그"로 이동시키는 훅.
// 터치 스크롤과 충돌을 줄이기 위해 mouse pointer만 처리한다.
export function useHorizontalDragScroll() {
  const isPointerDownRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  const handlePointerDown = useCallback((event: PointerEvent<HTMLUListElement>, element: HTMLUListElement | null) => {
    if (event.pointerType !== "mouse" || !element) {
      return;
    }

    const canSlide = element.scrollWidth > element.clientWidth;
    if (!canSlide) {
      return;
    }

    // 드래그 시작 시점의 pointer/좌표/스크롤 위치를 저장
    isPointerDownRef.current = true;
    hasDraggedRef.current = false;
    activePointerIdRef.current = event.pointerId;
    startXRef.current = event.clientX;
    startScrollLeftRef.current = element.scrollLeft;
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLUListElement>, element: HTMLUListElement | null, onAfterScroll?: () => void) => {
      if (!isPointerDownRef.current || activePointerIdRef.current !== event.pointerId || !element) {
        return;
      }

      const canSlide = element.scrollWidth > element.clientWidth;
      if (!canSlide) {
        return;
      }

      const deltaX = event.clientX - startXRef.current;

      // 작은 흔들림은 클릭으로 취급, 임계값(4px) 이상부터 드래그로 전환
      if (Math.abs(deltaX) > 4) {
        hasDraggedRef.current = true;
      }

      if (!hasDraggedRef.current) {
        return;
      }

      element.scrollLeft = startScrollLeftRef.current - deltaX;
      onAfterScroll?.();
    },
    [],
  );

  const handlePointerUp = useCallback(() => {
    // 드래그 종료 시 추적 상태 초기화
    isPointerDownRef.current = false;
    activePointerIdRef.current = null;
    hasDraggedRef.current = false;
  }, []);

  const guardClickWhenDragged = useCallback(<T extends HTMLElement>(event: MouseEvent<T>) => {
    if (!hasDraggedRef.current) {
      return false;
    }

    // 드래그 직후 발생하는 의도치 않은 클릭 막기
    event.preventDefault();
    event.stopPropagation();
    hasDraggedRef.current = false;
    return true;
  }, []);

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    guardClickWhenDragged,
  };
}
