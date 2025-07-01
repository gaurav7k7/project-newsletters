import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UpgradeBanner from "@/components/UpgradeBanner";
import Link from "next/link";

type Props = {
  newsletter: {
    title: string;
    content: string | null;
    topic: { name: string } | null;
  } | null;
  related: { title: string; slug: string }[];
};

async function getNewsletterData(slug: string) {
  const newsletter = await prisma.newsletter.findUnique({
    where: { slug },
    include: { topic: true },
  });

  let related: any = [];

  if (newsletter?.topicId) {
    related = await prisma.newsletter.findMany({
      where: {
        topicId: newsletter.topicId,
        slug: { not: slug },
      },
      take: 5,
      select: {
        title: true,
        slug: true,
      },
    });
  }

  return {
    newsletter,
    related,
  };
}

export default async function NewsletterDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { newsletter, related } = await getNewsletterData(params.slug);

  if (!newsletter) {
    return <div className="p-8">Newsletter not found</div>;
  }

  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">{newsletter.title}</h1>
          {newsletter.topic && (
            <p className="text-sm text-gray-600 mb-4">
              Topic:{" "}
              <Link
                href={`/topics/${newsletter.topic.name}`}
                className="underline text-blue-600"
              >
                {newsletter.topic.name}
              </Link>
            </p>
          )}

          <article className="prose max-w-none">
            {newsletter.content ? (
              <div dangerouslySetInnerHTML={{ __html: newsletter.content }} />
            ) : (
              <p>No content available yet.</p>
            )}
          </article>

          <UpgradeBanner />

          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4">Related Newsletters</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/newsletters/${r.slug}`}
                    className="underline text-blue-600"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <Footer />
      </main>
    </>
  );
}
