import Link from "next/link";
import { Button } from "./ui/button";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { RsvpStatus as PrismaRsvpStatus } from "@/app/generated/prisma/enums";
import { Badge } from "./ui/badge";
import { CalendarPlus, MapPin, Users } from "lucide-react";

export function countByStatus(rspvs: { status: PrismaRsvpStatus }[]) {
  let goingCount = 0;
  let maybeCount = 0;
  let notGoingCount = 0;

  for (const r of rspvs) {
    if (r.status === "going") goingCount += 1;
    else if (r.status === "maybe") maybeCount += 1;
    if (r.status === "not_going") notGoingCount += 1;
  }
  return { goingCount, maybeCount, notGoingCount };
}

export async function DashboardContent({ userId }: { userId: string }) {
  const rows = await prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      eventDate: true,
      location: true,
      eventRsvps: { select: { status: true } },
    },
  });

  const events = rows.map((e) => ({
    id: e.id,
    title: e.title,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
    location: e.location,
    ...countByStatus(e.eventRsvps),
  }));

  return (
    <div className="flex flex-1 flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-5">
        <div className="space-y-1">
          <Badge variant="secondary" className="w-fit">
            Organizer dashboard
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">Your Events</h1>
          <p className="text-base text-muted-foreground">
            Track Attendee Responses And Manage Invite Links
          </p>
        </div>
        <Button asChild size="lg">
          <Link href={"/events/new"}>
            <CalendarPlus />
            Create Event
          </Link>
        </Button>
      </div>

      {events.length === 0 ? (
        <Card className="items-center py-12 text-center">
          <CardHeader className="max-w-md">
            <div className="mx-auto flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CalendarPlus className="size-6" />
            </div>
            <CardTitle>No Events Yet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-base text-muted-foreground">
              Create Your First Event To Start Collecting Your RSVPs.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map((event) => (
            <Card key={event.id}>
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{event.title}</CardTitle>
                  <Button size="sm" asChild>
                    <Link href={`/events/${event.id}`}>Open</Link>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge>Going: {event.goingCount}</Badge>
                  <Badge variant="secondary">Maybe: {event.maybeCount}</Badge>
                  <Badge variant="outline">
                    Not Going: {event.notGoingCount}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Users className="size-4" />
                    {event.goingCount + event.maybeCount + event.notGoingCount}{" "}
                    total responses
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarPlus className="size-4" />
                    {event.eventDate
                      ? new Date(event.eventDate).toLocaleString()
                      : "No Date Selected"}
                  </p>
                  {event.location ? (
                    <p className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      {event.location}
                    </p>
                  ) : null}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
