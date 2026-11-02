import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
  return (
    <div
      role="status"
      className="flex flex-1 items-center justify-center gap-2 px-4 py-20 text-muted-foreground"
    >
      <LoaderCircleIcon className="size-5 animate-spin" />
      불러오는 중입니다.
    </div>
  );
}
