"use server";

import { z } from "zod";

import { feedbackSchema, type FeedbackValues } from "@/schemas/feedback";

export type FeedbackState = {
  status: "idle" | "success" | "error";
  message: string;
  // 오류가 나도 입력값을 유지하기 위해 돌려준다.
  values: FeedbackValues;
  fieldErrors: Partial<Record<keyof FeedbackValues, string[]>>;
};

function getText(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

// 서버 액션은 누구나 호출할 수 있는 공개 엔드포인트이므로 서버에서 다시 검증한다.
// 예제이므로 저장하지 않고 검증 결과만 돌려준다.
export async function submitFeedback(
  _previousState: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const values = {
    email: getText(formData, "email"),
    message: getText(formData, "message"),
  };
  const result = feedbackSchema.safeParse(values);

  if (!result.success) {
    return {
      status: "error",
      message: "입력값을 확인해 주세요.",
      values,
      fieldErrors: z.flattenError(result.error).fieldErrors,
    };
  }

  return {
    status: "success",
    message: "서버에서 입력값 검증을 통과했습니다.",
    values: { email: "", message: "" },
    fieldErrors: {},
  };
}
