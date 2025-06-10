import { TextField, TextFieldProps } from "@mui/material";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { CsInputDateItem, CsInputDateRangeItem, CsInputNumberRangeItem } from "../../logics";
import { getClassName, MxEditCtrl, MxProps } from "./MxCtrl";

export interface MxInputDateProps extends MxProps<CsInputDateItem> {
  muiProps?: DatePickerProps<dayjs.Dayjs>;
}

export const MxInputDate = (props: MxInputDateProps) => {
  const { item, muiProps } = props;
  const valueDayjs = !item.value
    ? undefined
    : dayjs(item.value);
  return (
    <MxEditCtrl<string>
      mxProps={props}
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={getClassName(props, "fit-content")}
              value={valueDayjs}
              format={CsInputDateItem.dateDisplayFormat}
              {...muiProps}
              onChange={(value: dayjs.Dayjs | null, context) => {
                const newValue =
                  !value || !value.isValid()
                    ? undefined
                    : value.format(CsInputDateItem.dateValueFormat);
                item.setValue(newValue);
                if (!item.validateWhenErrorExists(newValue as string)) {
                  setRefresh(true);
                }
                if (muiProps?.onChange) {
                  muiProps.onChange(value, context);
                }
              }}
            />
          </LocalizationProvider>
        </div>
      )}
    /> // MxEditCtrl
  );
};

export interface MxInputDateRangeProps extends MxProps<CsInputDateRangeItem> {
  muiPropsLower?: DatePickerProps<dayjs.Dayjs>;
  muiPropsUpper?: DatePickerProps<dayjs.Dayjs>;
}

