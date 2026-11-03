"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormValues } from "@/schemas/login";

const fields = [
  {
    name: "email",
    label: "이메일",
    type: "email",
    autoComplete: "email",
    placeholder: "name@example.com",
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    autoComplete: "current-password",
    placeholder: undefined,
  },
] as const;

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // 다른 페이지로 이동해도 이 화면은 <Activity>로 숨겨진 채 남으므로 비밀번호를 지운다.
  useEffect(() => () => form.resetField("password"), [form]);

  // 인증 서버가 없으므로 입력값을 전송하지 않고 검증 결과만 표시한다.
  function onSubmit() {
    toast.success("입력값 검증을 통과했습니다. 인증 기능은 아직 없습니다.");
    form.reset();
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {fields.map(({ name, label, type, autoComplete, placeholder }) => (
          <Controller
            key={name}
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type={type}
                  autoComplete={autoComplete}
                  placeholder={placeholder}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}
        <Button type="submit" className="w-full">
          <LogInIcon data-icon="inline-start" />
          로그인하기
        </Button>
        <p className="flex items-center justify-center text-sm text-muted-foreground">
          계정이 없으신가요?
          {/* 별도 회원가입 페이지가 생기면 이 경로를 바꾼다. */}
          <Link
            href="/examples/signup-form"
            className={buttonVariants({ variant: "link" })}
          >
            회원가입
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
