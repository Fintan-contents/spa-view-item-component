import { ReactNode } from "react";
import { CsItem, CsStringItem } from "./CsItem";
import dayjs from "dayjs";

export type InputDateFormat =
  | "YYYY/MM/DD"
  | "YYYY/M/D"
  | "YYYYMMDD"
  | "YYYYMD"
  | "YYYY.MM.DD"
  | "YYYY.M.D"
  | "YYYYMM"
  | "YYYY/MM";

export class CsInputDateItem extends CsStringItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsInputDateItem;

  static dateValueFormat: string = "YYYY-MM-DDTHH:mm:ssZ";
  static yearMontFormat: string = "YYYY-MM";
  static dateDisplayFormat: string = "YYYY/MM/DD";
  static dateTimeValueFormat: string = "YYYY-MM-DDTHH:mm:ssZ";
  static dateTimeDisplayFormt: string = "YYYY/MM/DD HH:mm:ss";

  displayFormat: string = CsInputDateItem.dateDisplayFormat;
  valueFormat: string = CsInputDateItem.dateValueFormat;
}

export abstract class CsRangeItem<
  V extends string | number,
  T extends V[],
> extends CsItem<T> {
  lowerPlaceholder?: string;
  upperPlaceholder?: string;
  get lowerValue() {
    if (this.value && this.value.length === 2) {
      return this.value[0];
    }
    return undefined;
  }

  setLowerValue = (value: V | undefined) => {
    this.setValueOpt((prev) => {
      return [value, prev![1]] as T;
    });
  };

  get upperValue() {
    if (this.value && this.value.length === 2) {
      return this.value[1];
    }
    return undefined;
  }

  setUpperValue = (value: V | undefined) => {
    this.setValueOpt((prev) => {
      return [prev![0], value] as T;
    });
  };

  setRangeValue = (lower: V | undefined, upper: V | undefined) => {
    this.setValue([lower, upper] as T);
  };
}

export class CsNumberRangeItem extends CsRangeItem<number, number[]> {
  private itemIdentifier?: CsNumberRangeItem;
}

export class CsInputNumberRangeItem extends CsNumberRangeItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsInputNumberRangeItem;
}

export class CsStringRangeItem extends CsRangeItem<string, string[]> {
  private itemIdentifier?: CsStringRangeItem;
  lowerPlaceholder?: string;
  lowerPrefix?: ReactNode;
  lowerSuffix?: ReactNode;
  upperPlaceholder?: string;
  upperPrefix?: ReactNode;
  upperSuffix?: ReactNode;
}

export class CsInputDateRangeItem extends CsStringRangeItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsInputDateRangeItem;
  format?: InputDateFormat;

  setLowerValue = (value: string | undefined) => {
    const newLowerValue = value && dayjs(value).format(this.getValueFormat());
    this.setValueOpt((prev) => {
      return [
        newLowerValue === "Invalid Date" ? undefined : newLowerValue,
        prev ? prev[1] : undefined,
      ] as string[];
    });
  };

  setUpperValue = (value: string | undefined) => {
    const newUpperValue = value && dayjs(value).format(this.getValueFormat());
    this.setValueOpt((prev) => {
      return [
        prev ? prev[0] : undefined,
        newUpperValue === "Invalid Date" ? undefined : newUpperValue,
      ] as string[];
    });
  };

  setRangeValue = (lower: string | undefined, upper: string | undefined) => {
    const newLowerValue = lower && dayjs(lower).format(this.getValueFormat());
    const newUpperValue = upper && dayjs(upper).format(this.getValueFormat());
    this.setValueOpt((prev) => {
      return [
        newLowerValue === "Invalid Date" ? undefined : newLowerValue,
        newUpperValue === "Invalid Date" ? undefined : newUpperValue,
      ] as string[];
    });
  };

  isYearMonth = () => {
    return this.format === "YYYYMM" || this.format === "YYYY/MM";
  };

  getValueFormat = () => {
    return this.isYearMonth()
      ? CsInputDateItem.yearMontFormat
      : CsInputDateItem.dateValueFormat;
  };

  validateDateRange = () => {
    if (!this.validationRule.required && !this.value) {
      return;
    }
    const validationEvent = this.parentView?.validationEvent;
    if (validationEvent) {
      return validationEvent.onValidateItemHasError(this.value, this);
    }
    return false;
  };
}
