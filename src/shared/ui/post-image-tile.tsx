"use client";

import Image from "next/image";
import type { ButtonHTMLAttributes } from "react";
import CheckIcon from "@/assets/icons/check.svg";
import MinusCircleIcon from "@/assets/icons/minus-circle.svg";
import PlusIcon from "@/assets/icons/plus.svg";
import { usePostImageTileState } from "@/shared/hooks/use-post-image-tile-state";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/utils";

export type PostImageTileProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  imageUrl?: string;
  size?: number;
  accept?: string;
  onImageSelect?: (file: File) => void;
  isRepresentative?: boolean;
  onRemove?: () => void;
  enableReplaceWhenFilled?: boolean;
  onPromoteToRepresentative?: () => void;
};

export function PostImageTile(props: PostImageTileProps) {
  const {
    className,
    imageUrl,
    size = 120,
    accept = "image/*",
    onImageSelect,
    isRepresentative = false,
    onRemove,
    enableReplaceWhenFilled = false,
    onPromoteToRepresentative,
    onClick,
    disabled,
    type = "button",
    ...restProps
  } = props;
  const { inputRef, resolvedImageUrl, handleSelectFile, handleRemove } = usePostImageTileState({
    imageUrl,
    onImageSelect,
    onRemove,
  });

  const handleClick: NonNullable<ButtonHTMLAttributes<HTMLButtonElement>["onClick"]> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented || disabled) {
      return;
    }
    if (resolvedImageUrl && !enableReplaceWhenFilled) {
      onPromoteToRepresentative?.();
      return;
    }
    inputRef.current?.click();
  };

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <button
        type={type}
        className={cn(
          "relative h-full w-full overflow-hidden rounded-[8px] bg-bg-02",
          resolvedImageUrl && isRepresentative && "border border-primary-strong",
          "flex items-center justify-center",
          className,
        )}
        onClick={handleClick}
        disabled={disabled}
        {...restProps}
      >
        {resolvedImageUrl ? (
          <>
            <Image src={resolvedImageUrl} alt="" fill draggable={false} className="object-cover" sizes={`${size}px`} />
            <Badge tone={isRepresentative ? "strong" : "default"} className="absolute bottom-[8px] left-[8px]">
              <CheckIcon aria-hidden className="size-2" strokeWidth={3} />
              대표 이미지
            </Badge>
          </>
        ) : (
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#464653] text-white">
            <PlusIcon aria-hidden className="size-[18px]" strokeWidth={20} />
          </span>
        )}
      </button>
      {resolvedImageUrl ? (
        <button
          type="button"
          aria-label="이미지 삭제"
          className="absolute right-[8px] top-[8px] inline-flex size-5 items-center justify-center rounded-full bg-bg-01 text-danger"
          onClick={handleRemove}
          disabled={disabled}
        >
          <MinusCircleIcon aria-hidden className="size-3" strokeWidth={24} />
        </button>
      ) : null}
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleSelectFile} />
    </div>
  );
}
