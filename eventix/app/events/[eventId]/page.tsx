import { EventDetailContent } from "@/components/event-detail-content";
import { getSession } from "@/lib/auth/server";

export default async function EventDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ invite?: string }>;
}) {
  const { eventId } = await params;
  const query = await searchParams;
  const session = await getSession();
  return (
    <EventDetailContent
      userId={session.data?.user.id ?? ""}
      eventId={eventId}
      inviteReady={query.invite === "ready"}
    />
  );
}
