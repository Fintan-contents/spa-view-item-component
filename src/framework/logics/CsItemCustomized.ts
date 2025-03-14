import { CsStringRangeItem } from ".";

export class CsInputPostalCodeItem extends CsStringRangeItem {
  //Genericの型変数だけで一致した場合でも、同一型とみなされるための回避用の識別子
  private identifier?: CsInputPostalCodeItem;
  get postalCodeValue() {
    const firstPostalCode = this.lowerValue ?? "";
    const secondPostalCode = this.upperValue ?? "";
    return firstPostalCode + "-" + secondPostalCode;
  }
}
