import {
  BooleanValidationRule,
  CsCheckBoxItem,
  CsInputNumberItem,
  CsInputPasswordItem,
  CsInputTextItem,
  CsMultiCheckBoxItem,
  CsRadioBoxItem,
  CsSelectBoxItem,
  CsSelectNumberBoxItem,
  CsTextAreaItem,
  NumberArrayValidationRule,
  NumberValidationRule,
  RW,
  StringArrayValidationRule,
  stringRule,
  StringValidationRule,
  useCsInputTextItem,
} from "@/framework/logics";
import {
  booleanRule,
  numberArrayRule,
  numberRule,
  selectOptionNumbers,
  selectOptions,
  SelectOptions,
  selectOptionStrings,
  useCsCheckBoxItem,
  useCsInputNumberItem,
  useCsInputPasswordItem,
  useCsMultiCheckBoxItem,
  useCsRadioBoxItem,
  useCsSelectBoxItem,
  useCsSelectNumberBoxItem,
  useCsTextAreaItem,
  useInit,
} from "@/framework/logics/CsHooks";
import { describe, expect, it } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { stringArrayRule } from "@/framework/logics/CsHooks";
import { act } from "react";

/**
 * useInitメソッドのテスト
 */
describe("useInitメソッド", () => {
  it("初期値がundefinedの場合、useStateがundefinedを返すことを確認する", () => {
    const { result } = renderHook(() => useInit());
    const [value] = result.current;
    expect(value).toBeUndefined();
  });

  it("初期値が空文字の場合、useStateがundefinedを返すことを確認する", () => {
    const { result } = renderHook(() => useInit(""));
    const [value] = result.current;
    expect(value).toBe("");
  });

  it("初期値が指定された場合、useStateがその値を返すことを確認する", () => {
    const initialValue = "test";
    const { result } = renderHook(() => useInit(initialValue));
    const [value] = result.current;
    expect(value).toBe(initialValue);
  });
});

/**
 * stringRuleメソッドのテスト
 */
describe("stringRuleメソッド", () => {
  it("必須フラグが正しく設定されることを確認する", () => {
    const rule = stringRule(true);
    expect(rule).toBeInstanceOf(StringValidationRule);
    expect(rule.required).toBe(true);
  });

  it("最小値と最大値が正しく設定されることを確認する", () => {
    const rule = stringRule(true, 3, 10);
    expect(rule.min).toBe(3);
    expect(rule.max).toBe(10);
  });

  it("カスタムルール名が正しく設定されることを確認する", () => {
    const customRuleName = "customRule";
    const rule = stringRule(true, 3, 10, customRuleName);
    expect(rule.customRuleName).toBe(customRuleName);
  });

  it("最小値と最大値が設定されていない場合のデフォルト値を確認する", () => {
    const rule = stringRule(true);
    expect(rule.min).toBeUndefined();
    expect(rule.max).toBeUndefined();
  });

  it("カスタムルール名が設定されていない場合のデフォルト値を確認する", () => {
    const rule = stringRule(true);
    expect(rule.customRuleName).toBeUndefined();
  });
});

/**
 * numberRuleメソッドのテスト
 */
describe("numberRuleメソッド", () => {
  it("必須フラグが正しく設定されることを確認する", () => {
    const rule = numberRule(true);
    expect(rule).toBeInstanceOf(NumberValidationRule);
    expect(rule.required).toBe(true);
  });

  it("最小値と最大値が正しく設定されることを確認する", () => {
    const rule = numberRule(true, 1, 100);
    expect(rule.min).toBe(1);
    expect(rule.max).toBe(100);
  });

  it("カスタムルール名が正しく設定されることを確認する", () => {
    const customRuleName = "customNumberRule";
    const rule = numberRule(true, 1, 100, customRuleName);
    expect(rule.customRuleName).toBe(customRuleName);
  });

  it("最小値と最大値が設定されていない場合のデフォルト値を確認する", () => {
    const rule = numberRule(true);
    expect(rule.min).toBeUndefined();
    expect(rule.max).toBeUndefined();
  });

  it("カスタムルール名が設定されていない場合のデフォルト値を確認する", () => {
    const rule = numberRule(true);
    expect(rule.customRuleName).toBeUndefined();
  });
});

/**
 * stringArrayRuleメソッドのテスト
 */
