import { Dispatch, SetStateAction, useState } from "react";

import {
  BooleanValidationRule,
  CsCheckBoxItem,
  CsHasOptionsItem,
  CsInputNumberItem,
  CsInputPasswordItem,
  CsInputTextItem,
  CsItem,
  CsMultiCheckBoxItem,
  CsRadioBoxItem,
  CsSelectBoxItem,
  CsSelectNumberBoxItem,
  CsTextAreaItem,
  NumberArrayValidationRule,
  NumberValidationRule,
  StringArrayValidationRule,
  StringValidationRule,
  ValidationRule,
} from "./CsItem";

export type StateResultOptional<T> = [
  val: T | undefined,
  setVal: Dispatch<SetStateAction<T | undefined>>,
];
export type StateResultRequired<T> = [
  val: T,
  setVal: Dispatch<SetStateAction<T>>,
];
export type StateResult<T> = StateResultOptional<T>;

export function useInit<T>(value?: T) {
  const state = useState<T | undefined>(value);
  return state;
}

export function stringRule(
  required: boolean,
  min?: number,
  max?: number,
  customRuleName?: string,
) {
  const rule = new StringValidationRule();
  rule.setRequired(required);
  if (min || max) rule.setLength(min, max);
  if (customRuleName) rule.setCustomRuleName(customRuleName);
  return rule;
}

export function numberRule(
  required: boolean,
  min?: number,
  max?: number,
  customRuleName?: string,
) {
  const rule = new NumberValidationRule();
  rule.setRequired(required);
  if (min || max) rule.setRange(min, max);
  if (customRuleName) rule.setCustomRuleName(customRuleName);
  return rule;
}

export function stringArrayRule(required: boolean, customRuleName?: string) {
  const rule = new StringArrayValidationRule();
  rule.setRequired(required);
  if (customRuleName) rule.setCustomRuleName(customRuleName);
  return rule;
}

export function numberArrayRule(required: boolean, customRuleName?: string) {
  const rule = new NumberArrayValidationRule();
  rule.setRequired(required);
  if (customRuleName) rule.setCustomRuleName(customRuleName);
  return rule;
}

export function booleanRule(required: boolean, customRuleName?: string) {
  const rule = new BooleanValidationRule();
  rule.setRequired(required);
  if (customRuleName) rule.setCustomRuleName(customRuleName);
  return rule;
}

export class SelectOptions {
  options: any[];
  optionValueKey: string = "value";
  optionLabelKey: string = "label";
  constructor(
    options: any[],
    optionValueKey: string = "value",
    optionLabelKey: string = "label",
  ) {
    this.options = options;
    this.optionValueKey = optionValueKey;
    this.optionLabelKey = optionLabelKey;
  }
}

export function selectOptions(
  options: any[],
  optionValueKey: string = "value",
  optionLabelKey: string = "label",
): SelectOptions {
  return new SelectOptions(options, optionValueKey, optionLabelKey);
}

export function selectOptionStrings(options: string[]) {
  return new SelectOptions(options.map((o) => ({ value: o, label: o })));
}

export function selectOptionNumbers(options: number[]) {
  return new SelectOptions(options.map((o) => ({ value: o, label: o })));
}

export enum RW {
  Readonly,
  Editable,
}

export function useCsItem<T, I extends CsItem<T>>(
  type: { new (): I },
  label: string,
  state: StateResult<T>,
  rule?: ValidationRule<T>,
  selOpt?: SelectOptions | undefined,
  readonly: RW = RW.Editable,
  placeholder?: string,
): I {
  const item = new type();
  item.label = label;
  item.placeholder = placeholder;
  item.setState(state);
  item.setValidation(useState<string>(""));
  if (rule) item.setValidationRule(rule);
  if (selOpt) {
    if (item instanceof CsHasOptionsItem) {
      const hasOptItem = item as CsHasOptionsItem<T>;
      hasOptItem.setOptions(
        selOpt.options,
        selOpt.optionValueKey,
        selOpt.optionLabelKey,
      );
    }
  }
  item.setReadonly(readonly === RW.Readonly);
  return item;
}

export function useCsInputTextItem(
  label: string,
  state: StateResult<string>,
  rule: StringValidationRule,
  readonly: RW = RW.Editable,
  placeholder?: string,
): CsInputTextItem {
  return useCsItem(
    CsInputTextItem,
    label,
    state,
    rule,
    undefined,
    readonly,
    placeholder,
  );
}

export function useCsInputNumberItem(
  label: string,
  state: StateResult<number>,
  rule: NumberValidationRule,
  readonly: RW = RW.Editable,
  placeholder?: string,
): CsInputNumberItem {
  return useCsItem(
    CsInputNumberItem,
    label,
    state,
    rule,
    undefined,
    readonly,
    placeholder,
  );
}

export function useCsInputPasswordItem(
  label: string,
  state: StateResult<string>,
  rule: StringValidationRule,
  readonly: RW = RW.Editable,
  placeholder?: string,
): CsInputPasswordItem {
  return useCsItem(
    CsInputPasswordItem,
    label,
    state,
    rule,
    undefined,
    readonly,
    placeholder,
  );
}

export function useCsTextAreaItem(
  label: string,
  state: StateResult<string>,
  rule: StringValidationRule,
  readonly: RW = RW.Editable,
  placeholder?: string,
): CsTextAreaItem {
  return useCsItem(
    CsTextAreaItem,
    label,
    state,
    rule,
    undefined,
    readonly,
    placeholder,
  );
}

export function useCsCheckBoxItem(
  label: string,
  state: StateResult<boolean>,
  checkBoxText: string,
  readonly: RW = RW.Editable,
  rule?: BooleanValidationRule,
): CsCheckBoxItem {
  const item = useCsItem(
    CsCheckBoxItem,
    label,
    state,
    rule,
    undefined,
    readonly,
  );
  item.setCheckBoxText(checkBoxText);
  return item;
}

export function useCsSelectBoxItem(
  label: string,
  state: StateResult<string>,
  rule: StringValidationRule,
  selOpt: SelectOptions | undefined,
  readonly: RW = RW.Editable,
  placeholder?: string,
): CsSelectBoxItem {
  return useCsItem(
    CsSelectBoxItem,
    label,
    state,
    rule,
    selOpt,
    readonly,
    placeholder,
  );
}

export function useCsSelectNumberBoxItem(
  label: string,
  state: StateResult<number>,
  rule: NumberValidationRule,
  selOpt: SelectOptions | undefined,
  readonly: RW = RW.Editable,
  placeholder?: string,
): CsSelectNumberBoxItem {
  return useCsItem(
    CsSelectNumberBoxItem,
    label,
    state,
    rule,
    selOpt,
    readonly,
    placeholder,
  );
}

export function useCsRadioBoxItem(
  label: string,
  state: StateResult<string>,
  rule: StringValidationRule,
  selOpt: SelectOptions | undefined,
  readonly: RW = RW.Editable,
): CsRadioBoxItem {
  return useCsItem(CsRadioBoxItem, label, state, rule, selOpt, readonly);
}

export function useCsMultiCheckBoxItem(
  label: string,
  state: StateResult<string[]>,
  rule: StringArrayValidationRule,
  selOpt: SelectOptions | undefined,
  readonly: RW = RW.Editable,
): CsMultiCheckBoxItem {
  return useCsItem(CsMultiCheckBoxItem, label, state, rule, selOpt, readonly);
}
