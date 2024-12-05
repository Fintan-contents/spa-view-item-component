// AxMutateButton の Story ファイル
import { Meta, StoryObj } from "@storybook/react";
import {
  AxCheckBox,
  AxInputText,
  AxMutateButton,
  AxMutateButtonProps,
  AxRadioBox,
} from "../../components/antd";
import {
  selectOptions,
  stringRule,
  useCsCheckBoxItem,
  useCsInputTextItem,
  useCsRadioBoxItem,
  useInit,
} from "../../logics";
import { useTodoPostView } from "./AxMutateButton.view";
import { useEffect } from "react";

/**
 * Ant DesignのButtonをラップしたコンポーネントであり、API呼び出し(useMutate)、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof AxMutateButton> = {
  title: "ant Design/AxMutateButton",
  component: AxMutateButton,
  tags: ["autodocs"],
  argTypes: {
    event: {
      control: false,
      description: "実行するAPI呼び出しイベントを指定します。",
      table: {
        type: { summary: "CsMutateButtonClickEvent" },
      },
    },
    type: {
      control: "select",
      options: ["default", "link", "text", "primary", "dashed"],
      description:
        "ボタンの表示方法を指定します。指定しない場合にはAnt Designのdefaultが指定されます。",
    },
    validationViews: {
      control: false,
      description: "バリデーション対象のビューを指定します。",
      table: {
        type: { summary: "CsView[]" },
      },
    },
    successMessage: {
      control: "text",
      description:
        "正常系のレスポンスが返ってきた場合のメッセージを指定します。",
    },
    errorMessage: {
      control: "text",
      description:
        "異常系のレスポンスが返ってきた場合のメッセージを指定します。",
    },
    validateErrorMessage: {
      control: "text",
      description:
        "バリデーションエラーが発生した場合のメッセージを指定します。",
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
    confirmOption: {
      control: false,
      description:
        "確認ダイアログに表示するタイトルやテキストなどを指定します。",
    },
    onBeforeApiCall: {
      control: false,
      description: `API呼び出し前に実行する処理を指定します。`,
      table: {
        type: {
          summary:
            "((event: CsMutateButtonClickEvent<unknown, unknown, unknown>) => void) | ((event: CsMutateButtonClickEvent<unknown, unknown, unknown>) => Promise<void>)",
        },
      },
    },
    onAfterApiCallSuccess: {
      control: false,
      description: "API呼び出し成功後に実行する処理を指定します。",
      table: {
        type: {
          summary:
            "((event: CsMutateButtonClickEvent<unknown, unknown, unknown>) => void) | ((event: CsMutateButtonClickEvent<unknown, unknown, unknown>) => Promise<void>)",
        },
      },
    },
    onAfterApiCallError: {
      control: false,
      description: "API呼び出し失敗後に実行する処理を指定します。",
      table: {
        type: {
          summary:
            "((event: CsMutateButtonClickEvent<unknown, unknown, unknown>) => void) | ((event: CsMutateButtonClickEvent<unknown, unknown, unknown>) => Promise<void>)",
        },
      },
    },
    disabledReason: {
      control: "text",
      description: `ボタンが\`disabled\`状態の時にマウスオーバーで表示されるメッセージを指定します。<br>メッセージのみを指定したい場合はdisabledTooltipPropsではなくこちらを使用してください`,
    },
    disabledTooltipProps: {
      control: false,
      description: `ボタンが\`disabled\`状態の時にマウスオーバーで表示されるメッセージのスタイルを設定します。<br>メッセージやスタイルを含めて指定したい場合はdisabledReasonではなくこちらを使用してください。`,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<AxMutateButtonProps> = {
  event: undefined,
  type: "primary",
  children: "ボタン",
  validationViews: undefined,
  successMessage: "正常に処理が完了しました。",
  errorMessage: "エラーが発生しました。",
  validateErrorMessage: "バリデーションエラーが発生しました。",
  disabledReason: "入力値が不正です。",
  disabledTooltipProps: {},
  onBeforeApiCall: undefined,
  onAfterApiCallSuccess: undefined,
  onAfterApiCallError: undefined,
  confirmOption: undefined,
  addClassNames: [],
  antdProps: {},
};

/**
 * AxMutateButtonコンポーネントのサンプル。
 */
