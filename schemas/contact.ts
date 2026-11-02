import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "이름은 2자 이상 입력해 주세요."),
  email: z.email("올바른 이메일 주소를 입력해 주세요."),
  subject: z
    .string()
    .trim()
    .min(5, "제목은 5자 이상 입력해 주세요.")
    .max(50, "제목은 50자 이하로 입력해 주세요."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
