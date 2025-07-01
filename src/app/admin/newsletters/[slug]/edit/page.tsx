import type { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
};

export default function EditNewsletter({
  id,
  title: initialTitle,
  slug,
  content: initialContent,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent || "");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`/api/admin/newsletters/${slug}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/admin/newsletters");
    } else {
      alert("Error updating newsletter.");
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-xl font-bold mb-4">Edit Newsletter</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              className="border p-2 w-full rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              Save
            </button>
          </form>
        </main>
        <Footer />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params!;

  const newsletter = await prisma.newsletter.findUnique({
    where: { slug: slug as string },
  });

  if (!newsletter) {
    return { notFound: true };
  }

  return {
    props: {
      id: newsletter.id,
      title: newsletter.title,
      slug: newsletter.slug,
      content: newsletter.content,
    },
  };
};