describe("stringArrayRuleメソッド", () => {
  it("必須フラグが正しく設定されることを確認する", () => {
    const rule = stringArrayRule(true);
    expect(rule).toBeInstanceOf(StringArrayValidationRule);
    expect(rule.required).toBe(true);
  });

  it("カスタムルール名が正しく設定されることを確認する", () => {
    const customRuleName = "customStringArrayRule";
    const rule = stringArrayRule(true, customRuleName);
    expect(rule.customRuleName).toBe(customRuleName);
  });

  it("カスタムルール名が設定されていない場合のデフォルト値を確認する", () => {
    const rule = stringArrayRule(true);
    expect(rule.customRuleName).toBeUndefined();
  });
});

/**
 * numberArrayRuleメソッドのテスト
 */
describe("numberArrayRuleメソッド", () => {
  it("必須フラグが正しく設定されることを確認する", () => {
    const rule = numberArrayRule(true);
    expect(rule).toBeInstanceOf(NumberArrayValidationRule);
    expect(rule.required).toBe(true);
  });

  it("カスタムルール名が正しく設定されることを確認する", () => {
    const customRuleName = "customNumberArrayRule";
    const rule = numberArrayRule(true, customRuleName);
    expect(rule.customRuleName).toBe(customRuleName);
  });

  it("カスタムルール名が設定されていない場合のデフォルト値を確認する", () => {
    const rule = numberArrayRule(true);
    expect(rule.customRuleName).toBeUndefined();
  });
});

/**
 * booleanRuleメソッドのテスト
 */
describe("booleanRuleメソッド", () => {
  it("必須フラグが正しく設定されることを確認する", () => {
    const rule = booleanRule(true);
    expect(rule).toBeInstanceOf(BooleanValidationRule);
    expect(rule.required).toBe(true);
  });

  it("カスタムルール名が正しく設定されることを確認する", () => {
    const customRuleName = "customBooleanRule";
    const rule = booleanRule(true, customRuleName);
    expect(rule.customRuleName).toBe(customRuleName);
  });

  it("カスタムルール名が設定されていない場合のデフォルト値を確認する", () => {
    const rule = booleanRule(true);
    expect(rule.customRuleName).toBeUndefined();
  });
});

/**
 * selectOptionsメソッドのテスト
 */
describe("selectOptionsメソッド", () => {
  it("指定されたパラメータに基づいて、適切なオブジェクトを生成する", () => {
    const options = [
      { value: 1, label: "Option1" },
      { value: 2, label: "Option2" },
    ];
    const result = selectOptions(options);

    expect(result).toBeInstanceOf(SelectOptions);
    expect(result.options).toEqual(options);
    expect(result.optionValueKey).toBe("value");
    expect(result.optionLabelKey).toBe("label");
  });

  it("カスタムのoptionValueKeyとoptionLabelKeyが正しく設定されることを確認する", () => {
    const options = [
      { id: 1, name: "Option1" },
      { id: 2, name: "Option2" },
    ];
    const result = selectOptions(options, "id", "name");

    expect(result).toBeInstanceOf(SelectOptions);
    expect(result.options).toEqual(options);
    expect(result.optionValueKey).toBe("id");
    expect(result.optionLabelKey).toBe("name");
  });

  it("空のオプション配列が指定された場合、適切なオブジェクトを生成する", () => {
    const options: string[] = [];
    const result = selectOptions(options);

    expect(result).toBeInstanceOf(SelectOptions);
    expect(result.options).toEqual([]);
    expect(result.optionValueKey).toBe("value");
    expect(result.optionLabelKey).toBe("label");
  });
});

/**
 * selectOptionStringsメソッドのテスト
 */
