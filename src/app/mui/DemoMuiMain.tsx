import {
  CsView,
  CsInputTextItem,
  CsInputPasswordItem,
  CsRadioBoxItem,
  CsInputDateItem,
  CsSelectBoxItem,
  CsInputNumberItem,
  CsInputDateRangeItem,
  CsInputNumberRangeItem,
  CsMultiCheckBoxItem,
  CsCheckBoxItem,
  CsTextAreaItem,
  useCsView,
  useCsInputTextItem,
  useInit,
  stringRule,
  useCsInputPasswordItem,
  useCsRadioBoxItem,
  selectOptionStrings,
  useCsInputDateItem,
  RW,
  useCsSelectBoxItem,
  useCsInputNumberItem,
  numberRule,
  useCsInputDateRangeItem,
  useCsInputNumberRangeItem,
  useRangeInit,
  useCsMultiCheckBoxItem,
  stringArrayRule,
  selectOptions,
  useCsCheckBoxItem,
  useCsTextAreaItem,
  CustomValidationRules,
  stringCustomValidationRule,
  createRegExpValidator,
} from "@/framework/logics";
import { buildInCustomValidationRules } from "@/framework/validation-rules/buildInCustomValidationRules";
import { HeaderView } from "./DemoMuiHeader";
import {
  MxButton,
  MxCheckBox,
  MxInputDate,
  MxInputNumber,
  MxInputNumberRange,
  MxInputPassword,
  MxInputText,
  MxMultiCheckBox,
  MxRadioBox,
  MxSelectBox,
  MxTableLayout,
  MxTextArea,
} from "@/framework/components/mui";

// メインのViewタイプ定義
type RegisterUserView = CsView & {
  userName: CsInputTextItem;
  password: CsInputPasswordItem;
  mailAddress: CsInputTextItem;
  gender: CsRadioBoxItem;
  birthDay: CsInputDateItem;
  country: CsSelectBoxItem;
  terminalNum: CsInputNumberItem;
  subscriptionPeriod: CsInputDateRangeItem;
  budgetRange: CsInputNumberRangeItem;
  interests: CsMultiCheckBoxItem;
  newsOk: CsCheckBoxItem;
  freeText: CsTextAreaItem;
};

// メインのViewを作成するフック
const useRegisterUserView = (
  validationTrigger: "onBlur" | "onSubmit",
): RegisterUserView => {
  return useCsView(
    {
      userName: useCsInputTextItem(
        "ユーザー名",
        useInit(""),
        stringRule(true, 3, 30, "nameRule"),
      ),
      password: useCsInputPasswordItem(
        "パスワード",
        useInit(""),
        stringRule(true, 8, 16, "passwordRule"),
      ),
      mailAddress: useCsInputTextItem(
        "メールアドレス",
        useInit(""),
        stringRule(true, 8, 20, "半角英数字"),
      ),
      gender: useCsRadioBoxItem(
        "性別",
        useInit(""),
        stringRule(true),
        selectOptionStrings(["男性", "女性", "回答しない"]),
      ),
      birthDay: useCsInputDateItem(
        "生年月日",
        useInit(""),
        stringRule(true),
        RW.Editable,
        "日付を選択",
      ),
      country: useCsSelectBoxItem(
        "国籍",
        useInit(""),
        stringRule(true),
        selectOptionStrings(["日本", "アメリカ", "イギリス", "中国", "その他"]),
      ),
      terminalNum: useCsInputNumberItem(
        "利用端末数",
        useInit(),
        numberRule(true, 1, 10),
      ),
      subscriptionPeriod: useCsInputDateRangeItem(
        "購読期間",
        useInit(["2020-01-01", "2020-12-31"]),
        stringArrayRule(true),
      ),
      budgetRange: useCsInputNumberRangeItem(
        "予算範囲",
        useRangeInit<number>(),
        numberRule(false, 1, 100000),
      ),
      interests: useCsMultiCheckBoxItem(
        "興味のある分野",
        useInit<string[]>([]),
        stringArrayRule(false),
        selectOptions(
          [
            { key: "technology", name: "テクノロジー" },
            { key: "music", name: "音楽" },
            { key: "sport", name: "スポーツ" },
            { key: "art", name: "アート" },
            { key: "movies", name: "映画" },
            { key: "reading", name: "読書" },
            { key: "travel", name: "旅行" },
            { key: "cooking", name: "料理" },
            { key: "gaming", name: "ゲーム" },
            { key: "fashion", name: "ファッション" },
            { key: "health", name: "健康" },
            { key: "education", name: "教育" },
          ],
          "key",
          "name",
        ),
      ),
      newsOk: useCsCheckBoxItem("お知らせを受け取る", useInit(), "受け取る"),
      freeText: useCsTextAreaItem(
        "自由記述欄",
        useInit(""),
        stringRule(false, 0, 2000),
      ),
    },
    {
      customValidationRules: {
        ...buildInCustomValidationRules,
        ...customValidationRules,
      },
      validationTrigger: validationTrigger,
    },
  );
};

