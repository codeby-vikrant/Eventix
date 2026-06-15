import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createEventAction } from "@/lib/actions/events";
import Link from "next/link";

export default async function NewEventPage() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createEventAction}>
            <Field>
              <Label>Title</Label>
              <Input
                id="title"
                name="title"
                required
                placeholder="Team Dinner..."
              />
            </Field>

            <Field>
              <Label htmlFor="description" className="mt-2">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Optional Details About The Event"
              />
            </Field>

            <Field>
              <Label htmlFor="location" className="mt-2">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="Optional Location"
              />
            </Field>

            <Field>
              <Label htmlFor="eventDate" className="mt-2">
                Date And Time
              </Label>
              <Input id="eventDate" name="eventDate" type="datetime-local" />
              <Label className="mt-2">Optional, You Can Set This Later</Label>
            </Field>

            <div className="flex items-center gap-3 mt-2">
              <Button type="submit">Create Event</Button>
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
