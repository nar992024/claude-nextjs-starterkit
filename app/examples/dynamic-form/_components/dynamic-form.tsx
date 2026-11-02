"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, SendIcon, Trash2Icon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  eventRegistrationSchema,
  MAX_PARTICIPANTS,
  type EventRegistrationValues,
} from "@/schemas/event-registration";

const emptyParticipant = { name: "", email: "" };

export function DynamicForm() {
  const form = useForm<EventRegistrationValues>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: { eventName: "", participants: [emptyParticipant] },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participants",
  });

  // 예제이므로 서버로 전송하지 않고 결과만 표시한다.
  function onSubmit(values: EventRegistrationValues) {
    toast.success(
      `${values.eventName}: 참가자 ${values.participants.length}명 입력을 확인했습니다.`,
    );
    form.reset();
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="eventName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>행사 이름</FieldLabel>
              <Input
                {...field}
                id={field.name}
                autoComplete="off"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <FieldSet>
          <FieldLegend>
            참가자 ({fields.length}/{MAX_PARTICIPANTS})
          </FieldLegend>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-lg border p-3 sm:grid-cols-[1fr_1fr_auto] sm:items-start"
            >
              <Controller
                name={`participants.${index}.name`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      참가자 {index + 1} 이름
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name={`participants.${index}.email`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      참가자 {index + 1} 이메일
                    </FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="justify-self-end sm:mt-6"
                aria-label={`참가자 ${index + 1} 삭제`}
                disabled={fields.length === 1}
                onClick={() => remove(index)}
              >
                <Trash2Icon />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto sm:self-start"
            disabled={fields.length >= MAX_PARTICIPANTS}
            onClick={() => append(emptyParticipant)}
          >
            <PlusIcon data-icon="inline-start" />
            참가자 추가
          </Button>
        </FieldSet>
        <Button type="submit" className="w-full sm:w-auto sm:self-start">
          <SendIcon data-icon="inline-start" />
          등록하기
        </Button>
      </FieldGroup>
    </form>
  );
}
