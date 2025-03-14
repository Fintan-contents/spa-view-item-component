import { Input, InputProps } from "antd";

export type InputPostalCodeProps = {
  firstPostalCodeInputProps?: InputProps;
  secondPostalCodeInputProps?: InputProps;
};

export const InputPostalCode = (props: InputPostalCodeProps) => {
  const { firstPostalCodeInputProps, secondPostalCodeInputProps } = props;
  return (
    <div style={{ display: "inline-block" }}>
      <Input
        {...firstPostalCodeInputProps}
        style={{ width: "30%", ...firstPostalCodeInputProps?.style }}
      />
      <span>ー</span>
      <Input
        {...secondPostalCodeInputProps}
        style={{ width: "40%", ...secondPostalCodeInputProps?.style }}
      />
    </div>
  );
};
