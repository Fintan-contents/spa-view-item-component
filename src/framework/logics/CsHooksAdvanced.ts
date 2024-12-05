import { Dispatch, useState } from "react";
import { RW, StateResult, useCsItem } from "./CsHooks";
import { NumberValidationRule, StringArrayValidationRule, StringValidationRule } from "./CsItem";
import {
  CsInputDateItem,
  CsInputDateRangeItem,
  CsInputNumberRangeItem,
} from "./CsItemAdvanced";

export function useRangeInit<T extends number | string>(lower?: T, upper?: T) {
  const state = useState<T[]>([lower as T, upper as T]);
  return state as [
    T[] | undefined,
    Dispatch<React.SetStateAction<T[] | undefined>>,
  ];
}

export function useCsInputDateItem(
  label: string,
  state: StateResult<string>,
  rule: StringValidationRule,
  readonly: RW = RW.Editable,
  placeholder?: string,
): CsInputDateItem {
  return useCsItem(
    CsInputDateItem,
    label,
    state,
    rule,
    undefined,
    readonly,
    placeholder,
  );
}

export function useCsInputNumberRangeItem(
  label: string,
  state: StateResult<number[]>,
  rule: NumberValidationRule,
  readonly: RW = RW.Editable,
  lowerPlaceholder?: string,
  upperPlaceholder?: string,
): CsInputNumberRangeItem {
  const rangeItem = useCsItem(
    CsInputNumberRangeItem,
    label,
    state,
    rule,
    undefined,
    readonly,
  );
  rangeItem.lowerPlaceholder = lowerPlaceholder;
  rangeItem.upperPlaceholder = upperPlaceholder;
  return rangeItem;
}

export function useCsInputDateRangeItem(
  label: string,
  state: StateResult<string[]>,
  rule: StringArrayValidationRule,
  readonly: RW = RW.Editable,
  lowerPlaceholder?: string,
  upperPlaceholder?: string,
): CsInputDateRangeItem {
  const rangeItem = useCsItem(
    CsInputDateRangeItem,
    label,
    state,
    rule,
    undefined,
    readonly,
  );
  rangeItem.lowerPlaceholder = lowerPlaceholder;
  rangeItem.upperPlaceholder = upperPlaceholder;
  return rangeItem;
}
