import { type ChangeEventHandler, useRef, useState } from "react";
import MagnifyingGlassIcon from "@/assets/icons/magnifying-glass.svg";
import XIcon from "@/assets/icons/x.svg";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils";

export type SearchTextfieldProps = {
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  name?: string;
  ariaLabel?: string;
  disabled?: boolean;
  showClearButton?: boolean;
  className?: string;
};

export function SearchTextfield(props: SearchTextfieldProps) {
  const {
    id,
    value,
    defaultValue,
    onChange,
    placeholder = "textfield",
    name,
    ariaLabel = "검색어 입력",
    disabled = false,
    showClearButton = false,
    className,
  } = props;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const currentValue = value ?? uncontrolledValue;
  const isReadOnly = value !== undefined && onChange === undefined;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (value === undefined) {
      setUncontrolledValue(event.target.value);
    }

    onChange?.(event);
  };

  const handleClear = () => {
    if (value === undefined) {
      setUncontrolledValue("");
    }

    if (!inputRef.current) {
      return;
    }

    inputRef.current.value = "";
    inputRef.current.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <div className={cn("flex h-[46px] w-full items-center gap-2 rounded-common-radius bg-bg-02 px-3 py-2", className)}>
      <MagnifyingGlassIcon aria-hidden className="size-5 text-text-03" strokeWidth={20} />
      <div className="relative min-w-0 flex-1">
        <Input
          ref={inputRef}
          variant="plain"
          type="text"
          id={id}
          name={name}
          aria-label={ariaLabel}
          value={currentValue}
          defaultValue={defaultValue}
          onChange={handleChange}
          readOnly={isReadOnly}
          disabled={disabled}
          placeholder={placeholder}
          className="min-w-0 w-full pr-8 placeholder:text-text-02"
        />
        {showClearButton && currentValue && !isReadOnly && !disabled ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-text-04"
            aria-label="검색어 지우기"
          >
            <XIcon aria-hidden className="size-4" strokeWidth={20} />
          </button>
        ) : null}
      </div>
    </div>
  );
}
