import {
  stringRule,
  useCsInputTextItem,
  useCsView,
  useInit,
} from "@/framework/logics";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { useCsZodValidationEvent } from "@/framework/logics/zod/CsZodValidationEvent";

describe("CsZodValidationEventクラスのonValidateHasErrorメソッド", () => {
  it("resetErrorが正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView({
        item: useCsInputTextItem(
          "item",
          useInit("aaa"),
          stringRule(false, 8, 10),
        ),
      }),
    ).result.current;
    const validationEvent = renderHook(() => useCsZodValidationEvent(view))
      .result.current;
    view.item.validateAnytime("aaa");
    validationEvent.resetError();
    expect(view.item.validationMessage).toBe("");
  });
  it("emailのルールが設定されている場合、正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView({
        item: useCsInputTextItem(
          "item",
          useInit("aaa"),
          stringRule(true, 1, 10),
        ),
      }),
    ).result.current;
    view.item.setValidationRule(stringRule(true, 1, 10).setEmail(true));
    const validationEvent = renderHook(() => useCsZodValidationEvent(view))
      .result.current;
    expect(validationEvent.onValidateItemHasError("aaa", view.item)).toBe(true);
  });
});
