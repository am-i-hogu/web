import type { ReactNode } from "react";

import { POST_FILTER_OPTIONS } from "@/features/post/constants/post-filter.constants";
import {
  BottomSheet,
  BottomSheetActionButton,
  BottomSheetBody,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetHomeIndicator,
  BottomSheetTitleRow,
  Checkbox,
} from "@/shared/ui";

type PostFilterOption = (typeof POST_FILTER_OPTIONS)[number];

type PostFilterBottomSheetProps = {
  selectedOptions: PostFilterOption[];
  onToggleOption: (option: PostFilterOption) => void;
  onSave: () => void;
  onClose?: () => void;
  title?: ReactNode;
  description?: ReactNode;
  saveText?: ReactNode;
  className?: string;
};

function PostFilterBottomSheet(props: PostFilterBottomSheetProps) {
  const {
    selectedOptions,
    onToggleOption,
    onSave,
    onClose,
    title = "필터",
    description = "게시글과 관련된 카테고리를 선택해주세요.",
    saveText = "저장하기",
    className,
  } = props;
  const isSaveDisabled = selectedOptions.length === 0;

  return (
    <BottomSheet className={className}>
      <BottomSheetHeader>
        <BottomSheetTitleRow title={title} onClose={onClose} />
        <BottomSheetDescription>{description}</BottomSheetDescription>
      </BottomSheetHeader>
      <BottomSheetBody>
        <ul className="grid gap-4">
          {POST_FILTER_OPTIONS.map((option) => {
            const isSelected = selectedOptions.includes(option);

            return (
              <li key={option}>
                <Checkbox
                  checked={isSelected}
                  label={option}
                  labelClassName="text-body-r text-text-04"
                  onCheckedChange={() => onToggleOption(option)}
                />
              </li>
            );
          })}
        </ul>
      </BottomSheetBody>
      <BottomSheetFooter>
        <BottomSheetActionButton
          variant={isSaveDisabled ? "disabled" : "primary"}
          disabled={isSaveDisabled}
          onClick={onSave}
        >
          {saveText}
        </BottomSheetActionButton>
      </BottomSheetFooter>
      <BottomSheetHomeIndicator />
    </BottomSheet>
  );
}

export type { PostFilterBottomSheetProps, PostFilterOption };
export { PostFilterBottomSheet };
