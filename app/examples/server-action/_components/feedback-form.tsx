"use client";

import { LoaderCircleIcon, SendIcon } from "lucide-react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { submitFeedback, type FeedbackState } from "../actions";

const initialState: FeedbackState = {
  status: "idle",
  message: "",
  values: { email: "", message: "" },
  fieldErrors: {},
};

const fields = [
  { name: "email", label: "이메일", type: "email", autoComplete: "email" },
  { name: "message", label: "내용", type: "text", autoComplete: "off" },
] as const;

export function FeedbackForm() {
  const [state, formAction, pending] = useActionState(
    submitFeedback,
    initialState,
  );

  return (
    <form action={formAction} noValidate>
      <FieldGroup>
        {fields.map(({ name, label, type, autoComplete }) => {
          const errors = state.fieldErrors[name];
          const invalid = Boolean(errors?.length);

          return (
            <Field key={name} data-invalid={invalid}>
              <FieldLabel htmlFor={name}>{label}</FieldLabel>
              <Input
                id={name}
                name={name}
                type={type}
                autoComplete={autoComplete}
                defaultValue={state.values[name]}
                aria-invalid={invalid}
              />
              {invalid && (
                <FieldError errors={errors?.map((message) => ({ message }))} />
              )}
            </Field>
          );
        })}
        <Button
          type="submit"
          disabled={pending}
          className="w-full sm:w-auto sm:self-start"
        >
          {pending ? (
            <LoaderCircleIcon
              data-icon="inline-start"
              className="animate-spin"
            />
          ) : (
            <SendIcon data-icon="inline-start" />
          )}
          서버로 보내기
        </Button>
        <p
          aria-live="polite"
          data-status={state.status}
          className="text-sm data-[status=error]:text-destructive data-[status=success]:font-medium"
        >
          {state.message}
        </p>
      </FieldGroup>
    </form>
  );
}