export const AxMutateButtonStory: Story = {
  args: {
    ...defaultArgs,
    children: "ボタン",
  },

  render: function Render(args: AxMutateButtonProps) {
    const todoPostView = useTodoPostView("success");
    todoPostView.createButton.setRequest({
      data: {
        title: todoPostView.title.value ?? "",
        description: todoPostView.description.value ?? "",
      },
    });

    return (
      <>
        <div style={{ marginBottom: "30px" }}></div>
        <AxMutateButton {...args} event={todoPostView.createButton}>
          {args.children}
        </AxMutateButton>
        <div style={{ marginBottom: "30px" }}></div>
      </>
    );
  },
  tags: ["!autodocs", "!dev"],
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `type TodoPostView = CsView & {
  title: CsInputTextItem;
  description: CsTextAreaItem;
  createButton: CsMutateButtonClickEvent<
    {
      data: TodoRegistration;
    },
    Todo
  >;
};

export const useTodoPostView = (): TodoPostView => {
  return useCsView(
    {
      title: useCsInputTextItem(
        "タイトル",
        useInit(""),
        stringRule(false, 1, 10),
        RW.Editable,
      ),
      description: useCsTextAreaItem(
        "説明",
        useInit(""),
        stringRule(false),
        RW.Editable,
      ),
      createButton: useCsRqMutateButtonClickEvent(usePostTodo()),
    },
    {
      validationTrigger: "onSubmit",
    },
  );
};
const todoPostView = useTodoPostView();
return (
  <AxMutateButton
    event={todoPostView.createButton}
    validationViews={[todoPostView]}
  />
);`,
      },
    },
  },
};
const CustomizeItemParameters = (args: AxMutateButtonProps) => {
  const label = useCsInputTextItem(
    "ボタン名",
    useInit(defaultArgs.children?.toString()),
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

  const todoPostView = useTodoPostView(
    messageOption.value as "success" | "fail" | "validate",
  );
  todoPostView.createButton.setRequest({
    data: {
      title: todoPostView.title.value ?? "",
      description: todoPostView.description.value ?? "",
    },
  });

  useEffect(() => {
    if (messageOption.value === "success") {
      todoPostView.title.setValue("1234567890");
    } else if (messageOption.value === "fail") {
      todoPostView.title.setValue("fail");
    } else {
      todoPostView.title.setValue("12345678901");
    }
  }, [messageOption.value, todoPostView.title]);

  return (
    <>
      <div style={{ marginBottom: "30px" }}></div>
      <AxMutateButton
        {...args}
        antdProps={{ disabled: disable.value }}
        event={todoPostView.createButton}
        validationViews={[todoPostView]}
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
        addClassNames={["horizontal-center", "vertical-center"]}
      >
        {label.value}
      </AxMutateButton>
      <div style={{ marginBottom: "30px" }}></div>
      <hr />
      <AxInputText item={label} />
      <AxRadioBox item={messageOption} />
      <AxCheckBox item={disable} />
      <AxCheckBox item={confirm} />
    </>
  );
};

/**
 * Buttonのパラメータの値をカスタマイズすることで、ボタンのUIがどのように変化するのかを確認することができます。
 */
export const CustomizeButtonParametersStory = {
  args: {
    ...defaultArgs,
  },
  render: function Render(args: AxMutateButtonProps) {
    return <CustomizeItemParameters {...args} />;
  },
  parameters: {
    docs: {
      source: {
        code: `type TodoPostView = CsView & {
  title: CsInputTextItem;
  description: CsTextAreaItem;
  createButton: CsMutateButtonClickEvent<
    {
      data: TodoRegistration;
    },
    Todo
  >;
};

export const useTodoPostView = (): TodoPostView => {
  return useCsView(
    {
      title: useCsInputTextItem(
        "タイトル",
        useInit(""),
        stringRule(false, 1, 10),
        RW.Editable,
      ),
      description: useCsTextAreaItem(
        "説明",
        useInit(""),
        stringRule(false),
        RW.Editable,
      ),
      createButton: useCsRqMutateButtonClickEvent(usePostTodo()),
    },
    {
      validationTrigger: "onSubmit",
    },
  );
};
const view = useCsView({
  item: useCsInputTextItem("ラベル", useInit("初期値"), stringRule(true, 0, 10)),
});
return (
  <AxMutateButton
  event={todoPostView.createButton}
  validationViews={[todoPostView]}
  />
);`,
      },
    },
  },
};
