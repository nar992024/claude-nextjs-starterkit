"use client";

import { RotateCcwIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const initialItems = ["보고서 초안", "회의 메모", "디자인 시안"];

export function DeleteDialog() {
  const [items, setItems] = useState(initialItems);
  // 삭제를 확인 중인 항목. 값이 있으면 다이얼로그가 열린다.
  const [target, setTarget] = useState<string | null>(null);

  function confirmDelete() {
    if (target === null) return;
    setItems((current) => current.filter((item) => item !== target));
    toast.success(`${target}을(를) 삭제했습니다.`);
    setTarget(null);
  }

  return (
    <div className="flex flex-col gap-3">
      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted-foreground">
          항목을 모두 삭제했습니다.
        </p>
      ) : (
        <ul className="flex flex-col divide-y">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center justify-between gap-2 py-1"
            >
              <span className="min-w-0 break-words">{item}</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label={`${item} 삭제`}
                onClick={() => setTarget(item)}
              >
                <Trash2Icon />
              </Button>
            </li>
          ))}
        </ul>
      )}

      <Button
        variant="outline"
        className="w-full sm:w-auto sm:self-start"
        disabled={items.length === initialItems.length}
        onClick={() => setItems(initialItems)}
      >
        <RotateCcwIcon data-icon="inline-start" />
        목록 되돌리기
      </Button>

      <Dialog
        open={target !== null}
        onOpenChange={(open) => {
          if (!open) setTarget(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>항목을 삭제할까요?</DialogTitle>
            <DialogDescription>
              {target}을(를) 삭제합니다. 삭제한 뒤에는 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              취소
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
