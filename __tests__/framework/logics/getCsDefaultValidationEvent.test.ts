import { getCsDefaultValidationEvent } from "../../../src/framework/logics/getCsDefaultValidationEvent";
import { useCsZodValidationEvent } from "../../../src/framework/logics/zod/CsZodValidationEvent";
import { describe, expect, it } from "@jest/globals";

/**
 * getCsDefaultValidationEventメソッドのテスト
 */

describe("getCsDefaultValidationEventメソッドのテスト", () => {
  it("useCsZodValidationEventを返すこと", () => {
    const result = getCsDefaultValidationEvent();
    expect(result).toBe(useCsZodValidationEvent);
  });
});
