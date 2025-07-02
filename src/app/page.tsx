// src/app/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import NewsletterCard from "@/components/NewsletterCard"; // ✅ Import here
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const newsletters = await prisma.newsletter.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { topic: true },
  });

  return (
    <>
      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <HeroSection />

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Latest Newsletters</h2>

          {newsletters.length === 0 ? (
            <p className="text-gray-600">No newsletters published yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {newsletters.map((n) => (
                <NewsletterCard key={n.id} newsletter={n} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
