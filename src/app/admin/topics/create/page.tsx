import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CreateTopic() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/topics", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      router.push("/admin/topics");
    } else {
      alert("Error creating topic.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold mb-4">Create Topic</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border p-2 w-full rounded"
            placeholder="Topic Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Create
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
