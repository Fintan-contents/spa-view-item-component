import { AxButton, AxInputText } from "@/framework/components/antd";
import {
  CsInputDateRangeItem,
  CsInputNumberItem,
  CsInputNumberRangeItem,
  CsInputTextItem,
  CsMultiCheckBoxItem,
  CsNumberArrayItem,
  CsSelectBoxItem,
  CsSelectNumberBoxItem,
  CsStringArrayItem,
  CsView,
  NumberArrayValidationRule,
  numberRule,
  RW,
  selectOptions,
  stringArrayRule,
  StringArrayValidationRule,
  stringCustomValidationRule,
  stringRule,
  useCsInputDateRangeItem,
  useCsInputNumberItem,
  useCsInputNumberRangeItem,
  useCsInputTextItem,
  useCsMultiCheckBoxItem,
  useCsSelectBoxItem,
  useCsSelectNumberBoxItem,
  useCsView,
  useInit,
} from "@/framework/logics";
import {
  CsYupValidationEvent,
  useCsYupValidationEvent,
} from "@/framework/logics/yup/CsYupValidationEvent";
import { describe, expect, it } from "@jest/globals";
import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

/**
 * CsYupValidationEventクラスのテスト
 * ・onValidateHasErrorメソッド
 * ・onValidateItemHasErrorメソッド
 * ・validationErrorMessageメソッド
 * ・resetErrorメソッド
 * ・doCustomValidateItemHasErrorメソッド
 */
// テスト用のViewを作るためのヘルパ関数
const makeTestView1 = (isItem1ValidOK: boolean, isItem2ValidOK: boolean) => {
  return renderHook(() =>
    useCsView({
      item1: useCsInputTextItem(
        "Item 1",
        useInit(isItem1ValidOK ? "aaa" : ""),
        stringRule(true, 1, 10),
      ),
      item2: useCsInputTextItem(
        "Item 2",
        useInit(isItem2ValidOK ? "bbb" : "bbbbbbbbbbbbbbbbb"),
        stringRule(false, 1, 10),
      ),
    }),
  ).result.current;
};
const makeTestView2 = (isItem3ValidOK: boolean, isItem4ValidOK: boolean) => {
  return renderHook(() =>
    useCsView({
      item3: useCsInputNumberItem(
        "Item 3",
        useInit(isItem3ValidOK ? 2 : 0),
        numberRule(true, 1, 10),
      ),
      item4: useCsInputNumberItem(
        "Item 4",
        useInit(isItem4ValidOK ? 3 : 0),
        numberRule(false, 1, 10),
      ),
    }),
  ).result.current;
};
const makeTestView3 = (isItem5ValidOK: boolean, isItem6ValidOK: boolean) => {
  return renderHook(() =>
    useCsView({
      item5: useCsMultiCheckBoxItem(
        "Item 5",
        useInit<string[]>(isItem5ValidOK ? ["aaa"] : []),
        stringArrayRule(true),
        selectOptions(["aaa", "bbb", "ccc"]),
      ),
      item6: useCsMultiCheckBoxItem(
        "Item 6",
        useInit<string[]>(isItem6ValidOK ? ["bbb"] : []),
        stringArrayRule(false),
        selectOptions(["aaa", "bbb", "ccc"]),
      ),
    }),
  ).result.current;
};
const makeTestView4 = (isItem7ValidOK: boolean, isItem8ValidOK: boolean) => {
  return renderHook(() =>
    useCsView({
      item7: useCsInputNumberRangeItem(
        "Item 7",
        useInit([isItem7ValidOK ? 1 : 0, isItem7ValidOK ? 2 : 0]),
        numberRule(true, 1, 10),
      ),
      item8: useCsInputNumberRangeItem(
        "Item 8",
        useInit([isItem8ValidOK ? 2 : 0, isItem8ValidOK ? 3 : 0]),
        numberRule(false, 1, 10),
      ),
    }),
  ).result.current;
};
const makeTestView5 = () => {
  return renderHook(() =>
    useCsView({
      item1: useCsSelectNumberBoxItem(
        "Item 1",
        useInit<number>(1),
        numberRule(false),
        selectOptions([1, 2, 3]),
      ),
      item2: useCsSelectNumberBoxItem(
        "Item 1",
        useInit<number>(1),
        numberRule(false),
        selectOptions([1, 2, 3]),
      ),
    }),
  ).result.current;
};
const makeTestView6 = () => {
  return renderHook(() =>
    useCsView({
      item1: useCsSelectBoxItem(
        "Item 1",
        useInit<string>("aaa"),
        stringRule(false),
        selectOptions(["aaa", "bbb", "ccc"]),
      ),
      item2: useCsSelectBoxItem(
        "Item 1",
        useInit<string>("bbb"),
        stringRule(false),
        selectOptions(["aaa", "bbb", "ccc"]),
      ),
    }),
  ).result.current;
};
const makeTestView7 = () => {
  return renderHook(() =>
    useCsView(
      {
        item1: useCsInputTextItem(
          "Item 1",
          useInit("aaa"),
          stringRule(true, 1, 10, "customRuleName"),
        ),
      },
      {
        customValidationRules: {
          customRuleName: stringCustomValidationRule((newValue) => {
            return newValue === "bbb" ? false : true;
          }, "エラー"),
        },
      },
    ),
  ).result.current;
};

