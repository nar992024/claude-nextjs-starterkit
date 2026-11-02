"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SendIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { contactSchema, type ContactFormValues } from "@/schemas/contact";

const fields = [
  { name: "name", label: "이름", type: "text", autoComplete: "name" },
  { name: "email", label: "이메일", type: "email", autoComplete: "email" },
  { name: "subject", label: "제목", type: "text", autoComplete: "off" },
] as const;

export function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "" },
  });

  function onSubmit(values: ContactFormValues) {
    toast.success(`${values.name}님의 문의가 접수되었습니다.`);
    form.reset();
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        {fields.map(({ name, label, type, autoComplete }) => (
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
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        ))}
        <Button type="submit" className="w-full sm:w-auto sm:self-start">
          <SendIcon data-icon="inline-start" />
          보내기
        </Button>
      </FieldGroup>
    </form>
  );
}
