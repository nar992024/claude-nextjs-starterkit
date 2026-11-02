"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signupSchema, type SignupFormValues } from "@/schemas/signup";

const textFields = [
  { name: "email", label: "이메일", type: "email", autoComplete: "email" },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    autoComplete: "new-password",
    description: "영문과 숫자를 포함해 8자 이상 입력하세요.",
  },
  {
    name: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    autoComplete: "new-password",
  },
] as const;

export function SignupForm() {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      terms: false,
    },
  });

  // 예제이므로 서버로 전송하지 않고 결과만 표시한다.
  function onSubmit() {
    toast.success("회원가입 입력값 검증을 통과했습니다.");
    form.reset();
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {textFields.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{item.label}</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type={item.type}
                  autoComplete={item.autoComplete}
                  aria-invalid={fieldState.invalid}
                />
                {"description" in item && (
                  <FieldDescription>{item.description}</FieldDescription>
                )}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}
        <Controller
          name="terms"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex min-h-11 items-center gap-3">
                <Checkbox
                  id={field.name}
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  aria-invalid={fieldState.invalid}
                />
                <FieldLabel htmlFor={field.name}>
                  이용약관에 동의합니다
                </FieldLabel>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto sm:self-start">
          <UserPlusIcon data-icon="inline-start" />
          가입하기
        </Button>
      </FieldGroup>
    </form>
  );
}
