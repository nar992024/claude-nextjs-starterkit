import { z } from "zod";

export const MAX_PARTICIPANTS = 5;

export const eventRegistrationSchema = z.object({
  eventName: z.string().trim().min(2, "행사 이름은 2자 이상 입력해 주세요."),
  participants: z
    .array(
      z.object({
        name: z.string().trim().min(2, "이름은 2자 이상 입력해 주세요."),
        email: z.email("올바른 이메일 주소를 입력해 주세요."),
      }),
    )
    .min(1, "참가자를 1명 이상 입력해 주세요.")
    .max(
      MAX_PARTICIPANTS,
      `참가자는 ${MAX_PARTICIPANTS}명까지 입력할 수 있습니다.`,
    ),
});

export type EventRegistrationValues = z.infer<typeof eventRegistrationSchema>;
