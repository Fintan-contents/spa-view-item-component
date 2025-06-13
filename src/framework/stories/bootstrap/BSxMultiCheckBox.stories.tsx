// BSxMultiCheckBox の Story ファイル
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  BSxButton,
  BSxCheckBox,
  BSxInputText,
  BSxMultiCheckBox,
  BSxMultiCheckBoxProps,
} from "../../components/bootstrap";
import {
  RW,
  selectOptions,
  stringArrayRule,
  stringRule,
  useCsCheckBoxItem,
  useCsInputTextItem,
  useCsMultiCheckBoxItem,
  useCsView,
  useInit,
} from "../../logics";

/**
 * BootstrapのChecksをラップしたコンポーネントであり、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof BSxMultiCheckBox> = {
  title: "Bootstrap/BSxMultiCheckBox",
  component: BSxMultiCheckBox,
  tags: ["autodocs"],
  argTypes: {
    item: {
      control: false,
      description:
        "入力項目定義を指定します。ラベル名、入力フィールドの初期値、バリデーションルール、読み取り専用にするかの設定ができます。",
      table: {
        type: { summary: "CsMultiCheckBoxItem" },
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
      description: `BootstrapのChecksコンポーネントに渡すプロパティを指定します。
                <a href="https://getbootstrap.com/docs/5.1/forms/checks-radios/#checks" target="_blank">詳細</a><br><br>定義例：\`bsProps={{ styles: { color: "white" } }}\``,
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

const defaultArgs: Partial<BSxMultiCheckBoxProps> = {
  item: undefined,
  hideLabel: false,
  labelPlacement: "top",
  labelWidth: 30,
  showRequiredTag: "both",
};

/**
 * BSxMultiCheckBoxコンポーネントのサンプル。
 */
export const MultiCheckBox: Story = {
  args: defaultArgs,
  render: function Render(args) {
    const item = useCsMultiCheckBoxItem(
      "ラベル",
      useInit(),
      stringArrayRule(true),
      selectOptions(
        [
          { key: "option1", name: "オプション1" },
          { key: "option2", name: "オプション2" },
          { key: "option3", name: "オプション3" },
          { key: "option4", name: "オプション4" },
          { key: "option5", name: "オプション5" },
          { key: "option6", name: "オプション6" },
          { key: "option7", name: "オプション7" },
          { key: "option8", name: "オプション8" },
          { key: "option9", name: "オプション9" },
          { key: "option10", name: "オプション10" },
          { key: "option11", name: "オプション11" },
          { key: "option12", name: "オプション12" },
        ],
        "key",
        "name",
      ),
    );

    return (
      <>
        <BSxMultiCheckBox {...args} item={item} />
      </>
    );
  },
  tags: ["!autodocs", "!dev"],
  parameters: {
    docs: {
      source: {
        code: `const view = useCsView({
  item: useCsSelectBoxItem(
    "ラベル",
    useInit(),
    stringArrayRule(true),
    selectOptions(
      [
        { key: "option1", name: "オプション1" },
        { key: "option2", name: "オプション2" },
        { key: "option3", name: "オプション3" },
        { key: "option4", name: "オプション4" },
        { key: "option5", name: "オプション5" },
        { key: "option6", name: "オプション6" },
        { key: "option7", name: "オプション7" },
        { key: "option8", name: "オプション8" },
        { key: "option9", name: "オプション9" },
        { key: "option10", name: "オプション10" },
        { key: "option11", name: "オプション11" },
        { key: "option12", name: "オプション12" },
      ],
      "key",
      "name"
    )
  );
});
return (
  <BSxMultiCheckBox
    item={view.item}
  />
);`,
      },
    },
  },
};

const CustomizeItemParameters = () => {
  const [options, setOptions] = useState<{ key: string; name: string }[]>([
    { key: "option1", name: "オプション1" },
    { key: "option2", name: "オプション2" },
    { key: "option3", name: "オプション3" },
    { key: "option4", name: "オプション4" },
    { key: "option5", name: "オプション5" },
  ]);

  const label = useCsInputTextItem(
    "ラベル名",
    useInit("ラベル"),
    stringRule(true),
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
  const targetItem = useCsMultiCheckBoxItem(
    label.value ?? "",
    useInit(["option1"]),
    stringArrayRule(!!required.value),
    selectOptions(options, "key", "name"),
    readOnly.value ? RW.Readonly : RW.Editable,
  );
  const view = useCsView({ item: targetItem });

  return (
    <>
      <BSxMultiCheckBox item={targetItem} />
      <hr />
      <BSxInputText item={label} />
      <BSxInputText item={addOption} />
      <BSxButton
        onClick={() => {
          setOptions((prev) => {
            return [
              ...prev,
              { key: addOption.value ?? "", name: addOption.value ?? "" },
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
  item: useCsSelectBoxItem(
    "ラベル",
    useInit(["option1"]),
    stringArrayRule(true),
    selectOptions(
      [
        { key: "option1", name: "オプション1" },
        { key: "option2", name: "オプション2" },
        { key: "option3", name: "オプション3" },
        { key: "option4", name: "オプション4" },
        { key: "option5", name: "オプション5" },
      ],
      "key",
      "name"
    );
  ),
});
return (
  <BSxMultiCheckBox
    item={view.item}
  />
);`,
      },
    },
  },
};
