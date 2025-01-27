import {
  MxSelectNumberBox,
  MxCheckBox,
  MxSelectBox,
  MxRadioBox,
} from "@{{COPY_ROOT_PATH}}/framework/components/mui";
import {
  CsView,
  CsSelectNumberBoxItem,
  CsCheckBoxItem,
  CsSelectBoxItem,
  CsRadioBoxItem,
  numberRule,
  selectOptionNumbers,
  selectOptions,
  stringRule,
  useCsCheckBoxItem,
  useCsRadioBoxItem,
  useCsSelectBoxItem,
  useCsSelectNumberBoxItem,
  useCsView,
  useInit,
} from "@{{COPY_ROOT_PATH}}/framework/logics";

// ヘッダのViewタイプ定義
export type HeaderView = CsView & {
  colSize: CsSelectNumberBoxItem;
  readonlyCheck: CsCheckBoxItem;
  validationTrigger: CsSelectBoxItem;
  labelType: CsRadioBoxItem;
  labelWidth: CsSelectNumberBoxItem;
};

// ヘッダのViewを作成するフック
export const useHeaderView = (): HeaderView => {
  return useCsView({
    colSize: useCsSelectNumberBoxItem(
      "表示列数",
      useInit(2),
      numberRule(false),
      selectOptionNumbers([1, 2, 3, 4, 6]),
    ),
    readonlyCheck: useCsCheckBoxItem("読み取り専用", useInit(false), "する"),
    validationTrigger: useCsSelectBoxItem(
      "バリデーションタイミング",
      useInit("onSubmit"),
      stringRule(true),
      selectOptions([
        { value: "onSubmit", label: "ボタンが押された時" },
        { value: "onBlur", label: "カーソルが離れた時" },
      ]),
    ),
    labelType: useCsRadioBoxItem(
      "ラベル位置",
      useInit("top"),
      stringRule(true),
      selectOptions([
        { value: "top", label: "上(top)" },
        { value: "left", label: "左(left)" },
        { value: "hidden", label: "ラベルなし" },
      ]),
    ),
    labelWidth: useCsSelectNumberBoxItem(
      "ラベル幅(位置が「左」のみ有効)",
      useInit(30),
      numberRule(true),
      selectOptionNumbers([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]),
    ),
  });
};

type DemoHeaderProps = {
  view: HeaderView;
};

// 列数やバリデーションタイミング、ラベル位置などをGUI上で編集するためのヘッダ
export const DemoHeader = (props: DemoHeaderProps) => {
  const { view } = props;
  return (
    <div style={{ display: "block" }}>
      <div style={{ display: "inline-block", verticalAlign: "top" }}>
        <MxSelectNumberBox showRequiredTag="none" item={view.colSize} />
      </div>
      <div style={{ display: "inline-block", verticalAlign: "top" }}>
        <MxCheckBox showRequiredTag="none" item={view.readonlyCheck} />
      </div>
      <div style={{ display: "inline-block", verticalAlign: "top" }}>
        <MxSelectBox showRequiredTag="none" item={view.validationTrigger} />
      </div>
      <div style={{ display: "inline-block", verticalAlign: "top" }}>
        <MxRadioBox showRequiredTag="none" item={view.labelType} />
      </div>
      {view.labelType.value === "left" && (
        <div style={{ display: "inline-block", verticalAlign: "top" }}>
          <MxSelectNumberBox showRequiredTag="none" item={view.labelWidth} />
        </div>
      )}
    </div>
  );
};
