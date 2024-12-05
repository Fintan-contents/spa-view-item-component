import {
  AxInputDateRange,
  AxInputNumberRange,
} from "@/framework/components/antd";
import {
  numberRule,
  RW,
  stringArrayCustomValidationRule,
  stringArrayRule,
  useCsInputDateRangeItem,
  useCsInputNumberRangeItem,
  useCsView,
  useInit,
  useRangeInit,
} from "@/framework/logics";
import { describe, expect, it } from "@jest/globals";
import { render, renderHook, screen } from "@testing-library/react";
import { act } from "react";
import userEvent from "@testing-library/user-event";

/**
 * CsInputNumberRangeItemクラスのテスト
 */
type SetNumberRangeComponentProps = {
  newValue: number[];
};
const SetNumberRangeComponent = (props: SetNumberRangeComponentProps) => {
  const view = useCsView({
    item: useCsInputNumberRangeItem(
      "test",
      useRangeInit<number>(0, 100),
      numberRule(false, 0, 100),
    ),
  });
  const { newValue } = props;

  return (
    <>
      <AxInputNumberRange item={view.item} />
      <button
        data-testid="changeButton1"
        onClick={() => {
          view.item.setLowerValue(newValue[0]);
          view.item.setUpperValue(newValue[1]);
        }}
      >
        changed
      </button>
      <button
        data-testid="changeButton2"
        onClick={() => {
          view.item.setRangeValue(newValue[2], newValue[3]);
        }}
      >
        changed
      </button>
    </>
  );
};
describe("CsInputNumberRangeItemクラスのテスト", () => {
  it("lowerValue,upperValueのテスト", () => {
    const view = renderHook(() =>
      useCsView({
        item: useCsInputNumberRangeItem(
          "test",
          useRangeInit<number>(0, 100),
          numberRule(false, 0, 100),
          RW.Editable,
        ),
        item2: useCsInputNumberRangeItem(
          "test2",
          useRangeInit(),
          numberRule(false, 0, 100),
          RW.Editable,
        ),
      }),
    ).result.current;
    expect(view.item.lowerValue).toBe(0);
    expect(view.item.upperValue).toBe(100);
    expect(view.item2.lowerValue).toBe(undefined);
    expect(view.item2.upperValue).toBe(undefined);
  });

  it("setLowerValue, setUpperValue, setRangeValueのテスト", async () => {
    render(<SetNumberRangeComponent newValue={[10, 90, 20, 80]} />);
    const button1 = screen.getByTestId("changeButton1");
    await act(async () => {
      await userEvent.click(button1);
    });
    const target = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    expect(target[0].value).toBe("10");
    expect(target[1].value).toBe("90");

    const button2 = screen.getByTestId("changeButton2");
    await act(async () => {
      await userEvent.click(button2);
    });
    expect(target[0].value).toBe("20");
    expect(target[1].value).toBe("80");
  });
});

/**
 * CsInputDateRangeItemクラスのテスト
 */
type SetRangeComponentProps = {
  newValue: string[];
};
const SetRangeComponent = (props: SetRangeComponentProps) => {
  const view = useCsView({
    item: useCsInputDateRangeItem(
      "test",
      useInit(["2021-01-01", "2021-12-31"]),
      stringArrayRule(false),
    ),
  });
  const { newValue } = props;

  return (
    <>
      <AxInputDateRange item={view.item} />
      <button
        data-testid="changeButton1"
        onClick={() => {
          view.item.setLowerValue(newValue[0]);
          view.item.setUpperValue(newValue[1]);
        }}
      >
        changed
      </button>
      <button
        data-testid="changeButton2"
        onClick={() => {
          view.item.setRangeValue(newValue[2], newValue[3]);
        }}
      >
        changed
      </button>
    </>
  );
};
describe("CsInputDateRangeItemクラスのテスト", () => {
  it("lowerValue,upperValueのテスト", () => {
    const view = renderHook(() =>
      useCsView({
        item: useCsInputDateRangeItem(
          "test",
          useInit(["2021-01-01", "2021-12-31"]),
          stringArrayRule(false),
        ),
        item2: useCsInputDateRangeItem(
          "test2",
          useInit(["2021-01-01", "2021-12-31", "2021-01-01", "2021-12-31"]),
          stringArrayRule(false),
        ),
      }),
    ).result.current;
    expect(view.item.lowerValue).toBe("2021-01-01");
    expect(view.item.upperValue).toBe("2021-12-31");
    expect(view.item2.lowerValue).toBeUndefined();
    expect(view.item2.upperValue).toBeUndefined();
  });

  it("setLowerValue, setUpperValue, setRangeValueのテスト", async () => {
    render(
      <SetRangeComponent
        newValue={["2021-03-01", "2021-10-31", "2022-04-01", "2022-11-30"]}
      />,
    );
    const button1 = screen.getByTestId("changeButton1");
    await act(async () => {
      await userEvent.click(button1);
    });
    const lowerValue = screen.getByPlaceholderText(
      "開始日を選択してください",
    ) as HTMLInputElement;
    const upperValue = screen.getByPlaceholderText(
      "終了日を選択してください",
    ) as HTMLInputElement;
    expect(lowerValue.value).toBe("2021-03-01");
    expect(upperValue.value).toBe("2021-10-31");

    const button2 = screen.getByTestId("changeButton2");
    await act(async () => {
      await userEvent.click(button2);
    });
    expect(lowerValue.value).toBe("2022-04-01");
    expect(upperValue.value).toBe("2022-11-30");
  });

  it("getValueFormatのテスト", () => {
    const view = renderHook(() =>
      useCsView({
        item: useCsInputDateRangeItem(
          "test",
          useInit(["202101", "202112"]),
          stringArrayRule(false),
        ),
      }),
    ).result.current;
    view.item.format = "YYYYMM";
    expect(view.item.getValueFormat()).toBe("YYYY-MM");
  });

  it("validateDateRangeのテスト", () => {
    const view = renderHook(() =>
      useCsView(
        {
          item1: useCsInputDateRangeItem(
            "test",
            useInit(["2021-01-01", "2021-01-01"]),
            stringArrayRule(false),
          ),
          item2: useCsInputDateRangeItem(
            "test2",
            useInit(),
            stringArrayRule(false, "customRuleName"),
          ),
        },
        {
          customValidationRules: {
            customRuleName: stringArrayCustomValidationRule(
              (newValue, item) => {
                if (!newValue) return false;
                if (newValue.length < 2) return false;
                return newValue[0] == newValue[1] ? false : true;
              },
              "エラー",
            ),
          },
        },
      ),
    ).result.current;
    act(() => {
      expect(view.item1.validateDateRange()).toBe(false);
      expect(view.item2.validateDateRange()).toBe(undefined);
    });

    view.validationEvent = undefined;
    act(() => {
      expect(view.item1.validateDateRange()).toBe(false);
    });
  });
});
