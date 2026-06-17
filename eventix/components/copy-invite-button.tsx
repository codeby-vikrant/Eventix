"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function CopyInviteButton({ inviteUrl }: { inviteUrl: string }) {
  const [copied, setCopied] = useState(false);

  async function copyInviteUrl() {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button type="button" variant="outline" onClick={copyInviteUrl}>
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : "Copy Link"}
    </Button>
  );
}
