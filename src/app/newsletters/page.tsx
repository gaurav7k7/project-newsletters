import { prisma } from "@/lib/prisma";
import NewsletterCard from "@/components/NewsletterCard";

export default async function NewslettersPage() {
  const newsletters = await prisma.newsletter.findMany({
    take: 20,
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">All Newsletters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsletters.map((n) => (
          <NewsletterCard key={n.id} newsletter={n} />
        ))}
      </div>
    </main>
  );
}