export const MxInputDateRange = (props: MxInputDateRangeProps) => {
  const { item, muiPropsLower, muiPropsUpper } = props;
  const lowerValueDayjs = !item.lowerValue
    ? undefined
    : dayjs(item.lowerValue);
  const upperValueDayjs = !item.upperValue
    ? undefined
    : dayjs(item.upperValue);
  return (
    <MxEditCtrl
      mxProps={props}
      renderCtrl={(setRefresh) => (
        <div
          style={{ display: "inline-block" }}
          onBlur={() => {
            if (item.parentView?.validateTrigger !== "onBlur") {
              return;
            }
            if (!item.validateDateRange()) {
              setRefresh(true);
            }
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={getClassName(props, "fit-content")}
              value={lowerValueDayjs}
              format={CsInputDateItem.dateDisplayFormat}
              maxDate={upperValueDayjs}
              readOnly={item.isReadonly()}
              {...muiPropsLower}
              onChange={(value: dayjs.Dayjs | null, context) => {
                const newValue =
                  !value || !value.isValid()
                    ? undefined
                    : value.format(CsInputDateItem.dateValueFormat);
                item.setLowerValue(newValue);
                let newUpper = item.upperValue;
                if (newUpper && newValue && newValue > newUpper) {
                  item.setUpperValue(newValue);
                  newUpper = newValue;
                }
                if (!item.validateWhenErrorExists([newValue as string, newUpper as string])) {
                  setRefresh(true);
                }
                if (muiPropsLower?.onChange) {
                  muiPropsLower.onChange(value, context);
                }
              }}
            />
            <div
              style={{
                display: "inline-block",
                margin: "10px 2px 12px 10px",
                verticalAlign: "middle",
              }}
            >
              {" "}
              ～{" "}
            </div>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={getClassName(props, "fit-content")}
              value={upperValueDayjs}
              format={CsInputDateItem.dateDisplayFormat}
              minDate={lowerValueDayjs}
              readOnly={item.isReadonly()}
              {...muiPropsUpper}
              onChange={(value: dayjs.Dayjs | null, context) => {
                const newValue =
                  !value || !value.isValid()
                    ? undefined
                    : value.format(CsInputDateItem.dateValueFormat);
                item.setUpperValue(newValue);
                let newLower = item.lowerValue;
                if (newLower && newValue && newValue < newLower) {
                  item.setLowerValue(newValue);
                  newLower = newValue;
                }
                if (!item.validateWhenErrorExists([newLower as string, newValue as string])) {
                  setRefresh(true);
                }
                if (muiPropsUpper?.onChange) {
                  muiPropsUpper.onChange(value, context);
                }
              }}
            />
          </LocalizationProvider>
        </div>
      )}
    /> // AxEditCtrl
  );
};


export interface MxInputNumberRangeProps
  extends MxProps<CsInputNumberRangeItem> {
  muiPropsLower?: TextFieldProps;
  muiPropsUpper?: TextFieldProps;
  dataTestIdLower?: string;
  dataTestIdUpper?: string;
}

export const MxInputNumberRange = (props: MxInputNumberRangeProps) => {
  const { item, muiPropsLower, muiPropsUpper } = props;
  return (
    <MxEditCtrl
      mxProps={props}
      renderCtrl={(setRefresh) => (
        <div style={{ display: "inline-block" }}>
          <TextField
            className={getClassName(props, "input-number")}
            value={item.lowerValue}
            inputProps={{
              readOnly: item.isReadonly(),
              "data-testid": props.dataTestIdLower,
            }}
            {...muiPropsLower}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
            ) => {
              const re = /^-?[0-9]+$/g;
              const newValue =
                e.target.value.length === 0 ? undefined : e.target.value;
              if (newValue === undefined || re.test(newValue)) {
                const newNumber = newValue ? Number(newValue) : undefined;
                item.setLowerValue(newNumber);
                if (
                  !item.validateWhenErrorExists([
                    newNumber as number,
                    item.upperValue as number,
                  ])
                ) {
                  setRefresh(true);
                }
              }
              if (muiPropsLower?.onChange) {
                muiPropsLower.onChange(e);
              }
            }}
            onBlur={(e) => {
              if (
                item.lowerValue !== undefined &&
                item.upperValue !== undefined &&
                item.lowerValue > item.upperValue
              ) {
                // 下限値が上限値より大きい場合、上限値を下限値に合わせる
                item.setUpperValue(item.lowerValue);
              }
              if (item.parentView?.validateTrigger === "onBlur") {
                if (!item.validate(item.value)) {
                  setRefresh(true);
                }
              }
              if (muiPropsLower?.onBlur) {
                muiPropsLower.onBlur(e);
              }
            }}
          />
          <div
            style={{
              display: "inline-block",
              margin: "10px 2px 12px 10px",
              verticalAlign: "middle",
            }}
          >
            {" "}
            ～{" "}
          </div>
          <TextField
            className={getClassName(props, "input-number")}
            value={item.upperValue}
            inputProps={{
              readOnly: item.isReadonly(),
              "data-testid": props.dataTestIdUpper,
            }}
            {...muiPropsUpper}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
            ) => {
              const re = /^-?[0-9]+$/g;
              const newValue =
                e.target.value.length === 0 ? undefined : e.target.value;
              if (newValue === undefined || re.test(newValue)) {
                const newNumber = newValue ? Number(newValue) : undefined;
                item.setUpperValue(newNumber);
                if (
                  !item.validateWhenErrorExists([
                    item.lowerValue as number,
                    newNumber as number,
                  ])
                ) {
                  setRefresh(true);
                }
              }
              if (muiPropsUpper?.onChange) {
                muiPropsUpper.onChange(e);
              }
            }}
            onBlur={(e) => {
              if (
                item.lowerValue !== undefined &&
                item.upperValue !== undefined &&
                item.upperValue < item.lowerValue
              ) {
                // 上限値が下限値より小さい場合、下限値を上限値に合わせる
                item.setLowerValue(item.upperValue);
              }
              if (item.parentView?.validateTrigger === "onBlur") {
                if (!item.validate(item.value)) {
                  setRefresh(true);
                }
              }
              if (muiPropsUpper?.onBlur) {
                muiPropsUpper?.onBlur(e);
              }
            }}
          />
        </div>
      )}
    /> // AxEditCtrl
  );
};
