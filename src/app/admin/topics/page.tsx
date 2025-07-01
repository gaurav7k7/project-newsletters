import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function AdminTopics() {
  const topics = await prisma.topic.findMany();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-xl font-bold mb-4">Admin: Manage Topics</h1>
        <Link
          href="/admin/topics/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded inline-block mb-4 transition-colors"
        >
          Add Topic
        </Link>

        {topics.length === 0 ? (
          <p className="text-gray-500">No topics found.</p>
        ) : (
          <ul className="space-y-2">
            {topics.map((topic) => (
              <li
                key={topic.id}
                className="border rounded p-2 flex justify-between items-center"
              >
                <span>{topic.name}</span>
                <Link
                  href={`/admin/topics/${encodeURIComponent(topic.name)}/edit`}
                  className="text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  Edit
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