describe("selectOptionStringsメソッド", () => {
  it("指定されたパラメータに基づいて、適切なオブジェクトを生成する", () => {
    const options = ["Option1", "Option2", "Option3"];
    const result = selectOptionStrings(options);

    expect(result).toBeInstanceOf(SelectOptions);
    expect(result.options).toEqual([
      { value: "Option1", label: "Option1" },
      { value: "Option2", label: "Option2" },
      { value: "Option3", label: "Option3" },
    ]);
    expect(result.optionValueKey).toBe("value");
    expect(result.optionLabelKey).toBe("label");
  });

  it("空の文字列配列が指定された場合、適切なオブジェクトを生成する", () => {
    const options: string[] = [];
    const result = selectOptionStrings(options);

    expect(result).toBeInstanceOf(SelectOptions);
    expect(result.options).toEqual([]);
    expect(result.optionValueKey).toBe("value");
    expect(result.optionLabelKey).toBe("label");
  });

  it("空の文字列を含むパラメータが指定された場合、適切なオブジェクトを生成する", () => {
    const options = ["", "Option2", ""];
    const result = selectOptionStrings(options);

    expect(result).toBeInstanceOf(SelectOptions);
    expect(result.options).toEqual([
      { value: "", label: "" },
      { value: "Option2", label: "Option2" },
      { value: "", label: "" },
    ]);
    expect(result.optionValueKey).toBe("value");
    expect(result.optionLabelKey).toBe("label");
  });
});

/**
 * selectOptionNumbersメソッドのテスト
 */
describe("selectOptionNumbersメソッド", () => {
  it("指定されたパラメータに基づいて、適切なオブジェクトを生成する", () => {
    const options = [1, 2, 3];
    const result = selectOptionNumbers(options);

    expect(result).toBeInstanceOf(SelectOptions);
    expect(result.options).toEqual([
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
    ]);
    expect(result.optionValueKey).toBe("value");
    expect(result.optionLabelKey).toBe("label");
  });

  it("空の数値配列が指定された場合、適切なオブジェクトを生成する", () => {
    const options: number[] = [];
    const result = selectOptionNumbers(options);

    expect(result).toBeInstanceOf(SelectOptions);
    expect(result.options).toEqual([]);
    expect(result.optionValueKey).toBe("value");
    expect(result.optionLabelKey).toBe("label");
  });

  it("負の数値を含むパラメータが指定された場合、適切なオブジェクトを生成する", () => {
    const options = [-1, 0, 1];
    const result = selectOptionNumbers(options);

    expect(result).toBeInstanceOf(SelectOptions);
    expect(result.options).toEqual([
      { value: -1, label: -1 },
      { value: 0, label: 0 },
      { value: 1, label: 1 },
    ]);
    expect(result.optionValueKey).toBe("value");
    expect(result.optionLabelKey).toBe("label");
  });

  it("小数を含むパラメータが指定された場合、適切なオブジェクトを生成する", () => {
    const options = [1.1, 2.2, 3.3];
    const result = selectOptionNumbers(options);

    expect(result).toBeInstanceOf(SelectOptions);
    expect(result.options).toEqual([
      { value: 1.1, label: 1.1 },
      { value: 2.2, label: 2.2 },
      { value: 3.3, label: 3.3 },
    ]);
    expect(result.optionValueKey).toBe("value");
    expect(result.optionLabelKey).toBe("label");
  });
});

/**
 * useCsInputTextItemメソッドのテスト
 */
describe("useCsInputTextItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsInputTextItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "テスト";
    const initialState = renderHook(() => useInit("test")).result.current;
    const rule = stringRule(true, 3, 30);
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputTextItem(label, initialState, rule, readonly),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item).toBeInstanceOf(CsInputTextItem);
      expect(item.label).toBe(label);
      expect(item.value).toBe(initialState[0]);
      expect(item.validationRule).toBe(rule);
      expect(item.isReadonly()).toBe(false);
    });
  });
});

/**
 * useCsInputNumberItemメソッドのテスト
 */
describe("useCsInputNumberItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsInputNumberItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "テスト";
    const initialState = renderHook(() => useInit(123)).result.current;
    const rule = numberRule(true, 1, 100);
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputNumberItem(label, initialState, rule, readonly),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item).toBeInstanceOf(CsInputNumberItem);
      expect(item.label).toBe(label);
      expect(item.value).toBe(initialState[0]);
      expect(item.validationRule).toBe(rule);
      expect(item.isReadonly()).toBe(false);
    });
  });

  it("readonlyフラグが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "テスト";
    const initialState = renderHook(() => useInit(123)).result.current;
    const rule = numberRule(true, 1, 100);
    const readonly = RW.Readonly;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputNumberItem(label, initialState, rule, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsInputNumberItem);
    expect(item.isReadonly()).toBe(true);
  });

  it("バリデーションルールが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "テスト";
    const initialState = renderHook(() => useInit(123)).result.current;
    const rule = numberRule(true, 1, 100);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputNumberItem(label, initialState, rule),
    ).result.current;

    // 期待値の検証
    expect(item.validationRule).toBe(rule);
  });

  it("初期値が正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "テスト";
    const initialState = renderHook(() => useInit(123)).result.current;
    const rule = numberRule(true, 1, 100);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputNumberItem(label, initialState, rule),
    ).result.current;

    // 期待値の検証
    expect(item.value).toBe(123);
  });
});

