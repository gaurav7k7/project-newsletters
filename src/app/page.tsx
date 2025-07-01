import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

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
          <ul className="space-y-4">
            {newsletters.map((n) => (
              <li
                key={n.id}
                className="border rounded p-4 hover:shadow transition"
              >
                <Link
                  href={`/newsletters/${n.slug}`}
                  className="text-xl font-semibold text-blue-600"
                >
                  {n.title}
                </Link>
                {n.topic && (
                  <p className="text-sm text-gray-600">Topic: {n.topic.name}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