describe("CsYupValidationEventクラスのonValidateHasErrorメソッド", () => {
  let view1: CsView & {
    item1: CsInputTextItem;
    item2: CsInputTextItem;
  };
  let view2: CsView & {
    item3: CsInputNumberItem;
    item4: CsInputNumberItem;
  };
  let view3: CsView & {
    item5: CsMultiCheckBoxItem;
    item6: CsMultiCheckBoxItem;
  };
  let view4: CsView & {
    item7: CsInputNumberRangeItem;
    item8: CsInputNumberRangeItem;
  };
  let view5: CsView & {
    item1: CsSelectNumberBoxItem;
    item2: CsSelectNumberBoxItem;
  };
  let view6: CsView & {
    item1: CsSelectBoxItem;
    item2: CsSelectBoxItem;
  };
  let validationEvent: CsYupValidationEvent;

  it("全てのitemがバリデーションルールを満たす場合、false を返す", () => {
    view1 = makeTestView1(true, true);
    validationEvent = renderHook(() => useCsYupValidationEvent(view1)).result
      .current;
    const hasError = validationEvent.onValidateHasError();
    expect(hasError).toBe(false);

    view2 = makeTestView2(true, true);
    validationEvent = renderHook(() => useCsYupValidationEvent(view2)).result
      .current;
    const hasError2 = validationEvent.onValidateHasError();
    expect(hasError2).toBe(false);

    view3 = makeTestView3(true, true);
    validationEvent = renderHook(() => useCsYupValidationEvent(view3)).result
      .current;
    const hasError3 = validationEvent.onValidateHasError();
    expect(hasError3).toBe(false);

    view4 = makeTestView4(true, true);
    validationEvent = renderHook(() => useCsYupValidationEvent(view4)).result
      .current;
    const hasError4 = validationEvent.onValidateHasError();
    expect(hasError4).toBe(false);

    view5 = makeTestView5();
    validationEvent = renderHook(() => useCsYupValidationEvent(view5)).result
      .current;
    const hasError5 = validationEvent.onValidateHasError();
    expect(hasError5).toBe(false);

    view6 = makeTestView6();
    validationEvent = renderHook(() => useCsYupValidationEvent(view6)).result
      .current;
    const hasError6 = validationEvent.onValidateHasError();
    expect(hasError6).toBe(false);
  });

  it("バリデーションルールを満たさないitemが1つでもある場合、trueを返す", () => {
    view1 = makeTestView1(true, false);
    validationEvent = renderHook(() => useCsYupValidationEvent(view1)).result
      .current;
    const hasError = validationEvent.onValidateHasError();
    expect(hasError).toBe(true);
  });

  it("エラーメッセージが配列の場合スペースでつなげて出力すること", () => {});
});
describe("CsYupValidationEventクラスのonValidateItemHasErrorメソッド", () => {
  const view = makeTestView1(true, false);
  const validationEvent = renderHook(() => useCsYupValidationEvent(view)).result
    .current;

  it("対象のitemがバリデーションルールを満たす場合、falseを返す", () => {
    const hasError = validationEvent.onValidateItemHasError(
      view.item1.value,
      view.item1,
    );
    expect(hasError).toBe(false);
  });
  it("対象のitemがバリデーションルールを満たさない場合、trueを返す", () => {
    const hasError = validationEvent.onValidateItemHasError(
      view.item2.value,
      view.item2,
    );
    expect(hasError).toBe(true);
  });
  it("必須チェックOKの場合、カスタムバリデーションを実施すること", () => {
    const view = makeTestView7();
    const validationEvent = renderHook(() => useCsYupValidationEvent(view))
      .result.current;
    validationEvent.doCustomValidateItemHasError("aaa", view.item1);
    const hasError = validationEvent.onValidateItemHasError(
      view.item1.value,
      view.item1,
    );
    expect(hasError).toBe(true);
  });
  it("resetErrorが正しく動作すること", () => {
    const view = makeTestView1(false, false);
    const validationEvent = renderHook(() => useCsYupValidationEvent(view))
      .result.current;
    validationEvent.resetError();
    const messeage = view.item1.validationMessage;
    expect(messeage).toBe("");
  });
  it("emailのルールが設定されている場合、正しく動作すること", () => {
    const view = renderHook(() =>
      useCsView({
        item1: useCsInputTextItem(
          "Item 1",
          useInit("aaa"),
          stringRule(true, 1, 10),
        ),
      }),
    ).result.current;
    view.item1.setValidationRule(stringRule(true, 1, 10).setEmail(true));
    const validationEvent = renderHook(() => useCsYupValidationEvent(view))
      .result.current;
    expect(validationEvent.onValidateItemHasError("aaa", view.item1)).toBe(
      true,
    );
  });
});