/**
 * useCsInputPasswordItemメソッドのテスト
 */
describe("useCsInputPasswordItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsInputPasswordItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "パスワード";
    const initialState = renderHook(() => useInit("password")).result.current;
    const rule = stringRule(true, 8, 20);
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputPasswordItem(label, initialState, rule, readonly),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item).toBeInstanceOf(CsInputPasswordItem);
      expect(item.label).toBe(label);
      expect(item.value).toBe(initialState[0]);
      expect(item.validationRule).toBe(rule);
      expect(item.isReadonly()).toBe(false);
    });
  });

  it("readonlyフラグが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "パスワード";
    const initialState = renderHook(() => useInit("password")).result.current;
    const rule = stringRule(true, 8, 20);
    const readonly = RW.Readonly;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputPasswordItem(label, initialState, rule, readonly),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item).toBeInstanceOf(CsInputPasswordItem);
      expect(item.isReadonly()).toBe(true);
    });
  });

  it("バリデーションルールが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "パスワード";
    const initialState = renderHook(() => useInit("password")).result.current;
    const rule = stringRule(true, 8, 20);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputPasswordItem(label, initialState, rule),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item.validationRule).toBe(rule);
    });
  });

  it("初期値が正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "パスワード";
    const initialState = renderHook(() => useInit("password")).result.current;
    const rule = stringRule(true, 8, 20);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputPasswordItem(label, initialState, rule),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item.value).toBe("password");
    });
  });
});

/**
 * useCsTextAreaItemメソッドのテスト
 */
describe("useCsTextAreaItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsTextAreaItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "テキストエリア";
    const initialState = renderHook(() => useInit("initial text")).result
      .current;
    const rule = stringRule(true, 5, 100);
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsTextAreaItem(label, initialState, rule, readonly),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item).toBeInstanceOf(CsTextAreaItem);
      expect(item.label).toBe(label);
      expect(item.value).toBe(initialState[0]);
      expect(item.validationRule).toBe(rule);
      expect(item.isReadonly()).toBe(false);
    });
  });

  it("readonlyフラグが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "テキストエリア";
    const initialState = renderHook(() => useInit("initial text")).result
      .current;
    const rule = stringRule(true, 5, 100);
    const readonly = RW.Readonly;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsTextAreaItem(label, initialState, rule, readonly),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item).toBeInstanceOf(CsTextAreaItem);
      expect(item.isReadonly()).toBe(true);
    });
  });

  it("バリデーションルールが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "テキストエリア";
    const initialState = renderHook(() => useInit("initial text")).result
      .current;
    const rule = stringRule(true, 5, 100);

    // テスト対象のメソッドを実行
    const item = renderHook(() => useCsTextAreaItem(label, initialState, rule))
      .result.current;

    // 期待値の検証
    expect(item.validationRule).toBe(rule);
  });

  it("初期値が正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "テキストエリア";
    const initialState = renderHook(() => useInit("initial text")).result
      .current;
    const rule = stringRule(true, 5, 100);

    // テスト対象のメソッドを実行
    const item = renderHook(() => useCsTextAreaItem(label, initialState, rule))
      .result.current;

    // 期待値の検証
    expect(item.value).toBe("initial text");
  });
});

/**
 * useCsCheckBoxItemメソッドのテスト
 */
