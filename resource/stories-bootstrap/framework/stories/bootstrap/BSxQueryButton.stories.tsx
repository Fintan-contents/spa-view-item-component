// BSxQueryButton の Story ファイル
import { Meta, StoryObj } from "@storybook/react";
import { useEffect } from "react";
import {
  BSxCheckBox,
  BSxInputText,
  BSxQueryButton,
  BSxQueryButtonProps,
  BSxRadioBox,
} from "../../components/bootstrap";
import {
  selectOptions,
  stringRule,
  useCsCheckBoxItem,
  useCsInputTextItem,
  useCsRadioBoxItem,
  useInit,
} from "../../logics";
import { useTodoGetView } from "./BSxQueryButton.view";

/**
 * BootstrapのButtonをラップしたコンポーネントであり、API呼び出し(useQuery)、ラベル表示、バリデーション表示、イベントハンドラなどの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof BSxQueryButton> = {
  title: "Bootstrap/BSxQueryButton",
  component: BSxQueryButton,
  tags: ["autodocs"],
  argTypes: {
    event: {
      control: false,
      description: "実行するAPI呼び出しイベントを指定します。",
      table: {
        type: { summary: "CsQueryButtonClickEvent" },
      },
    },
    type: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "dark",
        "light",
        "link",
        "outline-primary",
        "outline-secondary",
        "outline-success",
        "outline-danger",
        "outline-warning",
        "outline-info",
        "outline-dark",
        "outline-light",
      ],
      description:
        "ボタンの表示方法を指定します。指定しない場合にはBootstrapのdefaultが指定されます。",
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
    bsProps: {
      control: false,
      description: `BootstrapのButtonコンポーネントに渡すプロパティを指定します。
                <a href="https://getbootstrap.com/docs/5.1/components/buttons/" target="_blank">詳細</a><br><br>定義例：\`bsProps={{ styles: { color: "white" } }}\``,
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
      description: "API呼び出し前に実行する処理を指定します。",
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

const defaultArgs: Partial<BSxQueryButtonProps> = {
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
  bsProps: {},
};

/**
 * BSxQueryButtonコンポーネントのサンプル。
 */
export const BSxQueryButtonStory: Story = {
  args: {
    ...defaultArgs,
  },

  render: function Render(args: BSxQueryButtonProps) {
    const todoListView = useTodoGetView("success");

    return (
      <>
        <div style={{ marginBottom: "30px" }}></div>
        <BSxQueryButton
          {...args}
          event={todoListView.searchButton}
          onBeforeApiCall={() => {
            todoListView.validationEvent?.resetError();
          }}
        >
          {args.children}
        </BSxQueryButton>
        <div style={{ marginBottom: "30px" }}></div>
      </>
    );
  },
  tags: ["!autodocs", "!dev"],
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `type TodosGetView = CsView & {
  page: CsInputNumberItem;
  searchButton: CsRqQueryButtonClickEvent<ListTodoResponse | undefined>;
};

export const useTodoGetView = (): TodosGetView => {
  const page = useCsInputNumberItem("page", useInit(1), numberRule(false, 1, 10), RW.Editable);
  const view = useCsView(
    {
      page: page,
      searchButton: useCsRqQueryButtonClickEvent(
        useListTodo(
          { page: page.value, size: 100 },
          {
            query: {
              enabled: false,
              refetchOnWindowFocus: false,
            },
          }
        )
      ),
    },
    {
      validationTrigger: "onSubmit",
    }
  ) as TodosGetView;
  return view;
};
return (
  <BSxQueryButton
    event={todoGetView.searchButton}
    validationViews={[todoGetView]}
  />
);`,
      },
    },
  },
};
const CustomizeItemParameters = () => {
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
      { value: "none", label: "バリデーションエラー" },
    ]),
  );
  const disable = useCsCheckBoxItem("無効", useInit(false), "無効にする");
  const confirm = useCsCheckBoxItem(
    "確認ダイアログ",
    useInit(false),
    "表示する",
  );

  const todoGetView = useTodoGetView(
    messageOption.value as "success" | "fail" | "validate",
  );

  useEffect(() => {
    if (messageOption.value === "success") {
      todoGetView.page.setValue(1);
    } else if (messageOption.value === "fail") {
      todoGetView.page.setValue(4);
    } else {
      todoGetView.page.setValue(1000);
    }
  }, [messageOption.value, todoGetView.page]);

  return (
    <>
      <div style={{ height: "30px" }} />
      <div style={{ position: "relative", left: "-50%" }}>
        <BSxQueryButton
          {...defaultArgs}
          bsProps={{ disabled: disable.value }}
          event={todoGetView.searchButton}
          disabledReason={defaultArgs.disabledReason}
          validationViews={[todoGetView]}
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
          {label.value}
        </BSxQueryButton>
        <div style={{ height: "30px" }} />
      </div>
      <hr />
      <BSxInputText item={label} />
      <BSxRadioBox item={messageOption} />
      <BSxCheckBox item={disable} />
      <BSxCheckBox item={confirm} />
    </>
  );
};

/**
 * Buttonのパラメータの値をカスタマイズすることで、ボタンのUIがどのように変化するのかを確認することができます。
 */
export const CustomizeButtonParametersStory = {
  render: function Render() {
    return <CustomizeItemParameters />;
  },
  parameters: {
    docs: {
      source: {
        code: `type TodosGetView = CsView & {
  page: CsInputNumberItem;
  searchButton: CsRqQueryButtonClickEvent<ListTodoResponse | undefined>;
};

export const useTodoGetView = (): TodosGetView => {
  const page = useCsInputNumberItem("page", useInit(1), numberRule(false, 1, 10), RW.Editable);
  const view = useCsView(
    {
      page: page,
      searchButton: useCsRqQueryButtonClickEvent(
        useListTodo(
          { page: page.value, size: 100 },
          {
            query: {
              enabled: false,
              refetchOnWindowFocus: false,
            },
          }
        )
      ),
    },
    {
      validationTrigger: "onSubmit",
    }
  ) as TodosGetView;
  return view;
};
return (
  <BSxQueryButton
    event={todoGetView.searchButton}
    validationViews={[todoGetView]}
  />
);`,
      },
    },
  },
};