class TestStringArrayItem extends CsStringArrayItem {
  constructor() {
    super();
  }
}
class TestNumberArrayItem extends CsNumberArrayItem {
  constructor() {
    super();
  }
}
describe("createValidationSchemaが正しく動作すること", () => {
  it("StringArrayItemクラスのテスト", () => {
    const view = renderHook(() => {
      return useCsView({
        item: new TestStringArrayItem().setValidationRule(
          new StringArrayValidationRule().setRequired(true),
        ),
      });
    }).result.current;
    const validationEvent = renderHook(() => useCsYupValidationEvent(view))
      .result.current;
    const hasErrorStringArrayItem = validationEvent.onValidateItemHasError(
      ["aaa"],
      view.item,
    );
    expect(hasErrorStringArrayItem).toBe(false);
  });
  it("NumberArrayItemクラスのテスト", () => {
    const view = renderHook(() => {
      return useCsView({
        item: new TestNumberArrayItem().setValidationRule(
          new NumberArrayValidationRule().setRequired(true),
        ),
      });
    }).result.current;
    const validationEvent = renderHook(() => useCsYupValidationEvent(view))
      .result.current;
    const hasErrorNumberArrayItem = validationEvent.onValidateItemHasError(
      [1],
      view.item,
    );
    expect(hasErrorNumberArrayItem).toBe(false);
  });
  it("CsInputDateRangeItemクラスのテスト", () => {
    const view = renderHook(() =>
      useCsView({
        item: useCsInputDateRangeItem(
          "Item",
          useInit(["2021-01-01"]),
          stringArrayRule(true),
        ),
        item2: useCsInputDateRangeItem(
          "Item",
          useInit(["2021-01-01", "2021-01-01"]),
          stringArrayRule(false),
        ),
      }),
    ).result.current;
    const validationEvent = renderHook(() => useCsYupValidationEvent(view))
      .result.current;
    const hasError = validationEvent.onValidateItemHasError(
      ["2021-01-01"],
      view.item,
    );
    expect(hasError).toBe(true);

    const hasError2 = validationEvent.onValidateItemHasError(
      ["2021-01-01", "2021-01-01"],
      view.item2,
    );
    expect(hasError2).toBe(false);
  });
});

describe("CsYupValidationEventクラスのdoCustomValidateItemHasErrorメソッド", () => {
  it("doCustomValidateItemHasErrorが正しく動作すること", () => {});
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
    },
    undefined,
    useCsYupValidationEvent,
  );
  return (
    <>
      <AxInputText item={view.item1} />
      <AxButton
        validationViews={[view]}
        onClick={() => {
          view.item1.validateAnytime("test");
        }}
      />
    </>
  );
};
describe("createStringConstraintメソッド", () => {
  it("createStringConstraintが正しく動作すること", async () => {
    const min = 8;
    render(<MinValidateTestComponent min={min} />);
    const button = screen.getByRole("button");
    await act(async () => {
      await userEvent.click(button);
    });
    const errorMessage = screen.getByText(
      `Item 1が短すぎます。 ${min}文字より長い文字列を入力してください`,
    ) as HTMLInputElement;
    expect(errorMessage.textContent).toBe(
      `Item 1が短すぎます。 ${min}文字より長い文字列を入力してください`,
    );
  });
});