describe("useCsCheckBoxItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsCheckBoxItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "チェックボックス";
    const initialState = renderHook(() => useInit(false)).result.current;
    const checkBoxText = "チェックボックスのテキスト";
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsCheckBoxItem(label, initialState, checkBoxText, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsCheckBoxItem);
    expect(item.label).toBe(label);
    expect(item.value).toBe(initialState[0]);
    expect(item.checkBoxText).toBe(checkBoxText);
    expect(item.isReadonly()).toBe(false);
  });

  it("readonlyフラグが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "チェックボックス";
    const initialState = renderHook(() => useInit(false)).result.current;
    const checkBoxText = "チェックボックスのテキスト";
    const readonly = RW.Readonly;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsCheckBoxItem(label, initialState, checkBoxText, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsCheckBoxItem);
    expect(item.isReadonly()).toBe(true);
  });

  it("チェックボックスのテキストが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "チェックボックス";
    const initialState = renderHook(() => useInit(false)).result.current;
    const checkBoxText = "チェックボックスのテキスト";

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsCheckBoxItem(label, initialState, checkBoxText),
    ).result.current;

    // 期待値の検証
    expect(item.checkBoxText).toBe(checkBoxText);
  });

  it("初期値が正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "チェックボックス";
    const initialState = renderHook(() => useInit(true)).result.current;
    const checkBoxText = "チェックボックスのテキスト";

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsCheckBoxItem(label, initialState, checkBoxText),
    ).result.current;

    // 期待値の検証
    expect(item.value).toBe(true);
  });
});

/**
 * useCsSelectBoxItemメソッドのテスト
 */
describe("useCsSelectBoxItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsSelectBoxItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "セレクトボックス";
    const initialState = renderHook(() => useInit("option1")).result.current;
    const rule = stringRule(true, 3, 30);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsSelectBoxItem(label, initialState, rule, selOpt, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsSelectBoxItem);
    expect(item.label).toBe(label);
    expect(item.value).toBe(initialState[0]);
    expect(item.validationRule).toBe(rule);
    expect(item.options).toEqual(selOpt.options);
    expect(item.isReadonly()).toBe(false);
  });

  it("readonlyフラグが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "セレクトボックス";
    const initialState = renderHook(() => useInit("option1")).result.current;
    const rule = stringRule(true, 3, 30);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);
    const readonly = RW.Readonly;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsSelectBoxItem(label, initialState, rule, selOpt, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsSelectBoxItem);
    expect(item.isReadonly()).toBe(true);
  });

  it("バリデーションルールが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "セレクトボックス";
    const initialState = renderHook(() => useInit("option1")).result.current;
    const rule = stringRule(true, 3, 30);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsSelectBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.validationRule).toBe(rule);
  });

  it("初期値が正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "セレクトボックス";
    const initialState = renderHook(() => useInit("option1")).result.current;
    const rule = stringRule(true, 3, 30);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsSelectBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.value).toBe("option1");
  });

  it("オプションが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "セレクトボックス";
    const initialState = renderHook(() => useInit("option1")).result.current;
    const rule = stringRule(true, 3, 30);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsSelectBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.options).toEqual(selOpt.options);
  });
});

/**
 * useCsSelectNumberBoxItemメソッドのテスト
 */
describe("useCsSelectNumberBoxItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsSelectNumberBoxItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "セレクトナンバーボックス";
    const initialState = renderHook(() => useInit(1)).result.current;
    const rule = numberRule(true, 1, 10);
    const selOpt = selectOptionNumbers([1, 2, 3]);
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsSelectNumberBoxItem(label, initialState, rule, selOpt, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsSelectNumberBoxItem);
    expect(item.label).toBe(label);
    expect(item.value).toBe(initialState[0]);
    expect(item.validationRule).toBe(rule);
    expect(item.options).toEqual(selOpt.options);
    expect(item.isReadonly()).toBe(false);
  });

  it("readonlyフラグが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "セレクトナンバーボックス";
    const initialState = renderHook(() => useInit(1)).result.current;
    const rule = numberRule(true, 1, 10);
    const selOpt = selectOptionNumbers([1, 2, 3]);
    const readonly = RW.Readonly;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsSelectNumberBoxItem(label, initialState, rule, selOpt, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsSelectNumberBoxItem);
    expect(item.isReadonly()).toBe(true);
  });

  it("バリデーションルールが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "セレクトナンバーボックス";
    const initialState = renderHook(() => useInit(1)).result.current;
    const rule = numberRule(true, 1, 10);
    const selOpt = selectOptionNumbers([1, 2, 3]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsSelectNumberBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.validationRule).toBe(rule);
  });

  it("初期値が正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "セレクトナンバーボックス";
    const initialState = renderHook(() => useInit(1)).result.current;
    const rule = numberRule(true, 1, 10);
    const selOpt = selectOptionNumbers([1, 2, 3]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsSelectNumberBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.value).toBe(1);
  });

  it("オプションが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "セレクトナンバーボックス";
    const initialState = renderHook(() => useInit(1)).result.current;
    const rule = numberRule(true, 1, 10);
    const selOpt = selectOptionNumbers([1, 2, 3]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsSelectNumberBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.options).toEqual(selOpt.options);
  });
});

