import {
  createRegExpValidator,
  CustomValidationRules,
  stringCustomValidationRule,
} from "../logics";

export const buildInCustomValidationRules: CustomValidationRules = {
  半角数字: stringCustomValidationRule(
    createRegExpValidator(/^\d*$/),
    (label: string) => `${label}は半角数字で入力してください`,
  ),
  半角英字: stringCustomValidationRule(
    createRegExpValidator(/^[a-zA-Z]*$/),
    (label: string) => `${label}は半角英字で入力してください`,
  ),
  半角記号: stringCustomValidationRule(
    createRegExpValidator(/^[!-)+-/:-@\[-`{-~]*$/),
    (label: string) => `${label}は半角記号で入力してください`,
  ),
  半角カナ: stringCustomValidationRule(
    createRegExpValidator(/^[ｦ-ﾟ ]*$/),
    (label: string) => `${label}は半角カナで入力してください`,
  ),
  半角英数字: stringCustomValidationRule(
    createRegExpValidator(/^[a-zA-Z0-9]*$/),
    (label: string) => `${label}は半角英数字で入力してください`,
  ),
  半角英数字記号: stringCustomValidationRule(
    createRegExpValidator(/^[a-zA-Z0-9!-/:-@\[-`{-~]*$/),
    (label: string) => `${label}は半角英数字記号で入力してください`,
  ),
  半角文字: stringCustomValidationRule(
    createRegExpValidator(/^[ -~｡-ﾟ]*$/),
    (label: string) => `${label}は半角文字で入力してください`,
  ),
  全角英数字: stringCustomValidationRule(
    createRegExpValidator(/^[Ａ-Ｚａ-ｚ０-９]*$/),
    (label: string) => `${label}は全角英数字で入力してください`,
  ),
  全角ひらがな: stringCustomValidationRule(
    createRegExpValidator(/^[ぁ-ゟ]*$/),
    (label: string) => `${label}は全角ひらがなで入力してください`,
  ),
  全角カタカナ: stringCustomValidationRule(
    createRegExpValidator(/^[ァ-ヿ]*$/),
    (label: string) => `${label}は全角カタカナで入力してください`,
  ),
  全角文字: stringCustomValidationRule(
    createRegExpValidator(/^[^ -~｡-ﾟ]*$/),
    (label: string) => `${label}は全角文字で入力してください`,
  ),
  郵便番号: stringCustomValidationRule(
    createRegExpValidator(/^\d{3}-?\d{4}$/),
    (label: string) =>
      `${label}は XXX-XXXX 又は XXXXXXX 形式で入力してください`,
  ),
  "郵便番号(ハイフンあり)": stringCustomValidationRule(
    createRegExpValidator(/^\d{3}-\d{4}$/),
    (label: string) => `${label}は XXX-XXXX 形式で入力してください`,
  ),
  "郵便番号(ハイフンなし)": stringCustomValidationRule(
    createRegExpValidator(/^\d{7}$/),
    (label: string) => `${label}は XXXXXXX 形式で入力してください`,
  ),
  電話番号: stringCustomValidationRule(
    createRegExpValidator(/^(\d|[ -/:-@\[-`{-~])*(\d)+(\d|[ -/:-@\[-`{-~])*$/),
    (label: string) => `${label}は電話番号の形式で入力してください`,
  ),
};
