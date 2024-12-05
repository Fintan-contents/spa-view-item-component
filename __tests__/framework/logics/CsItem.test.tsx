import {
  createRegExpValidator,
  CsStringItem,
  numberRule,
  RW,
  selectOptions,
  stringArrayRule,
  stringRule,
  useCsCheckBoxItem,
  useCsInputNumberItem,
  useCsInputTextItem,
  useCsMultiCheckBoxItem,
  useCsView,
  useInit,
} from "@/framework/logics";
import { describe, expect, it, jest } from "@jest/globals";
import { render, renderHook, screen } from "@testing-library/react";
import {
  booleanCustomValidationRule,
  BooleanValidationRule,
  customValidationRule,
  numberCustomValidationRule,
  NumberValidationRule,
  stringArrayCustomValidationRule,
  stringCustomValidationRule,
} from "@/framework/logics/CsItem";
import { StringValidationRule } from "@/framework/logics/CsItem";
import { act } from "react";
import { AxInputText } from "@/framework/components/antd";
import userEvent from "@testing-library/user-event";

/**
 * createRegExpValidatorメソッドのテスト
 */
describe("createRegExpValidatorメソッドのテスト", () => {
  it("正規表現に一致する場合、trueを返す", () => {
    const pattern = /^[a-zA-Z0-9]+$/;
    const validator = createRegExpValidator(pattern);
    const item = new CsStringItem();
    const result = validator("test123", item);
    expect(result).toBe(true);
  });

  it("正規表現に一致しない場合、falseを返す", () => {
    const pattern = /^[a-zA-Z0-9]+$/;
    const validator = createRegExpValidator(pattern);
    const item = new CsStringItem();
    const result = validator("test 123", item);
    expect(result).toBe(false);
  });

  it("値がundefinedの場合、falseを返す", () => {
    const pattern = /^[a-zA-Z0-9]+$/;
    const validator = createRegExpValidator(pattern);
    const item = new CsStringItem();
    const result = validator(undefined, item);
    expect(result).toBe(false);
  });

  it("空文字の場合、falseを返す", () => {
    const pattern = /^[a-zA-Z0-9]+$/;
    const validator = createRegExpValidator(pattern);
    const item = new CsStringItem();
    const result = validator("", item);
    expect(result).toBe(false);
  });
});

/**
 * stringCustomValidationRuleメソッドのテスト
 */
describe("stringCustomValidationRuleメソッドのテスト", () => {
  it("カスタムバリデーションが正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView(
        {
          item1: useCsInputTextItem(
            "test",
            useInit("test"),
            stringRule(true, 0, 10, "customRuleName"),
          ),
        },
        {
          customValidationRules: {
            customRuleName: stringCustomValidationRule(
              (newValue, item) => newValue === "test",
              "エラー",
            ),
          },
        },
      ),
    ).result.current;
    act(() => {
      expect(view.item1.validateAnytime("test")).toBe(false);
      expect(view.item1.validateAnytime("sample")).toBe(true);
    });
  });

  it("バリデーションメッセージが正しく設定されることを確認する", () => {
    const validator = (newValue: string | undefined) => newValue === "valid";
    const message = "無効な値です";
    const rule = stringCustomValidationRule(validator, message);
    act(() => {
      expect(rule.message).toBe(message);
    });
  });
});

/**
 * numberCustomValidationRuleメソッドのテスト
 */
describe("numberCustomValidationRuleメソッドのテスト", () => {
  it("カスタムバリデーションが正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView(
        {
          item1: useCsInputNumberItem(
            "test",
            useInit(10),
            numberRule(true, 0, 20, "customRuleName"),
          ),
        },
        {
          customValidationRules: {
            customRuleName: numberCustomValidationRule((newValue, item) => {
              if (!newValue) return true;
              if (newValue < 20) return true;
              return false;
            }, "エラー"),
          },
        },
      ),
    ).result.current;
    act(() => {
      expect(view.item1.validateAnytime(10)).toBe(false);
      expect(view.item1.validateAnytime(30)).toBe(true);
      expect(view.item1.validateAnytime(undefined)).toBe(true);
    });
  });

  it("バリデーションメッセージが正しく設定されることを確認する", () => {
    const validator = (newValue: number | undefined) => newValue === 10;
    const message = "無効な値です";
    const rule = numberCustomValidationRule(validator, message);
    act(() => {
      expect(rule.message).toBe(message);
    });
  });
});

/**
 * booleanCustomValidationRuleメソッドのテスト
 */
