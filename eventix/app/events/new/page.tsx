import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { createEventAction } from "@/lib/actions/events";
import { CalendarPlus } from "lucide-react";
import Link from "next/link";

export default async function NewEventPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader className="space-y-2">
          <div className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CalendarPlus className="size-6" />
          </div>
          <CardTitle className="text-2xl">Create Event</CardTitle>
          <p className="text-base text-muted-foreground">
            Add the essentials now. You can share an invite link after the event
            is created.
          </p>
        </CardHeader>
        <CardContent>
          <form action={createEventAction} className="space-y-5">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="Team Dinner..."
              />
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Optional Details About The Event"
              />
            </Field>

            <Field>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Optional Location"
              />
            </Field>

            <Field>
              <Label htmlFor="eventDate">Date And Time</Label>
              <Input id="eventDate" name="eventDate" type="datetime-local" />
              <p className="text-sm text-muted-foreground">
                Optional, You Can Set This Later
              </p>
            </Field>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <SubmitButton pendingText="Creating...">
                <CalendarPlus />
                Create Event
              </SubmitButton>
              <Button type="button" variant="outline" asChild>
                <Link href={"/dashboard"}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
