import { useState } from "react";
import type { GetServerSideProps } from "next";

type Topic = { id: string; name: string };
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CreateNewsletter({ topics }: { topics: Topic[] }) {
  const [topicId, setTopicId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/admin/newsletters", {
      method: "POST",
      body: JSON.stringify({ title, slug, content, topicId }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/admin/newsletters");
    } else {
      alert("Error creating newsletter.");
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-xl font-bold mb-4">Create Newsletter</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border p-2 w-full rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="border p-2 w-full rounded"
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <textarea
              className="border p-2 w-full rounded"
              placeholder="Content"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>

            <select
              className="border p-2 w-full rounded"
              value={topicId || ""}
              onChange={(e) => setTopicId(e.target.value)}
            >
              <option value="">Select Topic</option>
              {topics.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </form>
        </main>
        <Footer />
      </main>
    </>
  );
}
