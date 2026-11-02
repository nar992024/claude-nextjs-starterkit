import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.email("올바른 이메일 주소를 입력해 주세요."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상 입력해 주세요.")
      .regex(/[A-Za-z]/, "비밀번호에 영문을 포함해 주세요.")
      .regex(/[0-9]/, "비밀번호에 숫자를 포함해 주세요."),
    passwordConfirm: z.string().min(1, "비밀번호를 한 번 더 입력해 주세요."),
    terms: z.boolean().refine((agreed) => agreed, "약관에 동의해 주세요."),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
