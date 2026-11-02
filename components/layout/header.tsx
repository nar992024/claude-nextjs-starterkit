import Link from "next/link";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex min-h-11 items-center font-semibold tracking-tight"
        >
          {siteConfig.name}
        </Link>
        <div className="flex items-center gap-1">
          <nav
            aria-label="주요 메뉴"
            className="hidden items-center gap-1 md:flex"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
