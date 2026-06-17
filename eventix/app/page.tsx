import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSession } from "@/lib/auth/server";
import { ArrowRight, CalendarPlus, Link2, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getSession();

  if (session.data?.user.id) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 flex-col gap-8">
      <section className="grid min-h-[58vh] items-center gap-8 rounded-lg border border-border bg-card p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10">
        <div className="space-y-5">
        <Badge variant="secondary" className="w-fit">
          Event planning made calm
        </Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Plan Events And Track RSVPs Fast
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Create Events, Share A Unique Invite Link And Watch Attendee Status
          Update In Real-Time With Going, And Not Going Counts
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/auth/sign-up">
              Create Account
              <ArrowRight />
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button variant="ghost" asChild size="lg">
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        </div>
        </div>
        <div className="grid gap-3">
          <div className="rounded-lg border border-border bg-input p-5">
            <p className="text-sm text-muted-foreground">Next event</p>
            <p className="mt-2 text-2xl font-semibold">Team Dinner</p>
            <div className="mt-5 flex gap-2">
              <Badge>12 Going</Badge>
              <Badge variant="secondary">3 Maybe</Badge>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-input p-5">
            <p className="text-sm text-muted-foreground">Invite link</p>
            <p className="mt-2 break-all text-sm text-foreground/90">
              eventix.app/invite/ready-to-share
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CalendarPlus className="size-5" />
            </div>
            <CardTitle>Create Events</CardTitle>
            <CardDescription>
              Set Title, Date And Details In Seconds
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Link2 className="size-5" />
            </div>
            <CardTitle>Share Invite Links</CardTitle>
            <CardDescription>
              Generate A Unique Event Token Per Event
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Users className="size-5" />
            </div>
            <CardTitle>Track Attendance </CardTitle>
            <CardDescription>
              See Attendee List And Response Totals At A Glance
            </CardDescription>
          </CardHeader>

          <CardContent className="text-sm text-muted-foreground">
            Going, Maybe And Not Going Are Always Up-To-Date
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
