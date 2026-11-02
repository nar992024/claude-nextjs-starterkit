import { BellIcon, ShieldIcon, UserIcon } from "lucide-react";
import type { Metadata } from "next";

import { ExampleShell } from "@/components/common/example-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getExample } from "@/config/examples";

const href = "/examples/tabs";

export const metadata: Metadata = { title: getExample(href).title };

const tabs = [
  {
    value: "account",
    label: "계정",
    icon: UserIcon,
    content: "이름과 이메일 같은 계정 정보를 관리하는 영역입니다.",
  },
  {
    value: "notifications",
    label: "알림",
    icon: BellIcon,
    content: "받고 싶은 알림의 종류를 선택하는 영역입니다.",
  },
  {
    value: "security",
    label: "보안",
    icon: ShieldIcon,
    content: "비밀번호와 로그인 기록을 확인하는 영역입니다.",
  },
];

export default function TabsExamplePage() {
  return (
    <ExampleShell href={href}>
      <Tabs defaultValue="account">
        <TabsList className="w-full">
          {tabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value}>
              <Icon data-icon="inline-start" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(({ value, content }) => (
          <TabsContent
            key={value}
            value={value}
            className="rounded-lg border p-4"
          >
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </ExampleShell>
  );
}
