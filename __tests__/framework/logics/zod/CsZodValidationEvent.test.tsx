import {
  numberRule,
  RW,
  stringRule,
  useCsInputNumberItem,
  useCsInputNumberRangeItem,
  useCsInputTextItem,
  useCsView,
  useInit,
} from "@/framework/logics";
import { act, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import { useCsZodValidationEvent } from "@/framework/logics/zod/CsZodValidationEvent";
import { AxButton, AxInputNumber, AxInputNumberRange, AxInputText } from "@/framework/components/antd";
import userEvent from "@testing-library/user-event";

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

type MinValidateTestComponentProps = {
  min: number;
};
const MinValidateTestComponent = (props: MinValidateTestComponentProps) => {
  const { min } = props;
  const view = useCsView(
    {
      item1: useCsInputTextItem(
        "Item 1",
        useInit("test"),
        stringRule(true, min, 10),
        RW.Editable,
        "Item1",
      ),
      item2: useCsInputNumberItem(
        "Item 2",
        useInit(1),
        numberRule(true, min, 10),
        RW.Editable,
        "Item2",
      ),
      item3: useCsInputNumberRangeItem(
        "Item 3",
        useInit([1, 1]),
        numberRule(true, min, 10),
        RW.Editable,
        "Item3",
      ),
    },
    undefined,
    useCsZodValidationEvent,
  );
  return (
    <>
      <AxInputText item={view.item1} />
      <AxInputNumber item={view.item2} />
      <AxInputNumberRange item={view.item3} />
      <AxButton validationViews={[view]} onClick={() => {}}>
        テスト
      </AxButton>
    </>
  );
};

describe("createStringConstraint, createNumberConstraint, createNumberArrayConstraintメソッド", () => {
  it("最小値精査が正しく動作すること", async () => {
    const min = 8;
    render(<MinValidateTestComponent min={min} />);
    const button = screen.getByRole("button", { name: /テスト/i });
    await act(async () => {
      await userEvent.click(button);
    });
    const expectedErrorTexts = [
      `Item 1が短すぎます。 ${min}文字以上の文字列を入力してください`,
      `Item 2が小さすぎます。 ${min}以上の数を入力してください`,
      `Item 3が小さすぎます。 ${min}以上の数を入力してください`,
    ];
    expectedErrorTexts.forEach((expectedErrorText) => {
      expect(screen.getByText(expectedErrorText)).not.toBeUndefined();
    });
  });
  it("固定値精査が正しく動作すること", async () => {
    const min = 10;
    render(<MinValidateTestComponent min={min} />);
    const button = screen.getByRole("button", { name: /テスト/i });
    await act(async () => {
      await userEvent.click(button);
    });
    const expectedErrorTexts = [
      `Item 1は${min}文字で入力してください`,
      `Item 2には${min}を入力してください`,
      `Item 3には${min}を入力してください`,
    ];
    expectedErrorTexts.forEach((expectedErrorText) => {
      expect(screen.getByText(expectedErrorText)).not.toBeUndefined();
    });
  });
});
