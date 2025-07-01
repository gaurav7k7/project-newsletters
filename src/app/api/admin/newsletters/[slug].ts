import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;

  if (req.method === "PUT") {
    const { title, content } = req.body;
    try {
      await prisma.newsletter.update({
        where: { slug: slug as string },
        data: { title, content },
      });
      res.status(200).json({ message: "updated" });
    } catch (error) {
      res.status(500).json({ error: "Failed to update" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.newsletter.delete({
        where: { slug: slug as string },
      });
      res.status(200).json({ message: "deleted" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete" });
    }
  } else {
    res.status(405).end();
  }
}
