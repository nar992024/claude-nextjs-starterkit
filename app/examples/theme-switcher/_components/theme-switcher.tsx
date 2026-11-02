"use client";

import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

const options = [
  { value: "light", label: "라이트", icon: SunIcon },
  { value: "dark", label: "다크", icon: MoonIcon },
  { value: "system", label: "시스템", icon: MonitorIcon },
];

export function ThemeSwitcher() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  // 저장된 테마는 브라우저에서만 알 수 있으므로 hydration 후에 표시한다.
  const mounted = useMounted();

  return (
    <div className="flex flex-col gap-4">
      <div
        className="grid grid-cols-3 gap-2"
        role="group"
        aria-label="테마 선택"
      >
        {options.map(({ value, label, icon: Icon }) => (
          <Button
            key={value}
            variant={mounted && theme === value ? "default" : "outline"}
            aria-pressed={mounted && theme === value}
            onClick={() => setTheme(value)}
          >
            <Icon data-icon="inline-start" />
            {label}
          </Button>
        ))}
      </div>
      <dl className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-4 text-sm">
        <dt className="text-muted-foreground">선택한 테마</dt>
        <dd className="font-medium">{mounted ? theme : "확인 중"}</dd>
        <dt className="text-muted-foreground">실제 적용된 테마</dt>
        <dd className="font-medium">{mounted ? resolvedTheme : "확인 중"}</dd>
      </dl>
    </div>
  );
}
