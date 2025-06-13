// AxInputDateRange の Story ファイル
import {
  AxButton,
  AxCheckBox,
  AxInputDateRange,
  AxInputDateRangeProp,
  AxInputText,
} from "../../components/antd";
import {
  RW,
  stringArrayRule,
  stringRule,
  useCsCheckBoxItem,
  useCsInputDateRangeItem,
  useCsInputTextItem,
  useCsView,
  useInit,
} from "../../logics";
import { Meta, StoryObj } from "@storybook/react";

/**
 * Ant DesignのDatePickerをラップしたコンポーネントであり、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof AxInputDateRange> = {
  title: "ant Design/AxInputDateRange",
  component: AxInputDateRange,
  tags: ["autodocs"],
  argTypes: {
    item: {
      control: false,
      description:
        "入力項目定義を指定します。ラベル名、入力フィールドの初期値、バリデーションルール、読み取り専用にするかの設定ができます。",
      table: {
        type: { summary: "CsInputDateRangeItem" },
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
        <a href="https://ant.design/components/date-picker#datepicker" target="_blank">詳細</a><br><br>定義例：\`antdProps={size: "medium"}\``,
      table: {
        type: {
          summary: `Omit<RangePickerProps<dayjs.Dayjs>, "locale" | "generateConfig" | "hideHeader">`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<AxInputDateRangeProp> = {
  item: undefined,
  hideLabel: false,
  labelPlacement: "top",
  labelWidth: 30,
  showRequiredTag: "both",
};

/**
 * AxInputDateコンポーネントのサンプル。
 */
export const InputDate: Story = {
  args: defaultArgs,
  render: function Render(args) {
    const item = useCsInputDateRangeItem(
      "ラベル",
      useInit(["2020/1/1", "2021/12/31"]),
      stringArrayRule(true),
    );
    return (
      <>
        <AxInputDateRange {...args} item={item} />
      </>
    );
  },
  tags: ["!autodocs", "!dev"],
  parameters: {
    docs: {
      source: {
        code: `const view = useCsView({
  item: useCsInputDateRangeItem("ラベル", useInit(["2020/1/1", "2021/12/31"]), stringArrayRule(true)),
});
return (
  <AxInputDateRange
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
  const init = useCsInputDateRangeItem(
    "初期値  ※カスタマイズ不可",
    useInit(["2020/1/1", "2021/12/31"]),
    stringArrayRule(true),
    RW.Readonly,
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
  const targetItem = useCsInputDateRangeItem(
    label.value ?? "",
    useInit([init.lowerValue ?? "", init.upperValue ?? ""]),
    stringArrayRule(!!required.value),
    readOnly.value ? RW.Readonly : RW.Editable,
  );
  const view = useCsView({ item: targetItem });

  return (
    <>
      <AxInputDateRange item={targetItem} />
      <hr />
      <AxInputText item={label} />
      <AxInputDateRange item={init} />
      <AxCheckBox item={required} />
      <AxCheckBox item={readOnly} />
      <AxButton type="primary" validationViews={[view]} onClick={() => { }}>
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
  item: useCsInputDateRangeItem("ラベル", useInit(["2020/1/1", "2021/12/31"]), stringArrayRule(true)),
});
return (
  <AxInputDateRange
    item={view.item}
  />
);`,
      },
    },
  },
};
