import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p className="text-red-500 p-8">Access denied. Please sign in.</p>;
  }

  return <>{children}</>;
}
