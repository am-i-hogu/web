import type { CheckedState } from "@radix-ui/react-checkbox";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";
import CheckIcon from "@/assets/icons/check.svg";

import { cn } from "@/shared/utils";

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  label?: React.ReactNode;
  labelClassName?: string;
  containerClassName?: string;
  onChange?: (checked: boolean) => void;
};

function Checkbox(inputProps: CheckboxProps) {
  const {
    id: idProp,
    className,
    checked,
    disabled,
    label,
    labelClassName,
    containerClassName,
    onCheckedChange,
    onChange,
    ...props
  } = inputProps;

  const generatedId = React.useId();
  const id = idProp ?? generatedId;

  function handleCheckedChange(nextChecked: CheckedState) {
    onCheckedChange?.(nextChecked);
    onChange?.(nextChecked === true);
  }

  return (
    <div className={cn("flex items-center gap-2", containerClassName)}>
      <CheckboxPrimitive.Root
        id={id}
        data-slot="checkbox"
        checked={checked}
        disabled={disabled}
        onCheckedChange={handleCheckedChange}
        className={cn(
          "peer",
          "rounded-[4px] border border-line-02 bg-transparent text-text-01 data-[state=checked]:border-text-04 data-[state=checked]:bg-text-04 data-[disabled]:border-bg-03 data-[disabled]:bg-bg-03",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" forceMount>
          <CheckIcon className="size-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>

      {label ? (
        <label
          htmlFor={id}
          className={cn(
            "cursor-pointer text-body-r text-text-04 select-none peer-disabled:cursor-not-allowed peer-disabled:text-text-02",
            labelClassName,
          )}
        >
          {label}
        </label>
      ) : null}
    </div>
  );
}

export type { CheckboxProps };
export { Checkbox };
