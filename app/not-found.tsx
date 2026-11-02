import { FileQuestionIcon, HouseIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = { title: "페이지를 찾을 수 없습니다" };

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-20 text-center">
      <FileQuestionIcon className="size-10 text-muted-foreground" />
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground">
        주소가 바뀌었거나 삭제된 페이지입니다.
      </p>
      <Link href="/" className={buttonVariants()}>
        <HouseIcon data-icon="inline-start" />
        홈으로 이동
      </Link>
    </div>
  );
}
