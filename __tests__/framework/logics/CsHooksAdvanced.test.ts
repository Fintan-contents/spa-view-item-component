import {
  CsInputDateItem,
  CsInputDateRangeItem,
  CsInputNumberRangeItem,
  numberRule,
  RW,
  stringArrayRule,
  stringRule,
  useInit,
} from "@/framework/logics";
import {
  useCsInputDateItem,
  useCsInputDateRangeItem,
  useCsInputNumberRangeItem,
  useRangeInit,
} from "../../../src/framework/logics/CsHooksAdvanced";
import { describe, expect, it } from "@jest/globals";
import { act, renderHook } from "@testing-library/react";

/**
 * useRangeInitメソッドのテスト
 */
describe("useRangeInit", () => {
  it("初期値が設定されている場合、初期値が返される", () => {
    const { result } = renderHook(() => useRangeInit<number>(1, 10));
    expect(result.current[0]).toEqual([1, 10]);
  });

  it("初期値が設定されていない場合、undefinedが返される", () => {
    const { result } = renderHook(() => useRangeInit<number>());
    expect(result.current[0]).toEqual([undefined, undefined]);
  });

  it("値を更新できること", () => {
    const { result } = renderHook(() => useRangeInit<number>(1, 10));
    act(() => {
      result.current[1]([5, 15]);
    });
    expect(result.current[0]).toEqual([5, 15]);
  });
});

/**
 * useCsInputDateItemメソッドのテスト
 */
describe("useCsInputDateItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsInputDateItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "テスト";
    const initialState = renderHook(() => useInit("test")).result.current;
    const rule = stringRule(true, 3, 10);
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputDateItem(label, initialState, rule, readonly),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item).toBeInstanceOf(CsInputDateItem);
      expect(item.label).toBe(label);
      expect(item.value).toBe(initialState[0]);
      expect(item.validationRule).toBe(rule);
      expect(item.isReadonly()).toBe(false);
    });
  });
});

/**
 * useCsInputNumberRangeItemメソッドのテスト
 */
describe("useCsInputNumberRangeItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsInputNumberRangeItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "テスト";
    const initialState = renderHook(() => useRangeInit<number>(0, 10)).result
      .current;
    const rule = numberRule(true, 3, 10);
    const readonly = RW.Editable;
    const lowerPlaceholder = "下限";
    const upperPlaceholder = "上限";

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputNumberRangeItem(
        label,
        initialState,
        rule,
        readonly,
        lowerPlaceholder,
        upperPlaceholder,
      ),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item).toBeInstanceOf(CsInputNumberRangeItem);
      expect(item.label).toBe(label);
      expect(item.value).toBe(initialState[0]);
      expect(item.validationRule).toBe(rule);
      expect(item.isReadonly()).toBe(false);
      expect(item.lowerPlaceholder).toBe(lowerPlaceholder);
      expect(item.upperPlaceholder).toBe(upperPlaceholder);
    });
  });
});

/**
 * useCsInputDateRangeItemメソッドのテスト
 */
describe("useCsInputDateRangeItemメソッド", () => {
  it("指定されたパラメータに基づいて、適切なCsInputDateRangeItemクラスのインスタンスを生成する", () => {
    // パラメータの設定
    const label = "テスト";
    const initialState = renderHook(() => useInit(["2021-01-01", "2021-12-31"]))
      .result.current;
    const rule = stringArrayRule(true);
    const readonly = RW.Editable;

    // テスト対象のメソッドを実行
    const item = renderHook(() =>
      useCsInputDateRangeItem(label, initialState, rule, readonly),
    ).result.current;

    // 期待値の検証
    act(() => {
      expect(item).toBeInstanceOf(CsInputDateRangeItem);
      expect(item.label).toBe(label);
      expect(item.value).toBe(initialState[0]);
      expect(item.validationRule).toBe(rule);
      expect(item.isReadonly()).toBe(false);
    });
  });
});
