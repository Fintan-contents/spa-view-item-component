// AxSelectNumberBox の Story ファイル
import { useState } from "react";
import {
  AxButton,
  AxCheckBox,
  AxInputNumber,
  AxInputText,
  AxSelectNumberBox,
  AxSelectNumberBoxProps,
} from "../../components/antd";
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
 * Ant DesignのSelectをラップしたコンポーネントであり、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof AxSelectNumberBox> = {
  title: "ant Design/AxSelectNumberBox",
  component: AxSelectNumberBox,
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
    antdProps: {
      control: false,
      description: `Ant DesignのSelectコンポーネントに渡すプロパティを指定します。
        <a href="https://ant.design/components/select#select-props" target="_blank">詳細</a><br><br>定義例：\`antdProps={{ size: "large" }}\``,
      table: {
        type: { summary: "SelectProps<any, DefaultOptionType>" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<AxSelectNumberBoxProps> = {
  item: undefined,
  hideLabel: false,
  labelPlacement: "top",
  labelWidth: 30,
  showRequiredTag: "both",
};

/**
 * AxSelectNumberBoxコンポーネントのサンプル。
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
        <AxSelectNumberBox {...args} item={item} />
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
  <AxSelectNumberBox
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
      <AxSelectNumberBox item={targetItem} />
      <hr />
      <AxInputText item={label} />
      <AxInputNumber item={addOption} />
      <AxButton
        onClick={() => {
          setOptions((prev) => {
            const newArray = [...prev, addOption.value ?? 0];

            return [...newArray.sort((a, b) => a - b)];
          });
          addOption.setValue();
        }}
      >
        追加
      </AxButton>
      <AxCheckBox item={required} />
      <AxCheckBox item={readOnly} />
      <AxButton type="primary" validationViews={[view]} onClick={() => {}}>
        バリデーションを実行する
      </AxButton>
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
  <AxSelectNumberBox
    item={view.item}
  />
);`,
      },
    },
  },
};
