import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Newsletter {
  title: string;
  slug: string;
}

interface Topic {
  name: string;
  newsletters: Newsletter[];
}

export default async function TopicPage({
  params,
}: {
  params: { slug: string };
}) {
  let topic: Topic | null;

  try {
    topic = await prisma.topic.findUnique({
      where: { name: params.slug },
      include: {
        newsletters: {
          select: {
            title: true,
            slug: true,
          },
          orderBy: {
            title: "asc", // Added sorting for better UX
          },
        },
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    return notFound();
  }

  if (!topic) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Topic: {topic.name}</h1>
        {topic.newsletters.length === 0 ? (
          <p className="text-gray-500">No newsletters under this topic yet.</p>
        ) : (
          <ul className="space-y-2">
            {topic.newsletters.map((newsletter) => (
              <li key={newsletter.slug}>
                <Link
                  href={`/newsletters/${newsletter.slug}`}
                  className="underline text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {newsletter.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
