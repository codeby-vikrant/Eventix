import { DashboardContent } from "@/components/dashboard-content";
import { getSession } from "@/lib/auth/server";

export default async function Home() {
  const session = await getSession();
  return <DashboardContent userId={session.data?.user.id} />;
}
