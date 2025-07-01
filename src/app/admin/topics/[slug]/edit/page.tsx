import type { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  id: string;
  name: string;
};

export default function EditTopic({ id, name: initialName }: Props) {
  const [name, setName] = useState(initialName);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/admin/topics/${name}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/admin/topics");
    } else {
      alert("Error updating topic.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-4">Edit Topic</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border p-2 w-full rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.params!;
  const topic = await prisma.topic.findUnique({
    where: { name: slug as string },
  });
  if (!topic) return { notFound: true };
  return { props: { id: topic.id, name: topic.name } };
};
