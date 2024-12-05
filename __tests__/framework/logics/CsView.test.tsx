import { AxButton, AxInputText } from "@/framework/components/antd";
import {
  booleanCustomValidationRule,
  createRegExpValidator,
  CsItem,
  CsLoadEvent,
  CsValidationEvent,
  CsView,
  CustomValidationRules,
  executeValidation,
  RW,
  stringCustomValidationRule,
  stringRule,
  useCsInputTextItem,
  useCsView,
  useInit,
} from "@/framework/logics";
import {
  CsYupValidationEvent,
  useCsYupValidationEvent,
} from "@/framework/logics/yup/CsYupValidationEvent";
import { describe, expect, it } from "@jest/globals";
import {
  act,
  render,
  renderHook,
  screen,
  fireEvent,
} from "@testing-library/react";
import { use } from "react";

/**
 * executeValidationメソッドのテスト
 */
describe("executeValidationメソッドのテスト", () => {
  // CsValidationEventのモッククラス
  class MockValidationEvent extends CsValidationEvent {
    // テスト要のメンバ（onValidateHasErrorメソッドが返す値を設定する）
    private hasError: boolean;

    constructor(hasError: boolean) {
      super();
      this.hasError = hasError;
    }

    onValidateHasError(): boolean {
      return this.hasError;
    }

    // 以下の3メソッドはexecuteValidationのテストでは不要
    onValidateItemHasError<T>(
      newValue: T | undefined,
      item: CsItem<T>,
    ): boolean {
      return false;
    }
    validationErrorMessage(item: CsItem<unknown>): string {
      return "";
    }
    resetError(): void {}
  }

  // CsViewのモッククラス
  class MockView extends CsView {
    validationEvent?: CsValidationEvent;

    constructor(validationEvent?: CsValidationEvent) {
      super();
      this.validationEvent = validationEvent;
    }
    // 以下のメソッドはexecuteValidationのテストでは不要
    get isLoading(): boolean {
      return false;
    }
  }

  it("validationViewsがundefinedの場合、trueを返す", () => {
    expect(executeValidation(undefined)).toBe(true);
  });

  it("validationViewsが空の配列の場合、trueを返す", () => {
    expect(executeValidation([])).toBe(true);
  });

  it("validationViews内の全てのviewがバリデーションを通過する場合、trueを返す", () => {
    const views = [
      new MockView(new MockValidationEvent(false)),
      new MockView(new MockValidationEvent(false)),
    ];
    expect(executeValidation(views)).toBe(true);
  });

  it("validationViews内に1つ以上バリデーションに失敗するviewがある場合、falseを返す", () => {
    const views = [
      new MockView(new MockValidationEvent(false)),
      new MockView(new MockValidationEvent(true)),
    ];
    expect(executeValidation(views)).toBe(false);
  });
});

/**
 * useCsViewメソッドのテスト
 */
type TestComponentProps = {
  customRuleName: string;
  customRules?: CustomValidationRules;
};
const TestComponent = (props: TestComponentProps) => {
  const { customRuleName, customRules } = props;
  const view = useCsView(
    {
      item1: useCsInputTextItem(
        "label",
        useInit("あああ"),
        stringRule(true, 1, 10, customRuleName),
      ),
    },
    { customValidationRules: customRules },
  );
  return (
    <>
      <AxInputText item={view.item1} />
      <AxButton
        validationViews={[view]}
        onClick={() => console.log("clicked")}
      />
    </>
  );
};

