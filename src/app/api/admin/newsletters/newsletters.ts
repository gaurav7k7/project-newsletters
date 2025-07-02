import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// Example: Temporary admin check (replace with session logic)
const isAdmin = (req: NextApiRequest) => {
  // You can check req.headers, session, etc.
  return true; // Replace with actual check
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { title, slug, description, content, topicId, authorId, isPremium } =
    req.body;

  if (!title || !slug || !topicId || !authorId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newsletter = await prisma.newsletter.create({
      data: {
        title,
        slug,
        description,
        content,
        isPremium: !!isPremium,
        topicId,
        authorId,
      },
    });

    res.status(201).json({ message: "Newsletter created", newsletter });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: "Failed to create newsletter" });
  }
}
