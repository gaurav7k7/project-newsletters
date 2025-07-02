// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seeding...");

  // Create Topics with upsert to avoid duplicates
  const topicsToCreate = [
    { name: "JavaScript", slug: slugify("JavaScript", { lower: true }) },
    {
      name: "Web Development",
      slug: slugify("Web Development", { lower: true }),
    },
    { name: "AI & ML", slug: slugify("AI & ML", { lower: true }) },
    { name: "React", slug: slugify("React", { lower: true }) },
    { name: "TypeScript", slug: slugify("TypeScript", { lower: true }) },
  ];

  for (const topicData of topicsToCreate) {
    await prisma.topic.upsert({
      where: { name: topicData.name },
      update: {}, // If exists, do nothing
      create: topicData,
    });
  }

  const allTopics = await prisma.topic.findMany();

  // Upsert the test user
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {}, // If exists, do nothing
    create: {
      email: "admin@example.com",
      password: "test123", // In production, use hashed passwords
    },
  });

  // Delete existing newsletters to avoid duplicate errors
  await prisma.newsletter.deleteMany({});

  // Create Newsletters with images
  const newslettersToCreate = [
    {
      title: "Understanding JavaScript Closures",
      slug: slugify("Understanding JavaScript Closures", { lower: true }),
      description: "A deep dive into closures in JS.",
      content: "Closures are one of the fundamental concepts...",
      imageUrl:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop",
      authorId: user.id,
      topicId: allTopics.find((t) => t.slug === "javascript")?.id,
      isPremium: false,
    },
    {
      title: "Modern Web Dev Tools 2025",
      slug: slugify("Modern Web Dev Tools 2025", { lower: true }),
      description: "A roundup of 2025 dev tools.",
      content: "From Vite to Bun, developers have new options...",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
      authorId: user.id,
      topicId: allTopics.find((t) => t.slug === "web-development")?.id,
      isPremium: false,
    },
    {
      title: "Intro to Machine Learning",
      slug: slugify("Intro to Machine Learning", { lower: true }),
      description: "A beginner-friendly intro to ML.",
      content: "Machine learning is a field of AI that...",
      imageUrl:
        "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop",
      authorId: user.id,
      topicId: allTopics.find((t) => t.slug === "ai-ml")?.id,
      isPremium: true,
    },
    {
      title: "React Server Components Explained",
      slug: slugify("React Server Components Explained", { lower: true }),
      description: "Understanding the future of React.",
      content: "Server Components represent a major shift...",
      imageUrl:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
      authorId: user.id,
      topicId: allTopics.find((t) => t.slug === "react")?.id,
      isPremium: false,
    },
    {
      title: "TypeScript Best Practices",
      slug: slugify("TypeScript Best Practices", { lower: true }),
      description: "Level up your TypeScript skills.",
      content: "TypeScript can help you write more robust code...",
      imageUrl:
        "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=800&auto=format&fit=crop",
      authorId: user.id,
      topicId: allTopics.find((t) => t.slug === "typescript")?.id,
      isPremium: true,
    },
    {
      title: "The State of CSS in 2025",
      slug: slugify("The State of CSS in 2025", { lower: true }),
      description: "What's new in CSS this year.",
      content: "CSS continues to evolve with new features...",
      authorId: user.id,
      topicId: allTopics.find((t) => t.slug === "web-development")?.id,
      isPremium: false,
    },
  ];

  await prisma.newsletter.createMany({
    data: newslettersToCreate,
  });

  console.log("✅ Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
