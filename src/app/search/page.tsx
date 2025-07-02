import { prisma } from "@/lib/prisma";
import { useSearchParams } from "next/navigation";
import NewsletterCard from "@/components/NewsletterCard";

export default async function SearchPage() {
  const params = useSearchParams();
  const q = params?.get("q") || "";
  const results = await prisma.newsletter.findMany({
    where: { title: { contains: q, mode: "insensitive" } },
    take: 20,
  });

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Search Results for “{q}”</h1>
      {results.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((n) => (
            <NewsletterCard key={n.id} newsletter={n} />
          ))}
        </div>
      ) : (
        <p>No newsletters found.</p>
      )}
    </main>
  );
}