describe("useCsViewメソッド", () => {
  const testCustomValidation = (
    customRuleName: string,
    customRules: CustomValidationRules | undefined,
    expectedMessage: string,
  ) => {
    render(
      <TestComponent
        customRuleName={customRuleName}
        customRules={customRules}
      />,
    );
    act(() => {
      fireEvent.click(screen.getByRole("button"));
    });
    const result = screen.getByText(expectedMessage);
    expect(result.className).toBe("ValidationError");
    expect(result.textContent).toBe(expectedMessage);
  };

  it("key, parentViewが設定されていること", () => {
    const view = renderHook(() =>
      useCsView({
        item1: useCsInputTextItem("label", useInit(""), stringRule(true)),
      }),
    ).result.current;
    expect(view.item1.key).toBe("item1");
    expect(view.item1.parentView).toBe(view);
  });

  it("readonlyがViewに応じてItemのreadonlyが正しく設定されること", () => {
    const view1 = renderHook(() =>
      useCsView(
        {
          readonlyItem: useCsInputTextItem(
            "label",
            useInit(""),
            stringRule(true),
            RW.Readonly,
          ),
          editableItem: useCsInputTextItem(
            "label",
            useInit(""),
            stringRule(true),
            RW.Editable,
          ),
        },
        { readonly: true },
      ),
    ).result.current;
    expect(view1.readonlyItem.isReadonly()).toBe(true);
    expect(view1.editableItem.isReadonly()).toBe(true);

    const view2 = renderHook(() =>
      useCsView(
        {
          readonlyItem: useCsInputTextItem(
            "label",
            useInit(""),
            stringRule(true),
            RW.Readonly,
          ),
          editableItem: useCsInputTextItem(
            "label",
            useInit(""),
            stringRule(true),
            RW.Editable,
          ),
        },
        { readonly: false },
      ),
    ).result.current;
    expect(view2.readonlyItem.isReadonly()).toBe(true);
    expect(view2.editableItem.isReadonly()).toBe(false);
  });

  it("CutomValidationRulesのテスト", async () => {
    testCustomValidation(
      "customRuleName",
      {
        customRuleName: stringCustomValidationRule(
          createRegExpValidator(/^[a-z]+$/),
          "エラー",
        ),
      },
      "エラー",
    );
  });

  it("CutomValidationRulesのテスト", async () => {
    testCustomValidation(
      "customRuleName",
      {
        customRuleName: stringCustomValidationRule(
          createRegExpValidator(/^[a-z]+$/),
          () => "エラー",
        ),
      },
      "エラー",
    );
  });

  it("CutomValidationRulesのテスト（カスタムバリデーションルールが登録されていない場合）", async () => {
    testCustomValidation(
      "customRuleName",
      undefined,
      "カスタムルールの定義(customValidationRules)が指定されていないのに、カスタムバリデーションルールが指定されています。ルール：[customRuleName]",
    );
  });

  it("CutomValidationRulesのテスト（カスタムバリデーションルールが適用できない場合）", async () => {
    testCustomValidation(
      "customRuleName",
      { customRuleName: booleanCustomValidationRule(() => true, "エラー") },
      "この項目には使用できないカスタムバリデーションルールです。ルール：[customRuleName]",
    );
  });

  it("CutomValidationRulesのテスト（カスタムバリデーションルールが登録されていない場合）", async () => {
    testCustomValidation(
      "notExistCustomRuleName",
      { customRuleName: booleanCustomValidationRule(() => true, "エラー") },
      "カスタムバリデーションルールが登録されていません。ルール：[notExistCustomRuleName]",
    );
  });

  it("isLoadingのテスト", () => {
    class MockLoadingEvent extends CsLoadEvent {
      private loading: boolean;

      constructor(loading: boolean) {
        super();
        this.loading = loading;
      }
      get isLoading(): boolean {
        return this.loading;
      }
      get isSuccess(): boolean {
        return !this.isLoading && !this.isError;
      }

      get isError(): boolean {
        return !!this.error;
      }

      get response(): any {
        return this.isSuccess ? "Success Response" : null;
      }

      get error(): any {
        return this.isError ? "Error Response" : null;
      }
    }

    const testIsLoading = (
      loadEvent1Loading: boolean,
      loadEvent2Loading: boolean,
      expectedIsLoading: boolean,
    ) => {
      const view = renderHook(() =>
        useCsView({
          loadEvent1: new MockLoadingEvent(loadEvent1Loading),
          loadEvent2: new MockLoadingEvent(loadEvent2Loading),
        }),
      ).result.current;
      expect(view.isLoading).toBe(expectedIsLoading);
    };

    testIsLoading(true, false, true);
    testIsLoading(false, false, false);
    testIsLoading(false, true, true);
    testIsLoading(true, true, true);
  });

  it("validationEventHookのテスト", () => {
    const view = renderHook(() =>
      useCsView(
        {
          item1: useCsInputTextItem(
            "label",
            useInit("A"),
            stringRule(true, 1, 3, "customRuleName"),
          ),
        },
        {
          customValidationRules: {
            customRuleName: stringCustomValidationRule(
              createRegExpValidator(/^[a-z]+$/),
              "エラー",
            ),
          },
        },
        useCsYupValidationEvent,
      ),
    ).result.current;
    expect(view.validationEvent).toBeInstanceOf(CsYupValidationEvent);
  });
});
