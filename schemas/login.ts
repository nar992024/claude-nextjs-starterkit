import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("올바른 이메일 주소를 입력해 주세요."),
  // 가입 시점의 규칙이 바뀌어도 기존 계정이 로그인할 수 있도록 길이는 검사하지 않는다.
  password: z.string().min(1, "비밀번호를 입력해 주세요."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
