"use client";

import { Trash2 } from "lucide-react";
import type { FormEvent } from "react";
import { SubmitButton } from "./submit-button";

type DeleteEventFormProps = {
  deleteAction: () => Promise<void>;
};

export function DeleteEventForm({ deleteAction }: DeleteEventFormProps) {
  function confirmDelete(event: FormEvent<HTMLFormElement>) {
    const confirmed = window.confirm(
      "Delete this event? This will also remove its invite link and all RSVP responses.",
    );

    if (!confirmed) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteAction} onSubmit={confirmDelete}>
      <SubmitButton variant="destructive" pendingText="Deleting...">
        <Trash2 />
        Delete Event
      </SubmitButton>
    </form>
  );
}
