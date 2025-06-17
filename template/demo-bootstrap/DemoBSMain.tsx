import {
  BSxButton,
  BSxCheckBox,
  BSxInputDate,
  BSxInputDateRange,
  BSxInputNumber,
  BSxInputNumberRange,
  BSxInputPassword,
  BSxInputText,
  BSxMultiCheckBox,
  BSxRadioBox,
  BSxSelectBox,
  BSxTableLayout,
  BSxTextArea,
} from "@{{COPY_ROOT_PATH}}/framework/components/bootstrap";
import {
  createRegExpValidator,
  CsCheckBoxItem,
  CsInputDateItem,
  CsInputDateRangeItem,
  CsInputNumberItem,
  CsInputNumberRangeItem,
  CsInputPasswordItem,
  CsInputTextItem,
  CsMultiCheckBoxItem,
  CsRadioBoxItem,
  CsSelectBoxItem,
  CsTextAreaItem,
  CsView,
  CustomValidationRules,
  numberRule,
  RW,
  selectOptions,
  selectOptionStrings,
  stringArrayRule,
  stringCustomValidationRule,
  stringRule,
  useCsCheckBoxItem,
  useCsInputDateItem,
  useCsInputDateRangeItem,
  useCsInputNumberItem,
  useCsInputNumberRangeItem,
  useCsInputPasswordItem,
  useCsInputTextItem,
  useCsMultiCheckBoxItem,
  useCsRadioBoxItem,
  useCsSelectBoxItem,
  useCsTextAreaItem,
  useCsView,
  useInit,
  useRangeInit,
} from "@{{COPY_ROOT_PATH}}/framework/logics";
import { buildInCustomValidationRules } from "@{{COPY_ROOT_PATH}}/framework/validation-rules/buildInCustomValidationRules";
import { HeaderView } from "./DemoBSHeader";

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
        RW.Editable,
        "山田 太郎",
        "user-name-input",
      ),
      password: useCsInputPasswordItem(
        "パスワード",
        useInit(""),
        stringRule(true, 8, 16, "passwordRule"),
        RW.Editable,
        undefined,
        "password-input",
      ),
      mailAddress: useCsInputTextItem(
        "メールアドレス",
        useInit(""),
        stringRule(true, 8, 20, "半角英数字記号"),
        RW.Editable,
        "abc@example.com",
        "mail-address-input",
      ),
      gender: useCsRadioBoxItem(
        "性別",
        useInit(""),
        stringRule(true),
        selectOptionStrings(["男性", "女性", "回答しない"]),
        RW.Editable,
        "gender-radio",
      ),
      birthDay: useCsInputDateItem(
        "生年月日",
        useInit(""),
        stringRule(true),
        RW.Editable,
        undefined,
        "birthday-input",
      ),
      country: useCsSelectBoxItem(
        "国籍",
        useInit(""),
        stringRule(true),
        selectOptionStrings(["日本", "アメリカ", "イギリス", "中国", "その他"]),
        RW.Editable,
        undefined,
        "country-select",
      ),
      terminalNum: useCsInputNumberItem(
        "利用端末数",
        useInit(),
        numberRule(true, 1, 10),
        RW.Editable,
        "1",
        "terminal-num-input",
      ),
      subscriptionPeriod: useCsInputDateRangeItem(
        "購読期間",
        useRangeInit<string>(),
        stringArrayRule(true),
        RW.Editable,
        undefined,
        undefined,
        "subscription-period-input",
      ),
      budgetRange: useCsInputNumberRangeItem(
        "予算範囲",
        useRangeInit<number>(),
        numberRule(false, 1, 100000),
        RW.Editable,
        "1000",
        "5000",
        "budget-range-input",
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
        RW.Editable,
        "interests-checkbox",
      ),
      newsOk: useCsCheckBoxItem(
        "お知らせを受け取る",
        useInit(),
        "受け取る",
        RW.Editable,
        undefined,
        "news-ok-checkbox",
      ),
      freeText: useCsTextAreaItem(
        "自由記述欄",
        useInit(""),
        stringRule(false, 0, 2000),
        RW.Editable,
        undefined,
        "free-text-area",
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
    (newValue) => {
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
    (label, newValue) => {
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
      {/* 自動レイアウトを適用 */}
      <BSxTableLayout
        view={view}
        colSize={colSize}
        labelPlacement={labelPlacement}
        labelWidth={labelWidth}
        hideLabel={hideLabel}
      />
      {false && ( // 非表示：自動レイアウトを使用しない場合
        <>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <BSxInputText item={view.userName} />
            </div>
            <div style={{ width: "50%" }}>
              <BSxInputPassword item={view.password} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <BSxInputText item={view.mailAddress} />
            </div>
            <div style={{ width: "50%" }}>
              <BSxRadioBox item={view.gender} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <BSxInputDate item={view.birthDay} />
            </div>
            <div style={{ width: "50%" }}>
              <BSxInputNumber item={view.terminalNum} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <BSxSelectBox item={view.country} />
            </div>
            <div style={{ width: "50%" }}>
              <BSxMultiCheckBox item={view.interests} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <BSxCheckBox item={view.newsOk} />
            </div>
            <div style={{ width: "50%" }}>
              <BSxInputNumberRange item={view.budgetRange} />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <BSxInputDateRange item={view.subscriptionPeriod} />
            </div>
            <div style={{ width: "50%" }}>
              <BSxTextArea item={view.freeText} />
            </div>
          </div>
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "15px",
        }}
      >
        <BSxButton
          type="outlined"
          validationViews={[view]}
          successMessage="バリデーション成功"
          onClick={() => {
            return true;
          }}
          disabledReason="無効"
          bsProps={{ variant: "primary", disabled: false }}
          dataTestId="validation-button"
        >
          バリデーション
        </BSxButton>
      </div>
    </>
  );
};

export default DemoMain;
