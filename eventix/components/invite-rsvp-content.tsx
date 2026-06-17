import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Field } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";
import { SubmitButton } from "./submit-button";
import { CalendarDays, CheckCircle2, MapPin, Send } from "lucide-react";

export async function InviteRsvpContent({
  token,
  submitted,
}: {
  token: string;
  submitted: boolean;
}) {
  const row = await prisma.eventInvite.findFirst({
    where: { token },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!row) {
    notFound();
  }

  const e = row.event;
  const event = {
    title: e.title,
    description: e.description,
    location: e.location,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
  };

  const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            RSVP
          </Badge>
          <CardTitle className="text-3xl">{event.title}</CardTitle>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" />
              {event.eventDate
                ? new Date(event.eventDate).toLocaleString()
                : "No Date Selected"}
            </span>
            {event.location ? (
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" />
                {event.location}
              </span>
            ) : null}
          </div>
          {event.description ? (
            <p className="text-base leading-7 text-muted-foreground">
              {event.description}
            </p>
          ) : null}
        </CardHeader>
        <CardContent>
          {submitted ? (
            <p className="mb-5 flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm text-primary">
              <CheckCircle2 className="size-5" />
              Thanks. Your RSVP Has Been Recorded (Or Updated)
            </p>
          ) : null}
          <form action={submitRsvpForToken} className="space-y-5">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Enter Your Name"
              />
            </Field>

            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter Your Email: you@example.com"
              />
            </Field>

            <Field>
              <Label htmlFor="status">Attendance</Label>
              <select
                id="status"
                name="status"
                required
                defaultValue="going"
                className="flex h-11 w-full rounded-lg border border-input bg-input px-3.5 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/35"
              >
                <option value="going">Going</option>
                <option value="maybe">Maybe</option>
                <option value="not_going">Not Going</option>
              </select>
            </Field>
            <SubmitButton pendingText="Submitting...">
              <Send />
              Submit RSVP
            </SubmitButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
