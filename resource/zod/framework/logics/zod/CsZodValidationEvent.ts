import {
  z,
  ZodArray,
  ZodError,
  ZodNumber,
  ZodObject,
  ZodOptional,
  ZodString,
} from "zod";
import {
  CsInputDateRangeItem,
  CsItem,
  CsNumberArrayItem,
  CsNumberItem,
  CsNumberOptionsItem,
  CsNumberRangeItem,
  CsStringArrayItem,
  CsStringArrayOptionsItem,
  CsStringItem,
  CsStringOptionsItem,
  CsValidationEvent,
  CsView,
  CustomValidationRules,
  NumberValidationRule,
  StringArrayValidationRule,
  StringValidationRule,
} from "..";

type ValueTypeZod =
  | ZodString
  | ZodOptional<ZodString>
  | ZodNumber
  | ZodOptional<ZodNumber>
  | ZodArray<ZodNumber | ZodOptional<ZodNumber>, "many">
  | ZodArray<ZodString, "many">
  | ZodArray<ZodOptional<ZodString>, "many">;

const createValidationSchema = <T extends CsView>(instance: T) => {
  const validateFieldMap = new Map<string, any>();
  const validationMap = new Map<string, ValueTypeZod>();
  const keys = Object.keys(instance);
  keys.forEach((key) => {
    const item = instance[key as keyof T];
    if (!(item instanceof CsItem)) return;
    if (item instanceof CsStringItem) {
      createStringConstraint(item, key, validationMap);
    }
    if (item instanceof CsNumberArrayItem) {
      createNumberArrayConstraint(item, key, validationMap);
    }
    if (item instanceof CsNumberItem) {
      createNumberConstraint(item, key, validationMap);
    }
    if (item instanceof CsStringArrayItem) {
      createStringArrayConstraint(item, key, validationMap);
    }
    if (item instanceof CsStringOptionsItem) {
      createStringConstraint(item, key, validationMap);
    }
    if (item instanceof CsNumberOptionsItem) {
      createNumberConstraint(item, key, validationMap);
    }
    if (item instanceof CsStringArrayOptionsItem) {
      createStringArrayConstraint(item, key, validationMap);
    }
    if (item instanceof CsNumberRangeItem) {
      createNumberArrayConstraint(item, key, validationMap);
    }
    if (item instanceof CsInputDateRangeItem) {
      createDateRangeConstraint(item, key, validationMap);
    }
    validateFieldMap.set(key, item.value);
    return;
  });
  const validationSchemaDefObj = Object.fromEntries(validationMap);
  const validationSchemaObj = z.object(validationSchemaDefObj);
  return { validationSchemaObj, validateFieldMap };
};

const createStringConstraint = (
  item: CsItem<string>,
  key: string,
  validationMap: Map<string, ValueTypeZod>,
) => {
  if (item.validationRule instanceof StringValidationRule) {
    const sRule = item.validationRule as StringValidationRule;
    let sz = sRule.required
      ? z.string({
          required_error: item.label + "は必須です。値を設定してください",
        })
      : z.string();
    const min = sRule.min ?? (sRule.required ? 1 : undefined);
    if (min !== undefined) {
      const message =
        min === 1 && sRule.required
          ? item.label + "は必須です。値を設定してください"
          : item.label +
            "が短すぎます。 " +
            sRule.min +
            "文字より長い文字列を入力してください";
      sz = sz.min(min, message);
    }
    if (sRule.max !== undefined) {
      sz = sz.max(
        sRule.max,
        item.label +
          "が長すぎます。 " +
          sRule.max +
          "文字より短い文字列を入力してください",
      );
    }
    if (sRule.email) {
      sz = sz.email(
        item.label + "は、正しいメールアドレスの形式で入力してください",
      );
    }
    let osz;
    if (!sRule.required) {
      osz = sz.optional();
    }
    validationMap.set(key, osz ?? sz);
  }
};

const createNumberConstraint = (
  item: CsItem<number>,
  key: string,
  validationMap: Map<string, ValueTypeZod>,
) => {
  if (item.validationRule instanceof NumberValidationRule) {
    const nRule = item.validationRule as NumberValidationRule;
    let nz = nRule.required
      ? z.number({
          required_error: item.label + "は必須です。値を設定してください",
        })
      : z.number();
    if (nRule.min !== undefined) {
      nz = nz.min(
        nRule.min,
        item.label +
          "が小さすぎます。 " +
          nRule.min +
          "より大きい数を入力してください",
      );
    }
    if (nRule.max !== undefined) {
      nz = nz.max(
        nRule.max,
        item.label +
          "が大きすぎます。 " +
          nRule.max +
          "より小さい数を入力してください",
      );
    }
    let onz;
    if (!nRule.required) {
      onz = nz.optional();
    }
    validationMap.set(key, onz ?? nz);
  }
};

