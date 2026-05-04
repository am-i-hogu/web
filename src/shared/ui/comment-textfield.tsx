import type { ChangeEventHandler } from "react";
import PaperPlaneRightIcon from "@/assets/icons/paper-plane-right.svg";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/utils";

export type CommentTextfieldState = "default" | "typing" | "disabled";

export type CommentTextfieldProps = {
  id?: string;
  value?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  isReply?: boolean;
  state?: CommentTextfieldState;
  name?: string;
  ariaLabel?: string;
  className?: string;
};

export function CommentTextfield(props: CommentTextfieldProps) {
  const { id, value, defaultValue, onChange, isReply = false, state = "default", name, ariaLabel, className } = props;
  const resolvedPlaceholder = isReply ? "내용을 입력해 주세요." : "당신의 의견을 남겨주세요...";
  const resolvedAriaLabel = ariaLabel ?? (isReply ? "답글 입력" : "댓글 입력");
  const isDisabled = state === "disabled";
  const isReadOnly = value !== undefined && onChange === undefined;

  return (
    <div className={cn("flex w-full items-center gap-2 rounded-[12px]", className)}>
      <div
        className={cn(
          "flex h-[44px] flex-1 items-center rounded-common-radius px-3 py-2",
          isReply ? "bg-bg-03" : "bg-bg-02",
        )}
      >
        <Input
          variant="plain"
          type="text"
          id={id}
          name={name}
          aria-label={resolvedAriaLabel}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          readOnly={isReadOnly}
          disabled={isDisabled}
          placeholder={isDisabled ? "의견을 남길 수 없습니다." : resolvedPlaceholder}
          className="text-caption-m placeholder:text-text-03 disabled:placeholder:text-text-02"
        />
      </div>

      <Button
        type="button"
        variant="primary"
        size="iconSm"
        className={cn(
          "size-10 [--button-radius:var(--radius-common-radius)]",
          isDisabled ? "bg-bg-03" : "bg-primary-strong hover:bg-primary-strong",
        )}
        aria-label="전송"
        disabled={isDisabled}
      >
        <PaperPlaneRightIcon
          aria-hidden
          className={cn("size-6", isDisabled ? "text-text-02" : "text-text-01")}
          strokeWidth={20}
        />
      </Button>
    </div>
  );
}
