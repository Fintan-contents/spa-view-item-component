import { Meta, StoryObj } from "@storybook/react";
import {
  AxButton,
  AxButtonProps,
  AxCheckBox,
  AxInputText,
  AxRadioBox,
} from "../../components/antd";
import {
  selectOptions,
  stringRule,
  useCsCheckBoxItem,
  useCsInputTextItem,
  useCsRadioBoxItem,
  useCsView,
  useInit,
} from "../../logics";

/**
 * Ant DesignのButtonをラップしたコンポーネントであり、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof AxButton> = {
  title: "ant Design/AxButton",
  component: AxButton,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["default", "link", "text", "primary", "dashed"],
      description:
        "ボタンの表示方法を指定します。指定しない場合にはAnt Designのdefaultが指定されます。",
    },
    onClick: {
      control: false,
      description:
        "クリック時のイベントハンドラを指定します。バリデーションのエラーがない場合に実行されます。成功や失敗を定義したい場合は戻り値がbooleanの関数を渡します。",
      table: {
        type: { summary: "(() => boolean) | (() => void)" },
      },
    },
    validationViews: {
      control: false,
      description: "バリデーション対象のViewを指定します。",
      table: {
        type: { summary: "CsView[]" },
      },
    },
    successMessage: {
      control: "text",
      description:
        "onClickがtrueを返した場合に表示されるメッセージを指定します。",
    },
    errorMessage: {
      control: "text",
      description:
        "onClickがfalseを返した場合に表示されるメッセージを指定します。",
    },
    validateErrorMessage: {
      control: "text",
      description:
        "バリデーションエラーが発生したときのメッセージを指定します。",
    },
    disabledReason: {
      control: "text",
      description: `ボタンが\`disabled\`状態の時にマウスオーバーで表示されるメッセージを指定します。<br>メッセージのみを指定したい場合はdisabledTooltipPropsではなくこちらを使用してください`,
    },
    disabledTooltipProps: {
      control: false,
      description: `ボタンが\`disabled\`状態の時にマウスオーバーで表示されるメッセージのスタイルを設定します。<br>メッセージやスタイルを含めて指定したい場合はdisabledReasonではなくこちらを使用してください。`,
    },
    confirmOption: {
      control: false,
      description:
        "確認ダイアログに表示するタイトルやテキストなどを指定します。",
    },
    onAfterClickSuccess: {
      control: false,
      description: `onClickで指定した処理が成功した後の処理を指定します。`,
    },
    onAfterClickError: {
      control: false,
      description: "onClickで指定した処理が失敗した後の処理を指定します。",
    },
    children: {
      control: "text",
      description: "ボタンに埋め込む文字を指定します。",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    addClassNames: {
      control: false,
      description: `追加するCSSのクラス名を指定します。CSSのクラス名は複数指定することができます。<br><br>
      ボタンのデフォルト位置は右下に指定されていますが\`"horizontal-center"\`など指定することで位置を指定することができます。<br>定義例：\`addClassNames={["horizontal-center", "css-style2"]}\``,
    },
    antdProps: {
      control: false,
      description: `Ant DesignのButtonコンポーネントに渡すプロパティを指定します。
        <a href="https://ant.design/components/button#api" target="_blank">詳細</a><br><br>定義例：\`antdProps={{ styles: { color: "white" } }}\``,
      table: {
        type: { summary: "ButtonProps" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<AxButtonProps> = {
  onClick: () => {},
  type: "primary",
  children: "ボタン",
  validationViews: undefined,
  successMessage: "正常に処理が完了しました。",
  errorMessage: "エラーが発生しました。",
  validateErrorMessage: "バリデーションエラーが発生しました。",
  disabledReason: "入力値が不正です。",
  disabledTooltipProps: undefined,
  onAfterClickSuccess: () => {},
  onAfterClickError: () => {},
  confirmOption: undefined,
  addClassNames: [],
  antdProps: {},
};

/**
 * AxButtonコンポーネントのサンプル。
 */
export const AxButtonStory: Story = {
  args: {
    ...defaultArgs,
  },
  render: function Render(args: AxButtonProps) {
    return (
      <>
        <div style={{ marginBottom: "30px" }}></div>
        <AxButton {...args}>{args.children}</AxButton>
        <div style={{ marginBottom: "30px" }}></div>
      </>
    );
  },
  tags: ["!autodocs", "!dev"],
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `
<AxButton
  onClick={() => {}}
  type="primary"
>
  AxButton
</AxButton>`,
      },
    },
  },
};

const CustomizeItemParameters = (args: AxButtonProps) => {
  const buttonName = useCsInputTextItem(
    "ボタン名",
    useInit("ボタン"),
    stringRule(true),
  );
  const messageOption = useCsRadioBoxItem(
    "メッセージオプション",
    useInit("success"),
    stringRule(true),
    selectOptions([
      { value: "success", label: "成功" },
      { value: "fail", label: "失敗" },
      { value: "validate", label: "バリデーションエラー" },
    ]),
  );
  const disable = useCsCheckBoxItem("無効", useInit(false), "無効にする");
  const confirm = useCsCheckBoxItem(
    "確認ダイアログ",
    useInit(false),
    "表示する",
  );

  const validateFail = useCsInputTextItem(
    "バリデーション失敗",
    useInit("バリデーション失敗"),
    stringRule(true, 0, 1),
  );
  const view = useCsView({ item: validateFail });

  return (
    <>
      <div style={{ padding: "30px" }}></div>
      <AxButton
        {...args}
        antdProps={{ disabled: disable.value }}
        addClassNames={["horizontal-center", "vertical-center"]}
        onClick={() => {
          if (messageOption.value === "success") {
            return true;
          } else if (messageOption.value === "fail") {
            return false;
          }
        }}
        validationViews={
          messageOption.value === "validate" ? [view] : undefined
        }
        confirmOption={
          confirm.value
            ? {
                title: "確認",
                content: "本当に実行しますか？",
                okText: "実行",
                cancelText: "キャンセル",
              }
            : undefined
        }
      >
        {buttonName.value}
      </AxButton>
      <div style={{ marginBottom: "30px" }}></div>
      <hr />
      <AxInputText item={buttonName} />
      <AxRadioBox item={messageOption} />
      <AxCheckBox item={disable} />
      <AxCheckBox item={confirm} />
    </>
  );
};

export const CustomizeItemParametersStory = {
  args: {
    ...defaultArgs,
  },
  render: function Render(args: AxButtonProps) {
    return <CustomizeItemParameters {...args} />;
  },
  parameters: {
    docs: {
      source: {
        code: `const view = useCsView({
  item: useCsInputTextItem("ラベル", useInit("初期値"), stringRule(true, 0, 10)),
  });
return (
  <AxButton
    onClick={() => {return true}}
    validationViews={[view]}
  >
    ボタン
  </AxButton>
);`,
      },
    },
  },
};
