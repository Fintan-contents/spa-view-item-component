// BSxRadioBox の Story ファイル
import { useState } from "react";
import {
  BSxButton,
  BSxCheckBox,
  BSxInputText,
  BSxRadioBox,
  BSxRadioBoxProps,
} from "../../components/bootstrap";
import {
  RW,
  selectOptions,
  stringRule,
  useCsCheckBoxItem,
  useCsInputTextItem,
  useCsRadioBoxItem,
  useCsView,
  useInit,
} from "../../logics";
import { Meta, StoryObj } from "@storybook/react";

/**
 * BootstrapのForm.Checkをラップしたコンポーネントであり、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof BSxRadioBox> = {
  title: "Bootstrap/BSxRadioBox",
  component: BSxRadioBox,
  tags: ["autodocs"],
  argTypes: {
    item: {
      control: false,
      description:
        "入力項目定義を指定します。ラベル名、入力フィールドの初期値、バリデーションルール、読み取り専用にするかの設定ができます。",
      table: {
        type: { summary: "CsRadioBoxItem" },
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
    bsProps: {
      control: false,
      description: `BootstrapのForm.Checkコンポーネントに渡すプロパティを指定します。
                <a href="https://getbootstrap.com/docs/5.1/forms/checks-radios/#radios" target="_blank">詳細</a><br><br>定義例：\`bsProps={{ size: "large" }}\``,
      table: {
        type: {
          summary: `PropsWithChildren<ReplaceProps<"input", BsPrefixProps<"input"> & FormCheckProps>>`,
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<BSxRadioBoxProps> = {
  item: undefined,
  hideLabel: false,
  labelPlacement: "top",
  labelWidth: 30,
  showRequiredTag: "both",
};

/**
 * BSxRadioBoxコンポーネントのサンプル。
 */
export const RadioBox: Story = {
  args: defaultArgs,
  render: function Render(args) {
    const item = useCsRadioBoxItem(
      "ラベル",
      useInit("option1"),
      stringRule(true),
      selectOptions([
        { value: "option1", label: "オプション1" },
        { value: "option2", label: "オプション2" },
        { value: "option3", label: "オプション3" },
      ]),
    );

    return (
      <>
        <BSxRadioBox {...args} item={item} />
      </>
    );
  },
  tags: ["!autodocs", "!dev"],
  parameters: {
    docs: {
      source: {
        code: `const view = useCsView({
  item: useCsRadioBoxItem(
    "ラベル位置",
    useInit("top"),
    stringRule(true),
    selectOptions([
      { value: "option1", label: "オプション1" },
      { value: "option2", label: "オプション2" },
      { value: "option3", label: "オプション3" },
    ])
  ),
});
return (
  <BSxRadioBox
    item={view.item}
  />
);`,
      },
    },
  },
};

const CustomizeItemParameters = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([
    { value: "option1", label: "オプション1" },
    { value: "option2", label: "オプション2" },
    { value: "option3", label: "オプション3" },
  ]);

  const label = useCsInputTextItem(
    "ラベル名",
    useInit("ラベル"),
    stringRule(true),
  );
  const init = useCsInputTextItem(
    "初期値  ※カスタマイズ不可",
    useInit(),
    stringRule(true),
    RW.Readonly,
  );
  const required = useCsCheckBoxItem(
    "必須/任意設定",
    useInit(true),
    "必須入力にする",
  );
  const addOption = useCsInputTextItem(
    "追加するオプション",
    useInit(""),
    stringRule(true),
  );
  const readOnly = useCsCheckBoxItem(
    "読み取り専用設定",
    useInit(false),
    "読み取り専用にする",
  );
  const targetItem = useCsRadioBoxItem(
    label.value ?? "",
    useInit(init.value),
    stringRule(!!required.value),
    selectOptions(options),
    readOnly.value ? RW.Readonly : RW.Editable,
  );
  const view = useCsView({ item: targetItem });

  return (
    <>
      <BSxRadioBox item={targetItem} />
      <hr />
      <BSxInputText item={label} />
      <BSxInputText item={addOption} />
      <BSxButton
        onClick={() => {
          setOptions((prev) => {
            return [
              ...prev,
              { value: addOption.value ?? "", label: addOption.value ?? "" },
            ];
          });
          addOption.setValue("");
        }}
      >
        追加
      </BSxButton>
      <BSxCheckBox item={required} />
      <BSxCheckBox item={readOnly} />
      <BSxButton type="primary" validationViews={[view]} onClick={() => {}}>
        バリデーションを実行する
      </BSxButton>
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
  item: useCsRadioBoxItem(
    "ラベル",
    useInit("top"),
    stringRule(true),
    selectOptions([
      { value: "option1", label: "オプション1" },
      { value: "option2", label: "オプション2" },
      { value: "option3", label: "オプション3" },
    ])
  ),
});
return (
  <BSxRadioBox
    item={view.item}
  />
);`,
      },
    },
  },
};
