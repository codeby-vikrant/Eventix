import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { countByStatus } from "./dashboard-content";
import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { createInviteLinkAction, deleteEventAction } from "@/lib/actions/events";
import { CopyInviteButton } from "./copy-invite-button";
import { DeleteEventForm } from "./delete-event-form";
import { SubmitButton } from "./submit-button";
import {
  CalendarDays,
  CheckCircle2,
  Link2,
  MapPin,
  Trash2,
  Users,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export async function EventDetailContent({
  userId,
  eventId,
  inviteReady,
}: {
  userId: string;
  eventId: string;
  inviteReady: boolean;
}) {
  const row = await prisma.event.findFirst({
    where: { id: eventId, ownerUserId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      invite: { select: { token: true } },
      eventRsvps: { select: { status: true } },
    },
  });
  if (!row) {
    notFound();
  }
  const counts = countByStatus(row.eventRsvps);
  const event = {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    eventDate: row.eventDate ? row.eventDate.toISOString() : null,
    inviteToken: row.invite?.token ?? null,
    goingCount: counts.goingCount,
    maybeCount: counts.maybeCount,
    notGoingCount: counts.notGoingCount,
  };

  const rsvpRows = await prisma.eventRsvp.findMany({
    where: { eventId },
    orderBy: { respondedAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      respondedAt: true,
    },
  });

  const rsvps = rsvpRows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    status: r.status,
    respondedAt: r.respondedAt.toISOString(),
  }));

  const createInviteActionForEvent = createInviteLinkAction.bind(
    null,
    event.id,
  );
  const deleteActionForEvent = deleteEventAction.bind(null, event.id);

  const inviteUrl = event.inviteToken
    ? `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/invite/${event.inviteToken}`
    : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            Event workspace
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">
            {event.title}
          </h1>
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
          {event.description && (
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              {event.description}
            </p>
          )}
        </div>
        <Button asChild variant="outline">
          <Link href={"/dashboard"}>Back</Link>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Badge>Going: {event.goingCount}</Badge>
        <Badge variant="secondary">Maybe: {event.maybeCount}</Badge>
        <Badge variant="outline">Not Going: {event.notGoingCount}</Badge>
      </div>

      {inviteReady ? (
        <div className="flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm text-primary">
          <CheckCircle2 className="size-5" />
          Invite link is ready to share.
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="size-5" />
            Invite Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-base text-muted-foreground">
            Share This Link With Guests So That They Can RSVP Without Creating
            An Account
          </p>

          {inviteUrl ? (
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-input p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="break-all text-sm text-foreground">{inviteUrl}</p>
              <CopyInviteButton inviteUrl={inviteUrl} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No Invite Link Generated Yet.
            </p>
          )}

          <form action={createInviteActionForEvent}>
            <SubmitButton pendingText="Generating...">
              {inviteUrl ? "Refresh Link Status" : "Generate Link"}
            </SubmitButton>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            Attendees
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rsvps.length === 0 ? (
            <p className="text-sm text-muted-foreground">No Responses Yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rsvps.map((rsvp) => (
                  <TableRow key={rsvp.id}>
                    <TableCell>{rsvp.name}</TableCell>
                    <TableCell>{rsvp.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {rsvp.status === "not_going"
                          ? "Not Going"
                          : rsvp.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(rsvp.respondedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="border-destructive/35">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="size-5" />
            Delete Event
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm text-muted-foreground">
            Once the event is deleted, its invite link and RSVP responses are
            removed too.
          </p>
          <DeleteEventForm deleteAction={deleteActionForEvent} />
        </CardContent>
      </Card>
    </div>
  );
}