const createStringArrayConstraint = (
  item: CsItem<string[]>,
  key: string,
  validationMap: Map<string, ValueTypeZod>,
) => {
  if (item.validationRule instanceof StringArrayValidationRule) {
    const saRule = item.validationRule as StringArrayValidationRule;
    const saz = saRule.required
      ? z
          .array(z.string())
          .min(1, item.label + "は必須です。1つ以上の値を入力してください")
      : z.array(z.string().optional());
    validationMap.set(key, saz);
  }
};

const createNumberArrayConstraint = (
  item: CsItem<number>,
  key: string,
  validationMap: Map<string, ValueTypeZod>,
) => {
  if (item.validationRule instanceof NumberValidationRule) {
    const nRule = item.validationRule as NumberValidationRule;
    let nz = nRule.required
      ? z.number({
          required_error: item.label + "は必須です。値を設定してください",
        })
      : z.number();
    if (nRule.min)
      nz = nz.min(
        nRule.min,
        item.label +
          "が小さすぎます。 " +
          nRule.min +
          "より大きい数を入力してください",
      );
    if (nRule.max)
      nz = nz.max(
        nRule.max,
        item.label +
          "が大きすぎます。 " +
          nRule.max +
          "より小さい数を入力してください",
      );
    let onz;
    if (!nRule.required) onz = nz.optional();
    const naz = z.array(onz ?? nz);
    validationMap.set(key, naz);
  }
};

const createDateRangeConstraint = (
  item: CsItem<string[]>,
  key: string,
  validationMap: Map<string, ValueTypeZod>,
) => {
  if (item.validationRule instanceof StringArrayValidationRule) {
    const saRule = item.validationRule as StringArrayValidationRule;
    const saz = saRule.required
      ? z
          .array(z.string({required_error: item.label + "は必須です。"}))
          .length(2, item.label + "は必須です。")
      : z.array(z.string().optional());
    validationMap.set(key, saz);
  }
};

export class CsZodValidationEvent extends CsValidationEvent {
  parentView: CsView;
  validationSchemaObj: ZodObject<{ [k: string]: ValueTypeZod }>;
  validateFieldMap: Map<string, string | number | string[] | undefined>;
  zodError?: ZodError;

  constructor(
    view: CsView,
    validationSchemaObj: ZodObject<{
      [k: string]: ValueTypeZod;
    }>,
    validateFieldMap: Map<string, string | number | string[] | undefined>,
    customValidationRules?: CustomValidationRules,
  ) {
    super(customValidationRules);
    this.parentView = view;
    this.validationSchemaObj = validationSchemaObj;
    this.validateFieldMap = validateFieldMap;
  }

  onValidateHasError = (): boolean => {
    let hasError = false;
    for (const item of Object.values(this.parentView)) {
      if (item instanceof CsItem) {
        const newValue = item.value;
        if (this.onValidateItemHasError(newValue, item)) {
          hasError = true;
        }
      }
    }
    return hasError;
  };

  onValidateItemHasError = <T>(newValue: T | undefined, item: CsItem<T>) => {
    const itemRule = this.validationSchemaObj.shape[item.key];
    const itemSchema = z.object({ [item.key]: itemRule });
    let hasError = false;
    try {
      if (!this.doRequiredCheckHasError(newValue, item)) {
        // 必須チェックOKの場合はカスタムバリデーションを実行
        if (this.doCustomValidateItemHasError(newValue, item)) {
          return true;
        }
      }
      // 必須チェックNGの場合、もしくは必須チェックOKかつカスタムバリデーションOKの場合は、
      // 標準バリデーションを実行
      const map = new Map<string, T | undefined>();
      map.set(item.key, newValue === "" ? undefined : newValue);
      const data = Object.fromEntries(map);
      itemSchema.parse(data);
      if (item.setValidationMessage) {
        item.setValidationMessage("");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        hasError = true;
        const zodError = error as ZodError;
        const message = zodError.issues.find((i) =>
          i.path.includes(item.key),
        )?.message;
        if (item.setValidationMessage) {
          item.setValidationMessage(message ?? "");
        }
      }
    }
    return hasError;
  };

  validationErrorMessage(item: CsItem<unknown>): string {
    return (
      this.zodError?.issues?.find((i) => i.path.includes(item.key))?.message ??
      ""
    );
  }

  resetError = (name?: string) => {
    Object.values(this.parentView).forEach((item) => {
      if (item instanceof CsItem) {
        if (item.setValidationMessage) {
          if (name === undefined || name === item.key) {
            item.setValidationMessage("");
          }
        }
      }
    });
  };
}

export const useCsZodValidationEvent = <T extends CsView>(
  instance: T,
  customValidationRules?: CustomValidationRules,
) => {
  const { validationSchemaObj, validateFieldMap } =
    createValidationSchema(instance);
  const validationEvent = new CsZodValidationEvent(
    instance,
    validationSchemaObj,
    validateFieldMap,
    customValidationRules,
  );
  return validationEvent;
};
