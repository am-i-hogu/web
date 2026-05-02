"use client";

import { type ChangeEventHandler, useId, useMemo } from "react";
import XIcon from "@/assets/icons/x.svg";
import { useControllableInputValue } from "@/shared/hooks/use-controllable-input-value";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { cn } from "@/shared/utils";

export type TextfieldTone = "default" | "success" | "warning" | "danger";

export type TextfieldProps = {
  id?: string;
  title?: string;
  required?: boolean;
  countText?: string;
  showCount?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  helperText?: string;
  tone?: TextfieldTone;
  multiline?: boolean;
  showClearButton?: boolean;
  name?: string;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
};

const helperToneColorVar: Record<TextfieldTone, string> = {
  default: "var(--color-info)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
};

export function Textfield(props: TextfieldProps) {
  const {
    id,
    title,
    required = false,
    countText,
    showCount = false,
    placeholder,
    value,
    defaultValue,
    onChange,
    helperText,
    tone = "default",
    multiline = false,
    showClearButton = false,
    name,
    disabled = false,
    maxLength,
    className,
  } = props;
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const { currentValue, handleChange, clearValue } = useControllableInputValue({ value, defaultValue, onChange });

  const computedCountText = useMemo(() => {
    if (countText) {
      return countText;
    }

    if (!showCount) {
      return undefined;
    }

    const currentLength = currentValue.length;

    if (typeof maxLength === "number") {
      return `${currentLength}/${maxLength}`;
    }

    return `${currentLength}`;
  }, [countText, currentValue.length, maxLength, showCount]);

  return (
    <section className={cn("flex w-full flex-col", className)}>
      {title ? (
        <header className="mb-2 flex items-center justify-between">
          <label htmlFor={fieldId} className="inline-flex items-center text-body-m text-text-04">
            <span>{title}</span>
            {required ? <span className="text-danger">*</span> : null}
          </label>
          {computedCountText ? <p className="text-caption-m text-text-03">{computedCountText}</p> : null}
        </header>
      ) : null}

      <div className={cn("flex gap-2", multiline ? "items-start" : "items-center")}>
        {multiline ? (
          <Textarea
            id={fieldId}
            variant="filled"
            name={name}
            value={currentValue}
            defaultValue={defaultValue}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            maxLength={maxLength}
            className="min-w-0 flex-1"
          />
        ) : (
          <div className="relative min-w-0 flex-1">
            <Input
              id={fieldId}
              variant="filled"
              type="text"
              name={name}
              value={currentValue}
              defaultValue={defaultValue}
              onChange={handleChange}
              disabled={disabled}
              placeholder={placeholder}
              maxLength={maxLength}
              className="min-w-0 w-full pr-8"
            />
            {showClearButton && currentValue ? (
              <button
                type="button"
                onClick={clearValue}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-04"
                aria-label="입력값 지우기"
              >
                <XIcon aria-hidden className="size-4" strokeWidth={20} />
              </button>
            ) : null}
          </div>
        )}
      </div>

      {helperText ? (
        <p className="mt-1 text-caption-m" style={{ color: helperToneColorVar[tone] }}>
          {helperText}
        </p>
      ) : null}
    </section>
  );
}
