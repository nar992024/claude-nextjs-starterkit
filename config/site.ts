// 사이트 이름, 설명, 내비게이션을 한곳에서 관리한다.
export const siteConfig = {
  name: "Next.js 스타터킷",
  description: "웹 개발을 바로 시작할 수 있는 Next.js 스타터킷입니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { title: "홈", href: "/" },
    { title: "예제", href: "/examples" },
  ],
} as const;
