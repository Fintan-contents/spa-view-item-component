// BSxTableLayout の Story ファイル
import { Meta, StoryObj } from "@storybook/react";
import {
  BSxButton,
  BSxTableLayout,
  BSxTableLayoutProps,
} from "../../components/bootstrap";
import {
  selectOptionStrings,
  stringRule,
  useCsInputPasswordItem,
  useCsInputTextItem,
  useCsRadioBoxItem,
  useCsView,
  useInit,
} from "../../logics";

/**
 * BootstrapのTableLayoutをラップしたコンポーネントであり、コンポーネントの自動配置、ラベル表示などの主要な機能が内部に実装されています。
 */
const meta: Meta<typeof BSxTableLayout> = {
  title: "Bootstrap/BSxTableLayout",
  component: BSxTableLayout,
  tags: ["autodocs"],
  argTypes: {
    view: {
      control: false,
      description:
        "画面全体と各入力項目のタイプの定義をまとめたオブジェクトを指定します。",
      table: {
        type: { summary: "CsView" },
      },
    },
    colSize: {
      control: "select",
      description: "1行に表示する画面項目の数を指定します。",
    },
    hideLabel: {
      control: "boolean",
      description: "ラベルを非表示にするかどうかを指定します。",
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Partial<BSxTableLayoutProps> = {
  view: undefined,
  colSize: 2,
  hideLabel: false,
  labelPlacement: "top",
  labelWidth: 30,
};

export const BSxTableLayoutStory: Story = {
  args: defaultArgs,
  render: function Render(args: BSxTableLayoutProps) {
    const view = useCsView({
      userName: useCsInputTextItem("ユーザー名", useInit(""), stringRule(true)),
      password: useCsInputPasswordItem(
        "パスワード",
        useInit(""),
        stringRule(true),
      ),
      mailAddress: useCsInputTextItem(
        "メールアドレス",
        useInit(""),
        stringRule(true),
      ),
      tel: useCsInputTextItem("電話番号", useInit(""), stringRule(true)),
      gender: useCsRadioBoxItem(
        "性別",
        useInit(""),
        stringRule(true),
        selectOptionStrings(["男性", "女性", "回答しない"]),
      ),
    });
    return (
      <>
        <BSxTableLayout {...args} view={view} />
        <BSxButton type="primary" validationViews={[view]} onClick={() => {}}>
          ボタン
        </BSxButton>
      </>
    );
  },
  parameters: {
    tags: ["autodocs"],
    docs: {
      source: {
        code: `const view = useCsView({
  userName: useCsInputTextItem("ユーザー名", useInit(""), stringRule(true)),
  password: useCsInputPasswordItem("パスワード", useInit(""), stringRule(true)),
  mailAddress: useCsInputTextItem("メールアドレス", useInit(""), stringRule(true)),
  tel: useCsInputTextItem("電話番号", useInit(""), stringRule(true)),
  gender: useCsRadioBoxItem("性別", useInit(""), stringRule(true), selectOptionStrings(["男性", "女性", "回答しない"])),
});
return (
  <BSxTableLayout
    colSize={2}
    view={view}
  />
);`,
      },
    },
  },
};