import { z } from "zod";

export const feedbackSchema = z.object({
  email: z.email("올바른 이메일 주소를 입력해 주세요."),
  message: z
    .string()
    .trim()
    .min(5, "내용은 5자 이상 입력해 주세요.")
    .max(200, "내용은 200자 이하로 입력해 주세요."),
});

export type FeedbackValues = z.infer<typeof feedbackSchema>;
