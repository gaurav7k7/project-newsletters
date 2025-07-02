// src/app/topics/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function TopicsPage() {
  const topics = await prisma.topic.findMany({
    select: { id: true, slug: true, name: true },
  });
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">All Topics</h1>
      <ul className="list-disc pl-5">
        {topics.map((t) => (
          <li key={t.id}>
            <Link
              href={`/topics/${t.slug}`}
              className="text-blue-600 hover:underline"
            >
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
