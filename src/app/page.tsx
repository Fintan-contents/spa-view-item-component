"use client";

import { AxInputPostalCode } from "@/framework/components/antd";
import {
  stringArrayRule,
  useCsInputPostalCodeItem,
  useCsView,
  useInit,
} from "@/framework/logics";
import { useCsYupValidationEvent } from "@/framework/logics/yup/CsYupValidationEvent";

export default function Home() {
  const view = useCsView(
    {
      postalCode: useCsInputPostalCodeItem(
        "郵便番号",
        useInit(["", ""]),
        stringArrayRule(true),
      ),
    },
    {
      validationTrigger: "onBlur",
    },
    useCsYupValidationEvent,
  );
  return <AxInputPostalCode item={view.postalCode} />;
}
