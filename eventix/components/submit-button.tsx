"use client";

import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

type SubmitButtonProps = {
  children: ReactNode;
  pendingText: string;
  className?: string;
};

export function SubmitButton({
  children,
  pendingText,
  className,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className={className}>
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          {pendingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