// カスタムバリデーションルールの定義
const customValidationRules: CustomValidationRules = {
  // シンプルなルール
  nameRule: stringCustomValidationRule(
    createRegExpValidator(/^[A-Za-z ]*$/),
    (label) => `${label}は、アルファベットと空白のみ使用可能です。`,
  ),
  // 複雑なルール
  passwordRule: stringCustomValidationRule(
    (newValue, item) => {
      if (!newValue) {
        return true;
      }
      let count = 0;
      if (/[A-Z]/.test(newValue)) {
        count++;
      }
      if (/[a-z]/.test(newValue)) {
        count++;
      }
      if (/[0-9]/.test(newValue)) {
        count++;
      }
      if (/[!-)+-/:-@[-`{-~]/.test(newValue)) {
        count++;
      }
      return count >= 4;
    },
    (label, newValue, item) => {
      let requireds = ["大文字", "小文字", "数字", "記号"];
      if (/[A-Z]/.test(newValue)) {
        requireds = requireds.filter((e) => "大文字" !== e);
      }
      if (/[a-z]/.test(newValue)) {
        requireds = requireds.filter((e) => "小文字" !== e);
      }
      if (/[0-9]/.test(newValue)) {
        requireds = requireds.filter((e) => "数字" !== e);
      }
      if (/[!-)+-/:-@[-`{-~]/.test(newValue)) {
        requireds = requireds.filter((e) => "記号" !== e);
      }
      return `${label}は、${requireds.join("、")}を含めてください`;
    },
  ),
};

type DemoMainProps = {
  headerView: HeaderView;
};

// メインのViewを表示するコンポーネント
const DemoMain = (props: DemoMainProps) => {
  // ヘッダのViewで設定した値をメインのViewに反映する
  const { headerView } = props;
  const validationTrigger =
    headerView.validationTrigger.value === "onBlur" ? "onBlur" : "onSubmit";
  const view: RegisterUserView = useRegisterUserView(validationTrigger);
  view.readonly = headerView.readonlyCheck.value;
  const colSize = headerView.colSize.value as 1 | 2 | 3 | 4 | 6;
  const labelPlacement = headerView.labelType.value === "left" ? "left" : "top";
  const labelWidth = headerView.labelWidth.value as
    | 5
    | 10
    | 15
    | 20
    | 25
    | 30
    | 35
    | 40
    | 45
    | 50;
  const hideLabel = headerView.labelType.value === "hidden";

  return (
    <>
      <MxTableLayout
        view={view}
        colSize={colSize}
        labelPlacement={labelPlacement}
        labelWidth={labelWidth}
        hideLabel={hideLabel}
      />
      {false && (
        <>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <MxInputText item={view.userName} />
            </div>
            <div style={{ width: "50%" }}>
              <MxInputPassword item={view.password} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <MxInputText item={view.mailAddress} />
            </div>
            <div style={{ width: "50%" }}>
              <MxRadioBox item={view.gender} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <MxInputDate item={view.birthDay} />
            </div>
            <div style={{ width: "50%" }}>
              <MxInputNumber item={view.terminalNum} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <MxSelectBox item={view.country} />
            </div>
            <div style={{ width: "50%" }}>
              <MxMultiCheckBox item={view.interests} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <MxCheckBox item={view.newsOk} />
            </div>
            <div style={{ width: "50%" }}>
              <MxInputNumberRange item={view.budgetRange} />
            </div>
          </div>
          {/* FIXME: コンポーネント自体がない 作成され次第追加*/}
          {/* <MxInputDateRange item={view.subscriptionPeriod} /> */}
          <MxTextArea item={view.freeText} />
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "15px",
        }}
      >
        <MxButton
          type="contained"
          validationViews={[view]}
          onClick={() => { }}
          addClassNames={["right"]}
        >
          バリデーション
        </MxButton>
      </div>
    </>
  );
};

export default DemoMain;
