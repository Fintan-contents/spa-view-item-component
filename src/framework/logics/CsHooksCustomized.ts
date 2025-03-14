import {
  CsInputPostalCodeItem,
  RW,
  StateResult,
  StringArrayValidationRule,
  useCsItem,
} from ".";

export function useCsInputPostalCodeItem(
  label: string,
  state: StateResult<string[]>,
  rule: StringArrayValidationRule,
  readonly: RW = RW.Editable,
  lowerPlaceholder?: string,
  upperPlaceholder?: string,
): CsInputPostalCodeItem {
  const rangeItem = useCsItem(
    CsInputPostalCodeItem,
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
