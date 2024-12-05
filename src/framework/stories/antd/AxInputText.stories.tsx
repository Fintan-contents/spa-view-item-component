// AxInputText の Story ファイル
import { Meta, StoryObj } from "@storybook/react";
import {
  AxButton,
  AxCheckBox,
  AxInputNumberRange,
  AxInputText,
  AxInputTextProps,
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
} from "../../logics";

/**
 * Ant DesignのInputをラップしたコンポーネントであり、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof AxInputText> = {
  title: "ant Design/AxInputText",
  component: AxInputText,
  tags: ["autodocs"],
  argTypes: {
    item: {
      control: false,
      description:
        "入力項目定義を指定します。ラベル名、入力フィールドの初期値、バリデーションルール、読み取り専用にするかの設定ができます。",
      table: {
        type: { summary: "CsInputTextItem" },
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
      description: `Ant DesignのInputコンポーネントに渡すプロパティを指定します。
        <a href="https://ant.design/components/input#input" target="_blank">詳細</a><br><br>定義例：\`antdProps={{ styles: { color: "white" } }}\``,
      table: {
        type: { summary: "InputProps & React.RefAttributes<InputRef>" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<AxInputTextProps> = {
  item: undefined,
  hideLabel: false,
  labelPlacement: "top",
  labelWidth: 30,
  showRequiredTag: "both",
};

/**
 * AxInputTextコンポーネントのサンプル。
 */
export const AxInputTextStory: Story = {
  args: defaultArgs,
  render: function Render(args: AxInputTextProps) {
    const view = useCsView({
      item: useCsInputTextItem("ラベル", useInit(""), stringRule(true)),
    });
    return <AxInputText {...args} item={view.item} />;
  },
  tags: ["!autodocs", "!dev"],
  parameters: {
    docs: {
      source: {
        code: `const view = useCsView({
  item: useCsInputTextItem("ラベル", useInit(""), stringRule(true)),
});
return (
  <AxInputText
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
  const init = useCsInputTextItem(
    "初期値  ※カスタマイズ不可",
    useInit("テキスト"),
    stringRule(true),
    RW.Readonly,
  );
  const required = useCsCheckBoxItem(
    "必須/任意設定",
    useInit(true),
    "必須入力にする",
  );
  const range = useCsInputNumberRangeItem(
    "文字数範囲",
    useInit([1, 10]),
    numberRule(false),
  );
  const readOnly = useCsCheckBoxItem(
    "読み取り専用設定",
    useInit(false),
    "読み取り専用にする",
  );
  const targetItem = useCsInputTextItem(
    label.value ?? "",
    useInit(init.value),
    stringRule(!!required.value, range.lowerValue, range.upperValue),
    readOnly.value ? RW.Readonly : RW.Editable,
  );
  const view = useCsView({ targetItem: targetItem });

  return (
    <>
      <AxInputText item={targetItem} />
      <hr />
      <AxInputText item={label} />
      <AxInputText item={init} />
      <AxCheckBox item={required} />
      <AxInputNumberRange
        item={range}
        antdPropsLower={{ min: 1 }}
        antdPropsUpper={{ min: 1 }}
      />
      <AxCheckBox item={readOnly} />
      <AxButton type="primary" validationViews={[view]} onClick={() => {}}>
        バリデーションを実行する
      </AxButton>
    </>
  );
};

/**
 * Itemのパラメータの値をカスタマイズすることで、入力項目のUIがどのように変化するのかを確認できます。
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
  item: useCsInputTextItem("ラベル", useInit("テキスト"), stringRule(true, 1, 10)),
});
return (
  <AxInputText
    item={view.item}
  />
);`,
      },
    },
  },
};