describe("booleanCustomValidationRuleメソッドのテスト", () => {
  it("カスタムバリデーションが正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView(
        {
          item1: useCsCheckBoxItem(
            "test",
            useInit(true),
            "test",
            RW.Editable,
            new BooleanValidationRule().setCustomRuleName("customRuleName"),
          ),
        },
        {
          customValidationRules: {
            customRuleName: booleanCustomValidationRule(
              (newValue, item) => newValue == true,
              "エラー",
            ),
          },
        },
      ),
    ).result.current;
    act(() => {
      expect(view.item1.validateAnytime(true)).toBe(false);
      expect(view.item1.validateAnytime(false)).toBe(true);
    });
  });
});

/**
 * stringArrayCustomValidationRuleメソッドのテスト
 */
describe("stringArrayCustomValidationRuleメソッドのテスト", () => {
  it("カスタムバリデーションが正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView(
        {
          item1: useCsMultiCheckBoxItem(
            "test",
            useInit<string[]>(["test"]),
            stringArrayRule(false, "customRuleName"),
            selectOptions([{ value: "test", label: "test" }]),
          ),
        },
        {
          customValidationRules: {
            customRuleName: stringArrayCustomValidationRule(
              (newValue, item) => {
                if (!newValue) return true;
                if (newValue.includes("test")) return true;
                return false;
              },
              "エラー",
            ),
          },
        },
      ),
    ).result.current;
    act(() => {
      expect(view.item1.validateAnytime(["test"])).toBe(false);
      expect(view.item1.validateAnytime(["sample"])).toBe(true);
    });
  });
});

/**
 * ValidationRuleクラスのテスト
 * setRequiredメソッド
 * setCustomRuleNameメソッド
 */
describe("ValidationRuleクラスのテスト", () => {
  it("canApplyValueメソッドが正しく動作することを確認する", () => {
    const ruleNumber = numberCustomValidationRule(
      (newValue, item) => newValue === 10,
      "エラー",
    );
    expect(ruleNumber.canApplyValue(10)).toBe(true);
    expect(ruleNumber.canApplyValue(undefined)).toBe(true);
    expect(ruleNumber.canApplyValue("10")).toBe(false);

    const ruleString = stringCustomValidationRule(
      (newValue, item) => newValue === "test",
      "エラー",
    );
    expect(ruleString.canApplyValue("test")).toBe(true);
    expect(ruleString.canApplyValue(undefined)).toBe(true);
    expect(ruleString.canApplyValue(10)).toBe(false);

    const ruleBoolean = booleanCustomValidationRule(
      (newValue, item) => newValue === true,
      "エラー",
    );
    expect(ruleBoolean.canApplyValue(true)).toBe(true);
    expect(ruleBoolean.canApplyValue(undefined)).toBe(true);
    expect(ruleBoolean.canApplyValue("true")).toBe(false);

    const ruleStringArray = stringArrayCustomValidationRule(
      (newValue, item) => {
        // if (!newValue) return true;
        return newValue?.includes("test") ?? true;
      },
      "エラー",
    );
    expect(ruleStringArray.canApplyValue(["test"])).toBe(true);
    expect(ruleStringArray.canApplyValue(undefined)).toBe(true);
    expect(ruleStringArray.canApplyValue(["sample"])).toBe(true);
    expect(ruleStringArray.canApplyValue(1)).toBe(false);
    expect(ruleStringArray.canApplyValue({})).toBe(false);
    expect(ruleStringArray.canApplyValue(["test", 1, {}])).toBe(false);

    const rule = customValidationRule<string>(
      (newValue, item) => newValue === "test",
      "エラー",
    );
    expect(rule.canApplyValue("test")).toBe(false);
    expect(rule.canApplyValue(undefined)).toBe(true);
    expect(rule.canApplyValue(10)).toBe(false);
    expect(rule.canApplyValue({})).toBe(false);
    expect(rule.canApplyValue(["test", 1, false])).toBe(false);
    expect(rule.canApplyValue([1])).toBe(true);
  });
});

/**
 * BooleanValidationRuleクラスのテスト
 * ※対象外※
 * (ロジックを含まないため、テスト不要)
 */

/**
 * NumberValidationRuleクラスのテスト
 * ・setRangeメソッド
 */

describe("NumberValidationRuleクラスのテスト", () => {
  it("setRangeメソッドが正しく動作することを確認する", () => {
    const rule = new NumberValidationRule();
    rule.setRange(1, 10);
    expect(rule.min).toBe(1);
    expect(rule.max).toBe(10);
  });

  it("setRangeメソッドが最小値のみを設定する場合に正しく動作することを確認する", () => {
    const rule = new NumberValidationRule();
    rule.setRange(1);
    expect(rule.min).toBe(1);
    expect(rule.max).toBe(Number.MAX_SAFE_INTEGER);
  });

  it("setRangeメソッドが最大値のみを設定する場合に正しく動作することを確認する", () => {
    const rule = new NumberValidationRule();
    rule.setRange(undefined, 10);
    expect(rule.min).toBe(Number.MAX_SAFE_INTEGER);
    expect(rule.max).toBe(10);
  });
});

