// MxSelectNumberBox の Story ファイル
import { useState } from "react";
import {
  MxButton,
  MxCheckBox,
  MxInputNumber,
  MxInputText,
  MxSelectNumberBox,
  MxSelectNumberBoxProps,
} from "../../components/mui";
import {
  numberRule,
  RW,
  selectOptionNumbers,
  stringRule,
  useCsCheckBoxItem,
  useCsInputNumberItem,
  useCsInputTextItem,
  useCsSelectNumberBoxItem,
  useCsView,
  useInit,
} from "../../logics";
import { Meta, StoryObj } from "@storybook/react";

/**
 * Material UIのSelectをラップしたコンポーネントであり、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof MxSelectNumberBox> = {
  title: "Material UI/MxSelectNumberBox",
  component: MxSelectNumberBox,
  tags: ["autodocs"],
  argTypes: {
    item: {
      control: false,
      description:
        "入力項目定義を指定します。ラベル名、入力フィールドの初期値、バリデーションルール、読み取り専用にするかの設定ができます。",
      table: {
        type: { summary: "CsSelectNumberBoxItem" },
      },
    },
    hideLabel: {
      control: "boolean",
      description: "ラベルの表示有無を指定します。",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    labelPlacement: {
      control: "radio",
      description:
        "入力フィールドに対するラベルの位置を指定します。`hideLabel`が`false`の場合にのみ適用されます。",
      table: {
        defaultValue: { summary: "top" },
      },
    },
    labelWidth: {
      control: "select",
      description:
        "ラベルの幅を親要素の`width`に対するパーセンテージ（％）で指定します。`hideLabel`が`false`かつ`labelPlacement`が`left`の場合にのみ適用されます。",
      table: {
        defaultValue: { summary: "30" },
      },
    },
    showRequiredTag: {
      control: "radio",
      description:
        "必須タグ/任意タグの表示有無を指定します。`required`の場合は必須タグのみ、" +
        "`optional`の場合は任意タグのみ表示されます。`both`の場合は必須と任意両方のタグが表示されます。" +
        "`none`の場合はタグが表示されません。<br>" +
        "必須か任意かは、バリデーションルール関数の第一引数が`true`であるかに依存します。",
    },
    addClassNames: {
      control: false,
      description: `追加するCSSのクラス名を指定します。CSSのクラス名は複数指定することができます。<br><br>定義例：\`addClassNames={["css-style1", "css-style2"]}\``,
    },
    muiProps: {
      control: false,
      description: `Material UIのSelectコンポーネントに渡すプロパティを指定します。
                <a href="https://mui.com/components/select/" target="_blank">詳細</a><br><br>定義例：\`muiProps={{ size: "large" }}\``,
      table: {
        type: { summary: " SelectProps<number>" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<MxSelectNumberBoxProps> = {
  item: undefined,
  hideLabel: false,
  labelPlacement: "top",
  labelWidth: 30,
  showRequiredTag: "both",
};

/**
 * MxSelectNumberBoxコンポーネントのサンプル。
 */
export const SelectNumberBox: Story = {
  args: defaultArgs,
  render: function Render(args) {
    const item = useCsSelectNumberBoxItem(
      "ラベル",
      useInit(5),
      numberRule(true),
      selectOptionNumbers([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]),
    );

    return (
      <>
        <MxSelectNumberBox {...args} item={item} />
      </>
    );
  },
  tags: ["!autodocs", "!dev"],
  parameters: {
    docs: {
      source: {
        code: `const view = useCsView({
  item: useCsSelectNumberBoxItem("ラベル", useInit(5), numberRule(true), selectOptionNumbers([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]));
return (
  <MxSelectNumberBox
    item={view.item}
  />
);`,
      },
    },
  },
};

const CustomizeItemParameters = () => {
  const [options, setOptions] = useState<number[]>([5, 10, 15, 20, 25]);

  const label = useCsInputTextItem(
    "ラベル名",
    useInit("ラベル"),
    stringRule(true),
  );
  const init = useCsInputNumberItem(
    "初期値  ※カスタマイズ不可",
    useInit(5),
    numberRule(true),
    RW.Readonly,
  );
  const addOption = useCsInputNumberItem(
    "追加する数値",
    useInit(),
    numberRule(true),
  );
  const required = useCsCheckBoxItem(
    "必須/任意設定",
    useInit(true),
    "必須入力にする",
  );
  const readOnly = useCsCheckBoxItem(
    "読み取り専用設定",
    useInit(false),
    "読み取り専用にする",
  );
  const targetItem = useCsSelectNumberBoxItem(
    label.value ?? "",
    useInit(init.value),
    numberRule(!!required.value),
    selectOptionNumbers(options),
    readOnly.value ? RW.Readonly : RW.Editable,
  );
  const view = useCsView({ item: targetItem });

  return (
    <>
      <MxSelectNumberBox item={targetItem} />
      <hr />
      <MxInputText item={label} />
      <MxInputNumber item={addOption} />
      <MxButton
        onClick={() => {
          setOptions((prev) => {
            const newArray = [...prev, addOption.value ?? 0];

            return [...newArray.sort((a, b) => a - b)];
          });
          addOption.setValue();
        }}
      >
        追加
      </MxButton>
      <MxCheckBox item={required} />
      <MxCheckBox item={readOnly} />
      <MxButton type="contained" validationViews={[view]} onClick={() => {}}>
        バリデーションを実行する
      </MxButton>
    </>
  );
};

/**
 * Itemのパラメータの値をカスタマイズすることで、入力項目のUIがどのように変化するのかを確認することができます。
 */
export const CustomizeItemParametersStory = {
  render: function Render() {
    return <CustomizeItemParameters />;
  },
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `const view = useCsView({
  item: useCsSelectNumberBoxItem("選択個数", useInit(5), numberRule(true), selectOptionNumbers([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]));
return (
  <MxSelectNumberBox
    item={view.item}
  />
);`,
      },
    },
  },
};
