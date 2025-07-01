import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ReportsPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Income Reports</h1>
        <p>Reports will load here later from Postgres.</p>
      </main>
      <Footer />
    </>
  );
}
