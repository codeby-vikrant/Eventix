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
      <section className="space-y-4">
        <Badge variant="secondary" className="w-fit">
          Next.Js + Neon Auth + Neon Postgres
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight">
          Plan Events And Track RSVPs Fast
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Create Events, Share A Unique Invite Link And Watch Attendee Status
          Update In Real-Time With Going, And Not Going Counts
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/auth/sign-up">Create Account</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Open Dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Create Events</CardTitle>
            <CardDescription>
              Set Title, Date And Details In Seconds
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Share Invite Links</CardTitle>
            <CardDescription>
              Generate A Unique Event Token Per Event
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
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
