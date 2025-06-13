// AxInputNumberRange の Story ファイル
import {
  AxButton,
  AxCheckBox,
  AxInputNumberRange,
  AxInputNumberRangeProps,
  AxInputText,
} from "../../components/antd";
import {
  numberRule,
  RW,
  stringRule,
  useCsCheckBoxItem,
  useCsInputNumberRangeItem,
  useCsInputTextItem,
  useCsView,
  useInit,
  useRangeInit,
} from "../../logics";
import { Meta, StoryObj } from "@storybook/react";

/**
 * Ant DesignのInputNumberをラップしたコンポーネントであり、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof AxInputNumberRange> = {
  title: "ant Design/AxInputNumberRange",
  component: AxInputNumberRange,
  tags: ["autodocs"],
  argTypes: {
    item: {
      control: false,
      description:
        "入力項目定義を指定します。ラベル名、入力フィールドの初期値、バリデーションルール、読み取り専用にするかの設定ができます。",
      table: {
        type: { summary: "CsInputNumberRangeItem" },
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
    antdPropsLower: {
      control: false,
      description: `数値範囲の下限の最小値・最大値の指定ができます。<br><br>定義例：\`antdPropsLower={{min: 0, max: 100}}\``,
    },
    antdPropsUpper: {
      control: false,
      description: `数値範囲の上限の最小値・最大値の指定ができます。<br><br>定義例：\`antdPropsUpper={{min: 0, max: 100}}\``,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<AxInputNumberRangeProps> = {
  item: undefined,
  hideLabel: false,
  labelPlacement: "top",
  labelWidth: 30,
  showRequiredTag: "both",
};

/**
 * AxInputNumberRangeコンポーネントのサンプル。
 */
export const InputNumberRange: Story = {
  args: defaultArgs,
  render: function Render(args) {
    const item = useCsInputNumberRangeItem(
      "ラベル",
      useRangeInit<number>(1, 100),
      numberRule(true, 1, 100000),
    );
    return (
      <>
        <AxInputNumberRange {...args} item={item} />
      </>
    );
  },
  tags: ["!autodocs", "!dev"],
  parameters: {
    docs: {
      source: {
        code: `const view = useCsView({
  item: useCsInputNumberRangeItem("ラベル", useRangeInit<number>(1, 100), numberRule(true, 1, 100000)),
});
return (
  <AxInputNumberRange
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
  const init = useCsInputNumberRangeItem(
    "初期値  ※カスタマイズ不可",
    useRangeInit<number>(0, 100),
    numberRule(true),
    RW.Readonly,
  );
  const range = useCsInputNumberRangeItem(
    "数値範囲",
    useRangeInit<number>(init.lowerValue, init.upperValue),
    numberRule(true),
    RW.Editable,
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
  const targetItem = useCsInputNumberRangeItem(
    label.value ?? "",
    useRangeInit<number>(range.lowerValue, range.upperValue),
    numberRule(!!required.value, range.lowerValue, range.upperValue),
    readOnly.value ? RW.Readonly : RW.Editable,
  );
  const view = useCsView({ item: targetItem });

  return (
    <>
      <AxInputNumberRange item={targetItem} />
      <hr />
      <AxInputText item={label} />
      <AxInputNumberRange item={range} />
      <AxInputNumberRange item={init} />
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
  item: useCsInputNumberRangeItem("ラベル", useRangeInit<number>(1, 100), numberRule(true, 1, 100000)),
});
return (
  <AxInputNumberRange
    item={view.item}
  />
);`,
      },
    },
  },
};
