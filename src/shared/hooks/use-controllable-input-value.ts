import { type ChangeEvent, useCallback, useState } from "react";

/**
 * 입력 컴포넌트의 controlled / uncontrolled 값을 통합 관리하는 훅
 *
 * @description
 * `value` prop 유무를 기준으로 모드를 자동 판별합니다.
 * - controlled: 부모가 값을 소유하며, 이 훅은 `onChange` 전달과 유틸 액션만 담당합니다.
 * - uncontrolled: 훅 내부 상태를 값 소스로 사용합니다.
 *
 * @param params.value - 외부 제어 값입니다. 전달되면 controlled 모드로 동작합니다.
 * @param params.defaultValue - uncontrolled 모드 초기값입니다.
 * @param params.onChange - 입력 변경 시 호출할 핸들러입니다.
 *
 * @returns currentValue - 현재 입력값입니다.
 * @returns isControlled - controlled 모드 여부입니다.
 * @returns handleChange - `onChange`에 연결할 변경 핸들러입니다.
 * @returns clearValue - 값을 비우는 액션입니다. controlled 모드에서는 빈 문자열 이벤트를 부모로 전달합니다.
 */

type InputElement = HTMLInputElement | HTMLTextAreaElement;

type UseControllableInputValueParams<T extends InputElement> = {
  value?: string;
  defaultValue?: string;
  onChange?: (event: ChangeEvent<T>) => void;
};

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
