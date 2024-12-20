import {
  CsEvent,
  CsItem,
  CsItemBase,
  CsLoadEvent,
  CustomValidationRule,
  CustomValidationRules,
  getCsDefaultValidationEvent,
} from ".";

export type CsViewDefinition = Record<string, CsItemBase | CsEvent>;
export abstract class CsView {
  readonly?: boolean = false;
  validateTrigger?: "onSubmit" | "onBlur" = "onSubmit";
  validationEvent?: CsValidationEvent;
  abstract get isLoading(): boolean;
}

export abstract class CsValidationEvent {
  private customRules?: { [key: string]: CustomValidationRule<string> };
  constructor(customRules?: { [key: string]: CustomValidationRule<any> }) {
    this.customRules = customRules;
  }

  /** XxButtonから呼び出すためのバリデーションメソッド
   *  エラーがあったか、なかったかをbooleanとして返す
   */
  abstract onValidateHasError(): boolean;

  /**
   * 項目単体のみのバリデーションメソッド
   * エラーがあったか、なかったかをbooleanとして返す
   * @param newValue 新しい値
   * @param item 項目
   */
  abstract onValidateItemHasError<T>(
    newValue: T | undefined,
    item: CsItem<T>,
  ): boolean;

  abstract validationErrorMessage(item: CsItem<any>): string;

  abstract resetError(name?: string): void;

  private isEmpty<T>(value: T | undefined): boolean {
    return (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    );
  }
  doRequiredCheckHasError<T>(
    newValue: T | undefined,
    item: CsItem<T>,
  ): boolean {
    return item.validationRule?.required && this.isEmpty(newValue);
  }

  doCustomValidateItemHasError<T>(
    newValue: T | undefined,
    item: CsItem<T>,
  ): boolean {
    const customRuleName = item.validationRule?.customRuleName;
    if (!customRuleName) {
      return false;
    }
    if (!this.customRules) {
      if (item.setValidationMessage) {
        item.setValidationMessage(
          `カスタムルールの定義(customValidationRules)が指定されていないのに、カスタムバリデーションルールが指定されています。ルール：[${customRuleName}]`,
        );
      }
      return true;
    }
    const rule: CustomValidationRule<any> | undefined =
      this.customRules[customRuleName];
    if (!rule) {
      if (item.setValidationMessage) {
        item.setValidationMessage(
          `カスタムバリデーションルールが登録されていません。ルール：[${customRuleName}]`,
        );
      }
      return true;
    }
    if (!rule.canApplyValue(newValue)) {
      if (item.setValidationMessage) {
        item.setValidationMessage(
          `この項目には使用できないカスタムバリデーションルールです。ルール：[${customRuleName}]`,
        );
      }
      return true;
    }
    const isOk = rule.validator(newValue, item);
    if (isOk) {
      if (item.setValidationMessage) {
        item.setValidationMessage("");
      }
      return false;
    }
    const makeMessage = rule.message;
    if (typeof makeMessage === "string") {
      if (item.setValidationMessage) {
        item.setValidationMessage(makeMessage);
      }
    } else {
      if (item.setValidationMessage) {
        item.setValidationMessage(makeMessage(item.label, newValue, item));
      }
    }
    return true;
  }
}

export const executeValidation = (validationViews: CsView[] | undefined) => {
  let validationOK = true;
  if (validationViews) {
    for (const view of validationViews) {
      if (view.validationEvent) {
        if (view.validationEvent.onValidateHasError()) {
          validationOK = false;
        }
      }
    }
  }
  return validationOK;
};

export const useCsView = <
  D extends CsViewDefinition,
  AppValidationRules extends CustomValidationRules,
>(
  definitions: D,
  options: {
    readonly?: boolean;
    customValidationRules?: AppValidationRules;
    validationTrigger?: "onSubmit" | "onBlur";
  } = {
    readonly: false,
    customValidationRules: undefined,
    validationTrigger: "onSubmit",
  },
  validationEventHook: (
    instance: CsView & D,
    customRules?: CustomValidationRules,
  ) => CsValidationEvent = getCsDefaultValidationEvent(),
): CsView & D => {
  const instance: CsView & D = {
    ...definitions,
    readonly: options.readonly ?? false,
    validateTrigger: options.validationTrigger,
    get isLoading() {
      for (let value of Object.values(definitions)) {
        if (value instanceof CsLoadEvent) {
          const event = value as CsLoadEvent;
          if (event.isLoading) {
            return true;
          }
        }
      }
      return false;
    },
  };
  instance.validationEvent = validationEventHook(
    instance,
    options.customValidationRules,
  );
  Object.entries(definitions).forEach(([key, value]) => {
    if (value instanceof CsItemBase) {
      value.key = key;
      value.parentView = instance;
    }
  });
  return instance;
};
