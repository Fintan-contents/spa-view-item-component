import { InputPostalCode } from "@/components/InputPostalCode";
import { CsInputPostalCodeItem } from "@/framework/logics";
import { InputProps } from "antd";
import { AxEditCtrl, AxProps, getClassName } from ".";

export interface AxInputPostalCodeProps extends AxProps<CsInputPostalCodeItem> {
  antdPropsFirst?: InputProps;
  antdPropsSecond?: InputProps;
}

export const AxInputPostalCode = (props: AxInputPostalCodeProps) => {
  const { item, antdPropsFirst, antdPropsSecond } = props;
  return (
    <AxEditCtrl
      axProps={props}
      renderCtrl={(setRefresh) => (
        <InputPostalCode
          firstPostalCodeInputProps={{
            className: getClassName(props),
            value: item.lowerValue,
            readOnly: item.isReadonly(),
            placeholder: item.lowerPlaceholder,
            ...antdPropsFirst,
            onChange: (e) => {
              item.setLowerValue(e.target.value);
              if (
                !item.validateWhenErrorExists([
                  e.target.value,
                  item.upperValue as string,
                ])
              ) {
                setRefresh(true);
              }
              if (antdPropsFirst?.onChange) {
                antdPropsFirst.onChange(e);
              }
            },
            onBlur: (e) => {
              if (item.parentView?.validateTrigger === "onBlur") {
                if (!item.validate(item.value)) {
                  setRefresh(true);
                }
              }
              if (antdPropsFirst?.onBlur) {
                antdPropsFirst.onBlur(e);
              }
            },
          }}
          secondPostalCodeInputProps={{
            className: getClassName(props),
            value: item.upperValue,
            readOnly: item.isReadonly(),
            placeholder: item.upperPlaceholder,
            ...antdPropsSecond,
            onChange: (e) => {
              item.setUpperValue(e.target.value);
              if (
                !item.validateWhenErrorExists([
                  item.lowerValue as string,
                  e.target.value,
                ])
              ) {
                setRefresh(true);
              }
              if (antdPropsSecond?.onChange) {
                antdPropsSecond.onChange(e);
              }
            },
            onBlur: (e) => {
              if (item.parentView?.validateTrigger === "onBlur") {
                if (!item.validate(item.value)) {
                  setRefresh(true);
                }
              }
              if (antdPropsSecond?.onBlur) {
                antdPropsSecond.onBlur(e);
              }
            },
          }}
        />
      )}
    />
  );
};
