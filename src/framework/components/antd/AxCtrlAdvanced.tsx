import {
  DatePicker,
  DatePickerProps,
  GetProps,
  InputNumber,
  InputNumberProps,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import {
  CsInputDateItem,
  CsInputDateRangeItem,
  CsInputNumberRangeItem,
} from "../../logics";
import { AxProps, AxEditCtrl, getClassName } from "./AxCtrl";

const { RangePicker } = DatePicker;
type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

export interface AxInputDateProps extends AxProps<CsInputDateItem> {
  antdProps?: DatePickerProps;
}

export const AxInputDate = (props: AxInputDateProps) => {
  const { item, antdProps } = props;
  return (
    <AxEditCtrl
      axProps={props}
      renderCtrl={(setRefresh) => (
        <div
          onBlur={() => {
            if (item.parentView?.validateTrigger !== "onBlur") {
              return;
            }
            if (!item.validate(item.value)) {
              setRefresh(true);
            }
          }}
        >
          <DatePicker
            className={getClassName(props, ["fit-content"])}
            value={item.value ? dayjs(item.value) : undefined}
            format={item.displayFormat}
            onChange={(value: Dayjs, dateString: string | string[]) => {
              if (item.isReadonly()) return;
              const newValue = value?.format(item.valueFormat);
              item.setValue(newValue);
              if (!item.validateWhenErrorExists(newValue ?? "")) {
                setRefresh(true);
              }
            }}
            {...antdProps}
          />
        </div>
      )}
    /> // AxEditCtrl
  );
};

export interface AxInputDateRangeProp extends AxProps<CsInputDateRangeItem> {
  antdProps?: RangePickerProps;
}

export const AxInputDateRange: React.FC<AxInputDateRangeProp> = (
  props: AxInputDateRangeProp,
) => {
  const { item, antdProps } = props;
  const from = item.value?.at(0) ? dayjs(item.lowerValue) : undefined;
  const to = item.value?.at(1) ? dayjs(item.upperValue) : undefined;
  return (
    <AxEditCtrl
      axProps={props}
      renderCtrl={(setRefresh) => (
        <RangePicker
          picker={item.isYearMonth() ? "month" : undefined}
          className={getClassName(props, ["fit-content"])}
          onCalendarChange={(dates, _, __) => {
            if (item.isReadonly()) {
              return;
            }
            const newFrom =
              dates && dates.length == 2
                ? dates[0]?.format(item.getValueFormat())
                : undefined;
            const newTo =
              dates && dates.length == 2
                ? dates[1]?.format(item.getValueFormat())
                : undefined;
            const newValue = [newFrom ?? "", newTo ?? ""];
            item.setValue(newValue);
            if (!item.validateWhenErrorExists(newValue)) {
              setRefresh(true);
            }
            // onCalendarChange イベントが発火した場合、onBlur イベントが続いて発生するが、
            // onBlur イベント内では newValue が取得できない為 onCalendarChange イベント内でバリデーションを実行する。
            if (
              item.parentView?.validateTrigger === "onBlur" &&
              !item.validateAnytime(newValue)
            ) {
              setRefresh(true);
            }
          }}
          allowClear={!item.validationRule.required}
          value={[from, to] as [dayjs.Dayjs, dayjs.Dayjs]}
          placeholder={[
            item.lowerPlaceholder ?? "開始日を選択してください",
            item.upperPlaceholder ?? "終了日を選択してください",
          ]}
          format={item.format}
          {...antdProps}
          onBlur={(e, info) => {
            if (item.parentView?.validateTrigger === "onBlur") {
              // Calendar の変更を伴わないフォーカスアウトが行われた場合のバリデーション
              // onCalendarChange のバリデーションと重複してしまうので、値が未入力の場合に限定する。
              // このバリデーションを実施しないとフォーカスを当てて何もせずにフォーカスが外れた場合に必須チェックが実施されない。
              if (
                item.value !== undefined &&
                item.value[0] === "" &&
                item.value[1] === "" &&
                !item.validateDateRange()
              ) {
                setRefresh(true);
              }
            }
            if (antdProps?.onBlur) {
              antdProps.onBlur(e, info);
            }
          }}
        />
      )}
    /> // AxEditCtrl
  );
};

export interface AxInputNumberRangeProps
  extends AxProps<CsInputNumberRangeItem> {
  antdPropsLower?: InputNumberProps;
  antdPropsUpper?: InputNumberProps;
}

export const AxInputNumberRange = (props: AxInputNumberRangeProps) => {
  const { item, antdPropsLower, antdPropsUpper } = props;
  return (
    <AxEditCtrl
      axProps={props}
      renderCtrl={(setRefresh) => (
        <div style={{ display: "inline-block" }}>
          <InputNumber
            className={getClassName(props, ["input-number"])}
            value={item.lowerValue}
            readOnly={item.isReadonly()}
            onChange={(value) => {
              const newValue = value ? value : undefined;
              item.setLowerValue(newValue as number);
              if (
                !item.validateWhenErrorExists([
                  newValue as number,
                  item.upperValue as number,
                ])
              ) {
                setRefresh(true);
              }
            }}
            onBlur={() => {
              if (!item.lowerValue) return;
              if (item.upperValue && item.upperValue < item.lowerValue) {
                item.setUpperValue(item.lowerValue);
              }
              if (item.parentView?.validateTrigger !== "onBlur") {
                return;
              }
              if (!item.validate(item.value)) {
                setRefresh(true);
              }
            }}
            {...antdPropsLower}
          />
          <span> ～ </span>
          <InputNumber
            className={getClassName(props, ["input-number"])}
            value={item.upperValue}
            readOnly={item.isReadonly()}
            onChange={(value) => {
              const newValue = value ? value : undefined;
              item.setUpperValue(newValue as number);
              if (
                !item.validateWhenErrorExists([
                  item.lowerValue as number,
                  newValue as number,
                ])
              ) {
                setRefresh(true);
              }
            }}
            onBlur={() => {
              if (!item.upperValue) return;
              if (item.lowerValue && item.lowerValue > item.upperValue) {
                item.setLowerValue(item.upperValue);
              }
              if (item.parentView?.validateTrigger !== "onBlur") {
                return;
              }
              if (!item.validate(item.value)) {
                setRefresh(true);
              }
            }}
            {...antdPropsUpper}
          />
        </div>
      )}
    /> // AxEditCtrl
  );
};
