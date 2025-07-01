import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TrendingPage() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Trending Newsletters</h1>
        {/* Later load trending newsletters from Postgres */}
        <p>Trending newsletters list goes here.</p>
      </main>
      <Footer />
    </>
  );
}