/**
 * StringValidationRuleクラスのテスト
 * ・setLengthメソッド
 */

describe("StringValidationRuleクラスのテスト", () => {
  it("setLengthメソッドが正しく動作することを確認する", () => {
    const rule = new StringValidationRule();
    rule.setLength(5, 10);
    expect(rule.min).toBe(5);
    expect(rule.max).toBe(10);
  });

  it("setLengthメソッドが最小長のみを設定する場合に正しく動作することを確認する", () => {
    const rule = new StringValidationRule();
    rule.setLength(5);
    expect(rule.min).toBe(5);
    expect(rule.max).toBe(Number.MAX_SAFE_INTEGER);
  });

  it("setLengthメソッドが最大長のみを設定する場合に正しく動作することを確認する", () => {
    const rule = new StringValidationRule();
    rule.setLength(undefined, 10);
    expect(rule.min).toBe(0);
    expect(rule.max).toBe(10);
  });

  it("setRegexpメソッドが正しく動作することを確認する", () => {
    const rule = new StringValidationRule();
    const pattern = "/^[a-zA-Z0-9]+$/";
    rule.setRegExp(pattern);
    expect(rule.regExp).toBe(pattern);
  });

  it("setEmailメソッドが正しく動作することを確認する", () => {
    const rule = new StringValidationRule();
    rule.setEmail(true);
    expect(rule.email).toBe(true);
  });
});

/**
 * CsInputTextItemクラスのテスト
 * ・validateメソッド
 * ・validateWhenErrorExistメソッド
 * ・validateAnytimeメソッド
 */
describe("CsInputTextItemクラスのvalidateメソッド", () => {
  it("任意指定かつ値が未入力の場合は、バリデーションをする必要がないため false を返す", () => {
    // 値がundefinedの場合
    const itemUndefined = renderHook(() =>
      useCsInputTextItem("test", useInit(), stringRule(false, 1, 10)),
    ).result.current;
    const validateAnytimeMock = jest.spyOn(itemUndefined, "validateAnytime");
    const resultUndefined = itemUndefined.validate(itemUndefined.value);
    expect(resultUndefined).toBe(false);
    // validateAnytimeメソッドが呼ばれていないことを確認
    expect(validateAnytimeMock).not.toHaveBeenCalled();
    validateAnytimeMock.mockRestore();

    // 値が空文字の場合
    const itemEmpty = renderHook(() =>
      useCsInputTextItem("test", useInit(""), stringRule(false, 1, 10)),
    ).result.current;
    const validateAnytimeMockEmpty = jest.spyOn(itemEmpty, "validateAnytime");
    const resultEmpty = itemEmpty.validate(itemEmpty.value);
    expect(resultEmpty).toBe(false);
    // validateAnytimeメソッドが呼ばれていないことを確認
    expect(validateAnytimeMockEmpty).not.toHaveBeenCalled();
    validateAnytimeMock.mockRestore();
  });

  it("必須指定の場合は、validateAnytimeメソッドの結果を返す", () => {
    const item = renderHook(() =>
      useCsInputTextItem("test", useInit("test"), stringRule(true, 1, 10)),
    ).result.current;

    // 内部で使用されているvalidateAnytimeメソッドのモック化
    const validateAnytimeMock = jest.spyOn(item, "validateAnytime");
    validateAnytimeMock.mockReturnValue(true);

    const result = item.validate(item.value);
    expect(result).toBe(true);
    expect(validateAnytimeMock).toHaveBeenCalled();

    // モックの解除
    validateAnytimeMock.mockRestore();
  });
});

describe("CsInputTextItemクラスのvalidateWhenErrorExistsメソッド", () => {
  it("validateWhenErrorExists", () => {
    const view = renderHook(() =>
      useCsView({
        item1: useCsInputTextItem(
          "test",
          useInit("test"),
          stringRule(true, 1, 5),
        ),
      }),
    ).result.current;
    act(() => {
      expect(view.item1.validateWhenErrorExists("test")).toBe(false);
      expect(view.item1.validateWhenErrorExists("testete")).toBe(false);
      view.item1.validationMessage = "エラー";
      expect(view.item1.validateWhenErrorExists("testete")).toBe(true);
    });
  });
});

describe("CsInputTextItemクラスのvalidateAnytimeメソッド", () => {
  it("validationAnytimeメソッドが正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView({
        item: useCsInputTextItem(
          "test",
          useInit("test"),
          stringRule(true, 1, 10),
        ),
      }),
    ).result.current;
    expect(view.item.validateAnytime("test")).toBe(false);
    expect(view.item.validateAnytime("")).toBe(true);
  });

  it("eventがundefinedの場合、falseを返す", () => {
    const view = renderHook(() =>
      useCsView({
        item: useCsInputTextItem(
          "test",
          useInit("test"),
          stringRule(true, 1, 10),
        ),
      }),
    ).result.current;
    view.validationEvent = undefined;
    expect(view.item.validateAnytime("")).toBe(false);
  });
});

