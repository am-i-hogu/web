import { type ChangeEvent, useCallback, useState } from "react";

type InputElement = HTMLInputElement | HTMLTextAreaElement;

type UseControllableInputValueParams<T extends InputElement> = {
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<T>) => void;
};

// `value` prop 유무로 controlled / uncontrolled 모드를 자동 판별하는 입력 훅.
// - controlled: 부모가 상태를 소유하고, 이 훅은 onChange 이벤트 전달만 담당
// - uncontrolled: 훅 내부 state를 소유하고 직접 값 변경
export function useControllableInputValue<T extends InputElement>({
  value,
  defaultValue,
  onChange,
}: UseControllableInputValueParams<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const currentValue = value ?? uncontrolledValue;
  const isControlled = value !== undefined;

  const handleChange = useCallback(
    (event: ChangeEvent<T>) => {
      // uncontrolled 모드 -> 내부 상태 갱신
      if (!isControlled) {
        setUncontrolledValue(event.target.value);
      }

      onChange?.(event);
    },
    [isControlled, onChange],
  );

  const clearValue = useCallback(() => {
    if (!isControlled) {
      setUncontrolledValue("");
      return;
    }

    // controlled 모드 -> 부모의 빈 문자열상태를 갱신을 위한 onChange에 "" (빈 문자열 이벤트) 전달
    onChange?.({
      target: { value: "" },
      currentTarget: { value: "" },
    } as ChangeEvent<T>);
  }, [isControlled, onChange]);

  return {
    currentValue,
    isControlled,
    handleChange,
    clearValue,
  };
}
