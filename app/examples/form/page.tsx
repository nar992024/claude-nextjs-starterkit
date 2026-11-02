import type { Metadata } from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = { title: "폼 예제" };

export default function FormExamplePage() {
  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>폼 예제</CardTitle>
          <CardDescription>
            React Hook Form과 Zod로 입력값을 검증합니다. 데이터는 전송되지
            않습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm />
        </CardContent>
      </Card>
    </div>
  );
}
