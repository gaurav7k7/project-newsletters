import { GetServerSideProps } from "next";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import NewsletterCard from "@/components/NewsletterCard";
import TopicList from "@/components/TopicList";

type Props = {
  newsletters: {
    id: string;
    title: string;
    description: string | null;
    slug: string;
  }[];
};

export default function HomePage({ newsletters }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Navbar />
          <TopicList topics={["growth", "finance", "marketing"]} />

          <HeroSection />
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Featured Newsletters</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {newsletters.map((n) => (
                <NewsletterCard
                  key={n.id}
                  title={n.title}
                  description={n.description ?? ""}
                  link={`/newsletters/${n.slug}`}
                />
              ))}
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const newsletters = await prisma.newsletter.findMany({
    take: 10,
  });
  return {
    props: { newsletters },
  };
};
