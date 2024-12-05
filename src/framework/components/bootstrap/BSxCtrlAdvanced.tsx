import dayjs from "dayjs";
import React from "react";
import { FormControlProps } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { BsPrefixProps, ReplaceProps } from "react-bootstrap/esm/helpers";
import {
  CsInputDateItem,
  CsInputDateRangeItem,
  CsInputNumberRangeItem,
} from "../../logics";
import { BSxEditCtrl, BSxProps, getClassName } from "./BSxCtrl";

export interface BSxInputDateProps extends BSxProps<CsInputDateItem> {
  bsProps?: React.PropsWithChildren<
    ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>
  >;
}

export const BSxInputDate = (props: BSxInputDateProps) => {
  const { item, bsProps } = props;
  const displayValue = item.value
    ? dayjs(item.value).format("YYYY-MM-DD")
    : undefined;
  return (
    <BSxEditCtrl
      bsxProps={props}
      renderCtrl={(setRefresh) => (
        <Form.Control
          className={getClassName(props, "fit-content")}
          type="date"
          value={displayValue}
          onChange={(e) => {
            if (item.isReadonly()) return;
            const newValue = e.target.value ? e.target.value : undefined;
            const newDate = newValue
              ? dayjs(newValue).format(CsInputDateItem.dateValueFormat)
              : undefined;
            item.setValue(newDate);
            if (!item.validateWhenErrorExists(newValue)) {
              setRefresh(true);
            }
          }}
          onBlur={() => {
            if (item.parentView?.validateTrigger !== "onBlur") {
              return;
            }
            if (!item.validate(item.value)) {
              setRefresh(true);
            }
          }}
          {...bsProps}
        />
      )}
    /> // BSxEditCtrl
  );
};

export interface BSxInputDateRangeProps extends BSxProps<CsInputDateRangeItem> {
  bsPropsLower?: React.PropsWithChildren<
    ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>
  >;
  bsPropsUpper?: React.PropsWithChildren<
    ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>
  >;
}

export const BSxInputDateRange = (props: BSxInputDateRangeProps) => {
  const { item, bsPropsLower, bsPropsUpper } = props;
  const fromDisplayValue = item.lowerValue ? dayjs(item.lowerValue).format("YYYY-MM-DD") : undefined
  const toDisplayValue = item.upperValue ? dayjs(item.upperValue).format("YYYY-MM-DD") : undefined
  return (
    <BSxEditCtrl
      bsxProps={props}
      renderCtrl={(setRefresh) => (
        <div style={{ display: "inline-flex" }}>
          <Form.Control
            className={getClassName(props, "fit-content")}
            type="date"
            value={fromDisplayValue}
            readOnly={item.isReadonly()}
            onChange={(e) => {
              const newValue = e.target.value ? e.target.value : undefined;
              const newDate = newValue
                ? dayjs(newValue).format(CsInputDateItem.dateValueFormat)
                : undefined;
              item.setLowerValue(newDate);
              if (
                !item.validateWhenErrorExists([
                  newValue as string,
                  item.upperValue as string,
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
            {...bsPropsLower}
          />
          <span
            style={{
              verticalAlign: "middle",
              marginTop: "8px",
              marginLeft: "5px",
            }}
          >
            {" "}
            ～{" "}
          </span>
          <Form.Control
            className={getClassName(props, "fit-content")}
            type="date"
            value={toDisplayValue}
            readOnly={item.isReadonly()}
            onChange={(e) => {
              const newValue = e.target.value ? e.target.value : undefined;
              const newDate = newValue
                ? dayjs(newValue).format(CsInputDateItem.dateValueFormat)
                : undefined;
              item.setUpperValue(newDate);
              if (
                !item.validateWhenErrorExists([
                  item.lowerValue as string,
                  newDate as string,
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
            {...bsPropsUpper}
          />
        </div>
      )}
    /> // BSxEditCtrl
  );
};

export interface BSxInputNumberRangeProps
  extends BSxProps<CsInputNumberRangeItem> {
  bsPropsLower?: React.PropsWithChildren<
    ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>
  >;
  bsPropsUpper?: React.PropsWithChildren<
    ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>
  >;
}

export const BSxInputNumberRange = (props: BSxInputNumberRangeProps) => {
  const { item, bsPropsLower, bsPropsUpper } = props;
  return (
    <BSxEditCtrl
      bsxProps={props}
      renderCtrl={(setRefresh) => (
        <div style={{ display: "inline-flex" }}>
          <Form.Control
            className={getClassName(props, "input-number")}
            type="number"
            value={item.lowerValue}
            readOnly={item.isReadonly()}
            onChange={(e) => {
              const newValue = e.target.value ? e.target.value : undefined;
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
            {...bsPropsLower}
          />
          <span
            style={{
              verticalAlign: "middle",
              marginTop: "8px",
              marginLeft: "5px",
            }}
          >
            {" "}
            ～{" "}
          </span>
          <Form.Control
            className={getClassName(props, "input-number")}
            type="number"
            value={item.upperValue}
            readOnly={item.isReadonly()}
            onChange={(e) => {
              const newValue = e.target.value ? e.target.value : undefined;
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
            {...bsPropsUpper}
          />
        </div>
      )}
    /> // BSxEditCtrl
  );
};