/**
 * useCsRadioBoxItemメソッドのテスト
 */
describe("useCsRadioBoxItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsRadioBoxItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "ラジオボックス";
    const initialState = renderHook(() => useInit("option1")).result.current;
    const rule = stringRule(true, 3, 30);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsRadioBoxItem(label, initialState, rule, selOpt, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsRadioBoxItem);
    expect(item.label).toBe(label);
    expect(item.value).toBe(initialState[0]);
    expect(item.validationRule).toBe(rule);
    expect(item.options).toEqual(selOpt.options);
    expect(item.isReadonly()).toBe(false);
  });

  it("readonlyフラグが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "ラジオボックス";
    const initialState = renderHook(() => useInit("option1")).result.current;
    const rule = stringRule(true, 3, 30);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);
    const readonly = RW.Readonly;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsRadioBoxItem(label, initialState, rule, selOpt, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsRadioBoxItem);
    expect(item.isReadonly()).toBe(true);
  });

  it("バリデーションルールが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "ラジオボックス";
    const initialState = renderHook(() => useInit("option1")).result.current;
    const rule = stringRule(true, 3, 30);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsRadioBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.validationRule).toBe(rule);
  });

  it("初期値が正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "ラジオボックス";
    const initialState = renderHook(() => useInit("option1")).result.current;
    const rule = stringRule(true, 3, 30);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsRadioBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.value).toBe("option1");
  });

  it("オプションが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "ラジオボックス";
    const initialState = renderHook(() => useInit("option1")).result.current;
    const rule = stringRule(true, 3, 30);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsRadioBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.options).toEqual(selOpt.options);
  });
});

/**
 * useCsMultiCheckBoxItemメソッドのテスト
 */
describe("useCsMultiCheckBoxItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsMultiCheckBoxItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "マルチチェックボックス";
    const initialState = renderHook(() => useInit(["option1"])).result.current;
    const rule = stringArrayRule(true);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsMultiCheckBoxItem(label, initialState, rule, selOpt, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsMultiCheckBoxItem);
    expect(item.label).toBe(label);
    expect(item.value).toBe(initialState[0]);
    expect(item.validationRule).toBe(rule);
    expect(item.options).toEqual(selOpt.options);
    expect(item.isReadonly()).toBe(false);
  });

  it("readonlyフラグが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "マルチチェックボックス";
    const initialState = renderHook(() => useInit(["option1"])).result.current;
    const rule = stringArrayRule(true);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);
    const readonly = RW.Readonly;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsMultiCheckBoxItem(label, initialState, rule, selOpt, readonly),
    ).result.current;

    // 期待値の検証
    expect(item).toBeInstanceOf(CsMultiCheckBoxItem);
    expect(item.isReadonly()).toBe(true);
  });

  it("バリデーションルールが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "マルチチェックボックス";
    const initialState = renderHook(() => useInit(["option1"])).result.current;
    const rule = stringArrayRule(true);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsMultiCheckBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.validationRule).toBe(rule);
  });

  it("初期値が正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "マルチチェックボックス";
    const initialState = renderHook(() => useInit(["option1"])).result.current;
    const rule = stringArrayRule(true);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsMultiCheckBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.value).toEqual(["option1"]);
  });

  it("オプションが正しく設定されることを確認する", () => {
    // パラメータの設定
    const label = "マルチチェックボックス";
    const initialState = renderHook(() => useInit(["option1"])).result.current;
    const rule = stringArrayRule(true);
    const selOpt = selectOptionStrings(["option1", "option2", "option3"]);

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsMultiCheckBoxItem(label, initialState, rule, selOpt),
    ).result.current;

    // 期待値の検証
    expect(item.options).toEqual(selOpt.options);
  });
});