describe("CsInputTextItemクラスのinitメソッド", () => {
  it("initメソッドが正しく動作することを確認する", () => {
    const item = renderHook(() =>
      useCsInputTextItem("test", useInit("test"), stringRule(true, 1, 10)),
    ).result.current;
    item.init("init", true);
    expect(item.label).toBe("init");
    expect(item.isReadonly()).toBe(true);
  });
});

type TestComponentProps = {
  newValue: string;
};
const TestComponent = (props: TestComponentProps) => {
  const { newValue } = props;
  const view = useCsView({
    item: useCsInputTextItem("test", useInit("test"), stringRule(true, 1, 10)),
  });
  return (
    <>
      <AxInputText item={view.item} />
      <button
        data-testid="changeButton"
        onClick={() => view.item.setValue(newValue)}
      >
        changed
      </button>
    </>
  );
};

describe("CsInputTextItemクラスのsetValueメソッド", () => {
  it("setValueメソッドが正しく動作することを確認する", async () => {
    render(<TestComponent newValue="newValue" />);
    const button = screen.getByTestId("changeButton");
    await act(async () => {
      await userEvent.click(button);
    });
    const target = screen.getByDisplayValue("newValue") as HTMLInputElement;
    expect(target.value).toBe("newValue");
  });
});

/**
 * CsCheckBoxItemクラスのテスト
 * ・isCheckedメソッド
 */
describe("CsCheckBoxItemクラスのisCheckedメソッドのテスト", () => {
  it("isCheckedメソッドが正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView({
        item1: useCsCheckBoxItem("test", useInit(true), "test"),
        item2: useCsCheckBoxItem("test", useInit(false), "test"),
      }),
    ).result.current;
    expect(view.item1.isChecked()).toBe(true);
    expect(view.item2.isChecked()).toBe(false);
  });
});

/**
 * CsMultiCheckBoxItemクラスのテスト
 * ・getCheckedValuesメソッド
 * ・getCheckedOptionメソッド
 */
describe("CsMultiCheckBoxItemクラスのgetCheckedValuesメソッド", () => {
  it("getCheckedValuesメソッドが正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView({
        item1: useCsMultiCheckBoxItem(
          "test",
          useInit<string[]>(["test"]),
          stringArrayRule(true),
          selectOptions([{ value: "test", label: "test" }]),
        ),
        item2: useCsMultiCheckBoxItem(
          "test",
          useInit<string[]>(["test1", "test2"]),
          stringArrayRule(true),
          selectOptions([
            { value: "test1", label: "test1" },
            { value: "test2", label: "test2" },
          ]),
        ),
        item3: useCsMultiCheckBoxItem(
          "test",
          useInit<string[]>([]),
          stringArrayRule(true),
          selectOptions([]),
        ),
      }),
    ).result.current;
    expect(view.item1.getCheckedValues()).toStrictEqual(["test"]);
    expect(view.item2.getCheckedValues()).toStrictEqual(["test1", "test2"]);
    expect(view.item3.getCheckedValues()).toStrictEqual([]);
  });
});
describe("CsMultiCheckBoxItemクラスのgetCheckedOptionメソッド", () => {
  it("getCheckedOptionメソッドが正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView({
        item1: useCsMultiCheckBoxItem(
          "test",
          useInit<string[]>(["test1"]),
          stringArrayRule(true),
          selectOptions([
            { value: "test1", label: "test1" },
            { value: "test2", label: "test2" },
          ]),
        ),
        item2: useCsMultiCheckBoxItem(
          "test",
          useInit<string[]>(["test1", "test2"]),
          stringArrayRule(true),
          selectOptions([
            { value: "test1", label: "test1" },
            { value: "test2", label: "test2" },
          ]),
        ),
        item3: useCsMultiCheckBoxItem(
          "test",
          useInit<string[]>([]),
          stringArrayRule(true),
          selectOptions([
            { value: "test1", label: "test1" },
            { value: "test2", label: "test2" },
          ]),
        ),
      }),
    ).result.current;
    expect(view.item1.getCheckedOption()).toStrictEqual([
      { value: "test1", label: "test1" },
    ]);
    expect(view.item2.getCheckedOption()).toStrictEqual([
      { value: "test1", label: "test1" },
      { value: "test2", label: "test2" },
    ]);
    expect(view.item3.getCheckedOption()).toStrictEqual([]);
  });
});
