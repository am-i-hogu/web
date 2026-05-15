"use client";

import { type RefObject, useEffect, useId, useRef, useState } from "react";
import CaretDownIcon from "@/assets/icons/caret-down-fill.svg";
import { cn } from "@/shared/utils";

export type SortSelectOption<T extends string> = {
  value: T;
  label: string;
};

export type SortSelectProps<T extends string> = {
  value: T;
  options: readonly SortSelectOption<T>[];
  onChange: (value: T) => void;
  ariaLabel?: string;
  className?: string;
};

type UseSortSelectMenuCloseEffectParams = {
  isOpen: boolean;
  rootRef: RefObject<HTMLDivElement | null>;
  setIsOpen: (isOpen: boolean) => void;
};

// TODO: 바깥 클릭/ESC 닫기 패턴 공용화 시 shared/hooks 승격 검토
function useSortSelectMenuCloseEffect({ isOpen, rootRef, setIsOpen }: UseSortSelectMenuCloseEffectParams) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, rootRef, setIsOpen]);
}

type SortSelectTriggerProps = {
  ariaLabel: string;
  listboxId: string;
  isOpen: boolean;
  label?: string;
  onToggle: () => void;
};

function SortSelectTrigger(props: SortSelectTriggerProps) {
  const { ariaLabel, listboxId, isOpen, label, onToggle } = props;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls={listboxId}
      onClick={onToggle}
      className="inline-flex h-6 items-center gap-1 text-caption-m text-text-03 focus:outline-none"
    >
      {label}
      <CaretDownIcon
        aria-hidden
        className={cn("size-4 text-text-03 transition-transform", isOpen ? "rotate-180" : "")}
      />
    </button>
  );
}

type SortSelectMenuItemProps<T extends string> = {
  option: SortSelectOption<T>;
  isSelected: boolean;
  onSelect: (value: T) => void;
};

function SortSelectMenuItem<T extends string>(props: SortSelectMenuItemProps<T>) {
  const { option, isSelected, onSelect } = props;

  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => onSelect(option.value)}
      className={cn(
        "w-full rounded-sm px-2 py-1 text-left text-[13px] leading-[1.5]",
        isSelected ? "bg-indigo-50 font-semibold text-primary-strong" : "font-medium text-text-03",
      )}
    >
      {option.label}
    </button>
  );
}

type SortSelectMenuProps<T extends string> = {
  options: readonly SortSelectOption<T>[];
  value: T;
  listboxId: string;
  ariaLabel: string;
  onSelect: (value: T) => void;
};

function SortSelectMenu<T extends string>(props: SortSelectMenuProps<T>) {
  const { options, value, listboxId, ariaLabel, onSelect } = props;

  return (
    <div
      id={listboxId}
      role="listbox"
      aria-label={ariaLabel}
      className="absolute right-0 top-[calc(100%+8px)] z-50 max-h-56 min-w-[110px] overflow-y-auto rounded-md bg-bg-01 px-2 py-3 shadow-emphasize [touch-action:pan-y]"
    >
      {options.map((option) => (
        <SortSelectMenuItem
          key={option.value}
          option={option}
          isSelected={option.value === value}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export function SortSelect<T extends string>(props: SortSelectProps<T>) {
  const { value, options, onChange, ariaLabel = "정렬", className } = props;

  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useSortSelectMenuCloseEffect({ isOpen, rootRef, setIsOpen });

  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  return (
    <div ref={rootRef} className={cn("relative shrink-0", className)}>
      <SortSelectTrigger
        ariaLabel={ariaLabel}
        listboxId={listboxId}
        isOpen={isOpen}
        label={selectedOption?.label}
        onToggle={() => setIsOpen((prev) => !prev)}
      />

      {isOpen ? (
        <SortSelectMenu
          options={options}
          value={value}
          listboxId={listboxId}
          ariaLabel={ariaLabel}
          onSelect={(nextValue) => {
            onChange(nextValue);
            setIsOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
