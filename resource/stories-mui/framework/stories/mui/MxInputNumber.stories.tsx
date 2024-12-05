// MxInputNumber の Story ファイル
import {
  MxButton,
  MxCheckBox,
  MxInputNumber,
  MxInputNumberProps,
  MxInputNumberRange,
  MxInputText,
} from "../../components/mui";
import {
  numberRule,
  RW,
  stringRule,
  useCsCheckBoxItem,
  useCsInputNumberItem,
  useCsInputNumberRangeItem,
  useCsInputTextItem,
  useCsView,
  useInit,
} from "../../logics";
import { Meta, StoryObj } from "@storybook/react";

/**
 * Material UIのTextFieldをラップしたコンポーネントであり、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof MxInputNumber> = {
  title: "Material UI/MxInputNumber",
  component: MxInputNumber,
  tags: ["autodocs"],
  argTypes: {
    item: {
      control: false,
      description:
        "入力項目定義を指定します。ラベル名、入力フィールドの初期値、バリデーションルール、読み取り専用にするかの設定ができます。",
      table: {
        type: { summary: "CsInputNumberItem" },
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
      description: `Material UIのTextFieldコンポーネントに渡すプロパティを指定します。
                <a href="https://mui.com/components/text-fields/" target="_blank">詳細</a><br><br>定義例：\`muiProps={{ size: "large" }}\``,
      table: {
        type: { summary: "TextFieldProps" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<MxInputNumberProps> = {
  item: undefined,
  hideLabel: false,
  labelPlacement: "top",
  labelWidth: 30,
  showRequiredTag: "both",
};

/**
 * MxInputNumberコンポーネントのサンプル。
 */
export const InputNumber: Story = {
  args: defaultArgs,
  render: function Render(args: MxInputNumberProps) {
    const item = useCsInputNumberItem(
      "ラベル",
      useInit(0),
      numberRule(true, 1, 10),
    );

    return (
      <>
        <MxInputNumber {...args} item={item} />
      </>
    );
  },
  tags: ["!autodocs", "!dev"],
  parameters: {
    docs: {
      source: {
        code: `const view = useCsView({
  item: useCsInputNumberItem("ラベル", useInit(0), numberRule(true, 1, 10)),
});
return (
  <MxInputNumber
    item={view.item}
  />
);`,
      },
    },
  },
};

const CustomizeItemParameters = () => {
  const label = useCsInputTextItem(
    "ラベル名",
    useInit("ラベル"),
    stringRule(true),
  );
  const init = useCsInputNumberItem(
    "初期値  ※カスタマイズ不可",
    useInit(0),
    numberRule(true),
    RW.Readonly,
  );
  const required = useCsCheckBoxItem(
    "必須/任意設定",
    useInit(true),
    "必須入力にする",
  );
  const range = useCsInputNumberRangeItem(
    "数値範囲",
    useInit([0, 10]),
    numberRule(false),
  );
  const readOnly = useCsCheckBoxItem(
    "読み取り専用設定",
    useInit(false),
    "読み取り専用にする",
  );
  const targetItem = useCsInputNumberItem(
    label.value ?? "",
    useInit(init.value),
    numberRule(!!required.value, range.lowerValue, range.upperValue),
    readOnly.value ? RW.Readonly : RW.Editable,
  );
  const view = useCsView({ item: targetItem });

  return (
    <>
      <MxInputNumber item={targetItem} />
      <hr />
      <MxInputText item={label} />
      <MxInputNumber item={init} />
      <MxCheckBox item={required} />
      <MxInputNumberRange item={range} />
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
  item: useCsInputNumberItem("ラベル", useInit(0), numberRule(true, 1, 10)),
});
return (
  <MxInputNumber
    item={view.item}
  />
);`,
      },
    },
  },
};
