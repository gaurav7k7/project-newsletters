import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, slug, content, topicId } = req.body;

    try {
      await prisma.newsletter.create({
        data: {
          title,
          slug,
          content,
          topic: topicId ? { connect: { id: topicId } } : undefined,
        },
      });
      res.status(201).json({ message: "created" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "could not create newsletter" });
    }
  } else {
    res.status(405).end();
  }
}
